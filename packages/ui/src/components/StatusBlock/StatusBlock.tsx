import * as React from "react";
import { cx } from "../../lib/cx";

/**
 * StatusBlock — mirrors Figma `M06 Status Block` (Molecules — Feedback).
 *
 * Figma variant map:
 * - Status → `status` (Operational · Degraded · Outage · Maintenance)
 *
 * Radius 6, padding 6/8, gap 6, on bg/subtle with a 1px border/default. The
 * surface stays neutral in all four — only the 10px dot changes, which is why
 * this reads as a status line rather than an alert. Label is Body/SM Medium,
 * the timestamp under it Caption/MD at 2px.
 *
 * Maintenance takes icon/blue rather than a warning colour: it is planned,
 * not a fault.
 */
export type StatusBlockStatus = "operational" | "degraded" | "outage" | "maintenance";

export function statusBlockVariants(
  props: { status?: StatusBlockStatus | null; className?: string } = {}
) {
  return cx("ids-status-block", `ids-status-block--${props.status ?? "operational"}`, props.className);
}

export interface StatusBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: StatusBlockStatus;
  label: React.ReactNode;
  detail?: React.ReactNode;
}

export const StatusBlock = React.forwardRef<HTMLDivElement, StatusBlockProps>(
  ({ className, status = "operational", label, detail, ...props }, ref) => (
    <div ref={ref} role="status" className={statusBlockVariants({ status, className })} {...props}>
      <span className="ids-status-block__indicator" aria-hidden="true">
        <span className="ids-status-block__dot" />
      </span>
      <span className="ids-status-block__text">
        <span className="ids-status-block__label">{label}</span>
        {detail && <span className="ids-status-block__detail">{detail}</span>}
      </span>
    </div>
  )
);
StatusBlock.displayName = "StatusBlock";
