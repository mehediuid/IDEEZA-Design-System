import * as React from "react";
import { cx } from "../../lib/cx";
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
export type SnackbarSeverity = "info" | "success" | "warning" | "error";

export function snackbarVariants(
  props: { severity?: SnackbarSeverity | null; className?: string } = {}
) {
  return cx("ids-snackbar", `ids-snackbar--${props.severity ?? "info"}`, props.className);
}

const glyph = {
  info: InformationCircle,
  success: CheckCircle,
  warning: AlertCircle,
  error: AlertCircle,
} as const;

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  severity?: SnackbarSeverity;
  action?: React.ReactNode;
  onActionClick?: () => void;
  onDismiss?: () => void;
  hideIcon?: boolean;
}

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  ({ className, severity = "info", action, onActionClick, onDismiss, hideIcon, children, ...props }, ref) => {
    const Glyph = glyph[severity];
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={snackbarVariants({ severity, className })}
        {...props}
      >
        {!hideIcon && (
          <span className="ids-snackbar__icon">
            <Glyph aria-hidden="true" />
          </span>
        )}

        <span className="ids-snackbar__message">{children}</span>

        {action && (
          <button type="button" onClick={onActionClick} className="ids-snackbar__action">
            {action}
          </button>
        )}

        {onDismiss && (
          <button type="button" onClick={onDismiss} aria-label="Dismiss" className="ids-snackbar__dismiss">
            <Close aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);
Snackbar.displayName = "Snackbar";
