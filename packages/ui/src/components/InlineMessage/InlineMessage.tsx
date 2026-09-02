import * as React from "react";
import { cx } from "../../lib/cx";
import { AlertCircle, CheckCircle, HelpCircle, InformationCircle } from "../../lib/icons";

/**
 * InlineMessage — mirrors Figma `M05 Inline Message` (Molecules — Feedback).
 *
 * Figma variant map:
 * - Severity → `severity` (Helper · Info · Success · Warning · Error)
 *
 * One line, 16px tall, 4px gap, a 14px glyph and Caption/MD text. Unlike
 * Alert there is no surface, border or badge — the whole message takes the
 * severity colour, and Helper is the neutral form used under a field.
 *
 * This is the same role Field fills with its own helper and error text; use
 * that inside a field and this one for standalone notes.
 */
export type InlineMessageSeverity = "helper" | "info" | "success" | "warning" | "error";

export function inlineMessageVariants(
  props: { severity?: InlineMessageSeverity | null; className?: string } = {}
) {
  return cx("ids-inline-message", `ids-inline-message--${props.severity ?? "helper"}`, props.className);
}

const glyph = {
  helper: HelpCircle,
  info: InformationCircle,
  success: CheckCircle,
  warning: AlertCircle,
  error: AlertCircle,
} as const;

export interface InlineMessageProps extends React.HTMLAttributes<HTMLSpanElement> {
  severity?: InlineMessageSeverity;
  hideIcon?: boolean;
}

export const InlineMessage = React.forwardRef<HTMLSpanElement, InlineMessageProps>(
  ({ className, severity = "helper", hideIcon, children, ...props }, ref) => {
    const Glyph = glyph[severity];
    return (
      <span ref={ref} className={inlineMessageVariants({ severity, className })} {...props}>
        {!hideIcon && <Glyph aria-hidden="true" />}
        {children}
      </span>
    );
  }
);
InlineMessage.displayName = "InlineMessage";
