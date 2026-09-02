import * as React from "react";
import { cx } from "../../lib/cx";

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
export type DotSize = "xs" | "sm" | "md" | "lg";
export type DotColor = "brand" | "neutral" | "blue" | "success" | "warning" | "error";

export function dotVariants(
  props: { size?: DotSize | null; color?: DotColor | null; className?: string } = {}
) {
  return cx(
    "ids-dot",
    `ids-dot--${props.size ?? "md"}`,
    `ids-dot--${props.color ?? "brand"}`,
    props.className
  );
}

export interface DotProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  size?: DotSize | null;
  color?: DotColor | null;
  label?: string;
}

export const Dot = React.forwardRef<HTMLSpanElement, DotProps>(
  ({ className, size, color, label, ...props }, ref) => (
    <span
      ref={ref}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={dotVariants({ size, color, className })}
      {...props}
    />
  )
);
Dot.displayName = "Dot";
