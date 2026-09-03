import * as React from "react";
import { cx } from "../../lib/cx";
import { Plus, Minus, ChevronUp, ChevronDown } from "../../lib/icons";
import {
  FieldShell,
  controlChrome,
  controlClass,
  valueClass,
  type FieldSize,
} from "../Field/Field";

/**
 * NumberInput — mirrors Figma `A12 Number Input` (Atoms — Input), 60 variants.
 *
 * Figma variant map:
 * - Size    → `size`    (32 · 36 · 40 · 44 · 48)
 * - Stepper → `stepper` (Plus-minus · Arrows)
 * - State   → focus / filled / `error` / `disabled`
 *
 * Same field ramp as Text Input, with one change Figma makes for the buttons:
 * right padding drops to 4 so the stepper sits flush inside the border while
 * the left keeps the usual 12. Plus-minus is two 32px buttons at radius 6 with
 * 2px between them; Arrows is a single 32px column holding both chevrons.
 * Measurements live in `NumberInput.css`.
 *
 * `prefix` and `suffix` are the text/secondary slots either side of the value
 * — currency in front, unit behind.
 *
 * Error and disabled ride the field chrome's `data-invalid` / `data-disabled`
 * treatment, the same as every other control.
 */
export type NumberInputSize = FieldSize;

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "prefix"> {
  size?: NumberInputSize;
  stepper?: "plus-minus" | "arrows";
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  /** Leading unit — currency, for instance. */
  prefix?: React.ReactNode;
  /** Trailing unit. */
  suffix?: React.ReactNode;
  containerClassName?: string;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { className, containerClassName, size = 40, stepper = "plus-minus", label, required, helperText, error,
      disabled, prefix, suffix, id, step = 1, min, max, value, defaultValue, onChange, ...props },
    ref
  ) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    const invalid = Boolean(error);
    const inner = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inner.current as HTMLInputElement);

    // Going through the DOM input keeps min/max clamping and the change event
    // identical to typing, so controlled and uncontrolled both behave.
    const nudge = (direction: 1 | -1) => {
      const el = inner.current;
      if (!el) return;
      direction === 1 ? el.stepUp() : el.stepDown();
      el.dispatchEvent(new Event("input", { bubbles: true }));
    };

    return (
      <FieldShell
        size={size}
        label={label}
        required={required}
        helperText={helperText}
        error={error}
        disabled={disabled}
        htmlFor={inputId}
        className={containerClassName}
      >
        <div
          data-invalid={invalid}
          data-disabled={Boolean(disabled)}
          className={cx(controlChrome, controlClass[size], `ids-number-input--${size}`, className)}
        >
          {prefix && <span className={cx("ids-number-input__unit", valueClass[size])}>{prefix}</span>}
          <input
            ref={inner}
            id={inputId}
            type="number"
            inputMode="decimal"
            disabled={disabled}
            step={step}
            min={min}
            max={max}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            className={cx("ids-number-input__input", valueClass[size])}
            {...props}
          />
          {suffix && <span className={cx("ids-number-input__unit", valueClass[size])}>{suffix}</span>}

          {stepper === "plus-minus" ? (
            <span className="ids-number-input__steps">
              <button type="button" className="ids-number-input__step" onClick={() => nudge(-1)} disabled={disabled} aria-label="Decrease">
                <Minus aria-hidden="true" />
              </button>
              <button type="button" className="ids-number-input__step" onClick={() => nudge(1)} disabled={disabled} aria-label="Increase">
                <Plus aria-hidden="true" />
              </button>
            </span>
          ) : (
            <span className="ids-number-input__arrows">
              <button type="button" className="ids-number-input__arrow ids-number-input__arrow--up" onClick={() => nudge(1)} disabled={disabled} aria-label="Increase">
                <ChevronUp aria-hidden="true" />
              </button>
              <button type="button" className="ids-number-input__arrow ids-number-input__arrow--down" onClick={() => nudge(-1)} disabled={disabled} aria-label="Decrease">
                <ChevronDown aria-hidden="true" />
              </button>
            </span>
          )}
        </div>
      </FieldShell>
    );
  }
);
NumberInput.displayName = "NumberInput";
