/**
 * Find classes the components ask for that the stylesheet never defines.
 *
 * A Tailwind class naming a token the preset does not expose produces no rule
 * at all. Nothing errors: the class sits in the markup, devtools shows it on
 * the element, and the property is simply never set. That is how Badge's blue
 * label and Link's hover colour have been doing nothing.
 *
 *   node tools/find-dead-classes.mjs
 *
 * Run after a build. Reports per class, with the components that use it.
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

/**
 * Every class named anywhere in a selector, not just the leading one. A
 * `peer-*` variant puts the class last — `.peer:disabled ~ .peer-disabled\:x`
 * — so reading only the front of the selector reported half of Radio and
 * Checkbox as dead when the rules were there all along.
 */
const defined = new Set();
postcss.parse(fs.readFileSync(sheet, 'utf8')).walkRules((rule) => {
  for (const m of rule.selector.matchAll(/\.((?:\\2c |\\.|[^\s.:[\]>~+(){}])+)/g)) {
    defined.add(m[1].replace(/\\2c /g, ',').replace(/\\/g, ''));
  }
});

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]
  );

/**
 * Only classes that look like ours. A bare word in a string is usually prose;
 * requiring a recognised Tailwind prefix keeps the report to things that were
 * meant to style something.
 */
const LOOKS_LIKE_A_CLASS =
  /^(?:[a-z-]+:)*(?:bg|text|border|ring|shadow|fill|stroke|outline|decoration|from|via|to|accent|caret|divide|placeholder)-[a-z0-9[\]()#%.,_-]+$/;

const users = new Map();
for (const file of walk(path.join(repo, 'packages/ui/src')).filter((f) => f.endsWith('.tsx') || f.endsWith('.ts'))) {
  const src = fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  const component = path.basename(path.dirname(file));
  for (const quoted of src.match(/"[^"]*"/g) || []) {
    for (const cls of quoted.slice(1, -1).split(/\s+/)) {
      if (!cls || !LOOKS_LIKE_A_CLASS.test(cls) || defined.has(cls)) continue;
      if (!users.has(cls)) users.set(cls, new Set());
      users.get(cls).add(component);
    }
  }
}

if (!users.size) {
  console.log('✅ prottek class-er ekta kore rule ache');
  process.exit(0);
}

console.log(`❌ ${users.size} ta class kono rule banay na — egulo kichui kore na:\n`);
for (const [cls, where] of [...users].sort()) {
  console.log(`  ${cls.padEnd(34)} ${[...where].join(', ')}`);
}
process.exit(1);
