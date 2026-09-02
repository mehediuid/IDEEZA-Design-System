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
const motionLib = stripComments(fs.readFileSync(new URL('../src/lib/motion.ts', import.meta.url).pathname, 'utf8'));
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
chk('progress bar track 8 r4', has(pbar,'h-[8px] w-full overflow-hidden rounded-[4px] bg-bg-subtle'), '');
chk('progress bar fill bg/brand r4', has(pbar,'rounded-[4px] bg-bg-brand'), '');
chk('progress bar pill 22 r6 bordered', has(pbar,'h-[22px] items-center rounded-[6px] border border-border-subtle bg-bg-surface-raised'), '');
chk('progress bar right label Caption/MD', has(pbar,'gap-[12px]','text-caption-md text-text-primary'), '');

const pring = stripComments(read('ProgressRing/ProgressRing.tsx'));
chk('ring sizes 40/56/80/120/160', has(pring,'box: 40','box: 56','box: 80','box: 120','box: 160'), '');
chk('ring strokes 4/6/8/10/14', has(pring,'stroke: 4','stroke: 6','stroke: 8','stroke: 10','stroke: 14'), '');
chk('ring value type ramp', has(pring,'text-overline-sm','text-label-lg','text-heading-h4','text-heading-h3','text-heading-h1'), '');
chk('gauge is half the circle', has(pring,'circumference / 2'), 'Figma track spans 180°');
chk('ring starts at 12 o\'clock, gauge at 9', has(pring,'variant === "gauge" ? 180 : -90'), '');

// ── A03 Link · A15 Button Group · A28 Inline CTA · A16b/A16c Avatar ──
const lk = stripComments(read('Link/Link.tsx'));
chk('link type ramp + icon 12/14/16',
  has(lk,'text-body-xs-medium [&>svg]:size-[12px]','text-body-sm-medium [&>svg]:size-[14px]',
        'text-body-md-medium [&>svg]:size-[16px]'), 'Figma SM is an unnamed 12/16 — nearest named style used');
chk('link gap 4', has(lk,'gap-[4px]'), '');
chk('link hover underlines in every colour', has(lk,'hover:underline'), '');
chk('link brand/error also shift hue on hover',
  has(lk,'text-text-brand hover:text-text-brand-hover','text-text-error hover:text-text-error-hover'),
  'neutral and inverse keep theirs');
chk('link colours brand/neutral/inverse/error',
  has(lk,'neutral: "text-text-primary"','inverse: "text-text-inverse"'), '');

const bgp = stripComments(read('ButtonGroup/ButtonGroup.tsx'));
chk('segment ramp 32/36/40/44 pad 10/12/14/16',
  has(bgp,'h-[32px] px-[10px]','h-[36px] px-[12px]','h-[40px] px-[14px]','h-[44px] px-[16px]'), '');
chk('segment type Body XS/SM/MD Medium',
  has(bgp,'text-body-xs-medium','text-body-sm-medium','text-body-md-medium'), '');
chk('segment states surface/subtle/brand',
  has(bgp,'bg-bg-surface text-text-primary','hover:bg-bg-subtle',
        'aria-pressed:bg-bg-brand aria-pressed:text-text-on-brand'), '');
chk('group radius 8 + 1px border', has(bgp,'rounded-[8px] border border-border'), '');
chk('segment gap 6', has(bgp,'gap-[6px]'), '');

const cta2 = stripComments(read('InlineCta/InlineCta.tsx'));
chk('cta gap 6, icon 12/14/16',
  has(cta2,'gap-[6px]','[&>svg]:size-[12px]','[&>svg]:size-[14px]','[&>svg]:size-[16px]'), '');
chk('cta type Caption/MD then Medium',
  has(cta2,'sm: "text-caption-md','md: "text-body-sm-medium','lg: "text-body-md-medium'),
  'the SM jump is Figma\'s');
