import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cx } from "../../lib/cx";

/**
 * InlineCta — mirrors Figma `A28 Inline CTA` (Atoms — Display).
 *
 * Figma variant map:
 * - Size  → `size`  (SM · MD · LG)
 * - Color → `color` (Brand · Neutral)
 * - Arrow → `arrow` (Right · Down)
 * - State → hover / `disabled`
 *
 * A text call to action with a trailing arrow: gap 6, icon 12/14/16. Unlike
 * Link, hover does not change the colour or underline in Figma — the arrow
 * nudges instead, which is what the translate on hover does here.
 *
 * SM is Caption/MD (regular) while MD and LG are the Medium styles; that jump
 * is Figma's, not a transcription slip.
 */
export type InlineCtaSize = "sm" | "md" | "lg";
export type InlineCtaColor = "brand" | "neutral";
export type InlineCtaArrow = "right" | "down";

export function inlineCtaVariants(
  props: {
    size?: InlineCtaSize | null;
    color?: InlineCtaColor | null;
    arrow?: InlineCtaArrow | null;
    className?: string;
  } = {}
) {
  return cx(
    "ids-inline-cta",
    `ids-inline-cta--${props.size ?? "md"}`,
    `ids-inline-cta--${props.color ?? "brand"}`,
    `ids-inline-cta--${props.arrow ?? "right"}`,
    props.className
  );
}

const arrowPath = {
  right: "M5 12h14M13 6l6 6-6 6",
  down: "M12 5v14M6 13l6 6 6-6",
} as const;

export interface InlineCtaProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "color"> {
  size?: InlineCtaSize | null;
  color?: InlineCtaColor | null;
  arrow?: InlineCtaArrow;
  asChild?: boolean;
  disabled?: boolean;
}

export const InlineCta = React.forwardRef<HTMLAnchorElement, InlineCtaProps>(
  ({ className, size, color, arrow = "right", asChild = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        ref={ref}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : props.tabIndex}
        className={inlineCtaVariants({ size, color, arrow, className })}
        {...props}
      >
        {children}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={arrowPath[arrow]} />
        </svg>
      </Comp>
    );
  }
);
InlineCta.displayName = "InlineCta";
