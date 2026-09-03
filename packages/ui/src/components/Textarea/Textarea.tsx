import * as React from "react";
import { cx } from "../../lib/cx";
import { FieldShell, controlChrome, valueClass, type FieldSize } from "../Field/Field";

/**
 * Textarea — mirrors Figma `Textarea` (A05, Atoms — Input), 18 variants.
 *
 * Figma uses a `Rows` property rather than a pixel size:
 *   SM · 80px  · radius/lg  8  · pad 10/12/8/12 · value 14/20 · label 11/16
 *   MD · 104px · radius/xl 12 · pad 12/14/8/14 · value 14/20 · label 12/16
 *   LG · 128px · radius/2xl 16 · pad 14/16/8/16 · value 16/24 · label 14/20
 *
 * Padding is asymmetric — bottom stays 8 at every size, leaving room for the
 * resize handle. Helper text and the character counter share one footer row —
 * helper left, count right — exactly as in the Figma `Footer` frame.
 *
 * Geometry lives in `Textarea.css`; the value ramp is Field's — the mapped
 * field size lands on Body/SM for SM/MD and Body/MD for LG, matching Figma.
 */
export type TextareaRows = "sm" | "md" | "lg";

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
        footerRight={showCount && maxLength ? `${count}/${maxLength}` : undefined}
      >
        <div
          data-invalid={invalid}
          data-disabled={Boolean(disabled)}
          className={cx(controlChrome, "ids-textarea", `ids-textarea--${rows}`)}
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
            className={cx("ids-textarea__area", valueClass[size], className)}
            {...props}
          />
        </div>

      </FieldShell>
    );
  }
);
Textarea.displayName = "Textarea";
