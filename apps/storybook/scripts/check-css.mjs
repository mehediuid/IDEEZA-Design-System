/**
 * Does the CSS that actually ships carry the motion the components rely on?
 *
 * check-figma-parity.mjs reads the component stylesheets in source. That is
 * necessary and not sufficient: what consumers get is the built sheet, and
 * a rule can be right in source and missing from the artifact. So this greps
 * the published stylesheet — the way an installed copy would see it.
 *
 * The class-existence half of this file retired with the utility layer:
 * every component carries its motion as ordinary rules now, so the checks
 * name the rules themselves.
 *
 *   node apps/storybook/scripts/check-css.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const sheet = path.join(here, '../../../packages/design-system/dist/styles.css');
if (!fs.existsSync(sheet)) {
  console.error('Build first: pnpm build');
  process.exit(1);
}
const css = fs.readFileSync(sheet, 'utf8');
const squash = (s) => s.replace(/\s+/g, '');
const flat = squash(css);

let bad = 0;
const chk = (label, ok, detail = '') => {
  if (!ok) bad++;
  console.log(`${ok ? '✅' : '❌'} ${label.padEnd(30)} ${detail}`);
};

// One rule from each motion family, read as the browser would.
for (const [label, rule] of Object.entries({
  'the press recipe': '.ids-nav-item:active{transition-duration:var(--motion-duration-instant);transform:scale(0.97)',
  'the state transition': '.ids-field__control{', // colours + halo travel together
  'the tab indicator spring': '.ids-tabs__indicator--travel{transition-property:left,top,width,height;transition-duration:var(--motion-duration-normal);transition-timing-function:var(--motion-easing-spring)',
  'the toggle spring': 'transition-property:left;transition-duration:var(--motion-duration-normal);transition-timing-function:var(--motion-easing-spring)',
  'the button swell': '.ids-button--flat:hover{transform:scale(1.02);',
  'the button lift': '.ids-button--raised:hover{transform:translateY(-1px)',
  'the icon button swell': '.ids-icon-button--flat:hover{transform:scale(1.02);',
})) {
  chk(label, flat.includes(squash(rule)), rule.slice(0, 60));
}

// The keyframes the sheet references have to ship in it too — ids-spin lived
// in Button.css once, and Spinner stopped turning on any page without a
// Button.
for (const name of ['ids-spin', 'ids-pulse']) {
  chk(`@keyframes ${name} ships`, flat.includes(`@keyframes${name}{`), '');
}

// The duration and easing tokens the rules read must be defined.
for (const v of ['--motion-duration-instant', '--motion-duration-interaction',
                 '--motion-duration-normal', '--motion-easing-decelerate', '--motion-easing-spring']) {
  chk(`${v} is defined`, css.includes(`${v}:`), '');
}

// Plain CSS, importable as-is — no directives waiting for a build step.
const code = css.replace(/\/\*[\s\S]*?\*\//g, '');
chk('no Tailwind directives', !/@tailwind|@apply/.test(code), 'plain CSS');
chk('no utility layer', !flat.includes('.duration-interaction{'), 'the components carry their own rules');

console.log(bad ? `\n❌ ${bad} problem${bad > 1 ? 's' : ''} in the shipped sheet` : '\n✅ the shipped sheet carries every motion rule');
process.exit(bad ? 1 : 0);
