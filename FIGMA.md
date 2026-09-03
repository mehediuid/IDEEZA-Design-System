# Figma — what is still open

The Figma file is the source and this repo is the copy: values are read out of
it with the plugin API, never invented here. So when the code and the file
disagree, the fix usually belongs in Figma, and this is the list of those.

Nothing here has been changed in Figma. Each item says what was verified from
the repo and what still needs looking at in the file itself.

## Verified from the repo

These are provable without opening Figma, and each is either a real defect or
a place the code had to work around one.

### The Inverse button disappears in dark mode

`packages/tokens/css/tokens.css`, dark block:

```
--color-bg-inverse:        var(--color-gray-50)   /* near white */
--color-button-inverse-bg: #ffffff
```

An Inverse button on an inverse surface is white on near-white. The token is
literally `#ffffff` in both modes while the surface it is designed to sit on
flips. Whichever of the two is wrong, it is a Figma decision — the repo is
faithfully copying a pair that cannot both be right.

### The AI fill is a primitive, not a semantic token

```
--color-bg-ai: var(--color-violet-600)
```

Every other hierarchy points at a semantic token. `A01 Hierarchy=AI` reaches
past the semantic layer to a primitive, which means a brand change has to be
made twice.

### Border weight is mixed

Text Input and Textarea use 1.5px; A06, A07, A12, A13, A14 and `_OTP` use 1px.
No layout shift either way, but two weights in one form is visible.

### Link SM has no named text style

`A03 Link`, SM, is set in an unnamed 12/16 Medium. The nearest named style is
Body/XS Medium at 12/18, which is what the code uses — the rule in this package
is that type goes through a named style, so the 12/16 should become one. Noted
in `Link.tsx`.

### A29 Brand Icon holds placeholder geometry

Not the real marks. `packages/icons/src/brands/README.md` has the procedure:
download the official assets, run `scripts/import-brand.mjs`, then replace the
Figma placeholders. Blocked on the assets, deliberately — the marks are
trademarks and drawing them by hand is not an option.

## Needs checking in the file

I could not verify these without Figma access, and they should be looked at
before anything is changed.

- **A16 Avatar focus ring.** The code draws the 3px halo like everything else.
  The file may still carry the older 2px ring; if it does, Figma is the one
  that is behind.
- **Brand-coloured sections (O25–O38).** The focus halo sits on the page
  background, so Primary focus can wash out on a violet hero. Never reviewed.
- **The Atoms — Input audit.** 12 of its 13 findings are untouched: missing
  Hover across seven sets, 43 Disabled variants built with an opacity hack
  rather than the disabled tokens, radius scale misalignment, `border/*` and
  `input/*` overlapping, five missing descriptions, prototype gaps, and no
  A-level OTP component.

## Things the code added that Figma does not specify

Not defects — decisions made here because the file is silent, listed so Figma
can adopt them or overrule them rather than discovering them later.

- **Press, lift and swell.** Figma's prototype reactions specify a 120ms
  ease-out cross-fade and nothing else. Anything clickable also presses, raised
  surfaces lift on hover, flat ones swell. `MIGRATION.md` and `Button.css` have
  the reasoning.
- **The skeleton shimmer.** Figma has no motion on skeletons. A static grey
  block reads as a broken layout, so these pulse; `animate={false}` turns it
  off.
- **The sliding tab indicator.** Figma draws the active treatment on each tab.
  In the code one element slides between them — pixel-identical at rest, and
  the difference is only in transit.
- **Field.** Figma has no Field component; it is the part that repeats across
  A11, A12, A13, A14 and the rest. Making it explicit in the file would stop
  the six of them drifting apart.

## Fixed in code, no Figma change needed

These were places the rendered result did **not** match the file. The file was
right and the code was wrong; both agree now.

- `bg-bg-info-subtle` — Alert, Banner and StateView had no info background.
- `text-text-blue` — Badge's blue outline label had no colour.
- `text-icon-default` — IconButton and Input never applied their icon colour.
- `hover:text-text-brand-hover` and `hover:text-text-error-hover` — Link did
  not change colour on hover.
- `transition-[colors,box-shadow]` — every input's border and background
  snapped instead of animating, because `colors` is not a CSS property. Still
  present on Avatar, Checkbox and Radio, which have not migrated yet.
