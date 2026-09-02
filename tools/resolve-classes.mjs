/**
 * Resolve a component's Tailwind classes into the CSS declarations they
 * actually produce, by reading the stylesheet we already build and ship.
 *
 * This exists for the move off Tailwind. The new hand-written CSS is generated
 * from what the old CSS resolves to, not retyped from the Figma file a second
 * time. Every value in here has already been measured once and checked 268
 * ways; typing it again is exactly how "pixel perfect" quietly stops being
 * true, and the failure would be invisible until someone compared screens.
 *
 *   node tools/resolve-classes.mjs <Component>
 *   node tools/resolve-classes.mjs Button
 *
 * Reads packages/design-system/dist/styles.css, so run a build first.
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

/** class name → [[variantSuffix, declarations]] */
const table = new Map();
postcss.parse(fs.readFileSync(sheet, 'utf8')).walkRules((rule) => {
  for (const sel of rule.selector.split(',')) {
    const s = sel.trim();
    // The escape alternative has to come first: a bare backslash otherwise
    // matches as an ordinary character and the escaped bracket after it fails.
    // `\2c ` is how Tailwind escapes a comma in an arbitrary value, and the
    // trailing space is part of the escape rather than the end of the class.
    const m = s.match(/^\.((?:\\2c |\\.|[^\s.:[\]])+)(.*)$/);
    if (!m) continue;
    const name = m[1].replace(/\\2c /g, ',').replace(/\\/g, '');
    const decls = [];
    rule.walkDecls((d) => decls.push(`${d.prop}: ${d.value}`));
    if (!decls.length) continue;
    if (!table.has(name)) table.set(name, []);
    table.get(name).push([m[2], decls]);
  }
});

const component = process.argv[2];
if (!component) {
  console.error('Which component? e.g. node tools/resolve-classes.mjs Button');
  process.exit(1);
}
const file = path.join(repo, `packages/ui/src/components/${component}/${component}.tsx`);
const src = fs
  .readFileSync(file, 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '');

// Classes are grouped in the source the same way they should be grouped in the
// stylesheet — a base, then one block per variant and per size. Keeping that
// shape means the generated CSS reads like the component rather than like a
// dump of everything the component happens to use.
const groups = new Map();
const between = (from, to) => {
  const a = src.indexOf(from);
  const b = to ? src.indexOf(to) : src.length;
  return a === -1 ? '' : src.slice(a, b === -1 ? src.length : b);
};

groups.set('base', between('cva(', '  {\n    variants'));
for (const [, name, body] of between('variant: {', 'size: {').matchAll(/(\w+): \[([\s\S]*?)\],\n/g)) {
  groups.set(`variant/${name}`, body);
}
for (const [, name, body] of between('size: {', 'defaultVariants').matchAll(/"?([\w-]+)"?:\s*"([^"]*)"/g)) {
  // Re-quoted: the variant bodies below are raw source containing quoted
  // strings, and the class extraction reads quoted strings out of both. A
  // size body is already the bare class list, so without this it reads as
  // having no classes at all and the whole group silently disappears.
  groups.set(`size/${name}`, `"${body}"`);
}

const seen = new Set();
for (const [group, body] of groups) {
  const classes = [...new Set((body.match(/"[^"]*"/g) || []).flatMap((s) => s.slice(1, -1).split(/\s+/)))]
    .filter((c) => c && !seen.has(group + c));
  if (!classes.length) continue;
  console.log(`\n══ ${group}`);
  for (const c of classes) {
    const hits = table.get(c);
    if (!hits) {
      console.log(`   ${c.padEnd(50)} ${'—'.padEnd(11)} (no rule — a modifier the parent applies, or dead)`);
      continue;
    }
    for (const [suffix, decls] of hits) {
      console.log(`   ${c.padEnd(50)} ${(suffix || '').padEnd(11)} ${decls.join('; ')}`);
    }
  }
}
