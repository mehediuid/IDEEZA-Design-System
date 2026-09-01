import * as React from "react";
import { cn } from "../../lib/cn";
import { Skeleton } from "../Skeleton/Skeleton";

/**
 * SkeletonLayout — mirrors Figma `M51 Skeleton` (Molecules — States).
 *
 * Figma variant map:
 * - Layout → `layout` (Card · List Item · Article · Chart)
 *
 * Named apart from the A21 `Skeleton` atom on purpose: that one is a single
 * placeholder shape, this is a page-shaped arrangement of them. The atom does
 * the drawing here; only the frame geometry is new.
 *
 *   Card       360 wide, radius 8, padding 20, gap 16, a 320x160 image
 *   List Item  480 x 56, radius 6, padding 12/16, gap 12, 32 avatar + 24 tail
 *   Article    640 wide, radius 8, padding 24, gap 20
 *   Chart      336 wide, radius 8, padding 20, gap 16, no border
 * Card, List Item and Article carry a 1px border/subtle; Chart does not.
 */
export type SkeletonLayoutKind = "card" | "list-item" | "article" | "chart";

export interface SkeletonLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: SkeletonLayoutKind;
  /** Turns off the pulse on every placeholder in the group. */
  animate?: boolean;
}

const shell = "bg-bg-surface";
const bordered = "border border-border-subtle";

export const SkeletonLayout = React.forwardRef<HTMLDivElement, SkeletonLayoutProps>(
  ({ className, layout = "card", animate = true, ...props }, ref) => {
    const line = (w: string, h: string) => (
      <Skeleton shape="line" animate={animate} className={cn(w, h)} />
    );

    if (layout === "list-item") {
      return (
        <div ref={ref} aria-hidden="true" className={cn(shell, bordered, "flex w-[480px] items-center gap-[12px] rounded-[6px] px-[16px] py-[12px]", className)} {...props}>
          <Skeleton shape="circle" animate={animate} className="size-[32px] shrink-0" />
          <div className="flex flex-1 flex-col gap-[8px]">
            {line("w-full", "h-[10px]")}
            {line("w-[60%]", "h-[8px]")}
          </div>
          <Skeleton shape="rectangle" animate={animate} className="size-[24px] shrink-0 rounded-[6px]" />
        </div>
      );
    }

    if (layout === "article") {
      return (
        <div ref={ref} aria-hidden="true" className={cn(shell, bordered, "flex w-[640px] flex-col gap-[20px] rounded-[8px] p-[24px]", className)} {...props}>
          <div className="flex items-center gap-[10px]">
            <Skeleton shape="circle" animate={animate} className="size-[32px]" />
            {line("w-[120px]", "h-[10px]")}
          </div>
          <div className="flex flex-col gap-[12px]">
            {line("w-full", "h-[16px]")}
            {line("w-[70%]", "h-[16px]")}
          </div>
          <div className="flex flex-col gap-[10px]">
            {line("w-full", "h-[10px]")}
            {line("w-full", "h-[10px]")}
            {line("w-[85%]", "h-[10px]")}
          </div>
          <div className="flex items-center gap-[8px]">
            {line("w-[80px]", "h-[8px]")}
            {line("w-[80px]", "h-[8px]")}
          </div>
        </div>
      );
    }

    if (layout === "chart") {
      // Bars are a fixed ramp so the placeholder does not shimmer into a
      // different shape on every render.
      const bars = [70, 45, 90, 60, 80, 35];
      return (
        <div ref={ref} aria-hidden="true" className={cn(shell, "flex w-[336px] flex-col gap-[16px] rounded-[8px] p-[20px]", className)} {...props}>
          <div className="flex items-center gap-[12px]">
            {line("w-[48px]", "h-[8px]")}
            {line("w-[48px]", "h-[8px]")}
            {line("w-[48px]", "h-[8px]")}
          </div>
          <div className="flex h-[152px] items-end gap-[12px]">
            {bars.map((h, i) => (
              <Skeleton key={i} shape="rectangle" animate={animate} className="w-full rounded-[4px]" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex items-center gap-[12px]">
            {bars.map((_, i) => (
              <Skeleton key={i} shape="line" animate={animate} className="h-[8px] w-full" />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} aria-hidden="true" className={cn(shell, bordered, "flex w-[360px] flex-col gap-[16px] rounded-[8px] p-[20px]", className)} {...props}>
        <Skeleton shape="rectangle" animate={animate} className="h-[160px] w-full rounded-[8px]" />
        <div className="flex flex-col gap-[10px]">
          {line("w-full", "h-[14px]")}
          {line("w-[60%]", "h-[14px]")}
        </div>
        <div className="flex flex-col gap-[8px]">
          {line("w-full", "h-[8px]")}
          {line("w-[80%]", "h-[8px]")}
        </div>
        <div className="flex items-center gap-[12px]">
          {line("w-[72px]", "h-[24px]")}
          {line("w-[72px]", "h-[24px]")}
        </div>
      </div>
    );
  }
);
SkeletonLayout.displayName = "SkeletonLayout";
