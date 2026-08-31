/**
 * Figma alias-structure check.
 *
 * Matching the resolved colour is not enough. Figma's component-scoped tokens
 * point at semantic tokens — `color/badge/brand-bg` is an alias of
 * `color/bg/brand-subtle`, not of `color/violet/50`. Both resolve to the same
 * hex today, so a value-only comparison passes while the graph is wrong: change
 * bg/brand-subtle and the badge silently stops following.
 *
 * figma-alias.txt is the alias target of each component-scoped variable, read
 * out of the file with the plugin API — `name|light target|dark target`.
 *
 *   node packages/tokens/scripts/check-alias-structure.mjs
 */
import fs from 'fs';

const css = fs.readFileSync(new URL('../css/tokens.css', import.meta.url).pathname, 'utf8');
const expected = fs.readFileSync(new URL('./figma-alias.txt', import.meta.url).pathname, 'utf8');

const range = (re) => {
  const i = css.search(re); const s = css.indexOf('{', i);
  let d = 0, j = s;
  for (; j < css.length; j++) { if (css[j] === '{') d++; else if (css[j] === '}') { d--; if (!d) break; } }
  return css.slice(s, j);
};
const parse = (t) => { const m = {}; for (const x of t.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) m[x[1]] = x[2].trim(); return m; };
const light = parse(range(/:root,\s*\n\[data-theme="light"\]/));
const dark = parse(range(/\[data-theme="dark"\]/));
const pref = parse(range(/:root:not\(\[data-theme\]\)/));

const v = (n) => '--' + n.replace(/\//g, '-');
const target = (s) => { if (!s) return null; const m = s.trim().match(/^var\(\s*(--[a-z0-9-]+)\s*\)$/); return m ? m[1] : 'literal ' + s.trim(); };

let bad = 0;
for (const line of expected.trim().split('\n')) {
  const [name, L, D] = line.split('|');
  const tok = v(name);
  const gotL = target(light[tok]);
  // a token with no dark override inherits the light alias — correct whenever
  // Figma uses the same target in both modes
  const gotD = target(dark[tok] ?? light[tok]);
  const gotP = target(pref[tok] ?? light[tok]);
  const okL = gotL === v(L), okD = gotD === v(D), okP = gotP === v(D);
  if (!(okL && okD && okP)) {
    bad++;
    console.log(`❌ ${name}`);
    if (!okL) console.log(`     light  figma → ${L}   css → ${gotL}`);
    if (!okD) console.log(`     dark   figma → ${D}   css → ${gotD}`);
    if (!okP) console.log(`     prefers figma → ${D}  css → ${gotP}`);
  }
}
console.log(bad
  ? `\n❌ ${bad} token(s) point somewhere Figma does not`
  : `✅ all ${expected.trim().split('\n').length} component-scoped tokens alias exactly as Figma does`);
process.exit(bad ? 1 : 0);
