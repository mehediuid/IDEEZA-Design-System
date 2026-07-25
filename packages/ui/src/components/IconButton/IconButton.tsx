import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * IconButton — mirrors Figma `A02 Icon Button` (Atoms — Action).
 * Square icon-only button. `aria-label` is required for accessibility.
 */
export const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0 select-none",
    "transition-colors duration-fast ease-standard",
    "outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page",
    "disabled:pointer-events-none disabled:bg-bg-subtle disabled:text-text-disabled",
  ],
  {
    variants: {
      variant: {
        primary: "bg-button-primary-bg text-button-primary-text hover:bg-button-primary-bg-hover active:bg-button-primary-bg-pressed",
        secondary: "bg-button-secondary-bg text-button-secondary-text border border-button-secondary-border hover:bg-bg-subtle disabled:border-transparent",
        ghost: "bg-transparent text-text-secondary hover:bg-button-ghost-bg-hover hover:text-text-primary disabled:bg-transparent",
        danger: "bg-button-danger-bg text-text-on-brand hover:bg-[var(--color-red-600)]",
      },
      size: {
        sm: "size-8 rounded-md [&_svg]:size-4",
        md: "size-10 rounded-lg [&_svg]:size-5",
        lg: "size-11 rounded-lg [&_svg]:size-5",
        xl: "size-12 rounded-lg [&_svg]:size-6",
      },
    },
    defaultVariants: { variant: "ghost", size: "md" },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /** Accessible name — required since there is no visible label. */
  "aria-label": string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <button ref={ref} className={cn(iconButtonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  )
);
IconButton.displayName = "IconButton";
