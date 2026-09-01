import * as React from "react";
import { cn } from "../../lib/cn";
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
 *
 * `prefix` and `suffix` are the text/secondary slots either side of the value
 * — currency in front, unit behind.
 */
export type NumberInputSize = FieldSize;

/** Figma pads 0/4/0/12 so the buttons meet the border. */
const controlPad: Record<FieldSize, string> = {
  32: "!pl-[8.5px] !pr-[2.5px]",
  36: "!pl-[10.5px] !pr-[2.5px]",
  40: "!pl-[10.5px] !pr-[2.5px]",
  44: "!pl-[12.5px] !pr-[2.5px]",
  48: "!pl-[12.5px] !pr-[2.5px]",
};

const stepBtn =
  "inline-flex size-[32px] shrink-0 items-center justify-center rounded-[6px] text-icon outline-none " +
  "transition-colors duration-interaction ease-decelerate " +
  "hover:bg-bg-subtle active:bg-bg-surface-raised disabled:pointer-events-none disabled:text-text-disabled " +
  "focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]";

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
          className={cn(
            controlChrome,
            controlClass[size],
            controlPad[size],
            error && "border-input-border-error focus-within:shadow-[0_0_0_3px_var(--color-focus-halo-danger)]",
            disabled && "pointer-events-none bg-input-bg-disabled border-input-border-disabled",
            className
          )}
        >
          {prefix && <span className={cn("shrink-0 text-text-secondary", valueClass[size])}>{prefix}</span>}
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
            className={cn(
              "min-w-0 flex-1 bg-transparent outline-none",
              "text-input-text placeholder:text-input-placeholder",
              // The native spinners are replaced by the Figma stepper.
              "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
              valueClass[size]
            )}
            {...props}
          />
          {suffix && <span className={cn("shrink-0 text-text-secondary", valueClass[size])}>{suffix}</span>}

          {stepper === "plus-minus" ? (
            <span className="flex shrink-0 items-center gap-[2px]">
              <button type="button" className={stepBtn} onClick={() => nudge(-1)} disabled={disabled} aria-label="Decrease">
                <Minus className="size-[16px]" aria-hidden="true" />
              </button>
              <button type="button" className={stepBtn} onClick={() => nudge(1)} disabled={disabled} aria-label="Increase">
                <Plus className="size-[16px]" aria-hidden="true" />
              </button>
            </span>
          ) : (
            <span className="flex size-[32px] shrink-0 flex-col items-center justify-center rounded-[6px]">
              <button type="button" className="flex h-[16px] w-[32px] items-center justify-center rounded-t-[6px] text-icon outline-none transition-colors duration-interaction ease-decelerate hover:bg-bg-subtle focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)] disabled:text-text-disabled" onClick={() => nudge(1)} disabled={disabled} aria-label="Increase">
                <ChevronUp className="size-[16px]" aria-hidden="true" />
              </button>
              <button type="button" className="flex h-[16px] w-[32px] items-center justify-center rounded-b-[6px] text-icon outline-none transition-colors duration-interaction ease-decelerate hover:bg-bg-subtle focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)] disabled:text-text-disabled" onClick={() => nudge(-1)} disabled={disabled} aria-label="Decrease">
                <ChevronDown className="size-[16px]" aria-hidden="true" />
              </button>
            </span>
          )}
        </div>
      </FieldShell>
    );
  }
);
NumberInput.displayName = "NumberInput";
