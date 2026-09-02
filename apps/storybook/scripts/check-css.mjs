/**
 * Does the CSS that actually ships contain the classes the components ask for?
 *
 * check-figma-parity.mjs reads the component source. That is necessary and it
 * is not sufficient: the motion recipes moved into `lib/motion.ts`, the
 * Tailwind `content` glob only matched `.tsx`, and so every motion class was
 * silently dropped from the build. Source was right, CSS was empty, parity
 * passed, and nothing on the page moved.
 *
 * So this compiles the real stylesheet with the real config and greps the
 * output. A class that no rule defines is a class that does nothing.
 *
 *   node apps/storybook/scripts/check-css.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';

const here = path.dirname(fileURLToPath(import.meta.url));
const app = path.join(here, '..');

const input = fs.readFileSync(path.join(app, '.storybook/tailwind.css'), 'utf8');
const { default: config } = await import(path.join(app, 'tailwind.config.ts'));

// Tailwind resolves `content` globs relative to cwd, not to the config file.
process.chdir(app);
const entry = path.join(app, '.storybook/tailwind.css');
const { css } = await postcss([postcssImport(), tailwindcss(config)]).process(input, { from: entry });

/**
 * Tailwind escapes a comma in an arbitrary value as the CSS escape `\2c `.
 * Whitespace is squashed on both sides so the same check works against the
 * minified build and the readable one — the previous version only matched
 * minified output and reported false failures on the other.
 */
const squash = (s) => s.replace(/\s+/g, '');
const cls = (name) => squash('.' + name.replace(/([:[\]().%#])/g, '\\$1').replace(/,/g, '\\2c '));
const flat = squash(css);

const REQUIRED = {
  'the press transition': 'transition-[color,background-color,border-color,box-shadow,transform]',
  'the state transition': 'transition-[color,background-color,border-color,box-shadow]',
  'the tab indicator transition': 'transition-[left,top,width,height]',
  'press scale': 'active:scale-[0.97]',
  'instant press': 'active:duration-instant',
  'hover lift': 'hover:-translate-y-px',
  'lift shadow': 'hover:shadow-2',
  'lift release': 'active:translate-y-0',
  'the 120ms step': 'duration-interaction',
  'the spring easing': 'ease-spring',
  'the decelerate easing': 'ease-decelerate',
};

let bad = 0;
for (const [label, name] of Object.entries(REQUIRED)) {
  const ok = flat.includes(cls(name));
  if (!ok) bad++;
  console.log(`${ok ? '✅' : '❌'} ${label.padEnd(30)} ${name}`);
}

// A transform utility that never emits `transform:` sets two custom properties
// and moves nothing. Tailwind groups the declaration across selectors, so the
// check is that the class appears somewhere in a rule that has it.
const transformRules = flat.match(/[^{}]*\{[^{}]*transform:translate\(var\(--tw-translate-x\)[^{}]*\}/g) || [];
const moves = (name) => transformRules.some((r) => r.split('{')[0].includes(cls(name)));
for (const name of ['active:scale-[0.97]', 'hover:-translate-y-px', 'active:translate-y-0']) {
  const ok = moves(name);
  if (!ok) bad++;
  console.log(`${ok ? '✅' : '❌'} ${'…and actually transforms'.padEnd(30)} ${name}`);
}

// `.transition-[…]` carries Tailwind's default 150ms. The duration token only
// wins if its rule comes later in the sheet.
const at = (name) => flat.indexOf(cls(name) + '{');
const ordered = at('duration-interaction') > at('transition-[color,background-color,border-color,box-shadow,transform]');
if (!ordered) bad++;
console.log(`${ordered ? '✅' : '❌'} ${'duration overrides the default'.padEnd(30)} duration-interaction comes after transition-property`);


// Components that have moved off Tailwind carry their motion as ordinary
// rules. `hover:scale-[1.02]` stopped appearing at all once Button and
// IconButton migrated — the swell did not go away, it stopped being a class,
// and a check that only knew the class name would have called that a pass.
for (const [label, rule] of Object.entries({
  'the button swell': '.ids-button--flat:hover{transform:scale(1.02);',
  'the button lift': '.ids-button--raised:hover{transform:translateY(-1px)',
  'the icon button swell': '.ids-icon-button--flat:hover{transform:scale(1.02);',
})) {
  const ok = flat.includes(squash(rule));
  if (!ok) bad++;
  console.log(`${ok ? '✅' : '❌'} ${label.padEnd(30)} ${rule}`);
}

// ── Every --tw-* var a utility reads must have a default ────────────────
// Tailwind builds transform/box-shadow/filter out of custom properties and
// relies on Preflight to define them. This project loads `@tailwind
// utilities` only — reset.css is the base — so the defaults have to live
// there. A var() with no value and no fallback invalidates the whole
// declaration, which is how every transform in the system silently became
// `transform: none` while the class sat right there in the markup.
const reset = fs.readFileSync(
  path.join(app, '../../packages/tokens/css/reset.css'), 'utf8');
// Only vars read by a real CSS property matter. One read solely inside
// another custom property (`--tw-shadow-colored: … var(--tw-shadow-color)`)
// invalidates just that property, and the utility that uses it sets it.
const loadBearing = css.replace(/^\s*--[a-z0-9-]+\s*:[^;]*;?$/gm, '');
const referenced = new Set([...loadBearing.matchAll(/var\((--tw-[a-z0-9-]+)\)/g)].map((m) => m[1]));
const defined = new Set([...reset.matchAll(/^\s*(--tw-[a-z0-9-]+)\s*:/gm)].map((m) => m[1]));
const undefaulted = [...referenced].filter((v) => !defined.has(v)).sort();
if (undefaulted.length) bad++;
console.log(`${undefaulted.length ? '❌' : '✅'} ${'--tw-* vars have defaults'.padEnd(30)} ` +
  (undefaulted.length
    ? `${undefaulted.length} read by utilities, absent from reset.css: ${undefaulted.join(', ')}`
    : `all ${referenced.size} defined in reset.css`));

console.log(bad ? `\n❌ ${bad} class${bad > 1 ? 'es' : ''} the components use but the CSS does not define` : '\n✅ every motion class the components use exists in the built CSS');
process.exit(bad ? 1 : 0);
