import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

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
 * Geometry is taken from the Figma variants, not guessed:
 *   SM  32px · radius/lg  8 · px 12 · gap 6 · 12/16 semibold
 *   MD  36px · radius/lg  8 · px 12 · gap 6 · 12/16 semibold
 *   LG  40px · radius/xl 12 · px 16 · gap 6 · 14/20 semibold
 *   XL  44px · radius/xl 12 · px 20 · gap 8 · 14/20 semibold
 *   2XL 48px · radius/2xl 16 · px 20 · gap 8 · 16/20 semibold
 *
 * Focus is the soft halo — 3px spread at offset 0, flush against the edge,
 * per-variant colour (`focus-halo`, `-on-fill`, `-danger`, `-inverse`).
 *
 * Depth: Primary, Danger and AI carry the Figma `Depth/Top-line accent`
 * effect (`shadow-depth-accent`). Every other hierarchy is flat — Inverse
 * was deliberately flattened.
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap select-none",
    "font-sans font-semibold transition-[colors,box-shadow] duration-fast ease-standard",
    "outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
    // Figma: every hierarchy collapses to the same Disabled treatment —
    // disabled-bg + disabled-text, no border, no depth. Ghost and Outline
    // are NOT transparent when disabled.
    "disabled:pointer-events-none disabled:shadow-none",
    "disabled:bg-button-disabled-bg disabled:bg-none",
    "disabled:text-button-disabled-text disabled:border-transparent",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-button-primary-bg text-button-primary-text shadow-depth-accent",
          "hover:bg-button-primary-bg-hover active:bg-button-primary-bg-pressed",
          "focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-on-fill)]",
        ],
        secondary: [
          "bg-button-secondary-bg text-button-secondary-text",
          "border-[1.5px] border-button-secondary-border",
          "hover:bg-button-secondary-bg-hover hover:border-button-secondary-border-hover",
          "active:bg-button-secondary-bg-pressed active:border-button-secondary-border-hover",
          "focus-visible:border-border-focus",
        ],
        ghost: [
          // Figma: Ghost label uses button/secondary-text, not ghost-text.
          "bg-transparent text-button-secondary-text",
          "hover:bg-button-ghost-bg-hover active:bg-bg-surface-raised",
        ],
        danger: [
          // Figma: Danger label is button/primary-text (white), same value as danger-text.
          "bg-button-danger-bg text-button-primary-text shadow-depth-accent",
          "hover:bg-button-danger-bg-hover active:bg-button-danger-bg-pressed",
          "focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-danger)]",
        ],
        tonal: [
          "bg-button-tonal-bg text-button-tonal-text",
          "hover:bg-button-tonal-bg-hover active:bg-button-tonal-bg-pressed",
          "focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo-on-fill)]",
        ],
        outline: [
          // Border stays brand in every state — only the fill changes.
          "bg-transparent text-text-brand",
          "border-[1.5px] border-border-brand",
          "hover:bg-button-outline-bg-hover active:bg-button-outline-bg-pressed",
        ],
        inverse: [
          "bg-button-inverse-bg text-button-inverse-text",
          "hover:bg-button-inverse-bg-hover active:bg-button-inverse-bg-pressed",
          "focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo-inverse)]",
        ],
        ai: [
          // Figma paint style `Brand/AI gradient` — violet/600 → blue/600.
          "bg-ai text-text-on-brand shadow-depth-accent",
          "hover:bg-ai-hover active:bg-ai-pressed",
          "focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-on-fill)]",
        ],
      },
      size: {
        sm: "h-[32px] rounded-[8px] px-[12px] gap-[6px] text-[12px] leading-[16px] [&_svg]:size-[14px]",
        md: "h-[36px] rounded-[8px] px-[12px] gap-[6px] text-[12px] leading-[16px] [&_svg]:size-[16px]",
        lg: "h-[40px] rounded-[12px] px-[16px] gap-[6px] text-[14px] leading-[20px] [&_svg]:size-[16px]",
        xl: "h-[44px] rounded-[12px] px-[20px] gap-[8px] text-[14px] leading-[20px] [&_svg]:size-[20px]",
        "2xl": "h-[48px] rounded-[16px] px-[20px] gap-[8px] text-[16px] leading-[20px] [&_svg]:size-[20px]",
      },
    },
    defaultVariants: { variant: "primary", size: "lg" },
  }
);

const spinnerSize: Record<string, string> = {
  sm: "size-[14px]",
  md: "size-[16px]",
  lg: "size-[16px]",
  xl: "size-[20px]",
  "2xl": "size-[20px]",
};

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
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
    const sz = size ?? "lg";
    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          // Loading keeps its colours but blocks input — disabled would grey it out.
          loading && "pointer-events-none",
          className
        )}
        disabled={disabled || undefined}
        aria-busy={loading || undefined}
        aria-disabled={loading || undefined}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading ? <Spinner className={spinnerSize[sz]} /> : leftIcon}
            {children}
            {!loading && rightIcon}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";
