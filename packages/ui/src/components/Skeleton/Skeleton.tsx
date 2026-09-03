import * as React from "react";
import { cx } from "../../lib/cx";

/**
 * Skeleton — mirrors Figma `A21 Skeleton` (Atoms — Display).
 *
 * Figma variant map:
 * - Shape → `shape` (Rectangle · Line · Circle · Avatar · Card)
 * - Size  → `size`  (SM · MD · LG)
 *
 * Every placeholder fills with `bg/subtle` in the file. Figma has no motion,
 * so the shimmer here is an addition: a static grey block reads as a broken
 * layout, a pulsing one reads as loading. Turn it off with `animate={false}`.
 *
 * The dimensions in `Skeleton.css` are the Figma defaults, not a constraint —
 * pass `className` to size a skeleton to whatever it is standing in for.
 */
export type SkeletonShape = "rectangle" | "line" | "circle" | "avatar" | "card";
export type SkeletonSize = "sm" | "md" | "lg";

/**
 * The class list for a single-block skeleton — exported so a consumer can put
 * placeholder styling on another element, which is what `skeletonVariants`
 * did before. Avatar and Card are compositions and are rendered by the
 * component itself.
 */
export function skeletonVariants(
  props: {
    shape?: "rectangle" | "line" | "circle" | null;
    size?: SkeletonSize | null;
    animate?: boolean | null;
    className?: string;
  } = {}
) {
  const shape = props.shape ?? "rectangle";
  const size = props.size ?? "md";
  return cx(
    "ids-skeleton",
    `ids-skeleton--${shape}`,
    `ids-skeleton--${size}`,
    (props.animate ?? true) ? "ids-skeleton--animate" : null,
    props.className
  );
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: SkeletonShape;
  size?: SkeletonSize;
  animate?: boolean;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, shape = "rectangle", size = "md", animate = true, ...props }, ref) => {
    const pulse = animate ? "ids-skeleton--animate" : null;

    if (shape === "avatar") {
      return (
        <div
          ref={ref}
          aria-hidden="true"
          className={cx("ids-skeleton__group", `ids-skeleton--avatar-${size}`, className)}
          {...props}
        >
          <div className={cx("ids-skeleton__piece", "ids-skeleton__piece--circle", pulse)} />
          <div className="ids-skeleton__lines">
            <div className={cx("ids-skeleton__piece", "ids-skeleton__piece--line", "ids-skeleton__piece--l1", pulse)} />
            <div className={cx("ids-skeleton__piece", "ids-skeleton__piece--line", "ids-skeleton__piece--l2", pulse)} />
          </div>
        </div>
      );
    }

    if (shape === "card") {
      return (
        <div
          ref={ref}
          aria-hidden="true"
          className={cx("ids-skeleton__group", "ids-skeleton__group--card", `ids-skeleton--card-${size}`, className)}
          {...props}
        >
          <div className={cx("ids-skeleton__piece", "ids-skeleton__piece--img", pulse)} />
          <div className="ids-skeleton__lines">
            <div className={cx("ids-skeleton__piece", "ids-skeleton__piece--line", "ids-skeleton__piece--l1", pulse)} />
            <div className={cx("ids-skeleton__piece", "ids-skeleton__piece--line", "ids-skeleton__piece--l2", pulse)} />
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={skeletonVariants({ shape, size, animate, className })}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";
