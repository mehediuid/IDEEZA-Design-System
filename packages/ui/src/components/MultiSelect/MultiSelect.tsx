import * as React from "react";
import { cx } from "../../lib/cx";
import { ChevronDown } from "../../lib/icons";
import { Tag } from "../Tag/Tag";
import {
  FieldShell,
  controlChrome,
  controlClass,
  valueClass,
  type FieldSize,
} from "../Field/Field";

/**
 * MultiSelect — mirrors Figma `A14 Multi-select` (Atoms — Input), 150 variants.
 *
 * Figma variant map:
 * - Size  → `size`  (32 · 36 · 40 · 44 · 48)
 * - Tags  → `value` (0 · 1 · 2 · 3 · 4+)
 * - State → focus / filled / `error` / `disabled`
 *
 * The field ramp again, with vertical padding at 4 rather than 10 so the tag
 * row sits centred. Each chip is an A18 Tag instance at SM — Caption/SM label,
 * 12px X close — so the same component renders them here rather than a
 * lookalike; gap between chips is 4.
 *
 * The menu is a listbox rather than a native select, because a native one
 * cannot show chips. Keyboard: arrows move, Enter and Space toggle, Escape
 * closes, Backspace on an empty query removes the last chip.
 *
 * Error and disabled ride the field chrome's `data-invalid` / `data-disabled`
 * treatment, the same as every other control.
 */
export type MultiSelectSize = FieldSize;

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  size?: MultiSelectSize;
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  disabled?: boolean;
  placeholder?: string;
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  /** Show at most this many chips; the rest collapse into a +N chip. */
  maxTags?: number;
  id?: string;
  className?: string;
  containerClassName?: string;
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    { size = 40, label, required, helperText, error, disabled, placeholder = "Select…",
      options, value, defaultValue = [], onValueChange, maxTags, id, className, containerClassName },
    ref
  ) => {
    const autoId = React.useId();
    const fieldId = id ?? autoId;
    const invalid = Boolean(error);
    const [inner, setInner] = React.useState<string[]>(defaultValue);
    const selected = value ?? inner;
    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState(0);
    const rootRef = React.useRef<HTMLDivElement>(null);

    const commit = (next: string[]) => {
      if (value === undefined) setInner(next);
      onValueChange?.(next);
    };
    const toggle = (v: string) =>
      commit(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);

    // Close on any click that lands outside the field and its menu.
    React.useEffect(() => {
      if (!open) return;
      const onDown = (e: PointerEvent) => {
        if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("pointerdown", onDown);
      return () => document.removeEventListener("pointerdown", onDown);
    }, [open]);

    const chips = maxTags ? selected.slice(0, maxTags) : selected;
    const hidden = selected.length - chips.length;
    const labelOf = (v: string) => options.find((o) => o.value === v)?.label ?? v;

    const onKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
        setActive((i) => Math.min(i + 1, options.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const option = options[active];
        if (open && option && !option.disabled) toggle(option.value);
        else if (!open) setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "Backspace" && selected.length) {
        commit(selected.slice(0, -1));
      }
    };

    return (
      <FieldShell
        size={size}
        label={label}
        required={required}
        helperText={helperText}
        error={error}
        disabled={disabled}
        htmlFor={fieldId}
        className={containerClassName}
      >
        <div ref={rootRef} className="ids-multi-select__root">
          <div
            ref={ref}
            id={fieldId}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : 0}
            onClick={() => !disabled && setOpen((o) => !o)}
            onKeyDown={onKeyDown}
            data-invalid={invalid}
            data-disabled={Boolean(disabled)}
            className={cx(controlChrome, controlClass[size], "ids-multi-select", className)}
          >
            <span className="ids-multi-select__tags">
              {chips.map((v) => (
                <Tag
                  key={v}
                  size="sm"
                  disabled={disabled}
                  onDismiss={() => commit(selected.filter((x) => x !== v))}
                >
                  {labelOf(v)}
                </Tag>
              ))}
              {hidden > 0 && <Tag size="sm">+{hidden}</Tag>}
              {selected.length === 0 && (
                <span className={cx("ids-multi-select__placeholder", valueClass[size])}>{placeholder}</span>
              )}
            </span>
            <ChevronDown
              className={cx("ids-multi-select__chevron", open ? "ids-multi-select__chevron--open" : null)}
              aria-hidden="true"
            />
          </div>

          {open && (
            <ul role="listbox" aria-multiselectable="true" className="ids-multi-select__menu">
              {options.map((o, i) => {
                const on = selected.includes(o.value);
                return (
                  <li
                    key={o.value}
                    role="option"
                    aria-selected={on}
                    aria-disabled={o.disabled || undefined}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      if (!o.disabled) toggle(o.value);
                    }}
                    onPointerEnter={() => setActive(i)}
                    className={cx(
                      "ids-multi-select__option",
                      valueClass[size],
                      o.disabled ? "ids-multi-select__option--disabled" : null,
                      i === active && !o.disabled ? "ids-multi-select__option--active" : null,
                      on ? "ids-multi-select__option--selected" : null
                    )}
                  >
                    {o.label}
                    {on && <span aria-hidden="true">✓</span>}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </FieldShell>
    );
  }
);
MultiSelect.displayName = "MultiSelect";
