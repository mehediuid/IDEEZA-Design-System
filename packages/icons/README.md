# @ideeza/icons

React components generated from the IDEEZA Figma icon library
(`Icons` page — 2,852 `icon/*` components).

## Using

```tsx
import { Search01, Tick02 } from "@ideeza/icons";

<span className="text-icon-default">
  <Search01 className="size-[16px]" />
</span>
```

Colour comes from `currentColor`. Size defaults to `1em` so an icon tracks the
type around it; pass `size` or a `size-[16px]` class for a fixed box. Stroke
stays 1.5 in the 24 viewBox, so a 16px icon draws a 1px stroke — exactly as in
Figma.

## Adding icons

The package ships the icons the design system actually uses, not all 2,852.
To add more:

```bash
FIGMA_TOKEN=figd_xxx pnpm --filter @ideeza/icons fetch bookmark eraser
FIGMA_TOKEN=figd_xxx pnpm --filter @ideeza/icons fetch          # everything
pnpm --filter @ideeza/icons generate
```

`icons.json` holds only the geometry — the shared attributes (stroke 1.5,
round cap and join, fill none) live in `IconBase` and are re-applied at
generation. Never hand-draw a path; if a glyph is missing, fetch it.
