import * as React from "react";
import { cx } from "../../lib/cx";
import { Skeleton } from "../Skeleton/Skeleton";

/**
 * SkeletonLayout — mirrors Figma `M51 Skeleton` (Molecules — States).
 *
 * Figma variant map:
 * - Layout → `layout` (Card · List Item · Article · Chart)
 *
 * Named apart from the A21 `Skeleton` atom on purpose: that one is a single
 * placeholder shape, this is a page-shaped arrangement of them. The atom does
 * the drawing here; only the frame geometry is new, and it lives in
 * `SkeletonLayout.css`.
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

export const SkeletonLayout = React.forwardRef<HTMLDivElement, SkeletonLayoutProps>(
  ({ className, layout = "card", animate = true, ...props }, ref) => {
    const line = (part: string) => (
      <Skeleton shape="line" animate={animate} className={part} />
    );
    const frame = (bordered: boolean) =>
      cx(
        "ids-skeleton-layout",
        `ids-skeleton-layout--${layout}`,
        bordered ? "ids-skeleton-layout--bordered" : null,
        className
      );

    if (layout === "list-item") {
      return (
        <div ref={ref} aria-hidden="true" className={frame(true)} {...props}>
          <Skeleton shape="circle" animate={animate} className="ids-skeleton-layout__avatar-32" />
          <div className="ids-skeleton-layout__col ids-skeleton-layout__col--fill ids-skeleton-layout__col--gap-8">
            {line("ids-skeleton-layout__line-full-10")}
            {line("ids-skeleton-layout__line-60p-8")}
          </div>
          <Skeleton shape="rectangle" animate={animate} className="ids-skeleton-layout__tail-24" />
        </div>
      );
    }

    if (layout === "article") {
      return (
        <div ref={ref} aria-hidden="true" className={frame(true)} {...props}>
          <div className="ids-skeleton-layout__row ids-skeleton-layout__row--gap-10">
            <Skeleton shape="circle" animate={animate} className="ids-skeleton-layout__avatar-32" />
            {line("ids-skeleton-layout__line-120-10")}
          </div>
          <div className="ids-skeleton-layout__col ids-skeleton-layout__col--gap-12">
            {line("ids-skeleton-layout__line-full-16")}
            {line("ids-skeleton-layout__line-70-16")}
          </div>
          <div className="ids-skeleton-layout__col ids-skeleton-layout__col--gap-10">
            {line("ids-skeleton-layout__line-full-10")}
            {line("ids-skeleton-layout__line-full-10")}
            {line("ids-skeleton-layout__line-85-10")}
          </div>
          <div className="ids-skeleton-layout__row ids-skeleton-layout__row--gap-8">
            {line("ids-skeleton-layout__line-80-8")}
            {line("ids-skeleton-layout__line-80-8")}
          </div>
        </div>
      );
    }

    if (layout === "chart") {
      // Bars are a fixed ramp so the placeholder does not shimmer into a
      // different shape on every render.
      const bars = [70, 45, 90, 60, 80, 35];
      return (
        <div ref={ref} aria-hidden="true" className={frame(false)} {...props}>
          <div className="ids-skeleton-layout__row ids-skeleton-layout__row--gap-12">
            {line("ids-skeleton-layout__line-48-8")}
            {line("ids-skeleton-layout__line-48-8")}
            {line("ids-skeleton-layout__line-48-8")}
          </div>
          <div className="ids-skeleton-layout__bars">
            {bars.map((h, i) => (
              <Skeleton key={i} shape="rectangle" animate={animate} className="ids-skeleton-layout__bar" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="ids-skeleton-layout__row ids-skeleton-layout__row--gap-12">
            {bars.map((_, i) => (
              <Skeleton key={i} shape="line" animate={animate} className="ids-skeleton-layout__bar-label" />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} aria-hidden="true" className={frame(true)} {...props}>
        <Skeleton shape="rectangle" animate={animate} className="ids-skeleton-layout__img-160" />
        <div className="ids-skeleton-layout__col ids-skeleton-layout__col--gap-10">
          {line("ids-skeleton-layout__line-full-14")}
          {line("ids-skeleton-layout__line-60p-14")}
        </div>
        <div className="ids-skeleton-layout__col ids-skeleton-layout__col--gap-8">
          {line("ids-skeleton-layout__line-full-8")}
          {line("ids-skeleton-layout__line-80p-8")}
        </div>
        <div className="ids-skeleton-layout__row ids-skeleton-layout__row--gap-12">
          {line("ids-skeleton-layout__line-72-24")}
          {line("ids-skeleton-layout__line-72-24")}
        </div>
      </div>
    );
  }
);
SkeletonLayout.displayName = "SkeletonLayout";
