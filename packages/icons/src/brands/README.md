# Brand marks

Empty on purpose. Nothing here is drawn by us.

`icon/*` components come out of the Figma icon library through `IconBase` —
one 24 grid, 1.5 stroke, `currentColor`. A brand mark is the opposite: fixed
artwork in a palette the trademark owner sets, which may not be recoloured,
restretched or redrawn. So they live here instead, keep their own viewBox and
fills, and are imported verbatim.

## Why Figma's A29 is not the source

`A29 Brand Icon` currently holds placeholder geometry, not the real marks —
exported on 2026-08-31 it was:

| Brand | What the file contains |
| --- | --- |
| Google | a blue circle, a white circle and a yellow rectangle |
| Apple | two ellipses and a white circle |
| GitHub | a circle, two white dots and a rounded bar |
| Microsoft | four squares, close but off-palette (`#F24A24` against the official `#F25022`) |

Shipping that verbatim would put four wrong logos into production, so the
component is held until the real artwork is in place.

## Adding a mark

Download the official file from the vendor, then:

```bash
node scripts/import-brand.mjs google ~/Downloads/google-g.svg
npm run build
```

| Brand | Where |
| --- | --- |
| Google | [developers.google.com/identity/branding-guidelines](https://developers.google.com/identity/branding-guidelines) → `signin-assets.zip` |
| Apple | [developer.apple.com/design/resources](https://developer.apple.com/design/resources) → Sign in with Apple |
| GitHub | [github.com/logos](https://github.com/logos) |
| Microsoft | [aka.ms/mssignin](https://aka.ms/mssignin) → brand guidance pack |

Each pack carries usage rules — minimum size, clear space, permitted
backgrounds, and whether the mark may appear without its wordmark. Google's,
for instance, requires the standard colour "G" on a light, dark or neutral
background and forbids a monochrome version in a sign-in button.

Once the four marks are here, `A29 Brand Icon` in Figma should be replaced with
them too, so the file and the package agree.
