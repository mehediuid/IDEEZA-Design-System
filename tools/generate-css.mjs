/**
 * Generate a component's stylesheet from the Tailwind classes it currently
 * uses, for the move off Tailwind.
 *
 *   node tools/generate-css.mjs Badge          # print
 *   node tools/generate-css.mjs Badge --write  # write Badge.css
 *
 * The values are resolved out of the stylesheet we already build — the same
 * source `tools/resolve-classes.mjs` reads — so nothing is retyped. Those
 * numbers came from the Figma file with the plugin API and have been checked
 * 268 ways; typing them a second time is how pixel-perfect quietly stops
 * being true, and it fails invisibly.
 *
 * This only handles the part that is mechanical: a `cva()` call with a base
 * and named variant groups maps cleanly onto `.ids-x` and `.ids-x--modifier`.
 * Classes written inline in JSX do not — the generator cannot know which
 * element they belong to or what the modifier should be called — so those are
 * listed at the end as work the component still needs by hand, rather than
 * guessed at.
 *
 * Always read the output before writing it. It is a starting point, not an
 * answer: an ordering that Tailwind resolved by utility precedence may need
 * saying explicitly in CSS.
 */
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';

const repo = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const sheet = path.join(repo, 'packages/design-system/dist/styles.css');
if (!fs.existsSync(sheet)) {
  console.error('Build first: pnpm build');
  process.exit(1);
}

/** class → [[pseudoSuffix, [[prop, value]]]] */
const table = new Map();
postcss.parse(fs.readFileSync(sheet, 'utf8')).walkRules((rule) => {
  for (const sel of rule.selector.split(',')) {
    const s = sel.trim();
    const m = s.match(/^\.((?:\\2c |\\.|[^\s.:[\]>~+])+)(.*)$/);
    if (!m) continue;
    const name = m[1].replace(/\\2c /g, ',').replace(/\\/g, '');
    const decls = [];
    rule.walkDecls((d) => decls.push([d.prop, d.value]));
    if (!decls.length) continue;
    if (!table.has(name)) table.set(name, []);
    table.get(name).push([m[2], decls]);
  }
});

const component = process.argv[2];
const write = process.argv.includes('--write');
if (!component) {
  console.error('Which component? e.g. node tools/generate-css.mjs Badge');
  process.exit(1);
}
const file = path.join(repo, `packages/ui/src/components/${component}/${component}.tsx`);
const raw = fs.readFileSync(file, 'utf8');
const src = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

/** PascalCase → kebab, for the class prefix. */
const kebab = component.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const prefix = `ids-${kebab}`;

