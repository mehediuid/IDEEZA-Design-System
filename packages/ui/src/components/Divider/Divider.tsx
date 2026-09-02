import * as React from "react";
import { cva } from "../../lib/cva";
import type { VariantProps } from "../../lib/types";
import { cn } from "../../lib/cn";

/**
 * Divider — mirrors Figma `A24 Divider` (Atoms — Display).
 *
 * Figma variant map:
 * - Orientation → `orientation` (Horizontal · Vertical)
 * - Type        → `variant`     (Single line · Background fill)
 * - Content     → `children`    (Heading · Text · Button · Button group — any node)
 * - Alignment   → `align`       (Center · Left · Right)
 *
 * Figma models each content kind as its own variant; here the slot takes any
 * node, so `<Divider>OR</Divider>` and `<Divider><Button/></Divider>` both work
 * without a prop per content type.
 *
 * The line is `border/subtle` at 1px throughout. `Background fill` drops the
 * lines and puts the label on a `bg/subtle` band instead — used as a section
 * break rather than an inline rule.
 */
export const dividerVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full inline-flex",
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

const Line = ({ vertical }: { vertical?: boolean }) => (
  <span className={cn("shrink-0 bg-border-subtle", vertical ? "w-px flex-1" : "h-px flex-1")} aria-hidden="true" />
);

export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof dividerVariants> {
  variant?: "line" | "fill";
  align?: "center" | "left" | "right";
  children?: React.ReactNode;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = "horizontal", variant = "line", align = "center", children, ...props }, ref) => {
    const vertical = orientation === "vertical";

    // Background fill — a labelled band, no rules. Horizontal only in Figma.
    if (variant === "fill") {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn(
            "flex w-full items-center bg-bg-subtle px-[16px] py-[10px] text-body-sm text-text-secondary",
            align === "center" && "justify-center",
            align === "right" && "justify-end",
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Plain rule — no content slot.
    if (!children) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation={vertical ? "vertical" : "horizontal"}
          className={cn(
            "shrink-0 bg-border-subtle",
            vertical ? "h-full w-px self-stretch" : "h-px w-full",
            className
          )}
          {...props}
        />
      );
    }

    // Rule with content. Figma puts 16px between the label and each line, and
    // drops the leading line entirely when the label is left-aligned.
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={vertical ? "vertical" : "horizontal"}
        className={cn(
          "flex items-center gap-[16px] text-body-sm text-text-secondary",
          vertical ? "h-full flex-col" : "w-full",
          className
        )}
        {...props}
      >
        {align !== "left" && <Line vertical={vertical} />}
        <span className="shrink-0">{children}</span>
        {align !== "right" && <Line vertical={vertical} />}
      </div>
    );
  }
);
Divider.displayName = "Divider";
