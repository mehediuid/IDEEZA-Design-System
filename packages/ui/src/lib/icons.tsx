import * as React from "react";

/**
 * Glyphs used by the form controls.
 *
 * These are NOT hand-drawn. Each path is exported verbatim from the Figma
 * icon library (`Icons` page, 2,852 `icon/*` components) so the rendered
 * shape is identical to the design file:
 *
 *   ChevronDown → icon/arrow-down-01-round
 *   ChevronUp   → icon/arrow-up-01-round
 *   Check       → icon/tick-02        (used by _Check icon)
 *   Minus       → icon/remove-01      (checkbox indeterminate)
 *   Plus        → icon/add-01
 *
 * All share the library's 24 viewBox, 1.5 stroke, round cap and join, so a
 * glyph rendered at 16px carries a 1px stroke exactly as in Figma.
 * Colour comes from `currentColor` — set it on the parent.
 *
 * If you need a different glyph, export it from the library the same way.
 * Do not draw one.
 */
type GlyphProps = React.SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export const ChevronDown = (props: GlyphProps) => (
  <svg {...base} {...props}>
    <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" />
  </svg>
);

export const ChevronUp = (props: GlyphProps) => (
  <svg {...base} {...props}>
    <path d="M18 15C18 15 13.5811 9.00001 12 9C10.4188 8.99999 6 15 6 15" />
  </svg>
);

export const Check = (props: GlyphProps) => (
  <svg {...base} {...props}>
    <path d="M5 14L8.5 17.5L19 6.5" />
  </svg>
);

export const Minus = (props: GlyphProps) => (
  <svg {...base} {...props}>
    <path d="M19.002 12L4.99998 12" />
  </svg>
);

export const Plus = (props: GlyphProps) => (
  <svg {...base} {...props}>
    <path d="M12 5V19.002" />
    <path d="M19.002 12.002L4.99998 12.002" />
  </svg>
);
