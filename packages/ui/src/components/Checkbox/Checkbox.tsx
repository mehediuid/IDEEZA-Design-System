import * as React from "react";
import { cx } from "../../lib/cx";
import { Check, Minus } from "../../lib/icons";

/**
 * Checkbox — mirrors Figma `A08 Selection Control` (Type=Checkbox) and its
 * `_Checkbox base` (Atoms — Input).
 *
 * Extracted from Figma, not approximated — the measurements live in
 * `Checkbox.css`:
 *   box      sm 20×20 radius 6 · md 24×24 radius 8 · 2px border
 *   check    sm 10×8 · md 12×10 — a 16px / 20px icon/tick-02 instance
 *   row gap  16px between control and text (not 8)
 *   label    sm Body/SM · md Body/MD · color input/label
 *   support  sm Caption/SM · md Caption/MD · color input/helper
 *   text gap 4px between label and supporting text
 *
 * Colours:
 *   Unchecked  fill input/bg · border input/border · hover input/border-hover
 *   Checked    fill bg/brand · no border · hover bg/brand-hover
 *   Focused    3px focus/halo, flush
 *   Disabled   unchecked → border input/border-disabled
 *              checked   → fill input/bg-disabled
 */
export type CheckboxSize = "sm" | "md";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: CheckboxSize;
  label?: React.ReactNode;
  /** Second line under the label. Mirrors `Supporting text`. */
  description?: React.ReactNode;
  indeterminate?: boolean;
  containerClassName?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { size = "sm", label, description, indeterminate, className, containerClassName, disabled, id, ...props },
    ref
  ) => {
    const autoId = React.useId();
    const boxId = id ?? autoId;
    const inner = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inner.current as HTMLInputElement);
    React.useEffect(() => {
      if (inner.current) inner.current.indeterminate = Boolean(indeterminate);
    }, [indeterminate]);

    return (
      <div className={cx("ids-checkbox", containerClassName)}>
        <span className={cx("ids-checkbox__box", `ids-checkbox__box--${size}`)}>
          <input
            ref={inner}
            id={boxId}
            type="checkbox"
            disabled={disabled}
            className={cx("ids-checkbox__input", `ids-checkbox__input--${size}`, className)}
            {...props}
          />
          {/* Library glyphs — icon/tick-02 and icon/remove-01, exported verbatim. */}
          <Check
            className={cx("ids-checkbox__glyph", "ids-checkbox__glyph--check", `ids-checkbox__glyph--${size}`)}
          />
          <Minus
            className={cx("ids-checkbox__glyph", "ids-checkbox__glyph--minus", `ids-checkbox__glyph--${size}`)}
          />
        </span>

        {(label || description) && (
          <span className="ids-checkbox__text">
            {label && (
              <label
                htmlFor={boxId}
                className={cx(
                  "ids-checkbox__label",
                  `ids-checkbox__label--${size}`,
                  disabled ? "ids-checkbox__label--disabled" : null
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <span
                className={cx(
                  "ids-checkbox__support",
                  `ids-checkbox__support--${size}`,
                  disabled ? "ids-checkbox__support--disabled" : null
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
Checkbox.displayName = "Checkbox";
