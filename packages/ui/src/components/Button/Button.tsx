import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Button — mirrors Figma `A01 Button` (Atoms — Action).
 *
 * Figma variant map:
 * - Hierarchy → `variant`  (Primary / Secondary / Ghost / Danger)
 * - Size      → `size`     (SM / MD / LG / XL / 2XL)
 * - State     → interaction pseudo-classes + `disabled` + `loading`
 * - Has icon leading/trailing → `leftIcon` / `rightIcon`
 *
 * Focus ring matches the Figma `State=Focus` variants:
 * 2px `border/focus` ring with 2px offset.
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap select-none",
    "font-sans font-semibold transition-colors duration-fast ease-standard",
    "outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page",
    "disabled:pointer-events-none disabled:bg-bg-subtle disabled:text-text-disabled",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-button-primary-bg text-button-primary-text",
          "hover:bg-button-primary-bg-hover active:bg-button-primary-bg-pressed",
        ],
        secondary: [
          "bg-button-secondary-bg text-button-secondary-text",
          "border border-button-secondary-border",
          "hover:bg-bg-subtle active:bg-bg-surface-raised",
          "disabled:border-transparent",
        ],
        ghost: [
          "bg-transparent text-text-primary",
          "hover:bg-button-ghost-bg-hover active:bg-bg-surface-raised",
          "disabled:bg-transparent",
        ],
        danger: [
          "bg-button-danger-bg text-text-on-brand",
          "hover:bg-[var(--color-red-600)] active:bg-[var(--color-red-700)]",
        ],
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-10 rounded-lg px-4 text-sm",
        lg: "h-11 rounded-lg px-5 text-sm",
        xl: "h-12 rounded-lg px-6 text-md",
        "2xl": "h-14 rounded-xl px-8 text-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

const spinnerSize: Record<string, string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4",
  xl: "size-5",
  "2xl": "size-5",
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
  /** Shows a spinner and disables interaction. Mirrors Figma `State=Loading`. */
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
    const sz = size ?? "md";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
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