chk('cta colours brand/neutral only', has(cta2,'brand: "text-text-brand"','neutral: "text-text-primary"'), '');
chk('cta arrow right/down', has(cta2,'right: "hover:[&>svg]:translate-x-[2px]"','down: "hover:[&>svg]:translate-y-[2px]"'), '');

const agp = stripComments(read('AvatarGroup/AvatarGroup.tsx'));
chk('avatar group overlap -6/-8/-10/-12',
  has(agp,'-space-x-[6px]','-space-x-[8px]','-space-x-[10px]','-space-x-[12px]'), '');
chk('avatar label group gaps 8/12/14/16',
  has(agp,'gap-[8px]','gap-[12px]','gap-[14px]','gap-[16px]'), '');
chk('avatar label type ramp',
  has(agp,'name: "text-body-sm-medium", sub: "text-caption-md"','name: "text-body-md-medium", sub: "text-body-sm"',
        'name: "text-label-lg", sub: "text-body-md"','name: "text-label-xl", sub: "text-body-lg"'), '');
chk('avatar label name/subtitle 2px apart', has(agp,'gap-[2px]'), '');

// ── A07 Search · A12 Number Input · A11 Slider · A13 Color Picker ───
// All four sit on the shared field ramp; the checks below cover what each one
// adds on top, which is where they can drift.
const srch = stripComments(read('Search/Search.tsx'));
chk('search reuses the field ramp', has(srch,'controlChrome','controlClass[size]','valueClass[size]','iconClass[size]'),
  'same height, radius, padding and gap as Text Input');
chk('search has a fixed leading glyph', has(srch,'<SearchIcon'), 'not a free icon slot');
chk('search clear only when filled', has(srch,'hasValue && onClear'), '');

const num = stripComments(read('NumberInput/NumberInput.tsx'));
chk('number input right padding drops to 4', has(num,'!pr-[2.5px]'), 'Figma pads 0/4/0/12 so the stepper meets the border');
chk('number stepper buttons 32 r6 gap 2', has(num,'size-[32px]','rounded-[6px]','gap-[2px]'), '');
chk('number both stepper types', has(num,'stepper === "plus-minus"','<ChevronUp','<ChevronDown'), 'Plus-minus and Arrows');
chk('number hides the native spinners', has(num,'[&::-webkit-inner-spin-button]:appearance-none'), '');
chk('number steps through the DOM input', has(num,'el.stepUp()','el.stepDown()'), 'keeps min/max clamping');

const sld = stripComments(read('Slider/Slider.tsx'));
chk('slider track 4/6/8', has(sld,'track: "h-[4px]"','track: "h-[6px]"','track: "h-[8px]"'), '');
chk('slider thumb 12/16/20', has(sld,'thumb: 12','thumb: 16','thumb: 20'), '');
chk('slider hover grows the thumb', has(sld,'hover: 18'), 'Figma MD goes 16 -> 18');
chk('slider thumb is surface + 2px brand ring',
  has(sld,'[&::-webkit-slider-thumb]:bg-bg-surface','[&::-webkit-slider-thumb]:border-bg-brand'), '');
chk('slider disabled greys fill and ring', has(sld,'disabled ? "bg-border"','disabled:[&::-webkit-slider-thumb]:border-border'), '');

const cp = stripComments(read('ColorPicker/ColorPicker.tsx'));
chk('colour swatch 28 at size 40, radius 4', has(cp,'40: "size-[28px]"','rounded-[4px]'), '');
chk('colour hex in Code/MD', has(cp,'text-code-md'), '');
chk('colour hash is text/tertiary', has(cp,'text-code-md text-text-tertiary'), '');
chk('colour swatch opens the native picker', has(cp,'type="color"'), '');

