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
chk('checkbox label sm 14/20',has(cb,'sm: "text-[14px] leading-[20px]"'),'regular');
chk('checkbox label md 16/24',has(cb,'md: "text-[16px] leading-[24px]"'),'regular');
chk('checkbox support sm 11/16',has(cb,'sm: "text-[11px] leading-[16px]"'),'');
chk('checkbox support md 12/16',has(cb,'md: "text-[12px] leading-[16px]"'),'');
chk('checkbox label colour input/label',has(cb,'text-input-label'),'not text-primary');
chk('checkbox support colour input/helper',has(cb,'text-input-helper'),'not text-tertiary');

// ── Radio
const rd=read('Radio/Radio.tsx');
chk('radio 20 / 24 round',   has(rd,'sm: "size-[20px]"','md: "size-[24px]"','rounded-full'),'');
chk('radio dot 8 / 10',      has(rd,'sm: "size-[8px]"','md: "size-[10px]"'),'');
chk('radio border 2px',      has(rd,'border-[2px]'),'');
chk('radio keeps white fill',has(rd,'bg-input-bg','checked:border-bg-brand') && !rd.includes('checked:bg-bg-brand'),'ring + dot, never solid');
chk('radio row gap 16',      has(rd,'gap-[16px]'),'');
chk('radio support sm 11/16',has(rd,'sm: "text-[11px] leading-[16px]"'),'');

// ── Textarea
const ta=read('Textarea/Textarea.tsx');
chk('textarea sm 80 r8 pad 10/12/8/12', has(ta,'min-h-[80px] rounded-[8px] pt-[10px] pr-[12px] pb-[8px] pl-[12px]'),'');
chk('textarea md 104 r12 pad 12/14/8/14',has(ta,'min-h-[104px] rounded-[12px] pt-[12px] pr-[14px] pb-[8px] pl-[14px]'),'');
chk('textarea lg 128 r16 pad 14/16/8/16',has(ta,'min-h-[128px] rounded-[16px] pt-[14px] pr-[16px] pb-[8px] pl-[16px]'),'');
chk('textarea lg value 16/24', has(ta,'lg: "text-[16px] leading-[24px]"'),'sm/md 14/20');
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
chk('field padX ramp 10/10/12/12/14', has(fd,'px-[10px]','px-[12px]','px-[14px]'),'');
chk('field label ramp 11/11/12/12/14',has(fd,'32: "text-[11px]','40: "text-[12px]','48: "text-[14px]'),'');
chk('field row gap 4/4/4/6/6', has(fd,'32: "gap-[4px]"','44: "gap-[6px]"'),'');
chk('field border 1.5 solid', has(fd,'border-solid border-[1.5px]'),'');
chk('field error halo danger', has(fd,'focus-halo-danger'),'');

chk('select uses library chevron',has(se,'ChevronDown'),'icon/arrow-down-01-round');
chk('textarea footer row',has(ta,'footerRight='),'helper left, count right');
chk('textarea resizable',has(ta,'resize-y'),'matches the Figma resize handle');
chk('input select addons',has(read('Input/Input.tsx'),'prefixSelect','suffixSelect','selectAddon'),'Prefix/Suffix/Both Select');

console.log('\n' + (bad? `❌ ${bad} mismatch` : '✅ all form control values match the Figma extraction'));

// ── Token discipline ────────────────────────────────────────────────
// Type must go through the scale, never a raw px value. A hardcoded
// text-[14px] silently drifts the moment the scale moves.
import { readdirSync } from 'node:fs';
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]);
const srcFiles = walk(new URL('../src/', import.meta.url).pathname).filter((f) => f.endsWith('.tsx'));
const offenders = srcFiles.filter((f) => /text-\[\d+px\]|leading-\[\d+px\]/.test(fs.readFileSync(f, 'utf8')));
chk('no hardcoded type sizes', offenders.length === 0,
  offenders.length ? offenders.map((f) => f.split('/src/')[1]).join(', ') : 'all through text-xs/sm/md/lg');
