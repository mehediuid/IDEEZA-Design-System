import * as React from "react";
import { cx } from "../../lib/cx";

/**
 * Field — the shell every input shares.
 *
 * Figma has no `A-something Field`: it is the part that repeats across A11
 * Text Input, A12 Select, A13 Textarea, A14 Multi-select and the rest. Pulling
 * it out is what keeps their label, control chrome and helper row identical,
 * and it is why fixing the padding once fixes it in six places.
 *
 * The exports below are class names now rather than Tailwind strings. Callers
 * use them the same way — `controlClass[size]` — so a component can move to
 * this shell without moving off Tailwind for its own parts on the same day.
 *
 * Measurements live in `Field.css`.
 */

export type FieldSize = 32 | 36 | 40 | 44 | 48;

/** The control's chrome: surface, border, focus halo, invalid and disabled. */
export const controlChrome = "ids-field__control";

/** Height, radius and padding for a size. Pair with `controlChrome`. */
export const controlClass: Record<FieldSize, string> = {
  32: "ids-field__control--32",
  36: "ids-field__control--36",
  40: "ids-field__control--40",
  44: "ids-field__control--44",
  48: "ids-field__control--48",
};

/**
 * The value's type ramp, separate from the control: Textarea and MultiSelect
 * set their own geometry but take the same type.
 */
export const valueClass: Record<FieldSize, string> = {
  32: "ids-field__value--32",
  36: "ids-field__value--36",
  40: "ids-field__value--40",
  44: "ids-field__value--44",
  48: "ids-field__value--48",
};

/**
 * Kept for callers that size an icon outside the control. Inside it, the
 * control sizes its own icons and this is not needed.
 */
export const iconClass: Record<FieldSize, string> = controlClass;

/** The label's type ramp, for a caller rendering its own label. */
export const fieldLabelClass: Record<FieldSize, string> = {
  32: "ids-field--32",
  36: "ids-field--36",
  40: "ids-field--40",
  44: "ids-field--44",
  48: "ids-field--48",
};

/** The gap between label, control and helper row. */
export const fieldRowGap: Record<FieldSize, string> = fieldLabelClass;

export interface FieldShellProps {
  size?: FieldSize;
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  /** Replaces the helper text and turns the message red. */
  error?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  htmlFor?: string;
  /** Sits opposite the message — a character count, usually. */
  footerRight?: React.ReactNode;
  children: React.ReactNode;
}

export function FieldShell({
  size = 40,
  label,
  required,
  helperText,
  error,
  disabled,
  className,
  htmlFor,
  footerRight,
  children,
}: FieldShellProps) {
  const message = error ?? helperText;
  return (
    <div
      className={cx("ids-field", `ids-field--${size}`, disabled && "ids-field--disabled", className)}
    >
      {label && (
        <label htmlFor={htmlFor} className="ids-field__label">
          {label}
          {required && (
            <span className="ids-field__required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {children}

      {(message || footerRight) && (
        <div className="ids-field__footer">
          <p
            id={htmlFor ? `${htmlFor}-description` : undefined}
            className={cx("ids-field__message", error && "ids-field__message--error")}
          >
            {message}
          </p>
          {footerRight && <span className="ids-field__count">{footerRight}</span>}
        </div>
      )}
    </div>
  );
}