// ── A14 Multi-select · A19 Tooltip ──────────────────────────────────
const mse = stripComments(read('MultiSelect/MultiSelect.tsx'));
chk('multi-select reuses the field ramp', has(mse,'controlChrome','controlClass[size]','iconClass[size]'), '');
chk('multi-select vertical padding drops to 4', has(mse,'!py-[2.5px]'), 'Figma pads 4/12 so the chip row centres');
chk('multi-select chips are A18 Tag at SM', has(mse,'<Tag','size="sm"'), 'the real component, not a lookalike');
chk('multi-select chip gap 4', has(mse,'gap-[4px]'), '');
chk('multi-select is a listbox, not a native select',
  has(mse,'role="combobox"','role="listbox"','aria-multiselectable'), 'a native select cannot show chips');

const tip = stripComments(read('Tooltip/Tooltip.tsx'));
chk('tooltip bubble r8 pad 8/12 on bg/inverse',
  has(tip,'rounded-[8px] bg-bg-inverse px-[12px] py-[8px]'), '');
chk('tooltip type Body/XS Medium on text/inverse', has(tip,'text-body-xs-medium text-text-inverse'), '');
chk('tooltip arrow 10x6', has(tip,'width={10} height={6}'), '');
chk('tooltip arrow is optional', has(tip,'arrow = true','arrow &&'), 'Figma splits arrow / no arrow into variants');
chk('tooltip does not need tailwindcss-animate', !tip.includes('animate-in'), 'not a dependency');

// ── Molecules — Feedback: M01 · M05 · M03 · M04 ─────────────────────
const al = stripComments(read('Alert/Alert.tsx'));
chk('alert sm r8 pad 12/14 gap 10', has(al,'gap-[10px] rounded-[8px] px-[14px] py-[12px]'), '');
chk('alert md r12 pad 16/18 gap 12', has(al,'gap-[12px] rounded-[12px] px-[18px] py-[16px]'), '');
chk('alert badge 18/20, glyph 12/14',
  has(al,'badge: "size-[18px]", glyph: "size-[12px]"','badge: "size-[20px]", glyph: "size-[14px]"'), '');
chk('alert badge is a filled circle, glyph white',
  has(al,'rounded-full', 'text-icon-on-brand', 'info: "bg-icon-blue"'), 'not a tinted glyph on the surface');
chk('alert surfaces are the subtle ramp',
  has(al,'bg-bg-info-subtle border-border-blue','bg-bg-error-subtle border-border-error'), '');
chk('alert title/description stay neutral',
  has(al,'text-text-primary','text-text-secondary'), 'only surface, border, badge and action take the colour');
chk('alert type ramp', has(al,'title: "text-body-sm-medium", body: "text-caption-md"','title: "text-body-md-medium", body: "text-body-sm"'), '');

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
chk('banner r6 pad 8/8/8/12 gap 6', has(bnr,'gap-[6px] rounded-[6px] border py-[8px] pl-[12px] pr-[8px]'), '');
chk('banner icon 24, content gap 4, actions gap 6',
  has(bnr,'size-[24px]','gap-[4px]','items-center gap-[6px]'), '');
chk('banner has the Neutral severity', has(bnr,'neutral: "bg-bg-subtle border-border"'), 'Alert has no equivalent');

const snk = stripComments(read('Snackbar/Snackbar.tsx'));
chk('snackbar r8 pad 6/6/6/8 gap 6', has(snk,'gap-[6px] rounded-[8px] bg-bg-inverse py-[6px] pl-[8px] pr-[6px]'), '');
chk('snackbar surface is inverse in every severity',
  has(snk,'bg-bg-inverse') && has(snk,'info: "", success: "", warning: "", error: ""'),
  'colour lives in the badge and the action only');
chk('snackbar badge 20, glyph 14', has(snk,'size-[20px]','size-[14px] text-icon-on-brand'), '');
chk('snackbar message Body/SM Medium on text/inverse', has(snk,'text-body-sm-medium text-text-inverse'), '');

