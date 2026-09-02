import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cx } from "../../lib/cx";

/**
 * Button — mirrors Figma `A01 Button` (Atoms — Action), 480 variants.
 *
 * Figma variant map:
 * - Hierarchy → `variant` — all 8: Primary, Secondary, Ghost, Danger,
 *   Tonal, Outline brand, Inverse, AI
 * - Size      → `size`    — SM 32 · MD 36 · LG 40 · XL 44 · 2XL 48
 * - State     → interaction pseudo-classes + `disabled` + `loading`
 * - Has icon leading/trailing → `leftIcon` / `rightIcon`
 *
 * The measurements live in `Button.css`, one block per hierarchy and one per
 * size, so the stylesheet reads the way the Figma variant panel does. This
 * component's only job is to name which blocks apply.
 *
 * The CSS is deliberately not imported here. A library that imports CSS from
 * its JS forces every consumer's bundler to handle that, which breaks plain
 * Node and server components; `styles.css` is one explicit import instead.
 * `packages/ui/src/styles/index.css` is what collects the component sheets.
 */

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "tonal"
  | "outline"
  | "inverse"
  | "ai";

export type ButtonSize = "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * The three hierarchies that carry `Depth/Top-line accent` in Figma. They are
 * the ones that lift on hover; a flat control that lifts looks detached from
 * the surface, so the rest swell in place instead.
 */
const RAISED: readonly ButtonVariant[] = ["primary", "danger", "ai"];

/**
 * The class list for a given hierarchy and size — exported so a consumer can
 * put a button's look on something that is not a `<button>`, the way
 * `buttonVariants` did before.
 */
export function buttonVariants(
  props: { variant?: ButtonVariant | null; size?: ButtonSize | null; className?: string } = {}
) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "lg";
  return cx(
    "ideeza-button",
    `ideeza-button--${variant}`,
    `ideeza-button--${size}`,
    RAISED.includes(variant) ? "ideeza-button--raised" : "ideeza-button--flat",
    props.className
  );
}

function Spinner() {
  return (
    <svg className="ideeza-button__spinner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant | null;
  size?: ButtonSize | null;
  /** Render as the child element (e.g. a link) via Radix Slot. */
  asChild?: boolean;
  /**
   * Shows a spinner and blocks interaction. Mirrors Figma `State=Loading`.
   * Keeps the hierarchy's own colours — loading is not a disabled state.
   */
  loading?: boolean;
  /** Icon before the label. Mirrors `Has icon leading`. */
  leftIcon?: React.ReactNode;
  /** Icon after the label. Mirrors `Has icon trailing`. */
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, disabled, leftIcon, rightIcon, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={buttonVariants({
          variant,
          size,
          className: cx(loading && "ideeza-button--loading", className),
        })}
        disabled={disabled || undefined}
        aria-busy={loading || undefined}
        aria-disabled={loading || undefined}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading ? <Spinner /> : leftIcon}
            {children}
            {!loading && rightIcon}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";
