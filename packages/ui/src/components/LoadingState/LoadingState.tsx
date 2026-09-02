import * as React from "react";
import { cx } from "../../lib/cx";
import { Spinner, type SpinnerSize } from "../Spinner/Spinner";

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
export type LoadingStateVariant = "page" | "inline" | "compact";

export function loadingStateVariants(
  props: { variant?: LoadingStateVariant | null; className?: string } = {}
) {
  return cx("ids-loading-state", `ids-loading-state--${props.variant ?? "page"}`, props.className);
}

const spinnerSize: Record<LoadingStateVariant, SpinnerSize> = {
  page: "xl",
  inline: "lg",
  compact: "md",
};

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: LoadingStateVariant;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ className, variant = "page", label = "Loading", description, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={loadingStateVariants({ variant, className })}
      {...props}
    >
      <Spinner size={spinnerSize[variant]} />
      {label && <span className="ids-loading-state__label">{label}</span>}
      {description && <span className="ids-loading-state__description">{description}</span>}
    </div>
  )
);
LoadingState.displayName = "LoadingState";
