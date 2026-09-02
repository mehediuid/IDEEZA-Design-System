import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "../../lib/cva";
import type { VariantProps } from "../../lib/types";
import { cn } from "../../lib/cn";

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
export const inlineCtaVariants = cva(
  [
    "inline-flex items-center gap-[6px] font-sans cursor-pointer",
    "transition-colors duration-interaction ease-decelerate",
    "outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)] rounded-[2px]",
    "aria-disabled:pointer-events-none aria-disabled:text-text-disabled",
    "[&>svg]:transition-transform [&>svg]:duration-interaction ease-decelerate",
  ],
  {
    variants: {
      size: {
        sm: "text-caption-md [&>svg]:size-[12px]",
        md: "text-body-sm-medium [&>svg]:size-[14px]",
        lg: "text-body-md-medium [&>svg]:size-[16px]",
      },
      color: {
        brand: "text-text-brand",
        neutral: "text-text-primary",
      },
      arrow: {
        right: "hover:[&>svg]:translate-x-[2px]",
        down: "hover:[&>svg]:translate-y-[2px]",
      },
    },
    defaultVariants: { size: "md", color: "brand", arrow: "right" },
  }
);

const arrowPath = {
  right: "M5 12h14M13 6l6 6-6 6",
  down: "M12 5v14M6 13l6 6 6-6",
} as const;

export interface InlineCtaProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "color">,
    VariantProps<typeof inlineCtaVariants> {
  arrow?: keyof typeof arrowPath;
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
        className={cn(inlineCtaVariants({ size, color, arrow }), className)}
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
