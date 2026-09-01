import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * Slider — mirrors Figma `A11 Slider` (Atoms — Input), 60 variants.
 *
 * Figma variant map:
 * - Size  → `size`  (SM · MD · LG)
 * - Value → `value`
 * - State → hover / focus-visible / `disabled`
 *
 * Measured: track 4 / 6 / 8 at radius 2 / 4 / 4 in bg/subtle, fill bg/brand,
 * thumb 12 / 16 / 20 in bg/surface with a 2px bg/brand ring. Hover grows the
 * MD thumb from 16 to 18, so the growth is proportional here. Disabled turns
 * both the fill and the thumb ring to border/default while the track stays.
 *
 * The value bubble is Figma's `value-label`: a 22px pill in bg/inverse with
 * bg/surface text, shown on hover and while dragging.
 */
export type SliderSize = "sm" | "md" | "lg";

const metrics: Record<SliderSize, { track: string; radius: string; thumb: number; hover: number }> = {
  sm: { track: "h-[4px]", radius: "rounded-[2px]", thumb: 12, hover: 13.5 },
  md: { track: "h-[6px]", radius: "rounded-[4px]", thumb: 16, hover: 18 },
  lg: { track: "h-[8px]", radius: "rounded-[4px]", thumb: 20, hover: 22.5 },
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
      <div className={cn("group relative flex w-full items-center", className)}>
        {/* Track and fill are painted here; the input itself is transparent and
            sits on top, so the native control keeps keyboard and drag. */}
        <div className={cn("absolute inset-x-0 w-full bg-bg-subtle", m.track, m.radius)} aria-hidden="true">
          <div
            className={cn("h-full", m.radius, disabled ? "bg-border" : "bg-bg-brand")}
            style={{ width: `${pct}%` }}
          />
        </div>

        {showValue && (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute bottom-[calc(100%+6px)] -translate-x-1/2 rounded-full bg-bg-inverse px-[8px] py-[3px] text-caption-sm text-text-inverse",
              "opacity-0 transition-opacity duration-interaction ease-decelerate group-hover:opacity-100 group-focus-within:opacity-100"
            )}
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
          className={cn(
            "relative w-full cursor-pointer appearance-none bg-transparent outline-none",
            "disabled:pointer-events-none",
            // WebKit and Firefox need the thumb styled separately; both take
            // the Figma geometry — surface fill, 2px brand ring.
            "[&::-webkit-slider-thumb]:size-[var(--thumb)] [&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-bg-surface",
            "[&::-webkit-slider-thumb]:border-[2px] [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:border-bg-brand",
            "[&::-webkit-slider-thumb]:transition-[width,height]",
            "hover:[&::-webkit-slider-thumb]:size-[var(--thumb-hover)]",
            "disabled:[&::-webkit-slider-thumb]:border-border",
            "[&::-moz-range-thumb]:size-[var(--thumb)] [&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:bg-bg-surface [&::-moz-range-thumb]:border-[2px] [&::-moz-range-thumb]:border-solid [&::-moz-range-thumb]:border-bg-brand",
            "disabled:[&::-moz-range-thumb]:border-border",
            "focus-visible:[&::-webkit-slider-thumb]:shadow-[0_0_0_3px_var(--color-focus-halo)]",
            "focus-visible:[&::-moz-range-thumb]:shadow-[0_0_0_3px_var(--color-focus-halo)]"
          )}
          {...props}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";
