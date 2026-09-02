import * as React from "react";
import { cva } from "../../lib/cva";
import type { VariantProps } from "../../lib/types";
import { cn } from "../../lib/cn";
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
export const inlineMessageVariants = cva("inline-flex items-center gap-[4px] text-caption-md", {
  variants: {
    severity: {
      helper: "text-text-secondary",
      info: "text-icon-blue",
      success: "text-text-success",
      warning: "text-text-warning",
      error: "text-text-error",
    },
  },
  defaultVariants: { severity: "helper" },
});

const glyph = {
  helper: HelpCircle,
  info: InformationCircle,
  success: CheckCircle,
  warning: AlertCircle,
  error: AlertCircle,
} as const;

export interface InlineMessageProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof inlineMessageVariants> {
  severity?: keyof typeof glyph;
  /** Hides the glyph — Figma keeps it in every variant, so this is an opt-out. */
  hideIcon?: boolean;
}

export const InlineMessage = React.forwardRef<HTMLSpanElement, InlineMessageProps>(
  ({ className, severity = "helper", hideIcon, children, ...props }, ref) => {
    const Glyph = glyph[severity];
    return (
      <span ref={ref} className={cn(inlineMessageVariants({ severity }), className)} {...props}>
        {!hideIcon && <Glyph className="size-[14px] shrink-0" aria-hidden="true" />}
        {children}
      </span>
    );
  }
);
InlineMessage.displayName = "InlineMessage";
