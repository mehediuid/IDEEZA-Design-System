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
// These checks assert on class strings; the notes in each file mention the very
// things they rule out, so comments are stripped before matching.
const stripComments = (t) => t.replace(/^\s*\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
// Components that have moved off Tailwind keep their measurements in a
// stylesheet, so their checks read declarations rather than class strings.
const css = (name) => stripComments(fs.readFileSync(R + `${name}/${name}.css`, 'utf8')).replace(/\s+/g, ' ');
const chk=(name,ok,detail)=>{ if(!ok) bad++; console.log(`${ok?'✅':'❌'} ${name.padEnd(46)} ${detail}`); };

// ── Checkbox (Figma A08 + _Checkbox base)
const cb=read('Checkbox/Checkbox.tsx');
const cbc = css('Checkbox');
chk('checkbox box sm 20 r6', has(cbc,'__input--sm { width: 20px; height: 20px; border-radius: 6px'),'20×20 r6');
chk('checkbox box md 24 r8', has(cbc,'__input--md { width: 24px; height: 24px; border-radius: 8px'),'24×24 r8');
chk('checkbox border 2px',   has(cbc,'border-width: 2px'),'2px');
chk('checkbox glyph sm 16px → 10×8',has(cbc,'__glyph--sm { width: 16px; height: 16px'),'icon/tick-02 in a 24 viewBox');
chk('checkbox glyph md 20px → 12×10',has(cbc,'__glyph--md { width: 20px; height: 20px'),'icon/tick-02 in a 24 viewBox');
chk('checkbox uses library glyphs',has(cb,'import { Check, Minus }'),'no hand-drawn paths');
chk('checkbox row gap 16',   has(cbc,'.ids-checkbox { display: flex; align-items: flex-start; gap: 16px'),'control ↔ text');
chk('checkbox text gap 4',   has(cbc,'__text { display: flex; flex-direction: column; gap: 4px'),'label ↔ support');
chk('checkbox label sm Body/SM',has(cbc,'__label--sm { font-size: var(--font-size-md); line-height: var(--line-height-md)'),'14/20 regular');
chk('checkbox label md Body/MD',has(cbc,'__label--md { font-size: var(--font-size-lg); line-height: var(--line-height-lg)'),'16/24 regular');
chk('checkbox support sm Caption/SM',has(cbc,'__support--sm { font-size: var(--font-size-xs)'),'11/16 regular');
chk('checkbox support md Caption/MD',has(cbc,'__support--md { font-size: var(--font-size-sm)'),'12/16 regular');
chk('checkbox label colour input/label',has(cbc,'__label { cursor: pointer; font-family: var(--font-family-body); color: var(--color-input-label)'),'not text-primary');
chk('checkbox support colour input/helper',has(cbc,'__support { font-family: var(--font-family-body); color: var(--color-input-helper)'),'not text-tertiary');

// ── Radio
const rd=read('Radio/Radio.tsx');
const rdc = css('Radio');
chk('radio 20 / 24 round',   has(rdc,'__input--sm { width: 20px; height: 20px','__input--md { width: 24px; height: 24px','border-radius: var(--radius-full)'),'');
chk('radio dot 8 / 10',      has(rdc,'__dot--sm { width: 8px; height: 8px','__dot--md { width: 10px; height: 10px'),'');
chk('radio border 2px',      has(rdc,'border-width: 2px'),'');
chk('radio keeps white fill',has(rdc,'background-color: var(--color-input-bg)','__input:checked { border-color: var(--color-bg-brand)') && !rdc.includes('__input:checked { background'),'ring + dot, never solid');
chk('radio row gap 16',      has(rdc,'.ids-radio { display: flex; align-items: flex-start; gap: 16px'),'');
chk('radio support sm Caption/SM',has(rdc,'__support--sm { font-size: var(--font-size-xs)'),'11/16 regular');

// ── Textarea
const ta=read('Textarea/Textarea.tsx');
const tac = css('Textarea');
chk('textarea sm 80 r8 pad 10/12/8/12', has(tac,'--sm { min-height: 80px; border-radius: 8px; padding: 8.5px 10.5px 6.5px 10.5px'),'Figma value minus the 1.5px border');
chk('textarea md 104 r12 pad 12/14/8/14',has(tac,'--md { min-height: 104px; border-radius: 12px; padding: 10.5px 12.5px 6.5px 12.5px'),'Figma value minus the 1.5px border');
chk('textarea lg 128 r16 pad 14/16/8/16',has(tac,'--lg { min-height: 128px; border-radius: 16px; padding: 12.5px 14.5px 6.5px 14.5px'),'Figma value minus the 1.5px border');
chk('textarea lg value Body/MD', has(ta,'{ sm: 36, md: 40, lg: 48 }','valueClass[size]'),'sm/md land on Body/SM, lg on Body/MD via the field ramp');
chk('textarea label ramp 36/40/48', has(ta,'{ sm: 36, md: 40, lg: 48 }'),'→ 11/16, 12/16, 14/20');

// ── Select
const se=read('Select/Select.tsx');
chk('select shares the field ramp', has(se,'controlClass[size]') && !se.includes('selectControlClass'),'no private geometry');
chk('select icon ramp shared', has(css('Field'),'--40 svg { width: 16px','--48 svg { width: 20px'),'16/16/16/20/20 — sized by the control');
chk('select value ramp = input', has(se,'valueClass[size]'),'14/20 → 16/24 at 44');

// ── Field shell (Text Input ramp)
const fd = css('Field');
chk('field height ramp',
  has(fd,'--32 { height: 32px','--36 { height: 36px','--40 { height: 40px',
        '--44 { height: 44px','--48 { height: 48px'),'');
chk('field radius ramp', has(fd,
  '--32 { height: 32px; border-radius: 8px','--40 { height: 40px; border-radius: 12px',
  '--48 { height: 48px; border-radius: 16px'),'8/8/12/12/16');
chk('field padX ramp 10/10/12/12/14',
  has(fd,'padding-inline: 8.5px','padding-inline: 10.5px','padding-inline: 12.5px'),
  'Figma value minus the 1.5px border');
chk('field label ramp Label SM/SM/MD/MD/LG', has(fd,
  '__label { font-family: var(--font-family-body); color: var(--color-input-label); font-size: var(--font-size-xs)',
  '--40 .ids-field__label, .ids-field--44 .ids-field__label { font-size: var(--font-size-sm)',
  '--48 .ids-field__label { font-size: var(--font-size-md)'),'11/11/12/12/14 semibold');
chk('field row gap 4/4/4/6/6',
  has(fd,'.ids-field { display: flex; width: 100%; flex-direction: column; gap: 4px',
         '--44, .ids-field--48 { gap: 6px'),'');
chk('field border 1.5 solid', has(fd,'border: 1.5px solid var(--color-input-border)'),'');
chk('field error halo danger',
  has(fd,'[data-invalid="true"]:focus-within { box-shadow: 0 0 0 3px var(--color-focus-halo-danger)'),'');
chk('field colours animate with the halo',
  has(fd,'transition-property: color, background-color, border-color, box-shadow'),
  'the old class said `colors`, which is not a property — the border snapped');

chk('select uses library chevron',has(se,'ChevronDown'),'icon/arrow-down-01-round');
chk('textarea footer row',has(ta,'footerRight='),'helper left, count right');
chk('textarea resizable',has(css('Textarea'),'resize: vertical'),'matches the Figma resize handle');
chk('input select addons',has(read('Input/Input.tsx'),'prefixSelect','suffixSelect','selectAddon'),'Prefix/Suffix/Both Select');

// ── Input (A04 — its own parts; the chrome is Field's)
const inp = css('Input');
chk('input addon pad 8.5/8.5/10.5/10.5/12.5', has(inp,
  '--32, .ids-input__addon--36 { padding-left: 8.5px; padding-right: 8.5px',
  '--40, .ids-input__addon--44 { padding-left: 10.5px; padding-right: 10.5px',
  '--48 { padding-left: 12.5px; padding-right: 12.5px'),
  'Figma value minus the 1.5px border');
chk('input addon inner radius = field − 1.5', has(inp,
  'border-top-left-radius: 6.5px','border-top-left-radius: 10.5px','border-top-left-radius: 14.5px',
  'border-top-right-radius: 6.5px','border-top-right-radius: 10.5px','border-top-right-radius: 14.5px'),
  '6.5/6.5/10.5/10.5/14.5 on the touching corners');
chk('input addon replaces edge padding', has(inp,
  '.ids-input--prefixed { padding-left: 1.5px','.ids-input--suffixed { padding-right: 1.5px'),
  'only the border inset stays');
chk('input select addon gap 4 + value colour', has(inp,
  '__addon--select { gap: 4px; color: var(--color-input-text)'),'');
chk('input icons icon/default', has(inp,
  '.ids-input svg { flex-shrink: 0; color: var(--color-icon-default)'),
  'the old [&_svg]:text-icon produced no rule — this is the fix');

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

// `textStyle` in the tokens package is the single place the four axes are
// joined. Confirm each style this package uses resolves to the size, line
// height, tracking and weight that Figma's style of the same name carries.
const foundations = fs.readFileSync(new URL('../../tokens/src/foundations.ts', import.meta.url).pathname, 'utf8');
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
  const m = foundations.match(new RegExp(`"${name}":\\s*\\{([^}]*)\\}`));
  const got = m
    ? ['size', 'line', 'tracking', 'weight'].map((k) => (m[1].match(new RegExp(`${k}:\\s*"([^"]+)"`)) || [])[1])
    : null;
  chk(`text style ${name}`, got && row.every((v, i) => got[i] === v),
    got ? got.join(' · ') : 'not found in textStyle');
}

