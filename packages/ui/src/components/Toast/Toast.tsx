import * as React from "react";
import { cn } from "../../lib/cn";
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

const badge = {
  primary: "bg-bg-brand",
  gray: "bg-icon-secondary",
  success: "bg-icon-success",
  warning: "bg-icon-warning",
  error: "bg-icon-error",
} as const;

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
    const isIcon = leading in badge;
    const Glyph = isIcon ? glyph[leading as keyof typeof glyph] : null;

    const body = (
      <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
        {title && <span className="text-body-md-medium text-text-primary">{title}</span>}
        {description && <span className="text-body-sm text-text-secondary">{description}</span>}
        {children}
        {actions && <div className="mt-[4px] flex items-center gap-[8px]">{actions}</div>}
      </div>
    );

    const dismiss = onDismiss && (
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="inline-flex size-[20px] shrink-0 items-center justify-center rounded-[4px] text-icon outline-none hover:text-text-primary focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]"
      >
        <Close className="size-[14px]" aria-hidden="true" />
      </button>
    );

    const shell = cn(
      "w-full rounded-[12px] border border-border-subtle bg-bg-surface-raised p-[14px] pl-[16px] shadow-3",
      className
    );

    // Figma stacks the progress variant vertically — the bar spans the width
    // under the row rather than sitting beside the text.
    if (leading === "progress") {
      return (
        <div ref={ref} role="status" aria-live="polite" className={cn(shell, "flex flex-col gap-[12px]")} {...props}>
          <div className="flex items-start gap-[12px]">
            {body}
            {dismiss}
          </div>
          <div className="h-[6px] w-full overflow-hidden rounded-[4px] bg-bg-subtle">
            <div
              className="h-full rounded-[4px] bg-bg-brand transition-[width] duration-normal ease-standard"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} role="status" aria-live="polite" className={cn(shell, "flex items-center gap-[12px]")} {...props}>
        {isIcon && Glyph && (
          <span className={cn("inline-flex size-[20px] shrink-0 items-center justify-center rounded-full", badge[leading as keyof typeof badge])}>
            <Glyph className="size-[14px] text-icon-on-brand" aria-hidden="true" />
          </span>
        )}
        {leading === "image" && (
          <span className="inline-flex size-[40px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-bg-subtle">
            {media}
          </span>
        )}
        {leading === "avatar" && <span className="shrink-0">{media}</span>}
        {/* Figma keeps a 1px spacer so the text starts in the same place. */}
        {leading === "none" && <span className="w-px shrink-0" aria-hidden="true" />}

        {body}
        {dismiss}
      </div>
    );
  }
);
Toast.displayName = "Toast";

/** Re-exported so a caller can drop a Spinner into `actions` without a second import. */
export { Spinner as ToastSpinner };