// ── M02 Toast · M06 Status Block ────────────────────────────────────
const tst = stripComments(read('Toast/Toast.tsx'));
chk('toast r12 pad 14/14/14/16 gap 12',
  has(tst,'rounded-[12px] border border-border-subtle bg-bg-surface-raised p-[14px] pl-[16px]','gap-[12px]'), '');
chk('toast title Body/MD Medium, supporting Body/SM',
  has(tst,'text-body-md-medium text-text-primary','text-body-sm text-text-secondary'), 'content gap 4');
chk('toast icon badges: brand/gray/success/warning/error',
  has(tst,'primary: "bg-bg-brand"','gray: "bg-icon-secondary"','success: "bg-icon-success"',
        'warning: "bg-icon-warning"','error: "bg-icon-error"'), 'five variants differ only in the badge fill');
chk('toast image 40 r8, avatar 32 round', has(tst,'size-[40px]','rounded-[8px]'), '');
chk('toast no-icon keeps the 1px spacer', has(tst,'w-px shrink-0'), 'text starts in the same place');
chk('toast progress restacks vertically', has(tst,'leading === "progress"','flex-col gap-[12px]'), '');

const stb = stripComments(read('StatusBlock/StatusBlock.tsx'));
chk('status block r6 pad 6/8 gap 6',
  has(stb,'gap-[6px] rounded-[6px] border border-border bg-bg-subtle px-[8px] py-[6px]'), '');
chk('status block surface stays neutral',
  has(stb,'operational: "", degraded: "", outage: "", maintenance: ""'), 'only the dot carries the status');
chk('status dot 10px, four colours',
  has(stb,'size-[10px]','operational: "bg-icon-success"','maintenance: "bg-icon-blue"'),
  'Maintenance is blue — planned, not a fault');
chk('status label Body/SM Medium, detail Caption/MD at 2px',
  has(stb,'text-body-sm-medium text-text-primary','gap-[2px]','text-caption-md text-text-secondary'), '');

// ── Molecules — States: M48-M59 · M50 · M51 ─────────────────────────
const sv = stripComments(read('StateView/StateView.tsx'));
chk('state view gap 10 pad 12 centred on bg/surface',
  has(sv,'flex-col items-center gap-[10px] bg-bg-surface p-[12px] text-center'), 'identical in all ten');
chk('state badge 80 round, glyph 40', has(sv,'size-[80px]','rounded-full','size-[40px]'), '');
chk('state text gap 4, H3 over Body/SM',
  has(sv,'gap-[4px]','text-heading-h3 text-text-primary','text-body-sm text-text-secondary'), '');
chk('state actions gap 6', has(sv,'items-center gap-[6px]'), '');
chk('state badge and glyph are set independently',
  has(sv,'badgeTone[badge]','glyphTone[glyph]'), 'Figma does not derive one from the other');
chk('state presets keep Figma pairings',
  has(sv,'"not-found": { icon: AlertCircle, badge: "brand", glyph: "secondary" }',
        'empty: { icon: Inbox, badge: "neutral", glyph: "inherit" }',
        'maintenance: { icon: Wrench01, badge: "info", glyph: "blue" }'),
  'brand badge with a secondary glyph is deliberate');
chk('state presets cover all ten', ['empty','error','success','no-results','permission-denied',
  'no-connection','maintenance','not-found','coming-soon','server-error'].every(k=>sv.includes(k)), '');

const lst = stripComments(read('LoadingState/LoadingState.tsx'));
chk('loading page/inline/compact geometry',
  has(lst,'page: "flex-col gap-[16px] p-[48px]"','inline: "flex-col gap-[16px] p-[32px]"',
        'compact: "flex-row gap-[10px] p-[20px]"'), 'compact is the only horizontal one');
chk('loading spinner ramp xl/lg/md', has(lst,'page: "xl", inline: "lg", compact: "md"'), '');
chk('loading label ramp H4/H6/Body SM Medium',
  has(lst,'text-heading-h4','text-heading-h6','text-body-sm-medium'), '');
