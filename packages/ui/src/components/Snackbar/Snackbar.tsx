import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import { AlertCircle, CheckCircle, Close, InformationCircle } from "../../lib/icons";

/**
 * Snackbar — mirrors Figma `M04 Snackbar` (Molecules — Feedback).
 *
 * Figma variant map:
 * - Severity → `severity` (Info · Success · Warning · Error)
 *
 * 400 x 48 at radius 8, padding 6/6/6/8, gap 6. The surface is bg/inverse in
 * every severity — the colour lives only in the 20px icon badge and the
 * action, so a snackbar reads the same at a glance whatever happened. The
 * message is Body/SM Medium in text/inverse.
 *
 * This is the transient, bottom-of-screen form; Alert is the one that stays
 * on the page and Banner the one that spans it.
 */
export const snackbarVariants = cva(
  "flex items-center gap-[6px] rounded-[8px] bg-bg-inverse py-[6px] pl-[8px] pr-[6px] shadow-3",
  {
    variants: {
      severity: { info: "", success: "", warning: "", error: "" },
    },
    defaultVariants: { severity: "info" },
  }
);

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

export interface SnackbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof snackbarVariants> {
  severity?: keyof typeof badge;
  /** Single trailing action — Figma shows UNDO. */
  action?: React.ReactNode;
  onActionClick?: () => void;
  onDismiss?: () => void;
  hideIcon?: boolean;
}

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  ({ className, severity = "info", action, onActionClick, onDismiss, hideIcon, children, ...props }, ref) => {
    const Glyph = glyph[severity];
    return (
      <div ref={ref} role="status" aria-live="polite" className={cn(snackbarVariants({ severity }), className)} {...props}>
        {!hideIcon && (
          <span className={cn("inline-flex size-[20px] shrink-0 items-center justify-center rounded-full", badge[severity])}>
            <Glyph className="size-[14px] text-icon-on-brand" aria-hidden="true" />
          </span>
        )}

        <span className="min-w-0 flex-1 text-body-sm-medium text-text-inverse">{children}</span>

        {action && (
          <button
            type="button"
            onClick={onActionClick}
            className={cn(
              "shrink-0 rounded-[4px] px-[4px] text-body-sm-medium outline-none",
              "transition-colors duration-interaction ease-decelerate hover:underline focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
              accent[severity]
            )}
          >
            {action}
          </button>
        )}

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="inline-flex size-[20px] shrink-0 items-center justify-center rounded-[4px] text-text-inverse outline-none transition-opacity duration-interaction ease-decelerate hover:opacity-70 focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]"
          >
            <Close className="size-[14px]" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);
Snackbar.displayName = "Snackbar";
