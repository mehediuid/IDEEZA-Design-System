import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * Checkbox — mirrors Figma `A08 Selection Control` with `Type=Checkbox`
 * and its `_Checkbox base` (Atoms — Input).
 *
 * Figma spec:
 *   sm 20×20 · radius 6 · 2px border    md 24×24 · radius 8 · 2px border
 *   Unchecked  fill input/bg      · border input/border
 *   Hover      border input/border-hover
 *   Checked    fill bg/brand      · no border
 *   Focused    3px focus/halo ring, flush
 *   Disabled   unchecked → border input/border-disabled
 *              checked   → fill input/bg-disabled
 *
 * Supports `indeterminate`, matching the Figma `Selection=Indeterminate` variant.
 */
export type CheckboxSize = "sm" | "md";

const boxClass: Record<CheckboxSize, string> = {
  sm: "size-[20px] rounded-[6px]",
  md: "size-[24px] rounded-[8px]",
};
const labelClass: Record<CheckboxSize, string> = {
  sm: "text-[14px] leading-[20px]",
  md: "text-[16px] leading-[24px]",
};
const glyph: Record<CheckboxSize, string> = {
  sm: "size-[14px]",
  md: "size-[16px]",
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

    return (
      <div className={cn("flex items-start gap-[8px]", containerClassName)}>
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
          {/* Glyphs sit above the box and only show for the matching state. */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 m-auto text-icon-on-brand",
              "opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-0",
              "peer-disabled:text-text-disabled",
              glyph[size]
            )}
          >
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 m-auto text-icon-on-brand",
              "opacity-0 peer-indeterminate:opacity-100 peer-disabled:text-text-disabled",
              glyph[size]
            )}
          >
            <path d="M6 12h12" strokeLinecap="round" />
          </svg>
        </span>

        {(label || description) && (
          <span className="flex flex-col gap-[2px]">
            {label && (
              <label
                htmlFor={boxId}
                className={cn(
                  "cursor-pointer font-sans",
                  labelClass[size],
                  disabled ? "cursor-not-allowed text-text-disabled" : "text-text-primary"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <span
                className={cn(
                  "font-sans text-[12px] leading-[16px]",
                  disabled ? "text-text-disabled" : "text-text-tertiary"
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
