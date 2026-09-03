import * as React from "react";
import { cx } from "../../lib/cx";

/**
 * Radio — mirrors Figma `A08 Selection Control` (Type=Radio) and its
 * `_Radio base` (Atoms — Input).
 *
 * Extracted from Figma, not approximated — the measurements live in
 * `Radio.css`:
 *   circle   sm 20×20 · md 24×24 · always round · 2px border
 *   dot      sm 8×8 · md 10×10
 *   row gap  16px between control and text
 *   label    sm Body/SM · md Body/MD · color input/label
 *   support  sm Caption/SM · md Caption/MD · color input/helper
 *   text gap 4px
 *
 * Unlike the checkbox, a selected radio keeps the white fill and shows a
 * brand ring with a brand dot — it never fills solid.
 */
export type RadioSize = "sm" | "md";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: RadioSize;
  label?: React.ReactNode;
  /** Second line under the label. Mirrors `Supporting text`. */
  description?: React.ReactNode;
  containerClassName?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ size = "sm", label, description, className, containerClassName, disabled, id, ...props }, ref) => {
    const autoId = React.useId();
    const radioId = id ?? autoId;

    return (
      <div className={cx("ids-radio", containerClassName)}>
        <span className={cx("ids-radio__box", `ids-radio__box--${size}`)}>
          <input
            ref={ref}
            id={radioId}
            type="radio"
            disabled={disabled}
            className={cx("ids-radio__input", `ids-radio__input--${size}`, className)}
            {...props}
          />
          <span aria-hidden="true" className={cx("ids-radio__dot", `ids-radio__dot--${size}`)} />
        </span>

        {(label || description) && (
          <span className="ids-radio__text">
            {label && (
              <label
                htmlFor={radioId}
                className={cx(
                  "ids-radio__label",
                  `ids-radio__label--${size}`,
                  disabled ? "ids-radio__label--disabled" : null
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <span
                className={cx(
                  "ids-radio__support",
                  `ids-radio__support--${size}`,
                  disabled ? "ids-radio__support--disabled" : null
                )}
              >
                {description}
              </span>
            )}
          </span>
        )}
      </div>
    );
  }
);
Radio.displayName = "Radio";
