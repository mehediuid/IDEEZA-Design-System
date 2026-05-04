import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn.js";

/**
 * Button — IDEEZA Design System
 * Source: Figma › ⚛️ Atoms — Action › Button (A01)
 *
 * Variants from Figma: Primary, Secondary, Blue, Ghost, Danger
 * Sizes from Figma: sm (32), md (40), lg (48), xl (56)
 *
 * Use the `asChild` prop to render as a different element while preserving
 * the styling — useful for `<a>` tags inside Next.js's `<Link>`.
 */
const buttonVariants = cva(
  // Base — applies to all variants
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium whitespace-nowrap select-none",
    "rounded-lg",
    "transition-colors duration-fast ease-standard",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page",
    "disabled:cursor-not-allowed disabled:bg-button-disabled-bg disabled:text-button-disabled-text disabled:border-transparent",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-button-primary-bg text-button-primary-text",
          "hover:bg-button-primary-bg-hover",
          "active:bg-button-primary-bg-pressed",
        ],
        secondary: [
          "bg-button-secondary-bg text-button-secondary-text",
          "border-1 border-button-secondary-border",
          "hover:bg-bg-subtle",
          "active:bg-bg-surface-raised",
        ],
        blue: [
          "bg-bg-blue text-text-on-brand",
          "hover:bg-blue-600",
          "active:bg-blue-700",
        ],
        ghost: [
          "bg-transparent text-button-ghost-text",
          "hover:bg-button-ghost-bg-hover",
          "active:bg-bg-surface-raised",
        ],
        danger: [
          "bg-button-danger-bg text-text-on-brand",
          "hover:bg-red-600",
          "active:bg-red-700",
        ],
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-md",
        lg: "h-12 px-5 text-md",
        xl: "h-14 px-6 text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render the children as a child element instead of a `<button>`. */
  asChild?: boolean;
  /** Optional left-side icon. */
  leftIcon?: React.ReactNode;
  /** Optional right-side icon. */
  rightIcon?: React.ReactNode;
  /** Show a loading spinner and disable interactions. */
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      leftIcon,
      rightIcon,
      loading,
      disabled,
      children,
      ...props
    },
    ref,
  ) {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <Spinner size={size ?? "md"} />
        ) : leftIcon ? (
          <span aria-hidden className="inline-flex">{leftIcon}</span>
        ) : null}
        {children}
        {!loading && rightIcon ? (
          <span aria-hidden className="inline-flex">{rightIcon}</span>
        ) : null}
      </Comp>
    );
  },
);

function Spinner({ size }: { size: "sm" | "md" | "lg" | "xl" }) {
  const dimension = size === "sm" ? 14 : size === "md" ? 16 : size === "lg" ? 18 : 20;
  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="Loading"
      className="animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.25"
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export { buttonVariants };
