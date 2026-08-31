import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The design system's text styles live in Tailwind's `fontSize` scale, so they
 * are written `text-label-lg`, `text-body-sm` and so on — the same `text-*`
 * prefix that colours use.
 *
 * tailwind-merge cannot tell the two apart on its own. Out of the box it read
 * `text-label-lg` and `text-button-primary-text` as one conflict group and kept
 * whichever came last. cva emits variant classes before size classes, so the
 * size always won and every button lost its label colour — Primary, Danger, AI
 * and Inverse rendered with inherited near-black text. The dark-labelled
 * hierarchies looked correct purely by accident, which is why this survived.
 *
 * Naming the styles here puts them in the font-size group, leaving every other
 * `text-*` class to be treated as a colour.
 */
const FONT_SIZES = [
  "display-xl", "display-lg", "display-md",
  "heading-h1", "heading-h2", "heading-h3", "heading-h4", "heading-h5", "heading-h6",
  "body-xs", "body-sm", "body-md", "body-lg", "body-xl",
  "body-xs-medium", "body-sm-medium", "body-md-medium", "body-lg-medium", "body-xl-medium",
  "label-xl", "label-lg", "label-md", "label-sm",
  "caption-md", "caption-sm",
  "overline-md", "overline-sm",
  "code-md", "code-sm",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...FONT_SIZES] }],
    },
  },
});

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Exported for the parity check — the list must track the preset's fontSize keys. */
export const __fontSizeClassNames = FONT_SIZES;
