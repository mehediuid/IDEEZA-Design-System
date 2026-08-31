import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

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
export const badgeVariants = cva(
  // No `font-medium` — the Label styles carry semibold, matching Figma.
  "inline-flex items-center font-sans whitespace-nowrap rounded-full",
  {
    variants: {
      variant: { subtle: "", solid: "", outline: "border bg-transparent" },
      color: { brand: "", neutral: "", blue: "", success: "", warning: "", error: "" },
      // Figma: SM Caption/SM, MD Caption/MD, LG Label/SM. Caption is regular
      // and Label is semibold, so the earlier Label ramp rendered every badge
      // bold. LG really is smaller type than MD — 11/16 semibold against
      // 12/16 regular — which reads as heavier, not larger.
      size: {
        sm: "h-[20px] gap-[4px] px-[6px] text-caption-sm",
        md: "h-[24px] gap-[4px] px-[8px] text-caption-md",
        lg: "h-[24px] gap-[6px] px-[10px] text-label-sm",
      },
    },
    // Every pair below is the token Figma binds, not an equivalent value.
    compoundVariants: [
      { variant: "subtle", color: "brand", class: "bg-badge-brand-bg text-badge-brand-text" },
      // Neutral is the one colour with no badge token pair in Figma.
      { variant: "subtle", color: "neutral", class: "bg-bg-subtle text-text-secondary" },
      { variant: "subtle", color: "blue", class: "bg-badge-blue-bg text-badge-blue-text" },
      { variant: "subtle", color: "success", class: "bg-badge-success-bg text-badge-success-text" },
      { variant: "subtle", color: "warning", class: "bg-badge-warning-bg text-badge-warning-text" },
      { variant: "subtle", color: "error", class: "bg-badge-error-bg text-badge-error-text" },
      { variant: "solid", color: "brand", class: "bg-bg-brand text-text-on-brand" },
      { variant: "solid", color: "neutral", class: "bg-bg-inverse text-text-inverse" },
      // Solid non-brand labels are text/inverse in Figma, not text/on-brand:
      // inverse flips with the theme, on-brand is white in both.
      { variant: "solid", color: "blue", class: "bg-bg-blue text-text-inverse" },
      { variant: "solid", color: "success", class: "bg-bg-success text-text-inverse" },
      { variant: "solid", color: "warning", class: "bg-bg-warning text-text-inverse" },
      { variant: "solid", color: "error", class: "bg-bg-error text-text-inverse" },
      { variant: "outline", color: "brand", class: "border-border-brand text-text-brand" },
      { variant: "outline", color: "neutral", class: "border-border text-text-secondary" },
      { variant: "outline", color: "blue", class: "border-border-blue text-text-blue" },
      { variant: "outline", color: "success", class: "border-border-success text-text-success" },
      { variant: "outline", color: "warning", class: "border-border-warning text-text-warning" },
      { variant: "outline", color: "error", class: "border-border-error text-text-error" },
    ],
    defaultVariants: { variant: "subtle", color: "brand", size: "md" },
  }
);

/**
 * Figma fills the dot with the badge's own label colour (Icon=Dot on the brand
 * badge is badge/brand-text), so it follows the label rather than needing a
 * colour map. Diameter is 6 at SM and MD, 8 at LG.
 */
/** Leading slot is 12px at every size. */
const leadingIcon = "[&>svg]:size-[12px] [&>svg]:shrink-0";

/** X close is 12 at SM, 16 at MD and LG — a blanket [&_svg] rule sized both. */
const closeSize: Record<string, string> = {
  sm: "[&>svg]:size-[12px]",
  md: "[&>svg]:size-[16px]",
  lg: "[&>svg]:size-[16px]",
};

const dotSize: Record<string, string> = {
  sm: "size-[6px]",
  md: "size-[6px]",
  lg: "size-[8px]",
};

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof badgeVariants> {
  /** Leading status dot. Mirrors Figma `Icon=Dot`. */
  dot?: boolean;
  /** Leading slot — icon, country flag, avatar. Mirrors Figma swap slots. */
  leftIcon?: React.ReactNode;
  /** Trailing slot. Mirrors `Icon=Icon trailing`. */
  rightIcon?: React.ReactNode;
  /** Renders an X close button. Mirrors `Icon=X close`. */
  onDismiss?: () => void;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, color, size, dot, leftIcon, rightIcon, onDismiss, children, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant, color, size }), className)} {...props}>
      {dot && <span className={cn("shrink-0 rounded-full bg-current", dotSize[size ?? "md"])} aria-hidden="true" />}
      {leftIcon && <span className={cn("inline-flex shrink-0 items-center", leadingIcon)}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={cn("inline-flex shrink-0 items-center", leadingIcon)}>{rightIcon}</span>}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Remove"
          className={cn(
            "-mr-[2px] inline-flex shrink-0 items-center justify-center rounded-full outline-none hover:opacity-70 focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
            closeSize[size ?? "md"]
          )}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </span>
  )
);
Badge.displayName = "Badge";
