/**
 * Build the stylesheet that ships with the package.
 *
 * The components are written in Tailwind classes, which means the class names
 * are only half the story — the rules have to exist too. Leaving that to the
 * consumer means every one of them has to add our dist to their `content`
 * globs and our preset to their config, and if they get it slightly wrong
 * they get exactly what we hit ourselves this week: correct markup, correct
 * source, and nothing on screen. That failure is silent and it is miserable
 * to debug from the outside.
 *
 * So we run Tailwind here, over our own built output, and ship the result.
 * `import "ideeza-ds/styles.css"` and the components work — no
 * Tailwind, no config, no content globs.
 *
 * The scan target is the built output of our own packages, not `src` and not
 * this package's final bundle. Source can carry classes that get dropped; the
 * final bundle now carries Radix too, and Tailwind happily mines its strings
 * for things that look like utilities and are not — that cost 9 kB of rules
 * nothing renders.
 *
 * Consumers who do use Tailwind can still take the preset and write our
 * utilities in their own markup. That is additive; it is not required.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { ideezaPreset } from '@ideeza/tokens/tailwind-preset';

const here = path.dirname(fileURLToPath(import.meta.url));
const pkg = path.join(here, '..');
const dist = path.join(pkg, 'dist');
// Resolve through the package's own export map rather than reaching for its
// package.json, which it deliberately does not expose.
const tokensCss = path.dirname(fileURLToPath(import.meta.resolve('@ideeza/tokens/css')));

const read = (p) => fs.readFileSync(p, 'utf8');

// The variables and the reset ship on their own too, for anyone who wants the
// palette without the components.
const reset = read(path.join(tokensCss, 'reset.css'));
const tokens = read(path.join(tokensCss, 'tokens.css'));
fs.writeFileSync(path.join(dist, 'reset.css'), reset);
fs.writeFileSync(path.join(dist, 'tokens.css'), tokens);

// Components that have moved off Tailwind bring their own stylesheet. Those
// rules go in before the utility layer, so a consumer overriding either one
// gets the order they would expect: ours first, Tailwind's leftovers after.
const uiSrc = path.dirname(path.dirname(fileURLToPath(import.meta.resolve('@ideeza/ui'))));
const ownIndex = path.join(uiSrc, 'src/styles/index.css');
const own = fs.existsSync(ownIndex)
  ? (await postcss([postcssImport()]).process(read(ownIndex), { from: ownIndex })).css
  : '';

const { css } = await postcss([
  tailwindcss({
    presets: [ideezaPreset],
    content: [
      fileURLToPath(import.meta.resolve('@ideeza/ui')),
      fileURLToPath(import.meta.resolve('@ideeza/icons')),
    ],
  }),
  autoprefixer(),
]).process('@tailwind utilities;', { from: undefined });

const header = `/*! IDEEZA Design System — ${JSON.parse(read(path.join(pkg, 'package.json'))).version}
 *
 * Order matters: the reset first, then the token variables the utilities
 * read, then the utilities. reset.css also carries the Tailwind --tw-*
 * defaults, without which every transform in here computes to none.
 */\n`;

const out = [header, reset, tokens, own, css].join('\n');
fs.writeFileSync(path.join(dist, 'styles.css'), out);

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(1) + ' kB';
console.log(`  styles.css  ${kb(out)}  (reset ${kb(reset)} + tokens ${kb(tokens)}` +
  (own ? ` + components ${kb(own)}` : '') + ` + utilities ${kb(css)})`);
