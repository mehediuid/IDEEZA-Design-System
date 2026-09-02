import * as React from "react";
import { cx } from "../../lib/cx";

/**
 * Tag — mirrors Figma `A18 Tag` (Atoms — Display).
 *
 * Figma variant map:
 * - Size    → `size`    (SM 24 · MD 28 · LG 32)
 * - State   → `selected` prop, plus native hover and `disabled`
 * - Leading → `dot` / `avatar` / `leftIcon`
 * - X close → `onDismiss`
 *
 * Not to be confused with Badge (`A17`): Badge is a status marker with colour
 * families, Tag is a neutral chip the user can select or remove. Tag therefore
 * carries a border in every state and has no colour prop.
 */
export type TagSize = "sm" | "md" | "lg";

export function tagVariants(
  props: {
    size?: TagSize | null;
    selected?: boolean | null;
    interactive?: boolean;
    disabled?: boolean;
    className?: string;
  } = {}
) {
  return cx(
    "ids-tag",
    `ids-tag--${props.size ?? "md"}`,
    props.selected ? "ids-tag--selected" : "ids-tag--unselected",
    props.interactive && "ids-tag--interactive",
    props.disabled && "ids-tag--disabled",
    props.className
  );
}

/** Leading avatar — 12 / 16 / 18. Passed through so callers need not guess. */
export const tagAvatarSize = { sm: 12, md: 16, lg: 18 } as const;

export interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onSelect"> {
  size?: TagSize | null;
  selected?: boolean | null;
  /** Leading status dot — mirrors `Leading=Dot`. */
  dot?: boolean;
  /** Leading avatar slot — mirrors `Leading=Avatar`. */
  avatar?: React.ReactNode;
  /** Leading icon slot — mirrors `Leading=Icon`. */
  leftIcon?: React.ReactNode;
  /** Renders the X button — mirrors the `X close` instance. */
  onDismiss?: () => void;
  /** Makes the chip clickable; also turns on the hover and press treatment. */
  onSelect?: () => void;
  disabled?: boolean;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, size = "md", selected, dot, avatar, leftIcon, onDismiss, onSelect, disabled, children, ...props }, ref) => {
    const interactive = Boolean(onSelect) && !disabled;
    return (
      <span
        ref={ref}
        role={onSelect ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-pressed={onSelect ? Boolean(selected) : undefined}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : onSelect}
        className={tagVariants({ size, selected, interactive, disabled, className })}
        {...props}
      >
        {dot && <span className="ids-tag__dot" aria-hidden="true" />}
        {avatar && <span className="ids-tag__avatar">{avatar}</span>}
        {leftIcon && <span className="ids-tag__icon">{leftIcon}</span>}
        {children}
        {onDismiss && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            disabled={disabled}
            aria-label="Remove"
            className="ids-tag__dismiss"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);
Tag.displayName = "Tag";
