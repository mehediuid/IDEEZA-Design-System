import * as React from "react";
import { cx } from "../../lib/cx";

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
export type DeltaChipSize = "sm" | "md";
export type DeltaChipTrend = "up" | "down" | "flat";
export type DeltaChipVariant = "subtle" | "filled" | "text";

/**
 * Trend and variant only mean anything together — Figma has no "up" colour,
 * it has a subtle-up and a filled-up. In CSS that is the two classes chained,
 * which is what `compoundVariants` was expressing.
 */
export function deltaChipVariants(
  props: {
    size?: DeltaChipSize | null;
    trend?: DeltaChipTrend | null;
    variant?: DeltaChipVariant | null;
    className?: string;
  } = {}
) {
  return cx(
    "ids-delta-chip",
    `ids-delta-chip--${props.size ?? "md"}`,
    `ids-delta-chip--${props.trend ?? "up"}`,
    `ids-delta-chip--${props.variant ?? "subtle"}`,
    props.className
  );
}

const arrows = {
  up: "M12 19V5M5 12l7-7 7 7",
  down: "M12 5v14M19 12l-7 7-7-7",
  flat: "M5 12h14",
} as const;

export interface DeltaChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: DeltaChipSize | null;
  variant?: DeltaChipVariant | null;
  trend?: DeltaChipTrend;
  icon?: React.ReactNode;
}

export const DeltaChip = React.forwardRef<HTMLSpanElement, DeltaChipProps>(
  ({ className, size, trend = "up", variant, icon, children, ...props }, ref) => (
    <span ref={ref} className={deltaChipVariants({ size, trend, variant, className })} {...props}>
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
