import * as React from "react";
import { cx } from "../../lib/cx";
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
export type BannerSeverity = "info" | "success" | "warning" | "error" | "neutral";

export function bannerVariants(
  props: { severity?: BannerSeverity | null; className?: string } = {}
) {
  return cx("ids-banner", `ids-banner--${props.severity ?? "info"}`, props.className);
}

const glyph = {
  info: InformationCircle,
  success: CheckCircle,
  warning: AlertCircle,
  error: AlertCircle,
  neutral: InformationCircle,
} as const;

export interface BannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  severity?: BannerSeverity;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  onDismiss?: () => void;
  hideIcon?: boolean;
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, severity = "info", title, description, actions, onDismiss, hideIcon, children, ...props }, ref) => {
    const Glyph = glyph[severity];
    return (
      <div ref={ref} role="status" className={bannerVariants({ severity, className })} {...props}>
        {!hideIcon && (
          <span className="ids-banner__icon">
            <Glyph aria-hidden="true" />
          </span>
        )}
        <div className="ids-banner__body">
          {title && <span className="ids-banner__title">{title}</span>}
          {description && <span className="ids-banner__description">{description}</span>}
          {children}
        </div>
        {actions && <div className="ids-banner__actions">{actions}</div>}
        {onDismiss && (
          <button type="button" onClick={onDismiss} aria-label="Dismiss" className="ids-banner__dismiss">
            <Close aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);
Banner.displayName = "Banner";
