import * as React from "react";
import { cx } from "../../lib/cx";

/**
 * Badge — mirrors Figma `A17 Badge` (Atoms — Display).
 *
 * Figma variant map:
 * - Style → `variant` (Subtle / Solid / Outline)
 * - Color → `color`   (Brand / Neutral / Blue / Success / Warning / Error)
 * - Size  → `size`    (SM / MD / LG)
 * - Icon slots → `leftIcon` / `rightIcon` (Country flag, Avatar, Icon content swaps)
 * - X close → `onDismiss`
 * - Dot → `dot`
 */
export type BadgeVariant = "subtle" | "solid" | "outline";
export type BadgeColor = "brand" | "neutral" | "blue" | "success" | "warning" | "error";
export type BadgeSize = "sm" | "md" | "lg";

/**
 * Variant and colour only mean anything together — Figma has no "brand"
 * badge, it has a subtle-brand, a solid-brand and an outline-brand. The two
 * classes chained say exactly that.
 */
export function badgeVariants(
  props: {
    variant?: BadgeVariant | null;
    color?: BadgeColor | null;
    size?: BadgeSize | null;
    className?: string;
  } = {}
) {
  return cx(
    "ids-badge",
    `ids-badge--${props.variant ?? "subtle"}`,
    `ids-badge--${props.color ?? "brand"}`,
    `ids-badge--${props.size ?? "md"}`,
    props.className
  );
}

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  variant?: BadgeVariant | null;
  color?: BadgeColor | null;
  size?: BadgeSize | null;
  dot?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onDismiss?: () => void;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, color, size, dot, leftIcon, rightIcon, onDismiss, children, ...props }, ref) => (
    <span ref={ref} className={badgeVariants({ variant, color, size, className })} {...props}>
      {dot && <span className="ids-badge__dot" aria-hidden="true" />}
      {leftIcon && <span className="ids-badge__icon">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ids-badge__icon">{rightIcon}</span>}
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Remove" className="ids-badge__dismiss">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </span>
  )
);
Badge.displayName = "Badge";
