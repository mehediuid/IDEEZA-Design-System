import * as React from "react";
import { cva } from "../../lib/cva";
import type { VariantProps } from "../../lib/types";
import { cn } from "../../lib/cn";
import { AlertCircle, CheckCircle, Close, InformationCircle } from "../../lib/icons";

/**
 * Banner — mirrors Figma `M03 Banner` (Molecules — Feedback).
 *
 * Figma variant map:
 * - Severity → `severity` (Info · Success · Warning · Error · Neutral)
 *
 * Full-bleed strip: radius 6, padding 8/8/8/12 — tighter on the right because
 * the actions sit there — gap 6, 24px icon, content gap 4, actions gap 6.
 * Neutral is the one severity with no counterpart in Alert: bg/subtle with
 * border/default, for messages that are not a state at all.
 *
 * Sits above a page rather than inside a form; Alert is the boxed in-page
 * version and InlineMessage the one-line note.
 */
export const bannerVariants = cva(
  "flex w-full items-center gap-[6px] rounded-[6px] border py-[8px] pl-[12px] pr-[8px]",
  {
    variants: {
      severity: {
        info: "bg-bg-info-subtle border-border-blue",
        success: "bg-bg-success-subtle border-border-success",
        warning: "bg-bg-warning-subtle border-border-warning",
        error: "bg-bg-error-subtle border-border-error",
        neutral: "bg-bg-subtle border-border",
      },
    },
    defaultVariants: { severity: "info" },
  }
);

const accent = {
  info: "text-icon-blue",
  success: "text-icon-success",
  warning: "text-icon-warning",
  error: "text-icon-error",
  neutral: "text-icon",
} as const;

const glyph = {
  info: InformationCircle,
  success: CheckCircle,
  warning: AlertCircle,
  error: AlertCircle,
  neutral: InformationCircle,
} as const;

export interface BannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof bannerVariants> {
  severity?: keyof typeof glyph;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons or links, laid out at 6px like Figma's actions frame. */
  actions?: React.ReactNode;
  onDismiss?: () => void;
  hideIcon?: boolean;
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, severity = "info", title, description, actions, onDismiss, hideIcon, children, ...props }, ref) => {
    const Glyph = glyph[severity];
    return (
      <div ref={ref} role="status" className={cn(bannerVariants({ severity }), className)} {...props}>
        {!hideIcon && (
          <span className={cn("inline-flex size-[24px] shrink-0 items-center justify-center", accent[severity])}>
            <Glyph className="size-[20px]" aria-hidden="true" />
          </span>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
          {title && <span className="text-body-sm-medium text-text-primary">{title}</span>}
          {description && <span className="text-caption-md text-text-secondary">{description}</span>}
          {children}
        </div>

        {actions && <div className="flex shrink-0 items-center gap-[6px]">{actions}</div>}

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="inline-flex size-[24px] shrink-0 items-center justify-center rounded-[4px] text-icon outline-none transition-colors duration-interaction ease-decelerate hover:text-text-primary focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]"
          >
            <Close className="size-[16px]" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);
Banner.displayName = "Banner";
