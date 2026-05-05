import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn.js";

/**
 * Button — IDEEZA Design System
 * Source: Figma › ⚛️ Atoms — Action › A01 Button (172:1679)
 *
 * Exact Figma specs:
 *   Hierarchies: Primary · Secondary · Ghost · Danger
 *   Sizes:       SM (32) · MD (36) · LG (40) · XL (44) · 2XL (48)
 *   States:      Default · Hover · Pressed · Disabled · Loading
 *   Font:        Manrope SemiBold (600), letter-spacing 0.1px
 *
 * Use the `asChild` prop to render as a different element while preserving
 * the styling — useful for `<a>` tags inside Next.js's `<Link>`.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-display font-semibold tracking-[0.1px]",
    "whitespace-nowrap select-none",
    "transition-colors duration-fast ease-standard",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page",
    "disabled:cursor-not-allowed disabled:bg-button-disabled-bg disabled:text-button-disabled-text disabled:border-transparent",
  ],
  {
    variants: {
      hierarchy: {
        primary: [
          "bg-button-primary-bg text-button-primary-text",
          "hover:bg-button-primary-bg-hover",
          "active:bg-button-primary-bg-pressed",
        ],
        secondary: [
          "bg-button-secondary-bg text-button-secondary-text",
          "border-[1.5px] border-button-secondary-border",
          "hover:bg-bg-subtle",
          "active:bg-bg-surface-raised",
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
        // padding/gap/radius/font-size from Figma
        sm:  "px-3 py-2 gap-3 rounded-md text-sm leading-[16px]",        // h32 — 8/12 padding
        md:  "px-3 py-[10px] gap-3 rounded-md text-sm leading-[16px]",   // h36 — 10/12
        lg:  "px-4 py-[10px] gap-3 rounded-lg text-md leading-[20px]",   // h40 — 10/16
        xl:  "px-5 py-3 gap-4 rounded-lg text-md leading-[20px]",        // h44 — 12/20
        "2xl": "px-5 py-[14px] gap-4 rounded-xl text-lg leading-[20px] tracking-normal", // h48 — 14/20
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      hierarchy: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    VariantProps<typeof buttonVariants> {
  /** Render the children as a child element instead of a `<button>`. */
  asChild?: boolean;
  /** Optional left-side icon. */
  leftIcon?: React.ReactNode;
  /** Optional right-side icon. */
  rightIcon?: React.ReactNode;
  /** Show a loading spinner and disable interactions. */
  loading?: boolean;
  /** Native button type. Defaults to "button". */
  htmlType?: "button" | "submit" | "reset";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      hierarchy,
      size,
      fullWidth,
      asChild = false,
      leftIcon,
      rightIcon,
      loading,
      disabled,
      htmlType = "button",
      children,
      ...props
    },
    ref,
  ) {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    // Icon size from Figma: SM/MD/LG = 20px; XL/2XL = 24px
    const iconPx = !size || size === "sm" || size === "md" || size === "lg" ? 20 : 24;

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : htmlType}
        className={cn(buttonVariants({ hierarchy, size, fullWidth }), className)}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <Spinner px={iconPx} />
        ) : leftIcon ? (
          <span aria-hidden className="inline-flex" style={{ width: iconPx, height: iconPx }}>
            {leftIcon}
          </span>
        ) : null}
        {children}
        {!loading && rightIcon ? (
          <span aria-hidden className="inline-flex" style={{ width: iconPx, height: iconPx }}>
            {rightIcon}
          </span>
        ) : null}
      </Comp>
    );
  },
);

function Spinner({ px }: { px: number }) {
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="Loading"
      className="animate-spin"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
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