chk('loading description is Body/MD tertiary', has(lst,'text-body-md text-text-tertiary'), 'Figma shows it on Page only');

const skl = stripComments(read('SkeletonLayout/SkeletonLayout.tsx'));
chk('skeleton layout card 360 r8 pad 20 gap 16', has(skl,'w-[360px] flex-col gap-[16px] rounded-[8px] p-[20px]'), '');
chk('skeleton layout list item 480x56 r6 pad 12/16', has(skl,'w-[480px] items-center gap-[12px] rounded-[6px] px-[16px] py-[12px]'), '');
chk('skeleton layout article 640 r8 pad 24 gap 20', has(skl,'w-[640px] flex-col gap-[20px] rounded-[8px] p-[24px]'), '');
chk('skeleton layout chart 336, no border', has(skl,'w-[336px] flex-col gap-[16px] rounded-[8px] p-[20px]'), '');
chk('skeleton layout reuses the A21 atom', has(skl,'import { Skeleton }','<Skeleton'), 'only the frame is new');

// ── Molecules — Navigation: M14 · M19 · M20 ─────────────────────────
const tbs = stripComments(read('Tabs/Tabs.tsx'));
chk('tab fill ramp 36/38/44', has(tbs,'h-[36px] rounded-[6px] px-[12px] py-[8px]',
  'h-[38px] rounded-[8px] px-[14px] py-[9px]','h-[44px] rounded-[8px] px-[16px] py-[10px]'), '');
chk('tab line ramp 36/40/48', has(tbs,'h-[36px] px-[4px] py-[8px]','h-[40px] px-[4px] py-[10px]',
  'h-[48px] px-[4px] py-[12px]'), 'its own ramp, not Fill\'s');
chk('tab toggle ramp 32/36/44', has(tbs,'h-[32px] rounded-[6px] px-[12px] py-[6px]',
  'h-[36px] rounded-[8px] px-[14px] py-[8px]'), '');
chk('tab gap 6 everywhere', has(tbs,'gap-[6px]'), 'the one thing the three styles share');
// The three active treatments now live on the sliding indicator rather than on
// the selected tab, so the paint is checked where it is actually applied. The
// label colour stays on the tab, because text cannot slide.
chk('tab active differs in kind',
  has(tbs,"fill: \"bg-bg-brand\"","line: \"bg-border-brand\"","toggle: \"bg-bg-surface border border-border-subtle\"")
    && has(tbs,'active: "text-text-inverse"','active: "text-text-brand','active: "text-text-primary"'),
  'fill / underline / lift');
chk('selecting a tab never changes its height',
  (tbs.match(/border-b-\[2px\] border-transparent/g) || []).length === 3,
  'all three Line rows reserve the 2px, active included');
chk('tab indicator slides on the spring',
  has(tbs,'transition-[left,top,width,height] " + motionSpring'), '');
chk('first placement does not animate', has(tbs,'placed.current &&'),
  'otherwise it flies in from the left edge on mount');
chk('tab label paints above the indicator', has(tbs,'"relative inline-flex items-center'),
  'the indicator is the only positioned sibling');
chk('tab line underline is 2px', has(tbs,'border-b-[2px]'), 'measured, not assumed');
chk('tabs line-full rule is 1px', has(tbs,'"line-full": "h-[40px] gap-0 border-b border-border-subtle"'), '');
chk('tabs toggle tray r12 pad 4 gap 4', has(tbs,'toggle: "h-[44px] gap-[4px] rounded-[12px] bg-bg-subtle p-[4px]"'), '');
chk('tab counter 20 tall, radius full, bg/subtle',
  has(tbs,'h-[20px] min-w-[19px] items-center justify-center rounded-full bg-bg-subtle'), '');

const bcr = stripComments(read('Breadcrumb/Breadcrumb.tsx'));
chk('breadcrumb gap 8', has(bcr,'items-center gap-[8px]'), '');
chk('breadcrumb trail is quiet, last is emphasised',
  has(bcr,'text-body-sm text-text-tertiary','text-body-sm-medium text-text-primary'), '');
