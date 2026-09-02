/**
 * Check the thing that actually gets published.
 *
 * The other checks in this repo read source, and source being right is not
 * the same as the artifact being right — that gap is what let a whole
 * release's worth of motion ship as dead classes. So this one only looks at
 * `dist`, the way an installed copy would.
 *
 *   node packages/design-system/scripts/check-package.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(pkgDir, 'dist');
const pkg = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8'));

let bad = 0;
const chk = (name, ok, detail = '') => {
  if (!ok) bad++;
  console.log(`${ok ? '✅' : '❌'} ${name.padEnd(44)} ${detail}`);
};

// ── Everything the export map promises must exist ──────────────────────
const promised = Object.values(pkg.exports)
  .flatMap((v) => (typeof v === 'string' ? [v] : Object.values(v)))
  .filter((v) => v.startsWith('./dist'));
const missingFile = promised.filter((f) => !fs.existsSync(path.join(pkgDir, f)));
chk('every export map path exists', missingFile.length === 0,
  missingFile.length ? missingFile.join(', ') : `${promised.length} files`);

// ── Nothing workspace-only may survive into the bundle ─────────────────
// @ideeza/ui and friends are not on npm. A require of one from an installed
// copy resolves to nothing, and the failure lands on the consumer.
// The .d.ts files count. Types that still point at a workspace package fail
// for every TypeScript consumer, and the runtime bundle looks fine meanwhile.
const bundle = ['index.js', 'index.cjs', 'index.d.ts', 'index.d.cts',
                'tailwind-preset.d.ts', 'tailwind-preset.d.cts']
  .map((f) => fs.readFileSync(path.join(dist, f), 'utf8')).join('\n');
// Doc comments carried over from the source mention these packages by name
// and are not imports; strip them before deciding anything is leaking.
const code = bundle.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const leaked = [...new Set(code.match(/["'](@ideeza\/[a-z-]+(?:\/[a-z-]+)?)["']/g) || [])];
chk('no workspace-only imports escaped', leaked.length === 0,
  leaked.length ? leaked.join(', ') : 'tokens, ui and icons are bundled in');

// ── Nothing but React may be imported at runtime ───────────────────────
// The package ships with no dependencies: everything else is bundled. So the
// only bare imports left in the bundle should be the peers.
// A module specifier has no whitespace in it. Without that the word `from`
// inside an object literal — tailwind-merge has one — reads as an import.
const imported = [...new Set([...code.matchAll(/from\s*["']([^".'/\s][^"'\s]*)["']|require\(["']([^".'/\s][^"'\s]*)["']\)/g)]
  .map((m) => m[1] || m[2])
  .map((d) => d.split('/').slice(0, d.startsWith('@') ? 2 : 1).join('/')))];
const peers = new Set(Object.keys(pkg.peerDependencies));
const extra = imported.filter((d) => !peers.has(d));
chk('nothing but the peers is imported', extra.length === 0,
  extra.length ? extra.join(', ') : [...peers].join(', '));

chk('the package declares no dependencies',
  !pkg.dependencies || Object.keys(pkg.dependencies).length === 0,
  'installing it pulls in nothing but React');

// ── The stylesheet has to carry the rules, not just the variables ──────
const css = fs.readFileSync(path.join(dist, 'styles.css'), 'utf8');
const squash = (s) => s.replace(/\s+/g, '');
const flat = squash(css);
const cls = (n) => squash('.' + n.replace(/([:[\]().%#])/g, '\\$1').replace(/,/g, '\\2c '));
for (const [label, name] of Object.entries({
  'press scale': 'active:scale-[0.97]',
  'hover lift': 'hover:-translate-y-px',
  'the 120ms step': 'duration-interaction',
  'the spring easing': 'ease-spring',
})) {
  chk(`styles.css defines ${label}`, flat.includes(cls(name)), name);
}

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

// The reset has to come before the utilities, and the --tw-* defaults with
// it — a transform whose vars are undefined computes to `none`.
chk('reset precedes the utilities', css.indexOf('--tw-translate-x') < css.indexOf('.active'),
  'otherwise every transform is discarded');
chk('token variables are in the sheet', css.includes('--motion-duration-interaction: 120ms'),
  'the utilities read them by name');

// ── A consumer should not need Tailwind ────────────────────────────────
// Comments are prose and may name the very directives being ruled out.
const cssCode = css.replace(/\/\*[\s\S]*?\*\//g, '');
chk('styles.css needs no build step', !/@tailwind|@apply/.test(cssCode),
  'plain CSS, importable as-is');

console.log(bad
  ? `\n❌ ${bad} problem${bad > 1 ? 's' : ''} in what would be published`
  : `\n✅ the built package is publishable`);
process.exit(bad ? 1 : 0);
