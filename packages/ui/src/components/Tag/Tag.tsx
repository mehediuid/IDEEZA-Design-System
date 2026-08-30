import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

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
export const tagVariants = cva(
  "inline-flex items-center rounded-full border font-sans whitespace-nowrap align-middle transition-colors duration-fast",
  {
    variants: {
      size: {
        sm: "h-[24px] gap-[4px] px-[8px] text-caption-sm [&_svg]:size-[12px]",
        md: "h-[28px] gap-[6px] px-[10px] text-caption-md [&_svg]:size-[16px]",
        lg: "h-[32px] gap-[6px] px-[12px] text-label-sm [&_svg]:size-[16px]",
      },
      selected: {
        true: "bg-bg-brand-subtle border-border-brand text-text-brand",
        false: "bg-bg-surface-raised border-border text-text-primary",
      },
      interactive: { true: "cursor-pointer", false: "" },
    },
    compoundVariants: [
      // Figma `State=Hover` — only on the unselected chip.
      { selected: false, interactive: true, class: "hover:bg-bg-subtle hover:border-border-strong" },
    ],
    defaultVariants: { size: "md", selected: false, interactive: false },
  }
);

/** Leading dot diameters — 7px at MD in Figma, scaled a step either side. */
const dotSize: Record<string, string> = { sm: "size-[6px]", md: "size-[7px]", lg: "size-[8px]" };

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onSelect">,
    Omit<VariantProps<typeof tagVariants>, "interactive"> {
  /** Leading status dot — mirrors `Leading=Dot`. */
  dot?: boolean;
  /** Leading avatar slot — mirrors `Leading=Avatar`. */
  avatar?: React.ReactNode;
  /** Leading icon slot — mirrors `Leading=Icon`. */
  leftIcon?: React.ReactNode;
  /** Renders the X button — mirrors the `X close` instance. */
  onDismiss?: () => void;
  /** Makes the chip clickable; also turns on the hover treatment. */
  onSelect?: () => void;
  disabled?: boolean;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, size = "md", selected, dot, avatar, leftIcon, onDismiss, onSelect, disabled, children, ...props }, ref) => {
    const key = size ?? "md";
    return (
      <span
        ref={ref}
        role={onSelect ? "button" : undefined}
        tabIndex={onSelect && !disabled ? 0 : undefined}
        aria-pressed={onSelect ? Boolean(selected) : undefined}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : onSelect}
        className={cn(
          tagVariants({ size, selected, interactive: Boolean(onSelect) && !disabled }),
          onSelect && !disabled && "outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
          // Figma `State=Disabled` is a flat 50% on the whole chip.
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {dot && <span className={cn("shrink-0 rounded-full bg-text-primary", dotSize[key])} aria-hidden="true" />}
        {avatar}
        {leftIcon}
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
            className="-mr-[2px] inline-flex shrink-0 items-center justify-center rounded-full outline-none hover:opacity-70 focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]"
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
