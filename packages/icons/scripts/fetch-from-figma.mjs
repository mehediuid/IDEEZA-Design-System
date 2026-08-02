/**
 * Pulls icons out of the Figma file and appends them to icons.json.
 *
 * The library has 2,852 `icon/*` components; this package ships the ones the
 * design system actually uses. Run this to add more — by name, or all of them.
 *
 *   FIGMA_TOKEN=figd_xxx node scripts/fetch-from-figma.mjs                 # everything
 *   FIGMA_TOKEN=figd_xxx node scripts/fetch-from-figma.mjs bookmark eraser # by name
 *
 * Get a token at figma.com → Settings → Security → Personal access tokens.
 * Then `npm run generate` to rebuild the components.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FILE_KEY = process.env.FIGMA_FILE_KEY ?? "V3uizmZLHo5Xhy65Dp3F0O";
const ICONS_PAGE = "1109:3";
const TOKEN = process.env.FIGMA_TOKEN;

if (!TOKEN) {
  console.error("FIGMA_TOKEN is not set. figma.com → Settings → Security → Personal access tokens");
  process.exit(1);
}

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const jsonPath = path.join(root, "icons.json");

const api = async (url) => {
  const res = await fetch(url, { headers: { "X-Figma-Token": TOKEN } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res.json();
};

/** Attributes shared by every icon in the library; stripped from the data file. */
const DEFAULTS = {
  stroke: "#475569",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  fill: "none",
};

function compact(svg) {
  const body = svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>[\s\S]*$/, "");
  const els = [];
  const re = /<(path|circle|rect|ellipse|line|polyline|polygon)\b([^>]*)\/?>/g;
  let m;
  while ((m = re.exec(body))) {
    const attrs = {};
    const ar = /([a-z-]+)="([^"]*)"/g;
    let a;
    while ((a = ar.exec(m[2]))) {
      if (DEFAULTS[a[1]] !== a[2]) {
        const prop = a[1].replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        attrs[prop] = a[2];
      }
    }
    els.push([m[1], attrs]);
  }
  return els;
}

const wanted = process.argv.slice(2).map((n) => n.replace(/^icon\//, ""));

console.log("reading the Icons page…");
const page = await api(`https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${ICONS_PAGE}`);
const rootNode = page.nodes[ICONS_PAGE].document;

const components = [];
(function walk(n) {
  if (n.type === "COMPONENT" && n.name.startsWith("icon/")) components.push(n);
  (n.children ?? []).forEach(walk);
})(rootNode);

const targets = components.filter((c) => {
  const short = c.name.replace(/^icon\//, "");
  return wanted.length === 0 || wanted.includes(short);
});

if (!targets.length) {
  console.error("no matching icons found");
  process.exit(1);
}
console.log(`${targets.length} icons to fetch`);

const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const BATCH = 100; // the image endpoint caps the number of ids per request

for (let i = 0; i < targets.length; i += BATCH) {
  const slice = targets.slice(i, i + BATCH);
  const ids = slice.map((c) => c.id).join(",");
  const { images } = await api(
    `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=svg`
  );
  await Promise.all(
    slice.map(async (c) => {
      const url = images[c.id];
      if (!url) return;
      const svg = await (await fetch(url)).text();
      data.icons[c.name.replace(/^icon\//, "")] = compact(svg);
    })
  );
  console.log(`  ${Math.min(i + BATCH, targets.length)}/${targets.length}`);
}

const sorted = Object.fromEntries(Object.entries(data.icons).sort(([a], [b]) => a.localeCompare(b)));
data.icons = sorted;
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
console.log(`icons.json now holds ${Object.keys(sorted).length} icons — run: npm run generate`);
