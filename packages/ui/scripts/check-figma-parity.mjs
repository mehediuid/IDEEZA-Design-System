/**
 * Figma parity check for the form controls.
 *
 * Every value here was read out of the Figma file with the plugin API, not
 * eyeballed. If a component drifts, this fails and names the property.
 *
 *   node packages/ui/scripts/check-figma-parity.mjs
 */
import fs from 'fs';
const R = new URL('../src/components/', import.meta.url).pathname;
const read=f=>fs.readFileSync(R+f,'utf8');
const has=(s,...p)=>p.every(x=>s.includes(x));
let bad=0;
const chk=(name,ok,detail)=>{ if(!ok) bad++; console.log(`${ok?'✅':'❌'} ${name.padEnd(46)} ${detail}`); };

// ── Checkbox (Figma A08 + _Checkbox base)
const cb=read('Checkbox/Checkbox.tsx');
chk('checkbox box sm 20 r6', has(cb,'size-[20px] rounded-[6px]'),'20×20 r6');
chk('checkbox box md 24 r8', has(cb,'size-[24px] rounded-[8px]'),'24×24 r8');
chk('checkbox border 2px',   has(cb,'border-[2px]'),'2px');
chk('checkbox glyph sm 16px → 10×8',has(cb,'sm: "size-[16px]"'),'icon/tick-02 in a 24 viewBox');
chk('checkbox glyph md 20px → 12×10',has(cb,'md: "size-[20px]"'),'icon/tick-02 in a 24 viewBox');
chk('checkbox uses library glyphs',has(cb,'import { Check, Minus }'),'no hand-drawn paths');
chk('checkbox row gap 16',   has(cb,'gap-[16px]'),'control ↔ text');
chk('checkbox text gap 4',   has(cb,'gap-[4px]'),'label ↔ support');
chk('checkbox label sm Body/SM',has(cb,'sm: "text-body-sm"'),'14/20 regular');
chk('checkbox label md Body/MD',has(cb,'md: "text-body-md"'),'16/24 regular');
chk('checkbox support sm Caption/SM',has(cb,'sm: "text-caption-sm"'),'11/16 regular');
chk('checkbox support md Caption/MD',has(cb,'md: "text-caption-md"'),'12/16 regular');
chk('checkbox label colour input/label',has(cb,'text-input-label'),'not text-primary');
chk('checkbox support colour input/helper',has(cb,'text-input-helper'),'not text-tertiary');

// ── Radio
const rd=read('Radio/Radio.tsx');
chk('radio 20 / 24 round',   has(rd,'sm: "size-[20px]"','md: "size-[24px]"','rounded-full'),'');
chk('radio dot 8 / 10',      has(rd,'sm: "size-[8px]"','md: "size-[10px]"'),'');
chk('radio border 2px',      has(rd,'border-[2px]'),'');
chk('radio keeps white fill',has(rd,'bg-input-bg','checked:border-bg-brand') && !rd.includes('checked:bg-bg-brand'),'ring + dot, never solid');
chk('radio row gap 16',      has(rd,'gap-[16px]'),'');
chk('radio support sm Caption/SM',has(rd,'sm: "text-caption-sm"'),'11/16 regular');

// ── Textarea
const ta=read('Textarea/Textarea.tsx');
chk('textarea sm 80 r8 pad 10/12/8/12', has(ta,'min-h-[80px] rounded-[8px] pt-[8.5px] pr-[10.5px] pb-[6.5px] pl-[10.5px]'),'Figma value minus the 1.5px border');
chk('textarea md 104 r12 pad 12/14/8/14',has(ta,'min-h-[104px] rounded-[12px] pt-[10.5px] pr-[12.5px] pb-[6.5px] pl-[12.5px]'),'Figma value minus the 1.5px border');
chk('textarea lg 128 r16 pad 14/16/8/16',has(ta,'min-h-[128px] rounded-[16px] pt-[12.5px] pr-[14.5px] pb-[6.5px] pl-[14.5px]'),'Figma value minus the 1.5px border');
chk('textarea lg value Body/MD', has(ta,'lg: "text-body-md"'),'sm/md Body/SM');
chk('textarea label ramp 36/40/48', has(ta,'{ sm: 36, md: 40, lg: 48 }'),'→ 11/16, 12/16, 14/20');