// ── A26 Dot · A25 KBD · A27 Code · A30 Delta Chip · A22/A23 Progress ─
const dt = stripComments(read('Dot/Dot.tsx'));
const dtc = css('Dot');
chk('dot ramp 6/8/10/12', has(dtc,
  '--xs { width: 6px; height: 6px', '--sm { width: 8px; height: 8px',
  '--md { width: 10px; height: 10px', '--lg { width: 12px; height: 12px'), '');
chk('dot 2px surface ring', has(dtc,'box-shadow: 0 0 0 2px var(--color-bg-surface)'),
  'Figma ring ellipse is 4px wider');
chk('dot neutral is bg/inverse', has(dtc,'--neutral { background-color: var(--color-bg-inverse)'),
  'flips with the theme');

const kb = css('Kbd');
chk('kbd 22/24/30 pad 6/8/10', has(kb,
  'height: 22px; padding-left: 6px; padding-right: 6px; padding-top: 2px',
  'height: 24px; padding-left: 8px; padding-right: 8px; padding-top: 3px',
  'height: 30px; padding-left: 10px; padding-right: 10px; padding-top: 5px'), '');
chk('kbd raised: surface-raised + border', has(kb,
  'border-color: var(--color-border-default)',
  'background-color: var(--color-bg-surface-raised)',
  'color: var(--color-text-secondary)'), '');
chk('kbd type Code/SM · Code/MD', has(kb,
  'font-size: var(--font-size-sm)','font-size: var(--font-size-md)'), '');

const cd2 = css('Code');
chk('code 22/24/28 pad 6/8/10', has(cd2,
  'height: 22px; padding-left: 6px; padding-right: 6px; padding-top: 2px',
  'height: 24px; padding-left: 8px; padding-right: 8px; padding-top: 3px',
  'height: 28px; padding-left: 10px; padding-right: 10px; padding-top: 4px'), '');
chk('code flat: bg/subtle, no border',
  has(cd2,'background-color: var(--color-bg-subtle)','color: var(--color-text-primary)')
    && !/border(-width|-color)?:/.test(cd2), '');

const dc = css('DeltaChip');
chk('delta sm 20 gap 3 icon 12', has(dc,
  '--sm { height: 20px; gap: 3px; padding-left: 8px; padding-right: 8px; padding-top: 2px',
  '--sm > svg { width: 12px; height: 12px'), '');
chk('delta md 24 gap 4 icon 14', has(dc,
  '--md { height: 24px; gap: 4px; padding-left: 10px; padding-right: 10px; padding-top: 4px',
  '--md > svg { width: 14px; height: 14px'), '');
chk('delta reads the chart/delta ramp', has(dc,
  '--subtle.ids-delta-chip--up { background-color: var(--chart-delta-up-bg); color: var(--chart-delta-up-text)',
  '--filled.ids-delta-chip--down { background-color: var(--chart-delta-down-icon); color: var(--color-text-inverse)',
  '--text.ids-delta-chip--flat { color: var(--chart-delta-flat-text)'),
  'subtle/filled/text x up/down/flat');

const pbar = stripComments(read('ProgressBar/ProgressBar.tsx'));
const pbc = css('ProgressBar');
chk('progress bar track 8 r4', has(pbc,'__track { height: 8px; width: 100%; overflow: hidden; border-radius: 4px; background-color: var(--color-bg-subtle)'), '');
chk('progress bar fill bg/brand r4', has(pbc,'__fill { height: 100%; border-radius: 4px; background-color: var(--color-bg-brand)'), '');
chk('progress bar pill 22 r6 bordered', has(pbc,'__pill { display: inline-flex; height: 22px; align-items: center; border-radius: 6px; border: 1px solid var(--color-border-subtle); background-color: var(--color-bg-surface-raised)'), '');
chk('progress bar right label Caption/MD', has(pbc,'__row { display: flex; align-items: center; gap: 12px','__value { flex-shrink: 0; font-size: var(--font-size-sm)'), '');

const pring = stripComments(read('ProgressRing/ProgressRing.tsx'));
chk('ring sizes 40/56/80/120/160', has(pring,'box: 40','box: 56','box: 80','box: 120','box: 160'), '');
chk('ring strokes 4/6/8/10/14', has(pring,'stroke: 4','stroke: 6','stroke: 8','stroke: 10','stroke: 14'), '');
chk('ring value type ramp', has(css('ProgressRing'),
  '__value--xs { font-size: var(--font-size-2xs)','__value--sm { font-size: var(--font-size-md)',
  '__value--md { font-size: var(--font-size-2xl)','__value--lg { font-size: var(--font-size-3xl)',
  '__value--xl { font-size: var(--font-size-5xl)'), '');
chk('gauge is half the circle', has(pring,'circumference / 2'), 'Figma track spans 180°');
chk('ring starts at 12 o\'clock, gauge at 9', has(pring,'variant === "gauge" ? 180 : -90'), '');

// ── A03 Link · A15 Button Group · A28 Inline CTA · A16b/A16c Avatar ──
const lk = css('Link');
chk('link type ramp + icon 12/14/16', has(lk,
  '--sm > svg { width: 12px','--md > svg { width: 14px','--lg > svg { width: 16px',
  '--sm { font-size: var(--font-size-sm)','--lg { font-size: var(--font-size-lg)'),
  'Figma SM is an unnamed 12/16 — nearest named style used');
chk('link gap 4', has(lk,'gap: 4px'), '');
chk('link hover underlines in every colour',
  has(lk,'.ids-link:hover { text-decoration-line: underline'), '');
chk('link brand/error also shift hue on hover', has(lk,
  '--brand:hover { color: var(--color-text-brand-hover)',
  '--error:hover { color: var(--color-text-error-hover)')
  && !/--(neutral|inverse):hover/.test(lk),
  'neutral and inverse keep theirs');
chk('link colours brand/neutral/inverse/error', has(lk,
  '--neutral { color: var(--color-text-primary)','--inverse { color: var(--color-text-inverse)'), '');

const bgp = stripComments(read('ButtonGroup/ButtonGroup.tsx'));
const bgrp = css('ButtonGroup');
chk('segment ramp 32/36/40/44 pad 10/12/14/16', has(bgrp,
  '--sm { height: 32px; padding-left: 10px','--md { height: 36px; padding-left: 12px',
  '--lg { height: 40px; padding-left: 14px','--xl { height: 44px; padding-left: 16px'), '');
chk('segment type Body XS/SM/MD Medium', has(bgrp,
  '--sm { height: 32px; padding-left: 10px; padding-right: 10px; font-size: var(--font-size-sm)',
  '--md { height: 36px; padding-left: 12px; padding-right: 12px; font-size: var(--font-size-md)',
  '--lg { height: 40px; padding-left: 14px; padding-right: 14px; font-size: var(--font-size-lg)'), '');
chk('segment states surface/subtle/brand', has(bgrp,
  'background-color: var(--color-bg-surface); color: var(--color-text-primary)',
  '__segment:hover { background-color: var(--color-bg-subtle)',
  '[aria-pressed="true"]:hover { background-color: var(--color-bg-brand); color: var(--color-text-on-brand)'), '');
chk('group radius 8 + 1px border',
  has(bgrp,'.ids-button-group { display: inline-flex; overflow: hidden; border-radius: 8px; border: 1px solid var(--color-border-default)'), '');
chk('segment gap 6', has(bgrp,'gap: 6px'), '');

const cta2 = css('InlineCta');
chk('cta gap 6, icon 12/14/16', has(cta2,
  'gap: 6px','--sm > svg { width: 12px','--md > svg { width: 14px','--lg > svg { width: 16px'), '');
chk('cta type Caption/MD then Medium', has(cta2,
  '--sm { font-size: var(--font-size-sm); line-height: var(--line-height-xs)',
  '--md { font-size: var(--font-size-md)','--lg { font-size: var(--font-size-lg)'),
  'the SM jump is Figma\'s');
