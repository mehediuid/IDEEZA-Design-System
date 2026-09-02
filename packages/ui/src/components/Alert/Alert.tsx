import * as React from "react";
import { cva } from "../../lib/cva";
import type { VariantProps } from "../../lib/types";
import { cn } from "../../lib/cn";
import { AlertCircle, CheckCircle, Close, InformationCircle } from "../../lib/icons";

/**
 * Alert — mirrors Figma `M01 Alert` (Molecules — Feedback).
 *
 * Figma variant map:
 * - Severity → `severity` (Info · Success · Warning · Error)
 * - Size     → `size`     (SM · MD)
 *
 * Measured: SM is radius 8, padding 12/14, gap 10, with an 18px icon badge
 * around a 12px glyph; MD is radius 12, padding 16/18, gap 12, badge 20 and
 * glyph 14. The badge is a filled circle in icon/<severity> with a white
 * glyph — not a tinted glyph on the surface — and the action link picks up
 * that same colour.
 *
 * Title and description stay text/primary and text/secondary in every
 * severity; only the surface, border, badge and action carry the colour.
 */
export const alertVariants = cva("flex w-full items-center border", {
  variants: {
    size: {
      sm: "gap-[10px] rounded-[8px] px-[14px] py-[12px]",
      md: "gap-[12px] rounded-[12px] px-[18px] py-[16px]",
    },
    severity: {
      info: "bg-bg-info-subtle border-border-blue",
      success: "bg-bg-success-subtle border-border-success",
      warning: "bg-bg-warning-subtle border-border-warning",
      error: "bg-bg-error-subtle border-border-error",
    },
  },
  defaultVariants: { size: "md", severity: "info" },
});

const badge = {
  info: "bg-icon-blue",
  success: "bg-icon-success",
  warning: "bg-icon-warning",
  error: "bg-icon-error",
} as const;

const accent = {
  info: "text-icon-blue",
  success: "text-icon-success",
  warning: "text-icon-warning",
  error: "text-icon-error",
} as const;

const glyph = {
  info: InformationCircle,
  success: CheckCircle,
  warning: AlertCircle,
  error: AlertCircle,
} as const;

const ramp = {
  sm: { badge: "size-[18px]", glyph: "size-[12px]", gap: "gap-[2px]", title: "text-body-sm-medium", body: "text-caption-md", dismiss: "size-[18px]" },
  md: { badge: "size-[20px]", glyph: "size-[14px]", gap: "gap-[4px]", title: "text-body-md-medium", body: "text-body-sm", dismiss: "size-[20px]" },
} as const;

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  severity?: keyof typeof badge;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** The trailing text link. Takes the severity colour, as in Figma. */
  action?: React.ReactNode;
  onActionClick?: () => void;
  onDismiss?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, size = "md", severity = "info", title, description, action, onActionClick, onDismiss, children, ...props }, ref) => {
    const s = ramp[size ?? "md"];
    const Glyph = glyph[severity];

    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ size, severity }), className)} {...props}>
        <span className={cn("inline-flex shrink-0 items-center justify-center rounded-full", badge[severity], s.badge)}>
          <Glyph className={cn(s.glyph, "text-icon-on-brand")} aria-hidden="true" />
        </span>

        <div className={cn("flex min-w-0 flex-1 flex-col", s.gap)}>
          {title && <span className={cn(s.title, "text-text-primary")}>{title}</span>}
          {description && <span className={cn(s.body, "text-text-secondary")}>{description}</span>}
          {children}
          {action && (
            <button
              type="button"
              onClick={onActionClick}
              className={cn(
                "w-fit text-left outline-none transition-colors duration-interaction ease-decelerate hover:underline focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)] rounded-[2px]",
                s.title,
                accent[severity]
              )}
            >
              {action}
            </button>
          )}
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-[4px] text-icon outline-none",
              "transition-colors duration-interaction ease-decelerate hover:text-text-primary focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
              s.dismiss
            )}
          >
            <Close className="size-[14px]" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";