chk('breadcrumb separator is a literal /', has(bcr,'separator = "/"'), 'not an icon');
chk('breadcrumb marks the current page', has(bcr,'aria-current="page"'), '');

const pgn = stripComments(read('Pagination/Pagination.tsx'));
chk('pagination cells 32/40 r8', has(pgn,'sm: "size-[32px] rounded-[8px]','md: "size-[40px] rounded-[8px]'), '');
chk('pagination gap 4 / 6', has(pgn,'sm: "gap-[4px]", md: "gap-[6px]"'), '');
chk('pagination current on brand-subtle', has(pgn,'bg-bg-brand-subtle text-text-brand'), 'others transparent');
chk('pagination truncates like Figma', has(pgn,'paginationRange'), '1 2 3 … 8 9 10');

// ── M18 Dropdown Menu row · M16 Sidebar Item ────────────────────────
const nvi = stripComments(read('NavItem/NavItem.tsx'));
chk('nav item row 40 r6 gap 10 pad 12',
  has(nvi,'h-[40px] w-full items-center gap-[10px] rounded-[6px] px-[12px]'), 'shared by M18 and M16');
chk('nav item slots dot/leading/content/trailing',
  has(nvi,'size-[8px]','size-[20px]','gap-[2px]','items-center gap-[8px]'), '');
chk('nav item states none/subtle/brand-subtle',
  has(nvi,'bg-bg-brand-subtle','hover:bg-bg-subtle'), '');
chk('nav item selected shifts the description too',
  has(nvi,'const tone = disabled ? "text-text-disabled" : selected ? "text-text-brand" : undefined',
        'tone ?? "text-text-secondary"'), 'not just the label');
chk('nav item label Body/SM Medium, description Caption/MD',
  has(nvi,'text-body-sm-medium','text-caption-md'), '');

const sbi = stripComments(read('SidebarItem/SidebarItem.tsx'));
chk('sidebar item reuses the shared row', has(sbi,'import { NavItem','<NavItem'), 'M16 instances M18 in Figma');
chk('sidebar sub-items 36 r6, stack gap 2', has(sbi,'h-[36px]','rounded-[6px]','gap-[2px]'), '');
chk('sidebar sub-item indent 40', has(sbi,'pl-[40px] pr-[12px]'), 'lines the label up past the parent icon');
chk('sidebar sub-item states match the parent',
  has(sbi,'bg-bg-brand-subtle text-text-brand','hover:bg-bg-subtle','text-text-disabled'), '');
chk('sidebar chevron rotates when open', has(sbi,'open && "rotate-180"'), '');

const ddm = stripComments(read('DropdownMenu/DropdownMenu.tsx'));
chk('dropdown row is the shared NavItem', has(ddm,'<NavItem ref={ref} role="menuitem"'), 'M18 is the row, not the panel');
chk('dropdown panel matches the overlay chrome',
  has(ddm,'rounded-[12px] border border-border bg-bg-surface p-[4px] shadow-3'), 'same as the MultiSelect list');

// ── Motion ──────────────────────────────────────────────────────────
// Figma carries 7,199 prototype reactions and 7,194 of them are the same
// spec: SMART_ANIMATE, EASE_OUT, 120ms. EASE_OUT is the decelerate curve, and
// 120 sits between fast and normal, so it is its own token rather than a
// rounding. These checks keep interactions on that spec.
const tokensCss = fs.readFileSync(new URL('../../tokens/css/tokens.css', import.meta.url).pathname, 'utf8');
chk('motion scale carries the 120ms interaction step',
  /--motion-duration-interaction:\s*120ms/.test(tokensCss), 'the value 7,194 reactions use');
chk('preset exposes duration-interaction',
  /interaction:\s*"var\(--motion-duration-interaction\)"/.test(preset), '');

