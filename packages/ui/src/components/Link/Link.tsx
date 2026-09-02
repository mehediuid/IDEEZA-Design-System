import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "../../lib/cva";
import type { VariantProps } from "../../lib/types";
import { cn } from "../../lib/cn";

/**
 * Link — mirrors Figma `A03 Link` (Atoms — Action).
 *
 * Figma variant map:
 * - Size  → `size`  (SM · MD · LG)
 * - Color → `color` (Brand · Neutral · Inverse · Error)
 * - State → hover / focus-visible / `disabled`
 *
 * Hover underlines in every colour. Only Brand and Error also shift hue, to
 * text/brand-hover and text/error-hover; Neutral and Inverse keep theirs.
 * Focus is the 3px halo, matching the rest of the system.
 *
 * Note on SM: Figma sets it in an unnamed 12/16 Medium. The nearest named
 * style is Body/XS Medium at 12/18, used here — the package rule is that type
 * goes through a named style, so the fix belongs in Figma, as a style.
 */
export const linkVariants = cva(
  [
    "inline-flex items-center gap-[4px] font-sans cursor-pointer",
    "underline-offset-2 hover:underline",
    "transition-colors duration-interaction ease-decelerate",
    "outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)] rounded-[2px]",
    "aria-disabled:pointer-events-none aria-disabled:text-text-disabled aria-disabled:no-underline",
  ],
  {
    variants: {
      size: {
        sm: "text-body-xs-medium [&>svg]:size-[12px]",
        md: "text-body-sm-medium [&>svg]:size-[14px]",
        lg: "text-body-md-medium [&>svg]:size-[16px]",
      },
      color: {
        brand: "text-text-brand hover:text-text-brand-hover",
        neutral: "text-text-primary",
        inverse: "text-text-inverse",
        error: "text-text-error hover:text-text-error-hover",
      },
    },
    defaultVariants: { size: "md", color: "brand" },
  }
);

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "color">,
    VariantProps<typeof linkVariants> {
  /** Render as the child element — e.g. a router link. */
  asChild?: boolean;
  disabled?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, size, color, asChild = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        ref={ref}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : props.tabIndex}
        className={cn(linkVariants({ size, color }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Link.displayName = "Link";