// ── Select
const se=read('Select/Select.tsx');
chk('select shares the field ramp', has(se,'controlClass[size]') && !se.includes('selectControlClass'),'no private geometry');
chk('select icon ramp shared', has(se,'iconClass[size]'),'16/16/16/20/20');
chk('select value ramp = input', has(se,'valueClass[size]'),'14/20 → 16/24 at 44');

// ── Field shell (Text Input ramp)
const fd=read('Field/Field.tsx');
chk('field height ramp',  has(fd,'h-[32px]','h-[36px]','h-[40px]','h-[44px]','h-[48px]'),'');
chk('field radius ramp',  has(fd,'32: "h-[32px] rounded-[8px]','40: "h-[40px] rounded-[12px]','48: "h-[48px] rounded-[16px]'),'8/8/12/12/16');
chk('field padX ramp 10/10/12/12/14', has(fd,'px-[8.5px]','px-[10.5px]','px-[12.5px]'),'Figma value minus the 1.5px border');
chk('field label ramp Label SM/SM/MD/MD/LG',has(fd,'32: "text-label-sm"','40: "text-label-md"','48: "text-label-lg"'),'11/11/12/12/14 semibold');
chk('field row gap 4/4/4/6/6', has(fd,'32: "gap-[4px]"','44: "gap-[6px]"'),'');
chk('field border 1.5 solid', has(fd,'border-solid border-[1.5px]'),'');
chk('field error halo danger', has(fd,'focus-halo-danger'),'');

chk('select uses library chevron',has(se,'ChevronDown'),'icon/arrow-down-01-round');
chk('textarea footer row',has(ta,'footerRight='),'helper left, count right');
chk('textarea resizable',has(ta,'resize-y'),'matches the Figma resize handle');
chk('input select addons',has(read('Input/Input.tsx'),'prefixSelect','suffixSelect','selectAddon'),'Prefix/Suffix/Both Select');

// ── Token discipline ────────────────────────────────────────────────
// Type goes through a named Figma text style, never a raw px value and never
// a bare size. Picking a size and a line height separately is exactly how the
// two drifted apart; a style is one indivisible choice.
import { readdirSync } from 'node:fs';
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]);
const srcFiles = walk(new URL('../src/', import.meta.url).pathname).filter((f) => f.endsWith('.tsx'));

