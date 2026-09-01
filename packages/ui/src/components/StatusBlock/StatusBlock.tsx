import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

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
export const statusBlockVariants = cva(
  "inline-flex items-center gap-[6px] rounded-[6px] border border-border bg-bg-subtle px-[8px] py-[6px]",
  { variants: { status: { operational: "", degraded: "", outage: "", maintenance: "" } },
    defaultVariants: { status: "operational" } }
);

const dot = {
  operational: "bg-icon-success",
  degraded: "bg-icon-warning",
  outage: "bg-icon-error",
  maintenance: "bg-icon-blue",
} as const;

export interface StatusBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBlockVariants> {
  status?: keyof typeof dot;
  label: React.ReactNode;
  /** The line under the label — Figma shows "Updated 2 min ago". */
  detail?: React.ReactNode;
}

export const StatusBlock = React.forwardRef<HTMLDivElement, StatusBlockProps>(
  ({ className, status = "operational", label, detail, ...props }, ref) => (
    <div ref={ref} role="status" className={cn(statusBlockVariants({ status }), className)} {...props}>
      <span className="inline-flex size-[16px] shrink-0 items-center justify-center" aria-hidden="true">
        <span className={cn("size-[10px] rounded-full", dot[status])} />
      </span>
      <span className="flex min-w-0 flex-col gap-[2px]">
        <span className="text-body-sm-medium text-text-primary">{label}</span>
        {detail && <span className="text-caption-md text-text-secondary">{detail}</span>}
      </span>
    </div>
  )
);
StatusBlock.displayName = "StatusBlock";
