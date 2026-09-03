import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cx } from "../../lib/cx";

/**
 * Tooltip — mirrors Figma `A19 Tooltip` and `A19b Tooltip Trigger`
 * (Atoms — Display).
 *
 * Figma variant map:
 * - Position → `side` + `align` (Top arrow · Top no arrow · Top left ·
 *   Top right · Bottom · Left · Right)
 * - Arrow    → `arrow`, since Figma splits "Top arrow" and "Top no arrow"
 *   into separate variants rather than a boolean
 *
 * Bubble: radius 8, padding 8/12, bg/inverse, Body/XS Medium in text/inverse,
 * with the file's drop shadow. Arrow is 10 wide by 6 tall.
 *
 * Built on Radix Tooltip so the bubble is positioned, flipped and dismissed
 * correctly, and so it is reachable by keyboard — Figma can only draw the
 * placements, not the behaviour.
 */
export interface TooltipProps
  extends Pick<TooltipPrimitive.TooltipContentProps, "side" | "align" | "sideOffset"> {
  /** The bubble's contents. */
  content: React.ReactNode;
  /** Figma keeps a separate no-arrow variant; this is that switch. */
  arrow?: boolean;
  /** Milliseconds before the tooltip opens. */
  delayDuration?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const TooltipProvider = TooltipPrimitive.Provider;

export const Tooltip = ({
  content,
  arrow = true,
  side = "top",
  align = "center",
  sideOffset = 6,
  delayDuration = 200,
  open,
  defaultOpen,
  onOpenChange,
  className,
  children,
}: TooltipProps) => (
  <TooltipPrimitive.Root
    open={open}
    defaultOpen={defaultOpen}
    onOpenChange={onOpenChange}
    delayDuration={delayDuration}
  >
    <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cx("ids-tooltip", className)}
      >
        {content}
        {arrow && <TooltipPrimitive.Arrow width={10} height={6} className="ids-tooltip__arrow" />}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  </TooltipPrimitive.Root>
);
Tooltip.displayName = "Tooltip";
