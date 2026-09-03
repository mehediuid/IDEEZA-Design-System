import * as React from "react";
import { cx } from "../../lib/cx";

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
  <div className="ids-progress-bar__track">
    <div className="ids-progress-bar__fill" style={{ width: `${pct}%` }} />
  </div>
);

const Pill = ({ text }: { text: string }) => (
  <span className="ids-progress-bar__pill">{text}</span>
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
        className={cx("ids-progress-bar", className)}
        {...props}
      >
        {label === "top-floating" && (
          <div className="ids-progress-bar__float ids-progress-bar__float--top">
            {/* Figma pads with a spacer frame; the margin does the same job and
                keeps the pill on the fill's leading edge at any width. */}
            <span style={{ marginLeft: `calc(${pct}% - 20px)` }}>
              <Pill text={text} />
            </span>
          </div>
        )}

        {label === "right" ? (
          <div className="ids-progress-bar__row">
            <Track pct={pct} />
            <span className="ids-progress-bar__value">{text}</span>
          </div>
        ) : (
          <Track pct={pct} />
        )}

        {label === "bottom" && (
          <div className="ids-progress-bar__below">{text}</div>
        )}
        {label === "bottom-floating" && (
          <div className="ids-progress-bar__float ids-progress-bar__float--bottom">
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
