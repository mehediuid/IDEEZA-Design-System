import * as React from "react";
import { cx } from "../../lib/cx";

/**
 * Spinner — mirrors Figma `A20 Spinner` (Atoms — Display).
 *
 * Figma variant map:
 * - Style → `variant` (Arc · Ring · Dots)
 * - Size  → `size`    (SM 16 · MD 20 · LG 24 · XL 32)
 * - Color → `color`   (Brand · Neutral · Inverse · Blue · Success · Warning · Error)
 *
 * The arc is drawn as an SVG rather than a bordered box. Figma's `head` ellipse
 * runs 0.87→4.01 rad — half the circle — with `strokeCap: ROUND`. A CSS border
 * with transparent edges gets the sweep right but ends square, which is visible
 * at every size, so the geometry is reproduced with a dashed circle instead:
 * radius (box − stroke) / 2, dash = half the circumference, round linecap.
 */
export type SpinnerSize = "sm" | "md" | "lg" | "xl";
export type SpinnerColor =
  | "brand" | "neutral" | "inverse" | "blue" | "success" | "warning" | "error";

export function spinnerVariants(
  props: { size?: SpinnerSize | null; color?: SpinnerColor | null; className?: string } = {}
) {
  return cx(
    "ids-spinner",
    `ids-spinner--${props.size ?? "md"}`,
    `ids-spinner--${props.color ?? "brand"}`,
    props.className
  );
}

const metrics = {
  sm: { box: 16, stroke: 2, dot: 2.5 },
  md: { box: 20, stroke: 2, dot: 3 },
  lg: { box: 24, stroke: 2.5, dot: 3.5 },
  xl: { box: 32, stroke: 3, dot: 4.5 },
} as const;

/** Figma bakes twelve nodes fading 100% → 20%. */
const DOTS = 12;
/** Arc starts 0.87 rad (≈49.8°) clockwise from the top. */
const START_DEG = (0.87 * 180) / Math.PI - 90;

export interface SpinnerProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  size?: SpinnerSize | null;
  color?: SpinnerColor | null;
  variant?: "arc" | "ring" | "dots";
  /** Announced to screen readers while busy. */
  label?: string;
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = "md", color = "brand", variant = "arc", label = "Loading", ...props }, ref) => {
    const key = (size ?? "md") as keyof typeof metrics;
    const { box, stroke, dot } = metrics[key];
    const r = (box - stroke) / 2;
    const half = Math.PI * r; // half the circumference

    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={spinnerVariants({ size, color, className })}
        {...props}
      >
        {variant === "dots" ? (
          <span className="ids-spinner__dots" aria-hidden="true">
            {Array.from({ length: DOTS }, (_, i) => (
              // Each layer fills the box and rotates about its centre, so the
              // dot pinned to its top edge lands on the circle at i × 30°.
              <span key={i} className="ids-spinner__spoke" style={{ transform: `rotate(${(360 / DOTS) * i}deg)` }}>
                <span
                  className="ids-spinner__dot"
                  style={{ width: dot, height: dot, opacity: 1 - i * 0.073 }}
                />
              </span>
            ))}
          </span>
        ) : (
          <svg
            viewBox={`0 0 ${box} ${box}`}
            className="ids-spinner__svg"
            aria-hidden="true"
          >
            {variant === "ring" && (
              <circle
                cx={box / 2}
                cy={box / 2}
                r={r}
                fill="none"
                stroke="var(--color-border-subtle)"
                strokeWidth={stroke}
              />
            )}
            <circle
              cx={box / 2}
              cy={box / 2}
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${half} ${half}`}
              transform={`rotate(${START_DEG} ${box / 2} ${box / 2})`}
            />
          </svg>
        )}
      </span>
    );
  }
);
Spinner.displayName = "Spinner";
