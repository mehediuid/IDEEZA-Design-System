import * as React from "react";
import { cx } from "../../lib/cx";

/**
 * Slider — mirrors Figma `A11 Slider` (Atoms — Input), 60 variants.
 *
 * Figma variant map:
 * - Size  → `size`  (SM · MD · LG)
 * - Value → `value`
 * - State → hover / focus-visible / `disabled`
 *
 * Measured: track 4 / 6 / 8 at radius 2 / 4 / 4 in bg/subtle, fill bg/brand,
 * thumb 12 / 16 / 20 in bg/surface with a 2px bg/brand ring (Slider.css). Hover grows the
 * MD thumb from 16 to 18, so the growth is proportional here. Disabled turns
 * both the fill and the thumb ring to border/default while the track stays.
 *
 * The value bubble is Figma's `value-label`: a 22px pill in bg/inverse with
 * bg/surface text, shown on hover and while dragging.
 */
export type SliderSize = "sm" | "md" | "lg";

/** Geometry lives in Slider.css; the thumb sizes travel as custom properties. */
const metrics: Record<SliderSize, { thumb: number; hover: number }> = {
  sm: { thumb: 12, hover: 13.5 },
  md: { thumb: 16, hover: 18 },
  lg: { thumb: 20, hover: 22.5 },
};

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: SliderSize;
  /** Shows the value bubble above the thumb on hover and focus. */
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    { className, size = "md", min = 0, max = 100, step = 1, value, defaultValue = 50, disabled,
      showValue = true, formatValue, onChange, ...props },
    ref
  ) => {
    const m = metrics[size];
    const [inner, setInner] = React.useState(Number(defaultValue));
    const current = value !== undefined ? Number(value) : inner;
    const lo = Number(min);
    const hi = Number(max);
    const pct = hi === lo ? 0 : ((current - lo) / (hi - lo)) * 100;
    const text = formatValue ? formatValue(current) : String(current);

    return (
      <div className={cx("ids-slider", className)}>
        {/* Track and fill are painted here; the input itself is transparent and
            sits on top, so the native control keeps keyboard and drag. */}
        <div className={cx("ids-slider__track", `ids-slider__track--${size}`)} aria-hidden="true">
          <div
            className={cx("ids-slider__fill", `ids-slider__fill--${size}`, disabled ? "ids-slider__fill--disabled" : null)}
            style={{ width: `${pct}%` }}
          />
        </div>

        {showValue && (
          <span
            aria-hidden="true"
            className="ids-slider__bubble"
            style={{ left: `${pct}%` }}
          >
            {text}
          </span>
        )}

        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={(e) => {
            if (value === undefined) setInner(Number(e.target.value));
            onChange?.(e);
          }}
          style={
            {
              "--thumb": `${m.thumb}px`,
              "--thumb-hover": `${m.hover}px`,
            } as React.CSSProperties
          }
          className="ids-slider__input"
          {...props}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";