const raw = srcFiles.filter((f) => /text-\[\d+px\]|leading-\[\d+px\]|tracking-\[/.test(fs.readFileSync(f, 'utf8')));
chk('no hardcoded type', raw.length === 0,
  raw.length ? raw.map((f) => f.split('/src/')[1]).join(', ') : 'no text-[Npx], leading-[Npx] or tracking-[…]');

const bare = srcFiles.filter((f) =>
  /\btext-(2xs|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl)\b/.test(fs.readFileSync(f, 'utf8')));
chk('no bare size classes', bare.length === 0,
  bare.length ? bare.map((f) => f.split('/src/')[1]).join(', ') : 'every class is a named style');

// The preset is the single place the four axes are joined. Confirm each style
// this package uses resolves to the size, line height, tracking and weight
// that Figma's style of the same name carries.
const preset = fs.readFileSync(new URL('../../tokens/src/tailwind-preset.ts', import.meta.url).pathname, 'utf8');
const FIGMA = {                       // name:            [size, line,  track,   weight]
  'label-sm':   ['xs',  'xs',  'wider',  'semibold'],   // Label/SM    11/16/0.15
  'label-md':   ['sm',  'xs',  'wide',   'semibold'],   // Label/MD    12/16/0.1
  'label-lg':   ['md',  'md',  'wide',   'semibold'],   // Label/LG    14/20/0.1
  'label-xl':   ['lg',  'lg',  'wide',   'semibold'],   // Label/XL    16/24/0.1
  'body-sm':    ['md',  'md',  'normal', 'regular'],    // Body/SM     14/20/0
  'body-md':    ['lg',  'lg',  'normal', 'regular'],    // Body/MD     16/24/0
  'caption-sm': ['xs',  'xs',  'normal', 'regular'],    // Caption/SM  11/16/0
  'caption-md': ['sm',  'xs',  'normal', 'regular'],    // Caption/MD  12/16/0
  'overline-md':['xs',  'xs',  'widest', 'semibold'],   // Overline/MD 11/16/1.2
};
for (const [name, row] of Object.entries(FIGMA)) {
  const m = preset.match(new RegExp(`"${name}":\\s*\\[([^\\]]*)\\]`));
  const got = m ? m[1].split(',').map((x) => x.trim().replace(/"/g, '')) : null;
  chk(`preset ${name}`, got && row.every((v, i) => got[i] === v),
    got ? got.join(' · ') : 'not found in the preset');
}

// ── A10 Toggle / _Toggle base ───────────────────────────────────────
// Strip comments first — these checks assert on the class strings, and the
// notes in this file mention the very things they rule out.
const stripComments = (t) => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const tg2 = stripComments(read('Toggle/Toggle.tsx'));
chk('toggle track sm 36x20 / md 44x24', has(tg2, 'sm: "h-[20px] w-[36px]"', 'md: "h-[24px] w-[44px]"'), '');
chk('toggle thumb 16 / 20, inset 2', has(tg2, 'size-[16px] left-[2px]', 'size-[20px] left-[2px]', 'top-[2px]'), '');
chk('toggle on position 18 / 22', has(tg2, 'data-[state=checked]:left-[18px]', 'data-[state=checked]:left-[22px]'), 'Figma thumb x when Pressed=On');
chk('toggle moves with left, not translate',
  has(tg2, 'transition-[left]') && !/\btranslate-[xy]-/.test(tg2),
  'translate shares --tw-translate-x and can be pinned by any other transform');
chk('toggle off fill input/border', has(tg2, 'bg-input-border hover:bg-input-border-hover'), 'not bg/surface-raised');
chk('toggle on fill bg/brand + hover', has(tg2, 'data-[state=checked]:bg-bg-brand', 'data-[state=checked]:hover:bg-bg-brand-hover'), '');
chk('toggle disabled swaps fill, not opacity',
  has(tg2, 'disabled:!bg-input-bg-disabled') && !tg2.includes('disabled:opacity'), 'Figma: input/bg-disabled');
chk('toggle track has no border',
  !/(^|\s)border(\s|"|')/.test(tg2) && !tg2.includes('border-border'),
  'Figma track carries no stroke');
chk('toggle thumb fill bg/surface', has(tg2, 'bg-bg-surface'), 'not raw white');

// ── cn() must tell text styles apart from text colours ──────────────
// The styles sit in Tailwind's fontSize scale, so `text-label-lg` and
// `text-button-primary-text` share a prefix. tailwind-merge cannot separate
// them unaided, and when it guessed it dropped the colour — every filled
// button rendered with inherited near-black text. cn.ts names the styles; if
// the preset gains one and that list is not updated, the same bug returns.
const cnSrc = fs.readFileSync(new URL('../src/lib/cn.ts', import.meta.url).pathname, 'utf8');
const listed = new Set([...cnSrc.matchAll(/"([a-z0-9-]+)",/g)].map((m) => m[1]));
// fontSize entries in the preset are `"label-sm": ["xs", "xs", "wider", "semibold"],`
// inside a `fontSize: ts({ ... })` call — slice to that call's closing brace.
const fsStart = preset.indexOf('fontSize: ts({');
const fsBlock = preset.slice(fsStart, preset.indexOf('}),', fsStart));
const presetSizes = new Set([...fsBlock.matchAll(/"([a-z0-9-]+)":\s*\[/g)].map((m) => m[1]));
const missing = [...presetSizes].filter((k) => !listed.has(k));
const extra = [...listed].filter((k) => !presetSizes.has(k));
chk('cn() knows every text style', missing.length === 0 && extra.length === 0,
  missing.length ? 'missing: ' + missing.join(', ')
  : extra.length ? 'not in the preset: ' + extra.join(', ')
  : `${presetSizes.size} styles, none treated as a colour`);
chk('cn() uses extendTailwindMerge', cnSrc.includes('extendTailwindMerge') && cnSrc.includes('"font-size"'),
  'plain twMerge conflates styles with colours');

// ── Display atoms ───────────────────────────────────────────────────
// Values read out of Atoms — Display with the plugin API, same as above.

// A16 Avatar — 6 sizes, and initials step through named styles rather than
// raw sizes. The contrast border is 1px up to XS and 2px from SM.
const av = read('Avatar/Avatar.tsx');
chk('avatar size ramp 20/24/32/40/48/64',
  has(av, 'size-[20px]', 'size-[24px]', 'size-[32px]', 'size-[40px]', 'size-[48px]', 'size-[64px]'), '2XS→XL');
chk('avatar initials type ramp',
  has(av, '"2xs": "size-[20px] text-overline-sm"', 'xs: "size-[24px] text-label-sm"',
       'sm: "size-[32px] text-label-lg"', 'md: "size-[40px] text-heading-h6"',
       'lg: "size-[48px] text-heading-h5"', 'xl: "size-[64px] text-heading-h3"'),
  'Overline/SM → Label/SM → Label/LG → H6 → H5 → H3');
chk('avatar contrast border 1px → 2px', has(av, '"2xs": "ring-1 ring-inset ring-bg-surface"', 'sm: "ring-2 ring-inset ring-bg-surface"'), '1px at 20/24, 2px from 32');
chk('avatar icon frame 12/14/18/22/26/36',
  has(av, '"2xs": "size-[12px]"', 'xs: "size-[14px]"', 'sm: "size-[18px]"',
       'md: "size-[22px]"', 'lg: "size-[26px]"', 'xl: "size-[36px]"'),
  'measured per size — not one percentage');
chk('avatar status dot ramp 6/7/9/11/13/16',
  has(av, 'size-[6px]', 'size-[7px]', 'size-[9px]', 'size-[11px]', 'size-[13px]', 'size-[16px]'), '');
chk('avatar status dot inset 0 → 1px at LG/XL',
  has(av, 'size-[11px] right-0 bottom-0', 'size-[13px] right-[1px] bottom-[1px]'), '');
chk('avatar status dot is ring + 2/3 core', has(av, 'rounded-full bg-bg-surface', 'h-2/3 w-2/3'), '_Status dot: 12px ring, 8px dot');
chk('avatar status set = online/offline/verified',
  has(av, 'online: "bg-icon-success"', 'offline: "bg-icon-disabled"', 'verified: "bg-icon-blue"')
    && !av.includes('busy:') && !av.includes('away:'),
  'Figma has no busy or away');
chk('avatar initials fill', has(av, 'bg-bg-brand-subtle text-text-brand'), 'bg/brand-subtle + text/brand');
chk('avatar icon fill', has(av, 'bg-bg-surface-raised'), 'bg/surface-raised');
chk('avatar hover wash 8%', has(av, 'hover:after:opacity-[0.08]'), 'text/primary at 8%');
chk('avatar disabled 50%', has(av, 'opacity-50'), '');

// A18 Tag — border in every state; Badge is the coloured one, Tag is neutral.
const tg = read('Tag/Tag.tsx');
chk('tag sm 24 pad 8 gap 4 Caption/SM', has(tg, 'h-[24px] gap-[4px] px-[8px] text-caption-sm'), '');
chk('tag md 28 pad 10 gap 6 Caption/MD', has(tg, 'h-[28px] gap-[6px] px-[10px] text-caption-md'), '');
chk('tag lg 32 pad 12 gap 6 Label/SM', has(tg, 'h-[32px] gap-[6px] px-[12px] text-label-sm'), '');
chk('tag default surface-raised + border', has(tg, 'bg-bg-surface-raised border-border text-text-primary'), '');
chk('tag hover subtle + strong border', has(tg, 'hover:bg-bg-subtle hover:border-border-strong'), '');
chk('tag selected brand', has(tg, 'bg-bg-brand-subtle border-border-brand text-text-brand'), '');
chk('tag leading icon 16 at every size', has(tg, "const leadingIcon = \"[&>svg]:size-[16px]"), 'does not shrink at SM');
chk('tag close icon 12 at SM, 16 at MD/LG',
  has(tg, 'sm: "[&>svg]:size-[12px]"', 'md: "[&>svg]:size-[16px]"', 'lg: "[&>svg]:size-[16px]"'), '');
chk('tag leading dot 6/7/8', has(tg, 'sm: "size-[6px]"', 'md: "size-[7px]"', 'lg: "size-[8px]"'), '');
chk('tag avatar sizes 12/16/18 exported', has(tg, 'tagAvatarSize = { sm: 12, md: 16, lg: 18 }'), '');

// A20 Spinner — the Figma arc is 0.87→4.01 rad, exactly half the circle.
const spn = read('Spinner/Spinner.tsx');
chk('spinner size ramp 16/20/24/32', has(spn, 'size-[16px]', 'size-[20px]', 'size-[24px]', 'size-[32px]'), '');
chk('spinner metrics box/stroke/dot',
  has(spn, 'sm: { box: 16, stroke: 2, dot: 2.5 }', 'md: { box: 20, stroke: 2, dot: 3 }',
       'lg: { box: 24, stroke: 2.5, dot: 3.5 }', 'xl: { box: 32, stroke: 3, dot: 4.5 }'), '');
chk('spinner arc is half the circle', has(spn, 'const half = Math.PI * r'), '0.87→4.01 rad = 180°');
chk('spinner arc has ROUND caps', has(spn, 'strokeLinecap="round"'), 'a CSS border ends square — Figma strokeCap ROUND');
chk('spinner arc start 0.87 rad', has(spn, 'const START_DEG = (0.87 * 180) / Math.PI - 90'), '');
chk('spinner ring track border/subtle', has(spn, 'var(--color-border-subtle)'), '');
chk('spinner colours read icon/*', has(spn, 'text-icon-brand', 'text-icon-secondary', 'text-icon-on-brand', 'text-icon-error'), 'not text/*');
chk('spinner dots = 12', has(spn, 'const DOTS = 12'), 'Figma bakes 12 nodes with a fade');

// A21 Skeleton — geometry is the Figma default, overridable via className.
const sk = read('Skeleton/Skeleton.tsx');
chk('skeleton rectangle ramp', has(sk, 'w-[120px] h-[60px]', 'w-[200px] h-[100px]', 'w-[320px] h-[160px]'), 'SM/MD/LG');
chk('skeleton line ramp', has(sk, 'w-[80px] h-[8px]', 'w-[160px] h-[12px]', 'w-[240px] h-[16px]'), '');
chk('skeleton circle ramp 24/32/48', has(sk, 'size-[24px]', 'size-[32px]', 'size-[48px]'), '');
chk('skeleton card image ramp', has(sk, 'w-[160px] h-[80px]', 'w-[240px] h-[140px]', 'w-[320px] h-[180px]'), '');
chk('skeleton avatar lines exact',
  has(sk, 'l1: "h-[8px] w-[80px]", l2: "h-[6px] w-[60px]"',
       'l1: "h-[10px] w-[120px]", l2: "h-[8px] w-[80px]"',
       'l1: "h-[14px] w-[160px]", l2: "h-[10px] w-[100px]"'), 'no percentage fallback');
chk('skeleton card lines exact',
  has(sk, 'l1: "h-[10px] w-[120px]", l2: "h-[8px] w-[80px]"',
       'l1: "h-[12px] w-[180px]", l2: "h-[10px] w-[120px]"',
       'l1: "h-[16px] w-[240px]", l2: "h-[12px] w-[160px]"'), '');
chk('skeleton fill bg/subtle', has(sk, 'bg-bg-subtle'), '');

// A24 Divider — 1px border/subtle, 16px gap, Body/SM label.
const dv = read('Divider/Divider.tsx');
chk('divider line border/subtle', has(dv, 'bg-border-subtle'), '1px');
chk('divider content gap 16', has(dv, 'gap-[16px]'), '');
chk('divider label Body/SM + text/secondary', has(dv, 'text-body-sm text-text-secondary'), '');
chk('divider fill pad 10/16 on bg/subtle', has(dv, 'bg-bg-subtle px-[16px] py-[10px]'), '');
chk('divider left align drops the leading line', has(dv, 'align !== "left" && <Line'), '');

console.log('\n' + (bad ? `❌ ${bad} mismatch` : '✅ everything matches the Figma extraction'));