chk('cta colours brand/neutral only',
  has(cta2,'--brand { color: var(--color-text-brand)','--neutral { color: var(--color-text-primary)')
    && !/--(inverse|error) \{/.test(cta2), '');
chk('cta arrow right/down', has(cta2,
  '--right:hover > svg { transform: translateX(2px)',
  '--down:hover > svg { transform: translateY(2px)'), '');

const agp = stripComments(read('AvatarGroup/AvatarGroup.tsx'));
const agc = css('AvatarGroup');
chk('avatar group overlap -6/-8/-10/-12', has(agc,
  '--xs > :not([hidden]) ~ :not([hidden]) { margin-left: -6px','--sm > :not([hidden]) ~ :not([hidden]) { margin-left: -8px',
  '--md > :not([hidden]) ~ :not([hidden]) { margin-left: -10px','--lg > :not([hidden]) ~ :not([hidden]) { margin-left: -12px'), '');
chk('avatar label group gaps 8/12/14/16', has(agc,
  '.ids-avatar-label--sm { gap: 8px','.ids-avatar-label--md { gap: 12px',
  '.ids-avatar-label--lg { gap: 14px','.ids-avatar-label--xl { gap: 16px'), '');
chk('avatar label type ramp', has(agc,
  '__name--sm { font-size: var(--font-size-md)','__name--md { font-size: var(--font-size-lg)',
  '__sub--sm { font-size: var(--font-size-sm)','__sub--xl { font-size: var(--font-size-xl)'),
  'Body/SM Medium + Caption/MD → Label/XL + Body/LG');
chk('avatar label name/subtitle 2px apart', has(agc,'__text { display: flex; flex-direction: column; gap: 2px'), '');

// ── A07 Search · A12 Number Input · A11 Slider · A13 Color Picker ───
// All four sit on the shared field ramp; the checks below cover what each one
// adds on top, which is where they can drift.
const srch = stripComments(read('Search/Search.tsx'));
chk('search reuses the field ramp', has(srch,'controlChrome','controlClass[size]','valueClass[size]'),
  'same height, radius, padding and gap as Text Input; icons sized by the control');
chk('search has a fixed leading glyph', has(srch,'<SearchIcon'), 'not a free icon slot');
chk('search clear only when filled', has(srch,'hasValue && onClear'), '');
const src2 = css('Search');
chk('search icons icon/default', has(src2,'.ids-search svg { flex-shrink: 0; color: var(--color-icon-default)'),
  'the glyph and the clear button, no control geometry leaking in');
chk('search clear is a quiet round target', has(src2,
  '__clear { flex-shrink: 0; border-radius: var(--radius-full)',
  '__clear:focus-visible { box-shadow: 0 0 0 3px var(--color-focus-halo)'),'');

const sel2 = css('Select');
chk('select chevron icon/default', has(sel2,'.ids-select svg { flex-shrink: 0; color: var(--color-icon-default)'),
  'the old [&_svg]:text-icon-default produced no rule — this is the fix');
chk('select placeholder stays muted', has(sel2,
  ":invalid, .ids-select__select:has(option[value='']:checked) { color: var(--color-input-placeholder)"),'');

const num = stripComments(read('NumberInput/NumberInput.tsx'));
const nic = css('NumberInput');
chk('number input right padding drops to 4', has(nic,'padding-right: 2.5px'), 'Figma pads 0/4/0/12 so the stepper meets the border');
chk('number stepper buttons 32 r6 gap 2', has(nic,
  '__step { display: inline-flex; width: 32px; height: 32px','border-radius: 6px',
  '__steps { display: flex; flex-shrink: 0; align-items: center; gap: 2px'), '');
chk('number both stepper types', has(num,'stepper === "plus-minus"','<ChevronUp','<ChevronDown'), 'Plus-minus and Arrows');
chk('number hides the native spinners', has(nic,'::-webkit-inner-spin-button'), '');
chk('number steps through the DOM input', has(num,'el.stepUp()','el.stepDown()'), 'keeps min/max clamping');
chk('number stepper glyphs stay 16', has(nic,'__step svg, .ids-number-input__arrow svg { width: 16px; height: 16px'),
  "Field's --44/--48 svg rule had grown them to 20 — this outranks it by sheet order");

const sld = stripComments(read('Slider/Slider.tsx'));
const slc = css('Slider');
chk('slider track 4/6/8', has(slc,'__track--sm { height: 4px','__track--md { height: 6px','__track--lg { height: 8px'), '');
chk('slider thumb 12/16/20', has(sld,'thumb: 12','thumb: 16','thumb: 20'), '');
chk('slider hover grows the thumb', has(sld,'hover: 18') && has(slc,':hover::-webkit-slider-thumb { width: var(--thumb-hover)'), 'Figma MD goes 16 -> 18');
chk('slider thumb is surface + 2px brand ring', has(slc,
  '::-webkit-slider-thumb { width: var(--thumb)','background-color: var(--color-bg-surface)','border-color: var(--color-bg-brand)'), '');
chk('slider disabled greys fill and ring', has(slc,
  '__fill--disabled { background-color: var(--color-border-default)',
  ':disabled::-webkit-slider-thumb { border-color: var(--color-border-default)'), '');

const cp = stripComments(read('ColorPicker/ColorPicker.tsx'));
const cpc = css('ColorPicker');
chk('colour swatch 28 at size 40, radius 4', has(cpc,'__swatch--40 { width: 28px; height: 28px','border-radius: 4px'), '');
chk('colour hex in Code/MD', has(cpc,'__hex { min-width: var(--spacing-0); flex: 1 1 0%; background-color: transparent; font-size: var(--font-size-md)'), '');
chk('colour hash is text/tertiary', has(cpc,'__hash { flex-shrink: 0; font-size: var(--font-size-md)','color: var(--color-text-tertiary)'), '');
chk('colour swatch opens the native picker', has(cp,'type="color"'), '');

// ── A14 Multi-select · A19 Tooltip ──────────────────────────────────
const mse = stripComments(read('MultiSelect/MultiSelect.tsx'));
const msc = css('MultiSelect');
chk('multi-select reuses the field ramp', has(mse,'controlChrome','controlClass[size]'), 'icons sized by the control');
chk('multi-select vertical padding drops to 4', has(msc,'.ids-multi-select { padding-top: 2.5px; padding-bottom: 2.5px'), 'Figma pads 4/12 so the chip row centres');
chk('multi-select chips are A18 Tag at SM', has(mse,'<Tag','size="sm"'), 'the real component, not a lookalike');
chk('multi-select chip gap 4', has(msc,'__tags { display: flex; min-width: var(--spacing-0); flex: 1 1 0%; flex-wrap: wrap; align-items: center; gap: 4px'), '');
chk('multi-select is a listbox, not a native select',
  has(mse,'role="combobox"','role="listbox"','aria-multiselectable'), 'a native select cannot show chips');

const tip = stripComments(read('Tooltip/Tooltip.tsx'));
const tipc = css('Tooltip');
chk('tooltip bubble r8 pad 8/12 on bg/inverse',
  has(tipc,'border-radius: 8px; background-color: var(--color-bg-inverse); padding: 8px 12px'), '');
chk('tooltip type Body/XS Medium on text/inverse', has(tipc,
  'font-size: var(--font-size-sm); line-height: var(--line-height-sm)','font-weight: var(--font-weight-medium); color: var(--color-text-inverse)'), '');
chk('tooltip arrow 10x6', has(tip,'width={10} height={6}'), '');
chk('tooltip arrow is optional', has(tip,'arrow = true','arrow &&'), 'Figma splits arrow / no arrow into variants');
chk('tooltip does not need tailwindcss-animate', !tip.includes('animate-in'), 'not a dependency');

// ── Molecules — Feedback: M01 · M05 · M03 · M04 ─────────────────────
const al = css('Alert');
chk('alert sm r8 pad 12/14 gap 10', has(al,
  '--sm { gap: 10px; border-radius: 8px; padding-left: 14px; padding-right: 14px; padding-top: 12px'), '');
chk('alert md r12 pad 16/18 gap 12', has(al,
  '--md { gap: 12px; border-radius: 12px; padding-left: 18px; padding-right: 18px; padding-top: 16px'), '');
chk('alert badge 18/20, glyph 12/14', has(al,
  '__badge { display: inline-flex; flex-shrink: 0; align-items: center; justify-content: center; border-radius: var(--radius-full); width: 20px',
  '__badge > svg { width: 14px; height: 14px',
  '--sm .ids-alert__badge { width: 18px; height: 18px',
  '--sm .ids-alert__badge > svg { width: 12px; height: 12px'), '');
chk('alert badge is a filled circle, glyph white', has(al,
  '__badge > svg { width: 14px; height: 14px; color: var(--color-icon-on-brand)',
  '--info .ids-alert__badge { background-color: var(--color-icon-blue)'),
  'not a tinted glyph on the surface');
chk('alert surfaces are the subtle ramp', has(al,
  '--info { background-color: var(--color-bg-info-subtle); border-color: var(--color-border-blue)',
  '--error { background-color: var(--color-bg-error-subtle); border-color: var(--color-border-error)'), '');
chk('alert title/description stay neutral',
  has(al,'__title { color: var(--color-text-primary)','__description','color: var(--color-text-secondary)')
    && !/--(info|success|warning|error) \.ids-alert__(title|description)/.test(al),
  'only surface, border, badge and action take the colour');
chk('alert type ramp', has(al,
  '__title, .ids-alert__action { font-size: var(--font-size-lg)',
  '--sm .ids-alert__title, .ids-alert--sm .ids-alert__action { font-size: var(--font-size-md)'),
  'title and action share the ramp');

const inm = css('InlineMessage');
chk('inline message gap 4, Caption/MD',
  has(inm,'gap: 4px','font-size: var(--font-size-sm); line-height: var(--line-height-xs)'), '');
chk('inline message glyph 14',
  has(inm,'> svg { width: 14px; height: 14px; flex-shrink: 0'), 'sized from the parent');
chk('inline message severities incl helper', has(inm,
  '--helper { color: var(--color-text-secondary)','--info { color: var(--color-icon-blue)',
  '--success { color: var(--color-text-success)','--warning { color: var(--color-text-warning)',
  '--error { color: var(--color-text-error)'), '');

const bnr = stripComments(read('Banner/Banner.tsx'));
const bnrc = css('Banner');
chk('banner r6 pad 8/8/8/12 gap 6', has(bnrc,
  'gap: 6px; border-radius: 6px; border-width: 1px; padding-top: 8px; padding-bottom: 8px; padding-left: 12px; padding-right: 8px'), '');
chk('banner icon 24, content gap 4, actions gap 6', has(bnrc,
  '__icon { display: inline-flex; width: 24px; height: 24px',
  '__body { display: flex; min-width: 0; flex: 1 1 0%; flex-direction: column; gap: 4px',
  '__actions { display: flex; flex-shrink: 0; align-items: center; gap: 6px'), '');
chk('banner has the Neutral severity',
  has(bnrc,'--neutral { background-color: var(--color-bg-subtle); border-color: var(--color-border-default)'),
  'Alert has no equivalent');

const snk = css('Snackbar');
chk('snackbar r8 pad 6/6/6/8 gap 6', has(snk,
  'gap: 6px; border-radius: 8px; background-color: var(--color-bg-inverse); padding-top: 6px; padding-bottom: 6px; padding-left: 8px; padding-right: 6px'), '');
chk('snackbar surface is inverse in every severity',
  has(snk,'background-color: var(--color-bg-inverse)')
    && !/--(info|success|warning|error) \{/.test(snk),
  'colour lives in the badge and the action only');
chk('snackbar badge 20, glyph 14', has(snk,
  '__icon { display: inline-flex; width: 20px; height: 20px',
  '__icon > svg { width: 14px; height: 14px; color: var(--color-icon-on-brand)'), '');
chk('snackbar message Body/SM Medium on text/inverse', has(snk,
  '__message { min-width: 0; flex: 1 1 0%; font-size: var(--font-size-md)',
  'font-weight: var(--font-weight-medium); color: var(--color-text-inverse)'), '');

// ── M02 Toast · M06 Status Block ────────────────────────────────────
const tst = stripComments(read('Toast/Toast.tsx'));
const tstc = css('Toast');
chk('toast r12 pad 14/14/14/16 gap 12', has(tstc,
  '.ids-toast { width: 100%; border-radius: 12px; border: 1px solid var(--color-border-subtle); background-color: var(--color-bg-surface-raised); padding: 14px; padding-left: 16px',
  '--row { display: flex; align-items: center; gap: 12px'), '');
chk('toast title Body/MD Medium, supporting Body/SM', has(tstc,
  '__title { font-size: var(--font-size-lg)','font-weight: var(--font-weight-medium); color: var(--color-text-primary)',
  '__description { font-size: var(--font-size-md)'), 'content gap 4');
chk('toast icon badges: brand/gray/success/warning/error', has(tstc,
  '--primary { background-color: var(--color-bg-brand)','--gray { background-color: var(--color-icon-secondary)',
  '--success { background-color: var(--color-icon-success)','--warning { background-color: var(--color-icon-warning)',
  '--error { background-color: var(--color-icon-error)'), 'five variants differ only in the badge fill');
chk('toast image 40 r8, avatar 32 round', has(tstc,'__image { display: inline-flex; width: 40px; height: 40px','border-radius: 8px'), '');
chk('toast no-icon keeps the 1px spacer', has(tstc,'__spacer { width: 1px; flex-shrink: 0'), 'text starts in the same place');
chk('toast progress restacks vertically', has(tst,'leading === "progress"') && has(tstc,'--stack { display: flex; flex-direction: column; gap: 12px'), '');

const stb = css('StatusBlock');
chk('status block r6 pad 6/8 gap 6', has(stb,
  'gap: 6px','border-radius: 6px','background-color: var(--color-bg-subtle)',
  'padding-left: 8px; padding-right: 8px; padding-top: 6px; padding-bottom: 6px'), '');
chk('status block surface stays neutral',
  !/--(operational|degraded|outage|maintenance) \{/.test(stb),
  'only the dot carries the status');
chk('status dot 10px, four colours', has(stb,
  '__dot { width: 10px; height: 10px',
  '--operational .ids-status-block__dot { background-color: var(--color-icon-success)',
  '--maintenance .ids-status-block__dot { background-color: var(--color-icon-blue)'),
  'Maintenance is blue — planned, not a fault');
chk('status label Body/SM Medium, detail Caption/MD at 2px', has(stb,
  '__label { font-size: var(--font-size-md); line-height: var(--line-height-md)',
  'font-weight: var(--font-weight-medium); color: var(--color-text-primary)',
  '__text { display: flex; min-width: 0; flex-direction: column; gap: 2px',
  '__detail { font-size: var(--font-size-sm); line-height: var(--line-height-xs)',
  'font-weight: var(--font-weight-regular); color: var(--color-text-secondary)'), '');

// ── Molecules — States: M48-M59 · M50 · M51 ─────────────────────────
const sv = stripComments(read('StateView/StateView.tsx'));
const svc = css('StateView');
chk('state view gap 10 pad 12 centred on bg/surface', has(svc,
  '.ids-state-view { display: flex; width: 100%; flex-direction: column; align-items: center; gap: 10px; background-color: var(--color-bg-surface); padding: 12px; text-align: center'), 'identical in all ten');
chk('state badge 80 round, glyph 40', has(svc,'__badge { display: inline-flex; width: 80px; height: 80px','__glyph { width: 40px; height: 40px'), '');
chk('state text gap 4, H3 over Body/SM', has(svc,
  '__text { display: flex; flex-direction: column; align-items: center; gap: 4px',
  '__title { font-size: var(--font-size-3xl)','__description { font-size: var(--font-size-md)'), '');
chk('state actions gap 6', has(svc,'__actions { display: flex; align-items: center; gap: 6px'), '');
chk('state badge and glyph are set independently',
  has(sv,'`ids-state-view__badge--${badge}`','`ids-state-view__glyph--${glyph}`'), 'Figma does not derive one from the other');
chk('state presets keep Figma pairings',
  has(sv,'"not-found": { icon: AlertCircle, badge: "brand", glyph: "secondary" }',
        'empty: { icon: Inbox, badge: "neutral", glyph: "inherit" }',
        'maintenance: { icon: Wrench01, badge: "info", glyph: "blue" }'),
  'brand badge with a secondary glyph is deliberate');
chk('state presets cover all ten', ['empty','error','success','no-results','permission-denied',
  'no-connection','maintenance','not-found','coming-soon','server-error'].every(k=>sv.includes(k)), '');

const lstc = css('LoadingState');
chk('loading page/inline/compact geometry', has(lstc,
  '--page { flex-direction: column; gap: 16px; padding: 48px',
  '--inline { flex-direction: column; gap: 16px; padding: 32px',
  '--compact { flex-direction: row; gap: 10px; padding: 20px'),
  'compact is the only horizontal one');
chk('loading spinner ramp xl/lg/md',
  has(stripComments(read('LoadingState/LoadingState.tsx')),
      'page: "xl",', 'inline: "lg",', 'compact: "md",'), '');
chk('loading label ramp H4/H6/Body SM Medium', has(lstc,
  '--page .ids-loading-state__label { font-size: var(--font-size-3xl)',
  '--inline .ids-loading-state__label { font-size: var(--font-size-lg)',
  '--compact .ids-loading-state__label { font-size: var(--font-size-md)'), '');
chk('loading description is Body/MD tertiary',
  has(lstc,'__description { font-size: var(--font-size-lg)','color: var(--color-text-tertiary)'),
  'Figma shows it on Page only');

const skl = stripComments(read('SkeletonLayout/SkeletonLayout.tsx'));
const sklc = css('SkeletonLayout');
chk('skeleton layout card 360 r8 pad 20 gap 16', has(sklc,'--card { display: flex; width: 360px; flex-direction: column; gap: 16px; border-radius: 8px; padding: 20px'), '');
chk('skeleton layout list item 480x56 r6 pad 12/16', has(sklc,'--list-item { display: flex; width: 480px; align-items: center; gap: 12px; border-radius: 6px; padding: 12px 16px'), '');
chk('skeleton layout article 640 r8 pad 24 gap 20', has(sklc,'--article { display: flex; width: 640px; flex-direction: column; gap: 20px; border-radius: 8px; padding: 24px'), '');
chk('skeleton layout chart 336, no border', has(sklc,'--chart { display: flex; width: 336px; flex-direction: column; gap: 16px; border-radius: 8px; padding: 20px')
  && has(skl,'frame(false)'), '');
chk('skeleton layout reuses the A21 atom', has(skl,'import { Skeleton }','<Skeleton'), 'only the frame is new');

// ── Molecules — Navigation: M14 · M19 · M20 ─────────────────────────
const tbs = stripComments(read('Tabs/Tabs.tsx'));
const tbc = css('Tabs');
chk('tab fill ramp 36/38/44', has(tbc,'--fill-sm { height: 36px; border-radius: 6px; padding: 8px 12px',
  '--fill-md { height: 38px; border-radius: 8px; padding: 9px 14px','--fill-lg { height: 44px; border-radius: 8px; padding: 10px 16px'), '');
chk('tab line ramp 36/40/48', has(tbc,'--line-sm { height: 36px; padding: 8px 4px','--line-md { height: 40px; padding: 10px 4px',
  '--line-lg { height: 48px; padding: 12px 4px'), 'its own ramp, not Fill\'s');
chk('tab toggle ramp 32/36/44', has(tbc,'--toggle-sm { height: 32px; border-radius: 6px; padding: 6px 12px',
  '--toggle-md { height: 36px; border-radius: 8px; padding: 8px 14px'), '');
chk('tab gap 6 everywhere', has(tbc,'.ids-tab {','gap: 6px'), 'the one thing the three styles share');
// The three active treatments live on the sliding indicator rather than on
// the selected tab, so the paint is checked where it is actually applied. The
// label colour stays on the tab, because text cannot slide.
chk('tab active differs in kind', has(tbc,
  '__indicator--fill { background-color: var(--color-bg-brand)',
  '__indicator--line { background-color: var(--color-border-brand)',
  '__indicator--toggle { background-color: var(--color-bg-surface); border: 1px solid var(--color-border-subtle)',
  '--fill-active { color: var(--color-text-inverse)','--line-active { color: var(--color-text-brand)',
  '--toggle-active { color: var(--color-text-primary)'),
  'fill / underline / lift');
chk('selecting a tab never changes its height', has(tbc,
  '--line-idle, .ids-tab--line-active, .ids-tab--line-disabled { border-color: transparent; border-bottom-width: 2px'),
  'all three Line rows reserve the 2px, active included');
chk('tab indicator slides on the spring', has(tbc,
  '__indicator--travel { transition-property: left, top, width, height; transition-duration: var(--motion-duration-normal); transition-timing-function: var(--motion-easing-spring)'), '');
chk('first placement does not animate', has(tbs,'placed.current ?'),
  'otherwise it flies in from the left edge on mount');
chk('tab label paints above the indicator', has(tbc,'.ids-tab { position: relative'),
  'the indicator is the only positioned sibling');
chk('tab line underline is 2px', has(tbs,'height: 2 }'), 'measured, not assumed');
chk('tabs line-full rule is 1px', has(tbc,'--line-full { height: 40px; gap: var(--spacing-0); border-color: var(--color-border-subtle); border-bottom-width: 1px'), '');
chk('tabs toggle tray r12 pad 4 gap 4', has(tbc,'--toggle { height: 44px; gap: 4px; border-radius: 12px; background-color: var(--color-bg-subtle); padding: 4px'), '');
chk('tab counter 20 tall, radius full, bg/subtle', has(tbc,
  '__counter { display: inline-flex; height: 20px; min-width: 19px; align-items: center; justify-content: center; border-radius: var(--radius-full); background-color: var(--color-bg-subtle)'), '');

const bcr = stripComments(read('Breadcrumb/Breadcrumb.tsx'));
const bcc = css('Breadcrumb');
chk('breadcrumb gap 8', has(bcc,'.ids-breadcrumb { display: flex; align-items: center; gap: 8px'), '');
chk('breadcrumb trail is quiet, last is emphasised', has(bcc,
  '__crumb { font-size: var(--font-size-md)','color: var(--color-text-tertiary)',
  '__current { font-size: var(--font-size-md)'), '');
chk('breadcrumb separator is a literal /', has(bcr,'separator = "/"'), 'not an icon');
chk('breadcrumb marks the current page', has(bcr,'aria-current="page"'), '');

const pgn = stripComments(read('Pagination/Pagination.tsx'));
const pgc = css('Pagination');
chk('pagination cells 32/40 r8', has(pgc,'__cell--sm { width: 32px; height: 32px; border-radius: 8px','__cell--md { width: 40px; height: 40px; border-radius: 8px'), '');
chk('pagination gap 4 / 6', has(pgc,'.ids-pagination--sm { gap: 4px','.ids-pagination--md { gap: 6px'), '');
chk('pagination current on brand-subtle', has(pgc,'__cell--current { background-color: var(--color-bg-brand-subtle); color: var(--color-text-brand)'), 'others transparent');
chk('pagination truncates like Figma', has(pgn,'paginationRange'), '1 2 3 … 8 9 10');

// ── M18 Dropdown Menu row · M16 Sidebar Item ────────────────────────
const nvi = stripComments(read('NavItem/NavItem.tsx'));
const nvc = css('NavItem');
chk('nav item row 40 r6 gap 10 pad 12', has(nvc,
  '.ids-nav-item { display: flex; height: 40px; width: 100%; align-items: center; gap: 10px; border-radius: 6px; padding-left: 12px; padding-right: 12px'), 'shared by M18 and M16');
chk('nav item slots dot/leading/content/trailing', has(nvc,
  '__dot { display: flex; width: 8px; height: 8px','__leading { display: inline-flex; width: 20px; height: 20px',
  '__content { display: flex; min-width: var(--spacing-0); flex: 1 1 0%; flex-direction: column; gap: 2px',
  '__trailing { display: flex; flex-shrink: 0; align-items: center; gap: 8px'), '');
chk('nav item states none/subtle/brand-subtle', has(nvc,
  '--rest:hover { background-color: var(--color-bg-subtle)','--selected { background-color: var(--color-bg-brand-subtle)'), '');
chk('nav item selected shifts the description too', has(nvc,
  '--selected .ids-nav-item__label, .ids-nav-item--selected .ids-nav-item__description { color: var(--color-text-brand)'), 'not just the label');
chk('nav item label Body/SM Medium, description Caption/MD', has(nvc,
  '__label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: var(--font-size-md)',
  '__description { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: var(--font-size-sm)'), '');

const sbi = stripComments(read('SidebarItem/SidebarItem.tsx'));
chk('sidebar item reuses the shared row', has(sbi,'import { NavItem','<NavItem'), 'M16 instances M18 in Figma');
const sbc = css('SidebarItem');
chk('sidebar sub-items 36 r6, stack gap 2', has(sbc,'__sub { display: flex; height: 36px','border-radius: 6px','__list { display: flex; flex-direction: column; gap: 2px'), '');
chk('sidebar sub-item indent 40', has(sbc,'padding-left: 40px;\n  padding-right: 12px'.replace('\n  ',' ')), 'lines the label up past the parent icon');
chk('sidebar sub-item states match the parent', has(sbc,
  '__sub--selected { background-color: var(--color-bg-brand-subtle); color: var(--color-text-brand)',
  '__sub--rest:hover { background-color: var(--color-bg-subtle)','__sub--disabled { pointer-events: none; color: var(--color-text-disabled)'), '');
chk('sidebar chevron rotates when open', has(sbc,'__chevron--open { transform: rotate(180deg)'), '');

const ddm = stripComments(read('DropdownMenu/DropdownMenu.tsx'));
chk('dropdown row is the shared NavItem', has(ddm,'<NavItem ref={ref} role="menuitem"'), 'M18 is the row, not the panel');
chk('dropdown panel matches the overlay chrome', has(css('DropdownMenu'),
  'border-radius: 12px; border: 1px solid var(--color-border-default); background-color: var(--color-bg-surface); padding: 4px; box-shadow: var(--elevation-3)'), 'same as the MultiSelect list');

// ── Motion ──────────────────────────────────────────────────────────
// Figma carries 7,199 prototype reactions and 7,194 of them are the same
// spec: SMART_ANIMATE, EASE_OUT, 120ms. EASE_OUT is the decelerate curve, and
// 120 sits between fast and normal, so it is its own token rather than a
// rounding. These checks keep interactions on that spec.
const tokensCss = fs.readFileSync(new URL('../../tokens/css/tokens.css', import.meta.url).pathname, 'utf8');
chk('motion scale carries the 120ms interaction step',
  /--motion-duration-interaction:\s*120ms/.test(tokensCss), 'the value 7,194 reactions use');

// The motion recipes live in the stylesheets now, as ordinary declarations —
// these checks read the rules the way a browser would.
// An interaction must not animate on the standard curve — Figma says ease-out.
const allSheets = readdirSync(R, { withFileTypes: true })
  .filter((e) => e.isDirectory() && fs.existsSync(`${R}${e.name}/${e.name}.css`))
  .map((e) => [e.name, css(e.name)]);
const wrongEasing = allSheets.filter(([, t]) =>
  /transition-duration: var\(--motion-duration-interaction\); transition-timing-function: var\(--motion-easing-standard\)/.test(t));
chk('interactions use ease-decelerate', wrongEasing.length === 0,
  wrongEasing.length ? wrongEasing.map(([n]) => n).join(', ') : 'EASE_OUT, not the standard curve');

// Every transition must name a motion token; a raw millisecond duration is
// how a scale stops being one. The slider thumb's stock 150ms is the argued
// exception — the old build never overrode it (see Slider.css).
const rawDuration = allSheets.filter(([n, t]) => n !== 'Slider' && /transition-duration: \d/.test(t));
chk('no arbitrary durations', rawDuration.length === 0,
  rawDuration.length ? rawDuration.map(([n]) => n).join(', ') : 'every duration is a token');

const bareTransition = allSheets.filter(([n, t]) =>
  n !== 'Slider' && /transition-property:/.test(t) && !/transition-duration: var\(--motion-duration-/.test(t));
chk('every transition carries a duration token', bareTransition.length === 0,
  bareTransition.length ? bareTransition.map(([n]) => n).join(', ') : '');

// Anything with a hover or focus treatment should animate it. The treatments
// live in the stylesheets now, so that is what is scanned.
const sheets = readdirSync(R, { withFileTypes: true })
  .filter((e) => e.isDirectory() && fs.existsSync(`${R}${e.name}/${e.name}.css`))
  .map((e) => [e.name, css(e.name)]);
// `:has(option:checked)` is a colour rule, not a state treatment — drop
// :has() clauses before looking for interaction pseudos.
const unanimated = sheets.filter(([, t]) => {
  const bare = t.replace(/:has\([^)]*\)/g, '');
  return /:hover|:focus-visible|\[aria-pressed|:checked|\[data-state=/.test(bare) && !/transition-property/.test(bare);
});
chk('interactive components all animate', unanimated.length === 0,
  unanimated.length ? unanimated.map(([n]) => n).join(', ') : `${sheets.length} stylesheets checked`);

const resetCss = fs.readFileSync(new URL('../../tokens/css/reset.css', import.meta.url).pathname, 'utf8');
chk('reduced motion is honoured',
  /prefers-reduced-motion:\s*reduce/.test(resetCss) && /transition-duration:[^;]*!important/.test(resetCss),
  'motion can trigger nausea and migraine — the OS request is explicit');

// ── Motion recipes ──────────────────────────────────────────────────
// A colour cross-fade alone reads as inert, so pressables also move. This
// part is not in Figma — the file specifies the cross-fade and nothing else.
// The recipes are declarations now; lib/motion.ts retired when its last
// consumer moved, the same way motionLift and motionSwell did earlier.
chk('press is instant down, eased up', has(css('NavItem'),
  ':active { transition-duration: var(--motion-duration-instant); transform: scale(0.97)'),
  'lag between finger and pixel reads as slow');
chk('spring is reserved for travel',
  has(css('Toggle'),'transition-property: left; transition-duration: var(--motion-duration-normal); transition-timing-function: var(--motion-easing-spring)')
    && has(css('Tabs'),'transition-property: left, top, width, height; transition-duration: var(--motion-duration-normal); transition-timing-function: var(--motion-easing-spring)')
    && !allSheets.some(([, t]) => /transition-property: (color|[^;]*background)[^;]*;[^}]*easing-spring/.test(t)),
  'wrong for colour, which cannot overshoot');

// Button and IconButton have moved to their own CSS; the rest still carry the
// recipe as classes.
const pressSheets = ['Tabs','NavItem','Pagination'];
const notPressing = pressSheets.filter((c) => !css(c).includes(':active { transition-duration: var(--motion-duration-instant); transform: scale(0.97)'));
chk('everything clickable presses', notPressing.length === 0,
  notPressing.length ? notPressing.join(', ') : `${pressSheets.length} components`);

// One rule, applied twice: a hierarchy lifts if and only if it is raised.
// The shadow is what makes it raised, so the shadow is what the check reads —
// not a hand-kept list that can drift from the variants it describes.
const btn = css('Button');
chk('button presses: instant down, eased up', has(btn,
  ':active { transition-duration: var(--motion-duration-instant); transform: scale(0.97)'),
  'lag between finger and pixel reads as slow');
chk('button raised lifts, flat swells', has(btn,
  '--raised:hover { transform: translateY(-1px); box-shadow: var(--elevation-2)',
  '--raised:active { transform: translateY(0) scale(0.97)',
  '--flat:hover { transform: scale(1.02)'),
  'a flat control that lifts looks detached');
chk('button raised set = the three with depth',
  ['primary','danger','ai'].every((v) => has(btn, `--${v} { background`) && has(btn, 'box-shadow: var(--shadow-depth-accent)'))
    && has(read('Button/Button.tsx'), 'RAISED: readonly ButtonVariant[] = ["primary", "danger", "ai"]'),
  'the CSS split and the component list have to agree');

const ib = css('IconButton');
chk('icon button presses, raised lifts, flat swells', has(ib,
  ':active { transition-duration: var(--motion-duration-instant); transform: scale(0.97)',
  '--raised:hover { transform: translateY(-1px); box-shadow: var(--elevation-2)',
  '--flat:hover { transform: scale(1.02)'), '');
chk('icon button raised = primary and danger',
  has(read('IconButton/IconButton.tsx'), 'RAISED: readonly IconButtonVariant[] = ["primary", "danger"]')
    && has(ib,'--primary { background','--danger { background'), 'the two that carry depth');

for (const file of []) {
  const src = stripComments(read(file));
  const rows = [...src.matchAll(/^\s{8}(\w+): \[\n([\s\S]*?)^\s{8}\],/gm)]
    .map(([, name, body]) => ({ name, raised: body.includes('shadow-depth-accent'),
                                lift: body.includes('motionLift'), swell: body.includes('motionSwell') }));
  const wrong = rows.filter((r) => r.lift !== r.raised || r.swell === r.raised);
  chk(`${file.split('/')[0]}: raised lifts, flat swells`, rows.length > 0 && wrong.length === 0,
    wrong.length ? wrong.map((r) => r.name).join(', ')
      : rows.filter((r) => r.raised).map((r) => r.name).join('/') + ' lift · '
        + rows.filter((r) => !r.raised).map((r) => r.name).join('/') + ' swell');
}
chk('swell is smaller than the press',
  has(css('Button'),'--flat:hover { transform: scale(1.02)') && has(css('Button'),':active { transition-duration: var(--motion-duration-instant); transform: scale(0.97)'),
  'hover grows a little, press shrinks more — the press must still read as a press');

chk('toggle thumb travels on the spring', has(css('Toggle'),
  'transition-property: left; transition-duration: var(--motion-duration-normal); transition-timing-function: var(--motion-easing-spring)'), '');
chk('a static Tag does not press',
  has(css('Tag'),'--interactive:active { transition-duration: var(--motion-duration-instant); transform: scale(0.97)')
    && !/\.ids-tag:active/.test(css('Tag')),
  'only a selectable chip reacts to :active');
chk('button group segments press', has(css('ButtonGroup'),
  '__segment:active { transition-duration: var(--motion-duration-instant); transform: scale(0.97)'), '');

// ── Reset: UA metrics must not leak into control geometry ───────────
// Storybook and consumers load this reset instead of Tailwind Preflight, so
// anything Preflight normalises has to be here too. The radio's UA margin
// (Chrome: 3px 3px 0 5px) sized the wrapper to the input's margin box, which
// pushed the centred dot off the ring.
const reset = fs.readFileSync(new URL('../../tokens/css/reset.css', import.meta.url).pathname, 'utf8');
const formBlock = /input,\s*\n\s*button,\s*\n\s*textarea,\s*\n\s*select\s*\{([^}]*)\}/.exec(reset);
chk('reset zeroes form-control margins', Boolean(formBlock) && /margin:\s*0/.test(formBlock[1]),
  'UA margin on radio/checkbox otherwise offsets the dot');
chk('reset sets border-box', /box-sizing:\s*border-box/.test(reset), '');
chk('radio wrapper is control-sized', has(rdc, '__box { position: relative; display: inline-flex; flex-shrink: 0','__box--sm { width: 20px; height: 20px'),
  'so the dot centres on the ring, not on the input margin box');
chk('checkbox wrapper is control-sized', has(cbc, '__box { position: relative; display: inline-flex; flex-shrink: 0','__box--sm { width: 20px; height: 20px'), '');

// ── A17 Badge ───────────────────────────────────────────────────────
const bg2 = stripComments(read('Badge/Badge.tsx'));
const bgc = css('Badge');
chk('badge sizes 20/24/24 pad 6/8/10', has(bgc,
  '--sm { height: 20px; gap: 4px; padding-left: 6px; padding-right: 6px',
  '--md { height: 24px; gap: 4px; padding-left: 8px; padding-right: 8px',
  '--lg { height: 24px; gap: 6px; padding-left: 10px; padding-right: 10px'), '');
chk('badge type Caption/SM · Caption/MD · Label/SM', has(bgc,
  '--sm { height: 20px; gap: 4px; padding-left: 6px; padding-right: 6px; font-size: var(--font-size-xs)')
  && /--md \{[^}]*font-weight: var\(--font-weight-regular\)/.test(bgc)
  && /--lg \{[^}]*font-weight: var\(--font-weight-semibold\)/.test(bgc),
  'Caption is regular — a Label ramp renders every badge semibold');
chk('badge leading icon 12 at every size',
  has(bgc, '__icon > svg { width: 12px; height: 12px; flex-shrink: 0'), '');
chk('badge close 12 at SM, 16 at MD/LG', has(bgc,
  '__dismiss > svg { width: 16px; height: 16px',
  '--sm .ids-badge__dismiss > svg { width: 12px; height: 12px'), '');
chk('badge dot 6/6/8 and follows the label', has(bgc,
  '__dot { flex-shrink: 0; border-radius: var(--radius-full); background-color: currentColor; width: 6px',
  '--lg .ids-badge__dot { width: 8px; height: 8px'), 'Figma fills it with badge/*-text');
chk('badge subtle reads badge/* tokens', has(bgc,
  '--subtle.ids-badge--brand { background-color: var(--color-badge-brand-bg); color: var(--color-badge-brand-text)',
  '--subtle.ids-badge--error { background-color: var(--color-badge-error-bg); color: var(--color-badge-error-text)'),
  'not bg/*-subtle + text/*');
chk('badge solid non-brand label is text/inverse', has(bgc,
  '--solid.ids-badge--blue { background-color: var(--color-bg-blue); color: var(--color-text-inverse)',
  '--solid.ids-badge--success { background-color: var(--color-bg-success); color: var(--color-text-inverse)'),
  'not text/on-brand');
chk('badge outline borders are semantic', has(bgc,
  '--outline.ids-badge--blue { border-color: var(--color-border-blue)',
  '--outline.ids-badge--success { border-color: var(--color-border-success)',
  '--outline.ids-badge--warning { border-color: var(--color-border-warning)')
  && !/border-color: var\(--(?!color-)/.test(bgc), 'no raw primitive borders');

// ── _Radio base state colours ───────────────────────────────────────
chk('radio dot follows the ring on hover', has(rdc, '__input:checked:hover ~ .ids-radio__dot { background-color: var(--color-bg-brand-hover)'), '');
chk('radio dot disabled is input/bg-disabled', has(rdc, '__input:disabled ~ .ids-radio__dot { background-color: var(--color-input-bg-disabled)'), 'not text/disabled');
chk('checkbox indeterminate hover', has(cbc, '__input:indeterminate:hover { background-color: var(--color-bg-brand-hover)'), '');
chk('checkbox glyph disabled is icon/disabled', has(cbc, '__input:disabled ~ .ids-checkbox__glyph { color: var(--color-icon-disabled)'), 'Figma strokes it icon/disabled');

// ── A10 Toggle / _Toggle base ───────────────────────────────────────
const tg2 = stripComments(read('Toggle/Toggle.tsx'));
const tgc2 = css('Toggle');
chk('toggle track sm 36x20 / md 44x24', has(tgc2, '--sm { height: 20px; width: 36px', '--md { height: 24px; width: 44px'), '');
chk('toggle thumb 16 / 20, inset 2', has(tgc2, '__thumb--sm { width: 16px; height: 16px', '__thumb--md { width: 20px; height: 20px', 'top: 2px', 'left: 2px'), '');
chk('toggle on position 18 / 22', has(tgc2, '__thumb--sm[data-state="checked"] { left: 18px', '__thumb--md[data-state="checked"] { left: 22px'), 'Figma thumb x when Pressed=On');
chk('toggle moves with left, not translate',
  has(tgc2, 'transition-property: left') && !tgc2.includes('translate'),
  'translate shared --tw-translate-x and could be pinned by any other transform');
chk('toggle off fill input/border', has(tgc2, 'background-color: var(--color-input-border)', ':hover { background-color: var(--color-input-border-hover)'), 'not bg/surface-raised');
chk('toggle on fill bg/brand + hover', has(tgc2, '[data-state="checked"] { background-color: var(--color-bg-brand)', '[data-state="checked"]:hover { background-color: var(--color-bg-brand-hover)'), '');
chk('toggle disabled swaps fill, not opacity',
  has(tgc2, ':disabled { cursor: not-allowed; background-color: var(--color-input-bg-disabled) !important') && !tgc2.includes(':disabled { opacity'), 'Figma: input/bg-disabled');
chk('toggle track has no border',
  !/\.ids-toggle[^_{]*\{[^}]*border:/.test(tgc2),
  'Figma track carries no stroke');
chk('toggle thumb fill bg/surface', has(tgc2, '__thumb { pointer-events: none; position: absolute; top: 2px; display: block; border-radius: var(--radius-full); background-color: var(--color-bg-surface)'), 'not raw white');

// cn() and tailwind-merge are gone with the utility layer — component
// classes do not collide, so there is nothing to merge and nothing to guard.

// ── Display atoms ───────────────────────────────────────────────────
// Values read out of Atoms — Display with the plugin API, same as above.

// A16 Avatar — 6 sizes, and initials step through named styles rather than
// raw sizes. The contrast border is 1px up to XS and 2px from SM.
const av = read('Avatar/Avatar.tsx');
const avc = css('Avatar');
chk('avatar size ramp 20/24/32/40/48/64', has(avc,
  '--2xs { width: 20px; height: 20px','--xs { width: 24px; height: 24px','--sm { width: 32px; height: 32px',
  '--md { width: 40px; height: 40px','--lg { width: 48px; height: 48px','--xl { width: 64px; height: 64px'), '2XS→XL');
chk('avatar initials type ramp', has(avc,
  '--2xs { width: 20px; height: 20px; font-size: var(--font-size-2xs)',
  '--sm { width: 32px; height: 32px; font-size: var(--font-size-md)',
  '--xl { width: 64px; height: 64px; font-size: var(--font-size-3xl)'),
  'Overline/SM → Label/SM → Label/LG → H6 → H5 → H3');
chk('avatar contrast border 1px → 2px', has(avc,
  '--2xs, .ids-avatar--xs { box-shadow: inset 0 0 0 1px var(--color-bg-surface)',
  '--xl { box-shadow: inset 0 0 0 2px var(--color-bg-surface)'), '1px at 20/24, 2px from 32');
chk('avatar icon frame 12/14/18/22/26/36', has(avc,
  '__icon--2xs { width: 12px','__icon--xs { width: 14px','__icon--sm { width: 18px',
  '__icon--md { width: 22px','__icon--lg { width: 26px','__icon--xl { width: 36px'),
  'measured per size — not one percentage');
chk('avatar status dot ramp 6/7/9/11/13/16', has(avc,
  '__status--2xs { width: 6px','__status--xs { width: 7px','__status--sm { width: 9px',
  '__status--md { width: 11px','__status--lg { width: 13px','__status--xl { width: 16px'), '');
chk('avatar status dot inset 0 → 1px at LG/XL', has(avc,
  '__status--md { width: 11px; height: 11px; right: var(--spacing-0); bottom: var(--spacing-0)',
  '__status--lg { width: 13px; height: 13px; right: 1px; bottom: 1px'), '');
chk('avatar status dot is ring + 2/3 core', has(avc,
  '__status { position: absolute; display: inline-flex; align-items: center; justify-content: center; border-radius: var(--radius-full); background-color: var(--color-bg-surface)',
  '__status-core { width: 66.666667%; height: 66.666667%'), '_Status dot: 12px ring, 8px dot');
chk('avatar status set = online/offline/verified', has(avc,
  '__status-core--online { background-color: var(--color-icon-success)',
  '__status-core--offline { background-color: var(--color-icon-disabled)',
  '__status-core--verified { background-color: var(--color-icon-blue)')
    && !avc.includes('--busy') && !avc.includes('--away'),
  'Figma has no busy or away');
chk('avatar initials fill', has(avc, '--initials { background-color: var(--color-bg-brand-subtle); color: var(--color-text-brand)'), 'bg/brand-subtle + text/brand');
chk('avatar icon fill', has(avc, '--icon { background-color: var(--color-bg-surface-raised)'), 'bg/surface-raised');
chk('avatar hover wash 8%', has(avc, '--interactive:hover::after { opacity: 0.08'), 'text/primary at 8%');
chk('avatar disabled 50%', has(avc, '--disabled { pointer-events: none; opacity: 0.5'), '');

// A18 Tag — border in every state; Badge is the coloured one, Tag is neutral.
const tg = read('Tag/Tag.tsx');
const tgc = css('Tag');
chk('tag sm 24 pad 8 gap 4 Caption/SM',
  has(tgc, '--sm { height: 24px; gap: 4px; padding-left: 8px; padding-right: 8px; font-size: var(--font-size-xs)'), '');
chk('tag md 28 pad 10 gap 6 Caption/MD',
  has(tgc, '--md { height: 28px; gap: 6px; padding-left: 10px; padding-right: 10px; font-size: var(--font-size-sm)'), '');
chk('tag lg 32 pad 12 gap 6 Label/SM',
  has(tgc, '--lg { height: 32px; gap: 6px; padding-left: 12px; padding-right: 12px; font-size: var(--font-size-xs)'), '');
chk('tag default surface-raised + border', has(tgc,
  '--unselected { background-color: var(--color-bg-surface-raised); border-color: var(--color-border-default); color: var(--color-text-primary)'), '');
chk('tag hover subtle + strong border', has(tgc,
  '--interactive.ids-tag--unselected:hover { background-color: var(--color-bg-subtle); border-color: var(--color-border-strong)'), '');
chk('tag selected brand', has(tgc,
  '--selected { background-color: var(--color-bg-brand-subtle); border-color: var(--color-border-brand); color: var(--color-text-brand)'), '');
chk('tag leading icon 16 at every size',
  has(tgc, '__icon > svg { width: 16px; height: 16px') && !/--(sm|lg) \.ids-tag__icon/.test(tgc),
  'does not shrink at SM');
chk('tag close icon 12 at SM, 16 at MD/LG', has(tgc,
  '__dismiss > svg { width: 16px; height: 16px','--sm .ids-tag__dismiss > svg { width: 12px; height: 12px'), '');
chk('tag leading dot 6/7/8', has(tgc,
  '__dot { flex-shrink: 0; border-radius: var(--radius-full); background-color: var(--color-text-primary); width: 7px',
  '--sm .ids-tag__dot { width: 6px','--lg .ids-tag__dot { width: 8px'), '');
chk('tag avatar sizes 12/16/18 exported', has(tg, 'tagAvatarSize = { sm: 12, md: 16, lg: 18 }'), '');

// A20 Spinner — the Figma arc is 0.87→4.01 rad, exactly half the circle.
const spn = read('Spinner/Spinner.tsx');
const spnc = css('Spinner');
chk('spinner size ramp 16/20/24/32', has(spnc,
  '--sm { width: 16px; height: 16px','--md { width: 20px; height: 20px',
  '--lg { width: 24px; height: 24px','--xl { width: 32px; height: 32px'), '');
chk('spinner metrics box/stroke/dot',
  has(spn, 'sm: { box: 16, stroke: 2, dot: 2.5 }', 'md: { box: 20, stroke: 2, dot: 3 }',
       'lg: { box: 24, stroke: 2.5, dot: 3.5 }', 'xl: { box: 32, stroke: 3, dot: 4.5 }'), '');
chk('spinner arc is half the circle', has(spn, 'const half = Math.PI * r'), '0.87→4.01 rad = 180°');
chk('spinner arc has ROUND caps', has(spn, 'strokeLinecap="round"'), 'a CSS border ends square — Figma strokeCap ROUND');
chk('spinner arc start 0.87 rad', has(spn, 'const START_DEG = (0.87 * 180) / Math.PI - 90'), '');
chk('spinner ring track border/subtle', has(spn, 'var(--color-border-subtle)'), '');
chk('spinner colours read icon/*', has(spnc,
  '--brand { color: var(--color-icon-brand)','--neutral { color: var(--color-icon-secondary)',
  '--inverse { color: var(--color-icon-on-brand)','--error { color: var(--color-icon-error)'),
  'not text/*');
chk('spinner dots = 12', has(spn, 'const DOTS = 12'), 'Figma bakes 12 nodes with a fade');

// A21 Skeleton — geometry is the Figma default, overridable via className.
const skc = css('Skeleton');
chk('skeleton rectangle ramp', has(skc,
  '--rectangle.ids-skeleton--sm { width: 120px; height: 60px','--rectangle.ids-skeleton--md { width: 200px; height: 100px',
  '--rectangle.ids-skeleton--lg { width: 320px; height: 160px'), 'SM/MD/LG');
chk('skeleton line ramp', has(skc,
  '--line.ids-skeleton--sm { width: 80px; height: 8px','--line.ids-skeleton--md { width: 160px; height: 12px',
  '--line.ids-skeleton--lg { width: 240px; height: 16px'), '');
chk('skeleton circle ramp 24/32/48', has(skc,
  '--circle.ids-skeleton--sm { width: 24px','--circle.ids-skeleton--md { width: 32px','--circle.ids-skeleton--lg { width: 48px'), '');
chk('skeleton card image ramp', has(skc,
  '--card-sm .ids-skeleton__piece--img { width: 160px; height: 80px',
  '--card-md .ids-skeleton__piece--img { width: 240px; height: 140px',
  '--card-lg .ids-skeleton__piece--img { width: 320px; height: 180px'), '');
chk('skeleton avatar lines exact', has(skc,
  '--avatar-sm .ids-skeleton__piece--l1 { height: 8px; width: 80px','--avatar-sm .ids-skeleton__piece--l2 { height: 6px; width: 60px',
  '--avatar-md .ids-skeleton__piece--l1 { height: 10px; width: 120px',
  '--avatar-lg .ids-skeleton__piece--l1 { height: 14px; width: 160px'), 'no percentage fallback');
chk('skeleton card lines exact', has(skc,
  '--card-sm .ids-skeleton__piece--l1 { height: 10px; width: 120px',
  '--card-md .ids-skeleton__piece--l1 { height: 12px; width: 180px',
  '--card-lg .ids-skeleton__piece--l1 { height: 16px; width: 240px'), '');
chk('skeleton fill bg/subtle', has(skc, '.ids-skeleton { background-color: var(--color-bg-subtle)'), '');

// A24 Divider — 1px border/subtle, 16px gap, Body/SM label.
const dv = read('Divider/Divider.tsx');
const dvc = css('Divider');
chk('divider line border/subtle',
  has(dvc,'.ids-divider { flex-shrink: 0; background-color: var(--color-border-subtle); height: 1px'),
  '1px');
chk('divider content gap 16', has(dvc,'--labelled { display: flex; align-items: center; gap: 16px'), '');
chk('divider label Body/SM + text/secondary', has(dvc,
  'font-size: var(--font-size-md); line-height: var(--line-height-md)',
  'color: var(--color-text-secondary)'), '');
chk('divider fill pad 10/16 on bg/subtle', has(dvc,
  'background-color: var(--color-bg-subtle); padding-left: 16px; padding-right: 16px; padding-top: 10px'), '');
chk('divider left align drops the leading line', has(dv, 'align !== "left" && <Line'), '');

console.log('\n' + (bad ? `❌ ${bad} mismatch` : '✅ everything matches the Figma extraction'));
// This exited 0 no matter what for as long as it has existed, so a failing
// check printed a ❌ and the build carried on. A check that cannot fail the
// build is decoration.
process.exit(bad ? 1 : 0);
