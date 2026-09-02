import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cx } from "../../lib/cx";

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
export type LinkSize = "sm" | "md" | "lg";
export type LinkColor = "brand" | "neutral" | "inverse" | "error";

export function linkVariants(
  props: { size?: LinkSize | null; color?: LinkColor | null; className?: string } = {}
) {
  return cx(
    "ids-link",
    `ids-link--${props.size ?? "md"}`,
    `ids-link--${props.color ?? "brand"}`,
    props.className
  );
}

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "color"> {
  size?: LinkSize | null;
  color?: LinkColor | null;
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
        className={linkVariants({ size, color, className })}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Link.displayName = "Link";
