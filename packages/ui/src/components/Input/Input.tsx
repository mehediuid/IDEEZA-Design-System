import * as React from "react";
import { cx } from "../../lib/cx";
import { ChevronDown } from "../../lib/icons";
import {
  FieldShell,
  controlChrome,
  controlClass,
  valueClass,
  type FieldSize,
} from "../Field/Field";

/**
 * Input — mirrors Figma `Text Input` (A04, Atoms — Input), 240 variants.
 *
 * Figma variant map:
 * - Size  → `size` — 32 / 36 / 40 / 44 / 48 (named by pixel height, as in Figma)
 * - Type  → `leftIcon` / `rightIcon` / `prefix` / `suffix` /
 *            `prefixSelect` / `suffixSelect` (both together = `Both Select`)
 * - State → pseudo-classes + `error` + `disabled`
 *
 * Geometry per size (height · radius · padding-x):
 *   32 · 8  · 10   36 · 8  · 10   40 · 12 · 12   44 · 12 · 12   48 · 16 · 14
 *
 * The chrome and size ramp come from Field; Input's own parts — the `<input>`,
 * the addons, the select addon — are measured in `Input.css`. Prefix and
 * suffix addons are inset by the 1.5px border and given the inner corner
 * radius, so the field border stays visible behind them — the same fix
 * applied to the Figma component.
 */
export type InputSize = FieldSize;

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
  /**
   * `<option>` elements for a select addon on the left.
   * Mirrors Figma `Type=Prefix Select`; combine with `suffixSelect` for
   * `Type=Both Select`.
   */
  prefixSelect?: React.ReactNode;
  /** Props forwarded to the left addon's `<select>`. */
  prefixSelectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
  /** `<option>` elements for a select addon on the right. `Type=Suffix Select`. */
  suffixSelect?: React.ReactNode;
  /** Props forwarded to the right addon's `<select>`. */
  suffixSelectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
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
      prefixSelect,
      prefixSelectProps,
      suffixSelect,
      suffixSelectProps,
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

    const addonShell = (side: "l" | "r", extra?: string) =>
      cx(
        "ids-input__addon",
        `ids-input__addon--${size}`,
        side === "l" ? "ids-input__addon--l" : "ids-input__addon--r",
        valueClass[size],
        extra
      );

    const addon = (node: React.ReactNode, side: "l" | "r") => (
      <span className={addonShell(side)}>{node}</span>
    );

    /** Figma `Prefix Select` / `Suffix Select` — a select plus a chevron, inside the addon. */
    const selectAddon = (
      options: React.ReactNode,
      side: "l" | "r",
      selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>
    ) => (
      <span className={addonShell(side, "ids-input__addon--select")}>
        <select
          disabled={disabled}
          {...selectProps}
          className={cx("ids-input__select", valueClass[size], selectProps?.className)}
        >
          {options}
        </select>
        <ChevronDown />
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
          className={cx(
            controlChrome,
            controlClass[size],
            "ids-input",
            // The addon supplies the edge padding, so drop it from the shell.
            prefix || prefixSelect ? "ids-input--prefixed" : null,
            suffix || suffixSelect ? "ids-input--suffixed" : null
          )}
        >
          {prefixSelect ? selectAddon(prefixSelect, "l", prefixSelectProps) : null}
          {prefix ? addon(prefix, "l") : null}
          {leftIcon}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={helperText || error ? `${inputId}-description` : undefined}
            className={cx("ids-input__input", valueClass[size], className)}
            {...props}
          />
          {rightIcon}
          {suffix ? addon(suffix, "r") : null}
          {suffixSelect ? selectAddon(suffixSelect, "r", suffixSelectProps) : null}
        </div>
      </FieldShell>
    );
  }
);
Input.displayName = "Input";
