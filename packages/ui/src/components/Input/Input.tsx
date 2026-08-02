import * as React from "react";
import { cn } from "../../lib/cn";
import {
  FieldShell,
  controlChrome,
  controlClass,
  iconClass,
  valueClass,
  type FieldSize,
} from "../Field/Field";

/**
 * Input — mirrors Figma `Text Input` (A04, Atoms — Input), 240 variants.
 *
 * Figma variant map:
 * - Size  → `size` — 32 / 36 / 40 / 44 / 48 (named by pixel height, as in Figma)
 * - Type  → `leftIcon` / `rightIcon` / `prefix` / `suffix`
 * - State → pseudo-classes + `error` + `disabled`
 *
 * Geometry per size (height · radius · padding-x):
 *   32 · 8  · 10   36 · 8  · 10   40 · 12 · 12   44 · 12 · 12   48 · 16 · 14
 *
 * Prefix and suffix addons are inset by the 1.5px border and given the inner
 * corner radius, so the field border stays visible behind them — the same fix
 * applied to the Figma component.
 */
export type InputSize = FieldSize;

/** Inner radius for an addon sitting against the border: field radius − 1.5px. */
const addonRadius: Record<InputSize, string> = {
  32: "rounded-l-[6.5px]",
  36: "rounded-l-[6.5px]",
  40: "rounded-l-[10.5px]",
  44: "rounded-l-[10.5px]",
  48: "rounded-l-[14.5px]",
};
const addonRadiusRight: Record<InputSize, string> = {
  32: "rounded-r-[6.5px]",
  36: "rounded-r-[6.5px]",
  40: "rounded-r-[10.5px]",
  44: "rounded-r-[10.5px]",
  48: "rounded-r-[14.5px]",
};
/** Horizontal padding the field would have had; the addon absorbs it. */
const addonPad: Record<InputSize, string> = {
  32: "px-[10px]",
  36: "px-[10px]",
  40: "px-[12px]",
  44: "px-[12px]",
  48: "px-[14px]",
};

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  size?: InputSize;
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  /** Error message — switches the field to the error treatment. */
  error?: React.ReactNode;
  /** Icon inside the field, before the value. */
  leftIcon?: React.ReactNode;
  /** Icon inside the field, after the value. */
  rightIcon?: React.ReactNode;
  /** Text addon flush to the left edge, e.g. `$` or `https://`. */
  prefix?: React.ReactNode;
  /** Text addon flush to the right edge, e.g. `.com` or `USD`. */
  suffix?: React.ReactNode;
  /** Class for the field shell rather than the `<input>` itself. */
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 40,
      label,
      required,
      helperText,
      error,
      leftIcon,
      rightIcon,
      prefix,
      suffix,
      className,
      containerClassName,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    const invalid = Boolean(error);

    const addon = (node: React.ReactNode, side: "l" | "r") => (
      <span
        className={cn(
          "flex shrink-0 self-stretch items-center bg-bg-subtle text-input-placeholder",
          "font-sans",
          valueClass[size],
          addonPad[size],
          side === "l" ? addonRadius[size] : addonRadiusRight[size]
        )}
      >
        {node}
      </span>
    );

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
          className={cn(
            controlChrome,
            controlClass[size],
            iconClass[size],
            // The addon supplies the edge padding, so drop it from the shell.
            prefix && "pl-[1.5px]",
            suffix && "pr-[1.5px]",
            "[&_svg]:shrink-0 [&_svg]:text-icon-default"
          )}
        >
          {prefix ? addon(prefix, "l") : null}
          {leftIcon}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={helperText || error ? `${inputId}-description` : undefined}
            className={cn(
              "min-w-0 flex-1 bg-transparent font-sans text-input-text outline-none",
              "placeholder:text-input-placeholder",
              "disabled:cursor-not-allowed disabled:text-text-disabled disabled:placeholder:text-text-disabled",
              valueClass[size],
              className
            )}
            {...props}
          />
          {rightIcon}
          {suffix ? addon(suffix, "r") : null}
        </div>
      </FieldShell>
    );
  }
);
Input.displayName = "Input";
