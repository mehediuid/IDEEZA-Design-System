import * as React from "react";
import { cn } from "../../lib/cn";
import { Search as SearchIcon, Close } from "../../lib/icons";
import {
  FieldShell,
  controlChrome,
  controlClass,
  iconClass,
  valueClass,
  type FieldSize,
} from "../Field/Field";

/**
 * Search — mirrors Figma `A07 Search` (Atoms — Input), 30 variants.
 *
 * Figma variant map:
 * - Size  → `size`  (32 · 36 · 40 · 44 · 48)
 * - State → focus / filled / `error` / `disabled`
 *
 * Confirmed against Text Input: the same field ramp — height, radius 12 at 40,
 * gap 8, padding 12, 1.5px input/border. What A07 adds is the fixed leading
 * search glyph and a trailing clear that only appears once there is a value,
 * so the two icon slots are not free for callers to use.
 */
export type SearchSize = FieldSize;

export interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: SearchSize;
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  /** Called when the clear button is pressed. */
  onClear?: () => void;
  containerClassName?: string;
}

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    { className, containerClassName, size = 40, label, required, helperText, error, disabled, onClear, id, value, defaultValue, ...props },
    ref
  ) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    const [inner, setInner] = React.useState(defaultValue ?? "");
    const current = value !== undefined ? value : inner;
    const hasValue = String(current ?? "").length > 0;

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
          <SearchIcon className={cn(iconClass[size], "shrink-0 text-icon")} aria-hidden="true" />
          <input
            ref={ref}
            id={inputId}
            type="search"
            role="searchbox"
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            onChange={(e) => {
              if (value === undefined) setInner(e.target.value);
              props.onChange?.(e);
            }}
            className={cn(
              "min-w-0 flex-1 bg-transparent outline-none",
              "text-input-text placeholder:text-input-placeholder",
              // Chrome draws its own clear affordance on type=search.
              "[&::-webkit-search-cancel-button]:appearance-none",
              valueClass[size]
            )}
            {...props}
          />
          {hasValue && onClear && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear search"
              className={cn("shrink-0 rounded-full text-icon outline-none transition-colors duration-interaction ease-decelerate hover:text-text-primary focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]", iconClass[size])}
            >
              <Close className="size-full" aria-hidden="true" />
            </button>
          )}
        </div>
      </FieldShell>
    );
  }
);
Search.displayName = "Search";
