/**
 * Build the stylesheet that ships with the package.
 *
 * Every component carries its own CSS now, collected by
 * `packages/ui/src/styles/index.css`. The published sheet is the reset, the
 * token variables, and those component rules — plain CSS, importable as-is.
 * `import "ideeza-ds/styles.css"` and the components work — no Tailwind, no
 * config, no content globs.
 *
 * Consumers style against the CSS variables in `tokens.css` directly — the
 * system is self-contained and ships no framework bindings.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';

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

const uiSrc = path.dirname(path.dirname(fileURLToPath(import.meta.resolve('@ideeza/ui'))));
const ownIndex = path.join(uiSrc, 'src/styles/index.css');
const own = (await postcss([postcssImport(), autoprefixer()]).process(read(ownIndex), { from: ownIndex })).css;

const header = `/*! IDEEZA Design System — ${JSON.parse(read(path.join(pkg, 'package.json'))).version}
 *
 * Order matters: the reset first, then the token variables the rules read,
 * then the component rules.
 */\n`;

const out = [header, reset, tokens, own].join('\n');
fs.writeFileSync(path.join(dist, 'styles.css'), out);

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(1) + ' kB';
console.log(`  styles.css  ${kb(out)}  (reset ${kb(reset)} + tokens ${kb(tokens)} + components ${kb(own)})`);
