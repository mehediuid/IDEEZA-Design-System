import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Spinner — mirrors Figma `A20 Spinner` (Atoms — Display).
 *
 * Figma variant map:
 * - Style → `variant` (Arc · Ring · Dots)
 * - Size  → `size`    (SM 16 · MD 20 · LG 24 · XL 32)
 * - Color → `color`   (Brand · Neutral · Inverse · Blue · Success · Warning · Error)
 *
 * The Figma arc runs 0.87→4.01 rad, i.e. exactly half the circle, at stroke
 * 2 / 2 / 2.5 / 3 by size. In CSS that is a full-radius border with the two
 * opposite edges transparent, spun with `animate-spin`; the geometry matches
 * without needing an SVG.
 *
 * Ring adds a static track in `border/subtle` underneath the same arc.
 * Dots is 12 dots on the circle at descending opacity — Figma bakes the fade
 * into the twelve nodes, so the DOM mirrors that rather than animating opacity.
 */
export const spinnerVariants = cva("inline-block shrink-0 align-middle", {
  variants: {
    size: {
      sm: "size-[16px]",
      md: "size-[20px]",
      lg: "size-[24px]",
      xl: "size-[32px]",
    },
    color: {
      brand: "text-icon-brand",
      neutral: "text-icon-secondary",
      inverse: "text-icon-on-brand",
      blue: "text-icon-blue",
      success: "text-icon-success",
      warning: "text-icon-warning",
      error: "text-icon-error",
    },
  },
  defaultVariants: { size: "md", color: "brand" },
});

/** Stroke weight per size, read off the `head` ellipse in Figma. */
const stroke: Record<string, string> = {
  sm: "border-[2px]",
  md: "border-[2px]",
  lg: "border-[2.5px]",
  xl: "border-[3px]",
};

/** Dot diameter — 3px at MD in Figma; scaled with the ring. */
const dotSize: Record<string, string> = {
  sm: "size-[2.5px]",
  md: "size-[3px]",
  lg: "size-[3.5px]",
  xl: "size-[4px]",
};

const DOTS = 12;

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof spinnerVariants> {
  variant?: "arc" | "ring" | "dots";
  /** Announced to screen readers while busy. */
  label?: string;
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = "md", color = "brand", variant = "arc", label = "Loading", ...props }, ref) => {
    const key = size ?? "md";

    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cn(spinnerVariants({ size, color }), "relative", className)}
        {...props}
      >
        {variant === "dots" ? (
          <span className="absolute inset-0 animate-spin" style={{ animationDuration: "1.2s" }} aria-hidden="true">
            {Array.from({ length: DOTS }, (_, i) => (
              // Each layer fills the box and is rotated about its centre, so the
              // dot pinned to its top edge lands on the circle at i × 30°.
              <span key={i} className="absolute inset-0" style={{ transform: `rotate(${(360 / DOTS) * i}deg)` }}>
                <span
                  className={cn("absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-current", dotSize[key])}
                  style={{ opacity: 1 - i * 0.073 }}
                />
              </span>
            ))}
          </span>
        ) : (
          <>
            {variant === "ring" && (
              <span className={cn("absolute inset-0 rounded-full border-border-subtle", stroke[key])} aria-hidden="true" />
            )}
            <span
              className={cn(
                "absolute inset-0 animate-spin rounded-full border-current",
                // Half-circle arc: two opposite edges transparent.
                "border-r-transparent border-t-transparent",
                stroke[key]
              )}
              aria-hidden="true"
            />
          </>
        )}
      </span>
    );
  }
);
Spinner.displayName = "Spinner";