const between = (from, to) => {
  const a = src.indexOf(from);
  if (a === -1) return '';
  const b = to ? src.indexOf(to, a) : -1;
  return src.slice(a, b === -1 ? src.length : b);
};
const classesIn = (text) =>
  [...new Set((text.match(/"[^"]*"/g) || []).flatMap((s) => s.slice(1, -1).split(/\s+/)))].filter(Boolean);

/** Everything a group's classes resolve to, keyed by pseudo-class. */
function declsFor(classes) {
  const byPseudo = new Map();
  const unknown = [];
  for (const c of classes) {
    const hits = table.get(c);
    if (!hits) { unknown.push(c); continue; }
    for (const [pseudo, decls] of hits) {
      if (!byPseudo.has(pseudo)) byPseudo.set(pseudo, new Map());
      // Tailwind's shadow and transform plumbing does not survive the move:
      // the new CSS writes box-shadow and transform outright.
      for (const [prop, value] of decls) {
        if (prop.startsWith('--tw-')) continue;
        // A declaration that still reads Tailwind's plumbing — `ring-*` builds
        // its outline that way — cannot come across as-is: the variables will
        // not exist. Flag it rather than emit something that silently paints
        // nothing.
        if (value.includes('--tw-')) { unknown.push(`${c} (${prop} \u2192 --tw-*)`); continue; }
        byPseudo.get(pseudo).set(prop, value);
      }
      // Tailwind assembles box-shadow out of --tw-shadow and two ring
      // placeholders. The placeholders paint nothing, so the shadow the class
      // actually produces is just --tw-shadow — written out, that is a plain
      // box-shadow and needs none of the plumbing.
      const shadow = decls.find(([p]) => p === '--tw-shadow');
      if (shadow && shadow[1] !== '0 0 #0000' && !shadow[1].includes('--tw-')) {
        byPseudo.get(pseudo).set('box-shadow', shadow[1]);
        const idx = unknown.findIndex((u) => u.startsWith(`${c} (box-shadow`));
        if (idx !== -1) unknown.splice(idx, 1);
      }
    }
  }
  return { byPseudo, unknown };
}

/**
 * Read a balanced `{...}` starting at `from`. A regex cannot do this, and the
 * first version that tried flattened `variants: { size: {...}, color: {...} }`
 * into one list — so Dot's base quietly inherited the last size and the last
 * colour. Every value still looked plausible, which is the whole danger.
 */
function block(text, from) {
  const open = text.indexOf('{', from);
  if (open === -1) return null;
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}' && --depth === 0) return { body: text.slice(open + 1, i), end: i };
  }
  return null;
}

/**
 * Top-level `key: <value>` pairs of an object body.
 *
 * A quoted value has to be read to its closing quote, not to the end of the
 * line. `{ subtle: "", solid: "", outline: "border bg-transparent" }` is one
 * line, and reading to the newline gave `subtle` the whole thing — so Badge's
 * outline border landed on every subtle badge and the outline variant got no
 * rule at all. Every value still looked like a plausible value.
 */
function entries(body) {
  const out = [];
  let i = 0;
  while (i < body.length) {
    const key = /["']?([\w-]+)["']?\s*:/g;
    key.lastIndex = i;
    const hit = key.exec(body);
    if (!hit) break;
    let j = key.lastIndex;
    while (j < body.length && /\s/.test(body[j])) j++;
    const open = body[j];
    let value, end;
    if (open === '{' || open === '[') {
      const close = open === '{' ? '}' : ']';
      let depth = 0;
      for (end = j; end < body.length; end++) {
        if (body[end] === open) depth++;
        else if (body[end] === close && --depth === 0) break;
      }
      value = body.slice(j + 1, end);
    } else if (open === '"' || open === "'" || open === '`') {
      for (end = j + 1; end < body.length; end++) {
        if (body[end] === '\\') { end++; continue; }
        if (body[end] === open) break;
      }
      value = body.slice(j, end + 1);
    } else {
      end = body.indexOf('\n', j);
      if (end === -1) end = body.length;
      value = body.slice(j, end);
    }
    out.push([hit[1], value]);
    i = end + 1;
  }
  return out;
}

/**
 * `cva`'s first argument — the base — up to the top-level comma. Reading to a
 * literal `"  {\n    variants"` worked only for the components that format
 * that way; for a one-line `cva("...", { variants: {` it matched nothing and
 * the base swallowed the whole file, so Dot's base picked up the last size and
 * the last colour.
 */
function firstArg(text) {
  const at = text.indexOf('cva(');
  if (at === -1) return '';
  let depth = 0;
  for (let i = at + 4; i < text.length; i++) {
    const ch = text[i];
    if ('([{'.includes(ch)) depth++;
    else if (')]}'.includes(ch)) { if (depth === 0) return text.slice(at + 4, i); depth--; }
    else if (ch === ',' && depth === 0) return text.slice(at + 4, i);
  }
  return '';
}

const groups = new Map();
groups.set('', firstArg(src));
const variantsAt = src.indexOf('variants: {');
if (variantsAt !== -1) {
  const variants = block(src, variantsAt);
  // One level down: `variants` holds groups, each group holds its members. The
  // member is what becomes a modifier class; the group name never does.
  for (const [, groupBody] of entries(variants ? variants.body : '')) {
    for (const [member, value] of entries(groupBody)) groups.set(member, value);
  }
}

/**
 * `compoundVariants` — a rule that only applies when two modifiers are both
 * present. In CSS that is exactly what chaining the two classes says, so
 * `{ variant: "subtle", trend: "up" }` becomes
 * `.ids-x--subtle.ids-x--up`, with the specificity that implies. The entries
 * are emitted in source order after the single-modifier rules, which is the
 * order cva resolved them in too.
 */
const compounds = [];
const compoundAt = src.indexOf('compoundVariants: [');
if (compoundAt !== -1) {
  const arr = src.slice(compoundAt, src.indexOf('defaultVariants', compoundAt));
  for (const [, entry] of arr.matchAll(/\{([^{}]*)\}/g)) {
    const cls = entry.match(/class:\s*"([^"]*)"/);
    if (!cls) continue;
    const keys = [...entry.matchAll(/(\w+):\s*"([\w-]+)"/g)]
      .filter(([, k]) => k !== 'class')
      .map(([, , v]) => v);
    if (keys.length) compounds.push([keys, cls[1]]);
  }
}

/**
 * Attach whatever followed the class in the original selector.
 *
 * A pseudo-class or an attribute selector binds to the element itself and gets
 * no space; a combinator introduces another element and does. Adding a space
 * to everything turned `aria-disabled:` into `.ids-link [aria-disabled=…]`,
 * which styles a descendant that does not exist — the disabled treatment would
 * simply never have appeared.
 */
const join = (suffix) => {
  const t = suffix.trim();
  if (!t) return '';
  if (t.startsWith(':') || t.startsWith('[')) return t;
  if (/^[>~+]/.test(t)) return ` ${t[0]} ${t.slice(1).trim()}`;
  return ` ${t}`;
};

const out = [];
const allUnknown = new Set();
for (const [name, body] of groups) {
  if (!body) continue;
  const { byPseudo, unknown } = declsFor(classesIn(body));
  unknown.forEach((u) => allUnknown.add(u));
  const selector = name ? `.${prefix}--${name}` : `.${prefix}`;
  for (const [pseudo, decls] of byPseudo) {
    if (!decls.size) continue;
    const sel = selector + join(pseudo);
    out.push(`${sel} {\n${[...decls].map(([p, v]) => `  ${p}: ${v};`).join('\n')}\n}`);
  }
}

for (const [keys, cls] of compounds) {
  const { byPseudo, unknown } = declsFor(cls.split(/\s+/).filter(Boolean));
  unknown.forEach((u) => allUnknown.add(u));
  const selector = keys.map((k) => `.${prefix}--${k}`).join('');
  for (const [pseudo, decls] of byPseudo) {
    if (!decls.size) continue;
    const sel = selector + join(pseudo);
    out.push(`${sel} {\n${[...decls].map(([p, v]) => `  ${p}: ${v};`).join('\n')}\n}`);
  }
}

const header = `/*
 * ${component} — generated from the Tailwind classes by tools/generate-css.mjs,
 * then reviewed by hand. Values resolved from the built stylesheet, not
 * retyped.
 */
`;
const text = header + '\n' + out.join('\n\n') + '\n';

// A component that has already migrated has no cva() left to read, so this
// produces nothing — and the first version wrote that nothing straight over a
// good stylesheet. DeltaChip lost its entire CSS that way, and the only
// symptom was the component rendering unstyled.
if (!out.length) {
  console.error(`${component}: kono rule pawa gelo na — cva() ache to? (kichu likhchi na)`);
  process.exit(1);
}

if (write) {
  const dest = path.join(repo, `packages/ui/src/components/${component}/${component}.css`);
  fs.writeFileSync(dest, text);
  console.log(`likhlam: ${dest}  (${out.length} rule)`);
} else {
  console.log(text);
}

const inlineClasses = classesIn(src.slice(src.indexOf('return') === -1 ? 0 : src.indexOf('return')))
  .filter((c) => table.has(c));
if (allUnknown.size || inlineClasses.length) {
  console.log('\n── hate korte hobe ──');
  if (allUnknown.size) console.log('  cva-te ache kintu CSS-e pawa jayni:', [...allUnknown].join(', '));
  if (inlineClasses.length) console.log(`  JSX-er bhitore ${inlineClasses.length} ta class:`, inlineClasses.slice(0, 24).join(' '));
}
