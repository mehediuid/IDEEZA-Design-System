import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * ProgressBar — mirrors Figma `A22 Progress Bar` (Atoms — Display).
 *
 * Figma variant map:
 * - Progress → `value` (Figma ships 0–100 in steps of 10; this takes any number)
 * - Label    → `label` (False · Right · Bottom · Top floating · Bottom floating)
 *
 * Track is 8px tall, radius 4, bg/subtle, with a bg/brand fill at the same
 * radius. The floating label is a pill — 22px, radius 6, bg/surface-raised
 * with a 1px border/subtle — that tracks the fill's leading edge; Figma builds
 * it with spacer frames, which is a percentage margin here.
 */
export type ProgressLabel = "none" | "right" | "bottom" | "top-floating" | "bottom-floating";

export interface ProgressBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 0–100. Values outside the range are clamped. */
  value?: number;
  label?: ProgressLabel;
  /** Overrides the printed text; defaults to a rounded percentage. */
  formatValue?: (value: number) => string;
}

const Track = ({ pct }: { pct: number }) => (
  <div className="h-[8px] w-full overflow-hidden rounded-[4px] bg-bg-subtle">
    <div
      className="h-full rounded-[4px] bg-bg-brand transition-[width] duration-normal ease-standard"
      style={{ width: `${pct}%` }}
    />
  </div>
);

const Pill = ({ text }: { text: string }) => (
  <span className="inline-flex h-[22px] items-center rounded-[6px] border border-border-subtle bg-bg-surface-raised px-[8px] text-label-sm text-text-primary">
    {text}
  </span>
);

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value = 0, label = "none", formatValue, ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, value));
    const text = formatValue ? formatValue(pct) : `${Math.round(pct)}%`;

    const shell = (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn("w-full", className)}
        {...props}
      >
        {label === "top-floating" && (
          <div className="mb-[6px] flex">
            {/* Figma pads with a spacer frame; the margin does the same job and
                keeps the pill on the fill's leading edge at any width. */}
            <span style={{ marginLeft: `calc(${pct}% - 20px)` }}>
              <Pill text={text} />
            </span>
          </div>
        )}

        {label === "right" ? (
          <div className="flex items-center gap-[12px]">
            <Track pct={pct} />
            <span className="shrink-0 text-caption-md text-text-primary">{text}</span>
          </div>
        ) : (
          <Track pct={pct} />
        )}

        {label === "bottom" && (
          <div className="mt-[6px] text-caption-md text-text-primary">{text}</div>
        )}
        {label === "bottom-floating" && (
          <div className="mt-[6px] flex">
            <span style={{ marginLeft: `calc(${pct}% - 20px)` }}>
              <Pill text={text} />
            </span>
          </div>
        )}
      </div>
    );

    return shell;
  }
);
ProgressBar.displayName = "ProgressBar";