// The motion recipes moved into lib/motion.ts, so a file that presses now says
// `motionPress` rather than carrying the class string. These checks are about
// what ships in the class attribute, so the recipes are expanded back in first
// — otherwise a file would silently "pass" by not mentioning transitions at all.
const RECIPES = Object.fromEntries(
  [...motionLib.matchAll(/export const (motion\w+)\s*=\s*([\s\S]*?);\n/g)]
    .map(([, name, body]) => [name, (body.match(/"([^"]*)"/g) || []).map((q) => q.slice(1, -1)).join(' ')]));
const expand = (t) => t.replace(/\bmotion(State|Press|Lift|Spring)\b/g, (m) => RECIPES[m] ?? m);
const uiFiles = srcFiles.map((f) => [f.split('/src/')[1], expand(stripComments(fs.readFileSync(f, 'utf8')))]);
// An interaction must not animate on the standard curve — Figma says ease-out.
const wrongEasing = uiFiles.filter(([, t]) => /duration-interaction ease-standard/.test(t));
chk('interactions use ease-decelerate', wrongEasing.length === 0,
  wrongEasing.length ? wrongEasing.map(([n]) => n).join(', ') : 'EASE_OUT, not the standard curve');

// Every transition must name a motion token; a bare or arbitrary duration is
// how a scale stops being one.
const rawDuration = uiFiles.filter(([, t]) => /duration-\[\d/.test(t));
chk('no arbitrary durations', rawDuration.length === 0,
  rawDuration.length ? rawDuration.map(([n]) => n).join(', ') : 'every duration is a token');

const bareTransition = uiFiles.filter(([, t]) =>
  /transition(-\[[a-z,\-]+\]|-colors|-opacity|-transform|-shadow)?(?![a-z-])/.test(t) &&
  !/duration-(instant|fast|interaction|normal|slow|slower)/.test(t));
chk('every transition carries a duration token', bareTransition.length === 0,
  bareTransition.length ? bareTransition.map(([n]) => n).join(', ') : '');

// Anything with a hover or focus treatment should animate it.
const unanimated = uiFiles.filter(([, t]) =>
  /hover:|focus-visible:|aria-pressed:|checked:|data-\[state=/.test(t) && !/transition/.test(t));
chk('interactive components all animate', unanimated.length === 0,
  unanimated.length ? unanimated.map(([n]) => n).join(', ') : `${uiFiles.length} files checked`);

const resetCss = fs.readFileSync(new URL('../../tokens/css/reset.css', import.meta.url).pathname, 'utf8');
chk('reduced motion is honoured',
  /prefers-reduced-motion:\s*reduce/.test(resetCss) && /transition-duration:[^;]*!important/.test(resetCss),
  'motion can trigger nausea and migraine — the OS request is explicit');

// ── Motion recipes ──────────────────────────────────────────────────
// A colour cross-fade alone reads as inert, so pressables also move. This
// part is not in Figma — the file specifies the cross-fade and nothing else —
// so it lives in one place and is checked rather than sprinkled.
chk('motion recipes go through the tokens',
  has(motionLib,'duration-interaction ease-decelerate','active:duration-instant','duration-normal ease-spring')
    && !/\d+ms/.test(motionLib),
  'no raw milliseconds');
chk('press is instant down, eased up',
  has(motionLib,'active:duration-instant active:scale-[0.97]'),
  'lag between finger and pixel reads as slow');
chk('lift is hover only, released on press',
  has(motionLib,'hover:-translate-y-px hover:shadow-2 active:translate-y-0'), '');
chk('spring is reserved for travel', has(motionLib,'motionSpring') && has(motionLib,'ease-spring'),
  'wrong for colour, which cannot overshoot');

// Button has moved to its own CSS; the rest still carry the recipe as classes.
const pressables = ['IconButton/IconButton.tsx','Tabs/Tabs.tsx','NavItem/NavItem.tsx',
  'Pagination/Pagination.tsx','ButtonGroup/ButtonGroup.tsx','Tag/Tag.tsx'];
const notPressing = pressables.filter((f) => !/motionPress|active:scale-\[0\.97\]/.test(read(f)));
chk('everything clickable presses', notPressing.length === 0,
  notPressing.length ? notPressing.join(', ') : `${pressables.length} components`);

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

for (const file of ['IconButton/IconButton.tsx']) {
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
  /motionSwell = "hover:scale-\[1\.0[12]\]"/.test(motionLib) && motionLib.includes('active:scale-[0.97]'),
  'hover grows a little, press shrinks more — the press must still read as a press');

chk('toggle thumb travels on the spring', has(read('Toggle/Toggle.tsx'),'"transition-[left] " + motionSpring'), '');
chk('a static Tag does not press',
  has(read('Tag/Tag.tsx'),'interactive: { true: "cursor-pointer " + motionPress, false: "" }'),
  'only a selectable chip reacts to :active');

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
chk('radio wrapper is control-sized', has(rd, 'relative inline-flex shrink-0", boxClass[size]'),
  'so the dot centres on the ring, not on the input margin box');
chk('checkbox wrapper is control-sized', has(cb, 'relative inline-flex shrink-0", boxClass[size]'), '');

// ── A17 Badge ───────────────────────────────────────────────────────
const bg2 = stripComments(read('Badge/Badge.tsx'));
chk('badge sizes 20/24/24 pad 6/8/10', has(bg2,
  'h-[20px] gap-[4px] px-[6px]', 'h-[24px] gap-[4px] px-[8px]', 'h-[24px] gap-[6px] px-[10px]'), '');
chk('badge type Caption/SM · Caption/MD · Label/SM',
  has(bg2, 'text-caption-sm', 'text-caption-md', 'text-label-sm'),
  'Caption is regular — a Label ramp renders every badge semibold');
chk('badge leading icon 12 at every size', has(bg2, '[&>svg]:size-[12px] [&>svg]:shrink-0'), '');
chk('badge close 12 at SM, 16 at MD/LG',
  has(bg2, 'sm: "[&>svg]:size-[12px]"', 'md: "[&>svg]:size-[16px]"'), '');
chk('badge dot 6/6/8 and follows the label', has(bg2, 'bg-current', 'lg: "size-[8px]"'), 'Figma fills it with badge/*-text');
chk('badge subtle reads badge/* tokens',
  has(bg2, 'bg-badge-brand-bg text-badge-brand-text', 'bg-badge-error-bg text-badge-error-text'),
  'not bg/*-subtle + text/*');
chk('badge solid non-brand label is text/inverse',
  has(bg2, 'bg-bg-blue text-text-inverse', 'bg-bg-success text-text-inverse'), 'not text/on-brand');
chk('badge outline borders are semantic',
  has(bg2, 'border-border-blue', 'border-border-success', 'border-border-warning')
    && !bg2.includes('border-[var(--color-'), 'no raw primitive borders');

// ── _Radio base state colours ───────────────────────────────────────
chk('radio dot follows the ring on hover', has(rd, 'peer-checked:peer-hover:bg-bg-brand-hover'), '');
chk('radio dot disabled is input/bg-disabled', has(rd, 'peer-disabled:bg-input-bg-disabled'), 'not text/disabled');
chk('checkbox indeterminate hover', has(cb, 'indeterminate:hover:bg-bg-brand-hover'), '');
chk('checkbox glyph disabled is icon/disabled', has(cb, 'peer-disabled:text-icon-disabled'), 'Figma strokes it icon/disabled');

// ── A10 Toggle / _Toggle base ───────────────────────────────────────
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
// This exited 0 no matter what for as long as it has existed, so a failing
// check printed a ❌ and the build carried on. A check that cannot fail the
// build is decoration.
process.exit(bad ? 1 : 0);
