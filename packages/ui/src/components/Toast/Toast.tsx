import * as React from "react";
import { cx } from "../../lib/cx";
import { AlertCircle, CheckCircle, Close, InformationCircle } from "../../lib/icons";
import { Spinner } from "../Spinner/Spinner";

/**
 * Toast — mirrors Figma `M02 Toast` (Molecules — Feedback).
 *
 * Figma variant map:
 * - Leading → `leading` (Primary icon · Gray icon · Success icon · Warning
 *   icon · Error icon · Image · Avatar · No icon · Progress indicator)
 *
 * 570 wide at radius 12, padding 14/14/14/16, gap 12, on bg/surface-raised
 * with a 1px border/subtle and the file's two drop shadows. Title is
 * Body/MD Medium, supporting Body/SM, content gap 4.
 *
 * The nine variants are one axis in Figma but three shapes in practice, so
 * they are three props here rather than nine strings:
 *   the five icon variants differ only in the 20px badge fill
 *   Image is a 40px square at radius 8, Avatar a 32px circle
 *   Progress indicator restacks the whole thing vertically
 * `leading="none"` keeps Figma's 1px spacer so the text column starts in the
 * same place with or without a badge.
 *
 * Unlike Snackbar this is the persistent, stacked notification: it carries a
 * title, a description and its own actions.
 */
export type ToastLeading =
  | "primary"
  | "gray"
  | "success"
  | "warning"
  | "error"
  | "image"
  | "avatar"
  | "progress"
  | "none";

const glyph = {
  primary: InformationCircle,
  gray: InformationCircle,
  success: CheckCircle,
  warning: AlertCircle,
  error: AlertCircle,
} as const;

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  leading?: ToastLeading;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons under the text — Figma's `actions` frame. */
  actions?: React.ReactNode;
  /** Artwork for `leading="image"` or `leading="avatar"`. */
  media?: React.ReactNode;
  /** 0–100, shown when `leading="progress"`. */
  progress?: number;
  onDismiss?: () => void;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, leading = "primary", title, description, actions, media, progress = 0, onDismiss, children, ...props }, ref) => {
    const isIcon = leading in glyph;
    const Glyph = isIcon ? glyph[leading as keyof typeof glyph] : null;

    const body = (
      <div className="ids-toast__body">
        {title && <span className="ids-toast__title">{title}</span>}
        {description && <span className="ids-toast__description">{description}</span>}
        {children}
        {actions && <div className="ids-toast__actions">{actions}</div>}
      </div>
    );

    const dismiss = onDismiss && (
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="ids-toast__dismiss"
      >
        <Close aria-hidden="true" />
      </button>
    );

    const shell = cx("ids-toast", className);

    // Figma stacks the progress variant vertically — the bar spans the width
    // under the row rather than sitting beside the text.
    if (leading === "progress") {
      return (
        <div ref={ref} role="status" aria-live="polite" className={cx(shell, "ids-toast--stack")} {...props}>
          <div className="ids-toast__head">
            {body}
            {dismiss}
          </div>
          <div className="ids-toast__track">
            <div
              className="ids-toast__fill"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} role="status" aria-live="polite" className={cx(shell, "ids-toast--row")} {...props}>
        {isIcon && Glyph && (
          <span className={cx("ids-toast__badge", `ids-toast__badge--${leading}`)}>
            <Glyph aria-hidden="true" />
          </span>
        )}
        {leading === "image" && (
          <span className="ids-toast__image">
            {media}
          </span>
        )}
        {leading === "avatar" && <span className="ids-toast__avatar">{media}</span>}
        {/* Figma keeps a 1px spacer so the text starts in the same place. */}
        {leading === "none" && <span className="ids-toast__spacer" aria-hidden="true" />}

        {body}
        {dismiss}
      </div>
    );
  }
);
Toast.displayName = "Toast";

/** Re-exported so a caller can drop a Spinner into `actions` without a second import. */
export { Spinner as ToastSpinner };
