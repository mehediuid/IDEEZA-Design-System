import * as React from "react";
import { cn } from "../../lib/cn";
import { FieldShell, controlChrome, type FieldSize } from "../Field/Field";

/**
 * Textarea — mirrors Figma `Textarea` (A05, Atoms — Input), 18 variants.
 *
 * Figma uses a `Rows` property rather than a pixel size:
 *   SM · 80px min · radius/lg  8 · padding 12
 *   MD · 104px    · radius/xl 12 · padding 14
 *   LG · 128px    · radius/2xl 16 · padding 16
 *
 * Label and helper follow the 40px Text Input ramp, which is what Figma uses.
 */
export type TextareaRows = "sm" | "md" | "lg";

const rowsClass: Record<TextareaRows, string> = {
  sm: "min-h-[80px] rounded-[8px] p-[12px]",
  md: "min-h-[104px] rounded-[12px] p-[14px]",
  lg: "min-h-[128px] rounded-[16px] p-[16px]",
};

const rowsToFieldSize: Record<TextareaRows, FieldSize> = { sm: 36, md: 40, lg: 48 };

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> {
  /** Matches Figma's `Rows` property, not the HTML `rows` attribute. */
  rows?: TextareaRows;
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  /** Shows a `0/200` counter under the field. Mirrors `hasCharCount`. */
  maxLength?: number;
  showCount?: boolean;
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      rows = "md",
      label,
      required,
      helperText,
      error,
      className,
      containerClassName,
      disabled,
      id,
      maxLength,
      showCount,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const autoId = React.useId();
    const areaId = id ?? autoId;
    const invalid = Boolean(error);
    const size = rowsToFieldSize[rows];

    const [count, setCount] = React.useState(String(value ?? defaultValue ?? "").length);
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <FieldShell
        size={size}
        label={label}
        required={required}
        helperText={helperText}
        error={error}
        disabled={disabled}
        htmlFor={areaId}
        className={containerClassName}
      >
        <div
          data-invalid={invalid}
          data-disabled={Boolean(disabled)}
          className={cn(controlChrome, rowsClass[rows], "items-stretch")}
        >
          <textarea
            ref={ref}
            id={areaId}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            aria-invalid={invalid || undefined}
            aria-describedby={helperText || error ? `${areaId}-description` : undefined}
            className={cn(
              "min-h-full w-full resize-none bg-transparent font-sans text-[14px] leading-[20px]",
              "text-input-text outline-none placeholder:text-input-placeholder",
              "disabled:cursor-not-allowed disabled:text-text-disabled disabled:placeholder:text-text-disabled",
              className
            )}
            {...props}
          />
        </div>

        {showCount && maxLength ? (
          <span
            className={cn(
              "self-end font-sans text-[12px] leading-[16px] tabular-nums",
              disabled ? "text-text-disabled" : "text-input-helper"
            )}
          >
            {count}/{maxLength}
          </span>
        ) : null}
      </FieldShell>
    );
  }
);
Textarea.displayName = "Textarea";
