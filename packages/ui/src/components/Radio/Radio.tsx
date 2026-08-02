import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * Radio — mirrors Figma `A08 Selection Control` with `Type=Radio`
 * and its `_Radio base` (Atoms — Input).
 *
 * Figma spec — unlike the checkbox, a selected radio keeps the white fill
 * and shows a brand ring plus a brand dot:
 *   sm 20×20 · md 24×24 · always fully round · 2px border
 *   Off       fill input/bg · border input/border
 *   Hover     border input/border-hover
 *   On        fill input/bg · border bg/brand · brand dot
 *   Focused   3px focus/halo ring, flush
 *   Disabled  border input/border-disabled
 */
export type RadioSize = "sm" | "md";

const boxClass: Record<RadioSize, string> = {
  sm: "size-[20px]",
  md: "size-[24px]",
};
const dotClass: Record<RadioSize, string> = {
  sm: "size-[8px]",
  md: "size-[10px]",
};
const labelClass: Record<RadioSize, string> = {
  sm: "text-[14px] leading-[20px]",
  md: "text-[16px] leading-[24px]",
};

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
      <div className={cn("flex items-start gap-[8px]", containerClassName)}>
        <span className="relative inline-flex shrink-0">
          <input
            ref={ref}
            id={radioId}
            type="radio"
            disabled={disabled}
            className={cn(
              "peer appearance-none rounded-full border-solid border-[2px] bg-input-bg border-input-border",
              "transition-[colors,box-shadow] duration-fast ease-standard outline-none",
              "hover:border-input-border-hover",
              "checked:border-bg-brand checked:hover:border-bg-brand-hover",
              "focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
              "disabled:pointer-events-none disabled:border-input-border-disabled",
              boxClass[size],
              className
            )}
            {...props}
          />
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 m-auto rounded-full bg-bg-brand",
              "opacity-0 peer-checked:opacity-100",
              "peer-disabled:bg-text-disabled",
              dotClass[size]
            )}
          />
        </span>

        {(label || description) && (
          <span className="flex flex-col gap-[2px]">
            {label && (
              <label
                htmlFor={radioId}
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
Radio.displayName = "Radio";
