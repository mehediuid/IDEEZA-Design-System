import * as React from "react";
import { cva } from "../../lib/cva";
import type { VariantProps } from "../../lib/types";
import { cn } from "../../lib/cn";

/**
 * Dot — mirrors Figma `A26 Dot` (Atoms — Display).
 *
 * Figma variant map:
 * - Size  → `size`  (XS 6 · SM 8 · MD 10 · LG 12)
 * - Color → `color` (Brand · Neutral · Blue · Success · Warning · Error)
 *
 * Each variant carries a `ring` ellipse 4px wider than the dot, stroked in
 * bg/surface — a 2px halo that keeps the dot legible when it overlaps an
 * avatar or a busy row. Reproduced with a 2px outward ring.
 */
export const dotVariants = cva("inline-block shrink-0 rounded-full ring-2 ring-bg-surface align-middle", {
  variants: {
    size: {
      xs: "size-[6px]",
      sm: "size-[8px]",
      md: "size-[10px]",
      lg: "size-[12px]",
    },
    color: {
      brand: "bg-bg-brand",
      // Figma uses bg/inverse for Neutral, so it flips with the theme.
      neutral: "bg-bg-inverse",
      blue: "bg-bg-blue",
      success: "bg-bg-success",
      warning: "bg-bg-warning",
      error: "bg-bg-error",
    },
  },
  defaultVariants: { size: "md", color: "brand" },
});

export interface DotProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof dotVariants> {
  /** Describes the dot for assistive tech; omit for purely decorative use. */
  label?: string;
}

export const Dot = React.forwardRef<HTMLSpanElement, DotProps>(
  ({ className, size, color, label, ...props }, ref) => (
    <span
      ref={ref}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(dotVariants({ size, color }), className)}
      {...props}
    />
  )
);
Dot.displayName = "Dot";
