import * as React from "react";
import { cn } from "../../lib/cn";
import {
  FieldShell,
  controlChrome,
  iconClass,
  valueClass,
  type FieldSize,
} from "../Field/Field";

/**
 * A06 uses a flat 12px horizontal padding at every size, unlike Text Input
 * which ramps 10/10/12/12/14. Mirrored exactly rather than unified — see the
 * note in IDEEZA-Handoff.md about cross-control padding.
 */
const selectControlClass: Record<FieldSize, string> = {
  32: "h-[32px] rounded-[8px] px-[12px] gap-[8px]",
  36: "h-[36px] rounded-[8px] px-[12px] gap-[8px]",
  40: "h-[40px] rounded-[12px] px-[12px] gap-[8px]",
  44: "h-[44px] rounded-[12px] px-[12px] gap-[8px]",
  48: "h-[48px] rounded-[16px] px-[12px] gap-[8px]",
};

/**
 * Select — mirrors Figma `A06 Select` (Atoms — Input), 35 variants.
 *
 * A native `<select>` under the shared field chrome, so keyboard, mobile
 * pickers and form submission behave correctly. Figma's `Open` state is the
 * browser's own popup; the trigger keeps the focus treatment.
 *
 * Geometry matches A06: 32 · r8 · px12 | 40 · r12 · px12 | 48 · r16 · px12.
 * Value type follows the Text Input ramp — 32/36/40 → 14/20, 44/48 → 16/24.
 * A06 previously used 16/24 from 40 up, so a Select and an Input of the same
 * height showed different text sizes; the Figma component was corrected.
 */
export type SelectSize = FieldSize;

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: SelectSize;
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  /** Shown as a disabled first option when the value is empty. */
  placeholder?: string;
  leftIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size = 40,
      label,
      required,
      helperText,
      error,
      placeholder,
      leftIcon,
      className,
      containerClassName,
      disabled,
      id,
      children,
      defaultValue,
      value,
      ...props
    },
    ref
  ) => {
    const autoId = React.useId();
    const selectId = id ?? autoId;
    const invalid = Boolean(error);

    return (
      <FieldShell
        size={size}
        label={label}
        required={required}
        helperText={helperText}
        error={error}
        disabled={disabled}
        htmlFor={selectId}
        className={containerClassName}
      >
        <div
          data-invalid={invalid}
          data-disabled={Boolean(disabled)}
          className={cn(
            controlChrome,
            selectControlClass[size],
            iconClass[size],
            "relative [&_svg]:shrink-0 [&_svg]:text-icon-default"
          )}
        >
          {leftIcon}
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue ?? (placeholder ? "" : undefined)}
            aria-invalid={invalid || undefined}
            aria-describedby={helperText || error ? `${selectId}-description` : undefined}
            className={cn(
              "min-w-0 flex-1 appearance-none bg-transparent font-sans outline-none",
              "text-input-text",
              // The placeholder option keeps the muted colour until something is chosen
              "invalid:text-input-placeholder [&:has(option[value='']:checked)]:text-input-placeholder",
              "disabled:cursor-not-allowed disabled:text-text-disabled",
              valueClass[size],
              className
            )}
            {...props}
          >
            {placeholder ? (
              <option value="" disabled>
                {placeholder}
              </option>
            ) : null}
            {children}
          </select>
          <Chevron />
        </div>
      </FieldShell>
    );
  }
);
Select.displayName = "Select";
