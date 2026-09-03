import * as React from "react";
import { cx } from "../../lib/cx";

/**
 * ProgressRing — mirrors Figma `A23 Progress Ring` (Atoms — Display).
 *
 * Figma variant map:
 * - Style   → `variant` (Ring · Gauge)
 * - Size    → `size`    (XS 40 · SM 56 · MD 80 · LG 120 · XL 160)
 * - Content → `title`   (Value only · Title + value)
 *
 * Measured: stroke 4 / 6 / 8 / 10 / 14, track border/subtle, head icon/brand.
 * Ring sweeps the full 360° from the top — Figma's head runs 4.712 rad (270°,
 * i.e. 12 o'clock) for 144° at 40%, which is 0.4 x 360. Gauge is the upper
 * half only: the track spans 180°→360° and the head 72° at 40%, so the same
 * fraction of a 180° sweep. Both are one dashed circle with the dash set to
 * the fraction of the arc, rotated to the right starting point.
 */
export type ProgressRingSize = "xs" | "sm" | "md" | "lg" | "xl";

/** Type per size lives in ProgressRing.css; the title steps up at MD. */
const metrics: Record<ProgressRingSize, { box: number; stroke: number; title: "caption-sm" | "caption-md" }> = {
  xs: { box: 40, stroke: 4, title: "caption-sm" },
  sm: { box: 56, stroke: 6, title: "caption-sm" },
  md: { box: 80, stroke: 8, title: "caption-md" },
  lg: { box: 120, stroke: 10, title: "caption-md" },
  xl: { box: 160, stroke: 14, title: "caption-md" },
};

// `title` is widened from the DOM attribute (a string tooltip) to a node, so
// the native one is omitted rather than merged.
export interface ProgressRingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  /** 0–100. Values outside the range are clamped. */
  value?: number;
  size?: ProgressRingSize;
  variant?: "ring" | "gauge";
  /** Adds the Caption line above the value — Figma `Content=Title + value`. */
  title?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const ProgressRing = React.forwardRef<HTMLDivElement, ProgressRingProps>(
  ({ className, value = 0, size = "md", variant = "ring", title, formatValue, ...props }, ref) => {
    const { box, stroke, title: titleClass } = metrics[size];
    const pct = Math.min(100, Math.max(0, value));
    const text = formatValue ? formatValue(pct) : `${Math.round(pct)}%`;

    const r = (box - stroke) / 2;
    const circumference = 2 * Math.PI * r;
    // Ring uses the whole circle, Gauge only the upper half.
    const arc = variant === "gauge" ? circumference / 2 : circumference;
    // Ring starts at 12 o'clock, Gauge at 9 o'clock.
    const rotation = variant === "gauge" ? 180 : -90;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cx("ids-progress-ring", className)}
        style={{ width: box, height: box }}
        {...props}
      >
        <svg viewBox={`0 0 ${box} ${box}`} className="ids-progress-ring__svg" aria-hidden="true">
          <g transform={`rotate(${rotation} ${box / 2} ${box / 2})`}>
            <circle
              cx={box / 2}
              cy={box / 2}
              r={r}
              fill="none"
              stroke="var(--color-border-subtle)"
              strokeWidth={stroke}
              strokeDasharray={`${arc} ${circumference}`}
            />
            <circle
              cx={box / 2}
              cy={box / 2}
              r={r}
              fill="none"
              stroke="var(--color-icon-brand)"
              strokeWidth={stroke}
              strokeDasharray={`${(arc * pct) / 100} ${circumference}`}
              className="ids-progress-ring__head"
            />
          </g>
        </svg>
        <div
          className={cx(
            "ids-progress-ring__content",
            variant === "gauge" ? "ids-progress-ring__content--gauge" : null
          )}
        >
          {title && (
            <span className={cx("ids-progress-ring__title", `ids-progress-ring__title--${titleClass}`)}>
              {title}
            </span>
          )}
          <span className={cx("ids-progress-ring__value", `ids-progress-ring__value--${size}`)}>{text}</span>
        </div>
      </div>
    );
  }
);
ProgressRing.displayName = "ProgressRing";
