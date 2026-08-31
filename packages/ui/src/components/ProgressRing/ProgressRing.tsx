import * as React from "react";
import { cn } from "../../lib/cn";

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

const metrics: Record<ProgressRingSize, { box: number; stroke: number; value: string; title: string }> = {
  xs: { box: 40, stroke: 4, value: "text-overline-sm", title: "text-caption-sm" },
  sm: { box: 56, stroke: 6, value: "text-label-lg", title: "text-caption-sm" },
  md: { box: 80, stroke: 8, value: "text-heading-h4", title: "text-caption-md" },
  lg: { box: 120, stroke: 10, value: "text-heading-h3", title: "text-caption-md" },
  xl: { box: 160, stroke: 14, value: "text-heading-h1", title: "text-caption-md" },
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
    const { box, stroke, value: valueClass, title: titleClass } = metrics[size];
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
        className={cn("relative inline-flex shrink-0 items-center justify-center align-middle", className)}
        style={{ width: box, height: box }}
        {...props}
      >
        <svg viewBox={`0 0 ${box} ${box}`} className="absolute inset-0 size-full" aria-hidden="true">
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
              className="transition-[stroke-dasharray] duration-normal ease-standard"
            />
          </g>
        </svg>
        <div
          className={cn(
            "relative flex flex-col items-center justify-center text-center",
            // The gauge's arc only covers the top, so its text sits low in the box.
            variant === "gauge" && "translate-y-[15%]"
          )}
        >
          {title && <span className={cn(titleClass, "text-text-tertiary")}>{title}</span>}
          <span className={cn(valueClass, "text-text-primary")}>{text}</span>
        </div>
      </div>
    );
  }
);
ProgressRing.displayName = "ProgressRing";
