import * as React from "react";
import { cx } from "../../lib/cx";
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
export type AlertSize = "sm" | "md";
export type AlertSeverity = "info" | "success" | "warning" | "error";

export function alertVariants(
  props: { size?: AlertSize | null; severity?: AlertSeverity | null; className?: string } = {}
) {
  return cx(
    "ids-alert",
    `ids-alert--${props.size ?? "md"}`,
    `ids-alert--${props.severity ?? "info"}`,
    props.className
  );
}

const glyph = {
  info: InformationCircle,
  success: CheckCircle,
  warning: AlertCircle,
  error: AlertCircle,
} as const;

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  size?: AlertSize | null;
  severity?: AlertSeverity;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  onActionClick?: () => void;
  onDismiss?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, size = "md", severity = "info", title, description, action, onActionClick, onDismiss, children, ...props }, ref) => {
    const Glyph = glyph[severity];
    return (
      <div ref={ref} role="alert" className={alertVariants({ size, severity, className })} {...props}>
        <span className="ids-alert__badge">
          <Glyph aria-hidden="true" />
        </span>
        <div className="ids-alert__body">
          {title && <span className="ids-alert__title">{title}</span>}
          {description && <span className="ids-alert__description">{description}</span>}
          {children}
          {action && (
            <button type="button" onClick={onActionClick} className="ids-alert__action">
              {action}
            </button>
          )}
        </div>
        {onDismiss && (
          <button type="button" onClick={onDismiss} aria-label="Dismiss" className="ids-alert__dismiss">
            <Close aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";
