import * as React from "react";
import { cn } from "../../lib/cn";
import { ColorPicker as EyedropperIcon } from "@ideeza/icons";
import {
  FieldShell,
  controlChrome,
  controlClass,
  iconClass,
  type FieldSize,
} from "../Field/Field";

/**
 * ColorPicker — mirrors Figma `A13 Color Picker` (Atoms — Input), 30 variants.
 *
 * Figma variant map:
 * - Size  → `size`  (32 · 36 · 40 · 44 · 48)
 * - State → focus / filled / `error` / `disabled`
 *
 * The field ramp again, with padding flat at 12 either side because the swatch
 * is a block rather than an icon. What A13 adds: a 28px swatch at radius 4
 * showing the current colour, a text/tertiary `#`, the hex in Code/MD, and the
 * eyedropper glyph. The swatch doubles as the native colour input, so the OS
 * picker opens on click without a second control.
 */
export type ColorPickerSize = FieldSize;

/** Swatch is 28 at size 40; it tracks the control height minus the padding. */
const swatchClass: Record<FieldSize, string> = {
  32: "size-[22px]",
  36: "size-[26px]",
  40: "size-[28px]",
  44: "size-[32px]",
  48: "size-[36px]",
};

const HEX = /^#?[0-9a-fA-F]{0,6}$/;

export interface ColorPickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "value" | "defaultValue" | "onChange"> {
  size?: ColorPickerSize;
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  /** Six-digit hex, with or without the leading #. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (hex: string) => void;
  containerClassName?: string;
}

export const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  (
    { className, containerClassName, size = 40, label, required, helperText, error, disabled,
      value, defaultValue = "#7C2DB9", onValueChange, id, ...props },
    ref
  ) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    const [inner, setInner] = React.useState(defaultValue);
    const current = value ?? inner;
    const normalised = current.startsWith("#") ? current : `#${current}`;
    const complete = /^#[0-9a-fA-F]{6}$/.test(normalised);

    const set = (next: string) => {
      if (value === undefined) setInner(next);
      onValueChange?.(next);
    };

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
          className={cn(
            controlChrome,
            controlClass[size],
            error && "border-input-border-error focus-within:shadow-[0_0_0_3px_var(--color-focus-halo-danger)]",
            disabled && "pointer-events-none bg-input-bg-disabled border-input-border-disabled",
            className
          )}
        >
          <span className={cn("relative shrink-0 overflow-hidden rounded-[4px] border border-border", swatchClass[size])}>
            <span className="absolute inset-0" style={{ background: complete ? normalised : "transparent" }} aria-hidden="true" />
            <input
              type="color"
              value={complete ? normalised : "#000000"}
              onChange={(e) => set(e.target.value.toUpperCase())}
              disabled={disabled}
              aria-label="Pick a colour"
              className="absolute inset-0 size-full cursor-pointer opacity-0 outline-none"
            />
          </span>

          <span className="shrink-0 text-code-md text-text-tertiary" aria-hidden="true">#</span>
          <input
            ref={ref}
            id={inputId}
            type="text"
            inputMode="text"
            spellCheck={false}
            maxLength={6}
            disabled={disabled}
            value={normalised.slice(1).toUpperCase()}
            onChange={(e) => {
              const next = e.target.value.toUpperCase();
              if (HEX.test(next)) set(`#${next}`);
            }}
            className="min-w-0 flex-1 bg-transparent text-code-md text-input-text outline-none placeholder:text-input-placeholder"
            {...props}
          />
          <EyedropperIcon className={cn(iconClass[size], "shrink-0 text-icon")} aria-hidden="true" />
        </div>
      </FieldShell>
    );
  }
);
ColorPicker.displayName = "ColorPicker";
