import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * Checkbox — mirrors Figma `A08 Selection Control` (Type=Checkbox) and its
 * `_Checkbox base` (Atoms — Input).
 *
 * Extracted from Figma, not approximated:
 *   box      sm 20×20 radius 6 · md 24×24 radius 8 · 2px border
 *   check    sm 10×8 · md 12×10
 *   row gap  16px between control and text (not 8)
 *   label    sm 14/20 regular · md 16/24 regular · color input/label
 *   support  sm 11/16 regular · md 12/16 regular · color input/helper
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

const boxClass: Record<CheckboxSize, string> = {
  sm: "size-[20px] rounded-[6px]",
  md: "size-[24px] rounded-[8px]",
};
/** Figma check vector bounds. */
const checkSize: Record<CheckboxSize, { w: number; h: number }> = {
  sm: { w: 10, h: 8 },
  md: { w: 12, h: 10 },
};
const dashSize: Record<CheckboxSize, { w: number; h: number }> = {
  sm: { w: 10, h: 2 },
  md: { w: 12, h: 2 },
};
const labelClass: Record<CheckboxSize, string> = {
  sm: "text-[14px] leading-[20px]",
  md: "text-[16px] leading-[24px]",
};
const supportClass: Record<CheckboxSize, string> = {
  sm: "text-[11px] leading-[16px]",
  md: "text-[12px] leading-[16px]",
};

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

    const chk = checkSize[size];
    const dash = dashSize[size];

    return (
      <div className={cn("flex items-start gap-[16px]", containerClassName)}>
        <span className="relative inline-flex shrink-0">
          <input
            ref={inner}
            id={boxId}
            type="checkbox"
            disabled={disabled}
            className={cn(
              "peer appearance-none border-solid border-[2px] bg-input-bg border-input-border",
              "transition-[colors,box-shadow] duration-fast ease-standard outline-none",
              "hover:border-input-border-hover",
              "checked:border-transparent checked:bg-bg-brand checked:hover:bg-bg-brand-hover",
              "indeterminate:border-transparent indeterminate:bg-bg-brand",
              "focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
              "disabled:pointer-events-none disabled:border-input-border-disabled",
              "disabled:checked:bg-input-bg-disabled disabled:indeterminate:bg-input-bg-disabled",
              boxClass[size],
              className
            )}
            {...props}
          />
          {/* Check — viewBox matches the Figma vector bounds so the glyph is the right size. */}
          <svg
            viewBox="0 0 10 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            style={{ width: chk.w, height: chk.h }}
            className={cn(
              "pointer-events-none absolute inset-0 m-auto text-icon-on-brand",
              "opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-0",
              "peer-disabled:text-text-disabled"
            )}
          >
            <path d="M1 4.2 3.6 6.8 9 1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            aria-hidden="true"
            style={{ width: dash.w, height: dash.h }}
            className={cn(
              "pointer-events-none absolute inset-0 m-auto rounded-full bg-icon-on-brand",
              "opacity-0 peer-indeterminate:opacity-100",
              "peer-disabled:bg-text-disabled"
            )}
          />
        </span>

        {(label || description) && (
          <span className="flex flex-col gap-[4px]">
            {label && (
              <label
                htmlFor={boxId}
                className={cn(
                  "cursor-pointer font-sans",
                  labelClass[size],
                  disabled ? "cursor-not-allowed text-text-disabled" : "text-input-label"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <span
                className={cn(
                  "font-sans",
                  supportClass[size],
                  disabled ? "text-text-disabled" : "text-input-helper"
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
