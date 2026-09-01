import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import { Spinner } from "../Spinner/Spinner";

/**
 * LoadingState — mirrors Figma `M50 Loading` (Molecules — States).
 *
 * Figma variant map:
 * - Style → `variant` (Page · Inline · Compact)
 *
 * The three are not one layout at three sizes:
 *   Page     vertical, padding 48, gap 16, XL spinner, Heading/H4 and a
 *            Body/MD line in text/tertiary
 *   Inline   vertical, padding 32, gap 16, LG spinner, Heading/H6, no
 *            second line
 *   Compact  horizontal, padding 20, gap 10, MD spinner, Body/SM Medium
 * Only Page carries the description, and only Compact runs on one row.
 */
export const loadingStateVariants = cva("flex items-center bg-bg-surface", {
  variants: {
    variant: {
      page: "flex-col gap-[16px] p-[48px]",
      inline: "flex-col gap-[16px] p-[32px]",
      compact: "flex-row gap-[10px] p-[20px]",
    },
  },
  defaultVariants: { variant: "page" },
});

const spinnerSize = { page: "xl", inline: "lg", compact: "md" } as const;
const labelClass = {
  page: "text-heading-h4 text-text-primary",
  inline: "text-heading-h6 text-text-primary",
  compact: "text-body-sm-medium text-text-primary",
} as const;

export interface LoadingStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingStateVariants> {
  variant?: keyof typeof spinnerSize;
  label?: React.ReactNode;
  /** Second line. Figma shows it on Page only; passing it elsewhere still renders. */
  description?: React.ReactNode;
}

export const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ className, variant = "page", label = "Loading", description, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={cn(loadingStateVariants({ variant }), className)}
      {...props}
    >
      <Spinner size={spinnerSize[variant]} />
      {label && <span className={labelClass[variant]}>{label}</span>}
      {description && <span className="text-body-md text-text-tertiary">{description}</span>}
    </div>
  )
);
LoadingState.displayName = "LoadingState";
