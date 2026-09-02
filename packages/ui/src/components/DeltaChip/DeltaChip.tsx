import * as React from "react";
import { cva } from "../../lib/cva";
import type { VariantProps } from "../../lib/types";
import { cn } from "../../lib/cn";

/**
 * DeltaChip — mirrors Figma `A30 Delta Chip` (Atoms — Display).
 *
 * Figma variant map:
 * - Trend → `trend`   (Up · Down · Flat)
 * - Style → `variant` (Subtle · Filled · Text)
 * - Size  → `size`    (SM 20 · MD 24)
 *
 * Colours come from the chart/delta ramp, which is the point of the component:
 *   Subtle  fill delta/<trend>/bg    label delta/<trend>/text
 *   Filled  fill delta/<trend>/icon  label text/inverse
 *   Text    no fill                  label delta/<trend>/text
 * Trend also picks the arrow, so a red chip never carries an up arrow.
 */
export const deltaChipVariants = cva(
  "inline-flex items-center rounded-full font-sans whitespace-nowrap align-middle",
  {
    variants: {
      size: {
        sm: "h-[20px] gap-[3px] px-[8px] py-[2px] text-label-sm [&>svg]:size-[12px]",
        md: "h-[24px] gap-[4px] px-[10px] py-[4px] text-label-md [&>svg]:size-[14px]",
      },
      trend: { up: "", down: "", flat: "" },
      variant: { subtle: "", filled: "", text: "" },
    },
    compoundVariants: [
      { variant: "subtle", trend: "up", class: "bg-chart-delta-up-bg text-chart-delta-up-text" },
      { variant: "subtle", trend: "down", class: "bg-chart-delta-down-bg text-chart-delta-down-text" },
      { variant: "subtle", trend: "flat", class: "bg-chart-delta-flat-bg text-chart-delta-flat-text" },
      { variant: "filled", trend: "up", class: "bg-chart-delta-up-icon text-text-inverse" },
      { variant: "filled", trend: "down", class: "bg-chart-delta-down-icon text-text-inverse" },
      { variant: "filled", trend: "flat", class: "bg-chart-delta-flat-icon text-text-inverse" },
      { variant: "text", trend: "up", class: "text-chart-delta-up-text" },
      { variant: "text", trend: "down", class: "text-chart-delta-down-text" },
      { variant: "text", trend: "flat", class: "text-chart-delta-flat-text" },
    ],
    defaultVariants: { size: "md", trend: "up", variant: "subtle" },
  }
);

const arrows = {
  up: "M12 19V5M5 12l7-7 7 7",
  down: "M12 5v14M19 12l-7 7-7-7",
  flat: "M5 12h14",
} as const;

export interface DeltaChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof deltaChipVariants> {
  trend?: keyof typeof arrows;
  /** Replaces the built-in arrow. */
  icon?: React.ReactNode;
}

export const DeltaChip = React.forwardRef<HTMLSpanElement, DeltaChipProps>(
  ({ className, size, trend = "up", variant, icon, children, ...props }, ref) => (
    <span ref={ref} className={cn(deltaChipVariants({ size, trend, variant }), className)} {...props}>
      {icon ?? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={arrows[trend]} />
        </svg>
      )}
      {children}
    </span>
  )
);
DeltaChip.displayName = "DeltaChip";
