import * as React from "react";
import { cva } from "../../lib/cva";
import type { VariantProps } from "../../lib/types";
import { cn } from "../../lib/cn";

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
 * The dimensions below are the Figma defaults, not a constraint — pass
 * `className` to size a skeleton to whatever it is standing in for.
 */
export const skeletonVariants = cva("bg-bg-subtle", {
  variants: {
    shape: {
      rectangle: "rounded-lg",
      line: "rounded-sm",
      circle: "rounded-full",
    },
    size: { sm: "", md: "", lg: "" },
    animate: { true: "animate-pulse", false: "" },
  },
  compoundVariants: [
    { shape: "rectangle", size: "sm", class: "w-[120px] h-[60px]" },
    { shape: "rectangle", size: "md", class: "w-[200px] h-[100px]" },
    { shape: "rectangle", size: "lg", class: "w-[320px] h-[160px]" },
    { shape: "line", size: "sm", class: "w-[80px] h-[8px]" },
    { shape: "line", size: "md", class: "w-[160px] h-[12px]" },
    { shape: "line", size: "lg", class: "w-[240px] h-[16px]" },
    { shape: "circle", size: "sm", class: "size-[24px]" },
    { shape: "circle", size: "md", class: "size-[32px]" },
    { shape: "circle", size: "lg", class: "size-[48px]" },
  ],
  defaultVariants: { shape: "rectangle", size: "md", animate: true },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    // `shape` is widened here: Avatar and Card are compositions rather than
    // single blocks, so they are handled below instead of by the cva map.
    Omit<VariantProps<typeof skeletonVariants>, "shape"> {
  shape?: "rectangle" | "line" | "circle" | "avatar" | "card";
}

/**
 * Avatar and Card are compositions in Figma, so they carry their own geometry.
 * Both line widths are explicit px: the sub-line is 75% of the name line at
 * Avatar SM but 62.5% at Avatar LG, so no single ratio reproduces the file.
 */
const composed = {
  avatar: {
    sm: { circle: "size-[24px]", gap: "gap-[8px]", lines: "gap-[6px]", l1: "h-[8px] w-[80px]", l2: "h-[6px] w-[60px]" },
    md: { circle: "size-[32px]", gap: "gap-[10px]", lines: "gap-[8px]", l1: "h-[10px] w-[120px]", l2: "h-[8px] w-[80px]" },
    lg: { circle: "size-[48px]", gap: "gap-[12px]", lines: "gap-[10px]", l1: "h-[14px] w-[160px]", l2: "h-[10px] w-[100px]" },
  },
  card: {
    sm: { img: "w-[160px] h-[80px]", gap: "gap-[12px]", lines: "gap-[8px]", l1: "h-[10px] w-[120px]", l2: "h-[8px] w-[80px]" },
    md: { img: "w-[240px] h-[140px]", gap: "gap-[14px]", lines: "gap-[10px]", l1: "h-[12px] w-[180px]", l2: "h-[10px] w-[120px]" },
    lg: { img: "w-[320px] h-[180px]", gap: "gap-[16px]", lines: "gap-[12px]", l1: "h-[16px] w-[240px]", l2: "h-[12px] w-[160px]" },
  },
} as const;

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, shape = "rectangle", size = "md", animate = true, ...props }, ref) => {
    const key = (size ?? "md") as "sm" | "md" | "lg";
    const pulse = animate ? "animate-pulse" : "";

    if (shape === "avatar") {
      const s = composed.avatar[key];
      return (
        <div ref={ref} aria-hidden="true" className={cn("inline-flex items-center", s.gap, className)} {...props}>
          <div className={cn("shrink-0 rounded-full bg-bg-subtle", s.circle, pulse)} />
          <div className={cn("flex flex-col", s.lines)}>
            <div className={cn("rounded-sm bg-bg-subtle", s.l1, pulse)} />
            <div className={cn("rounded-sm bg-bg-subtle", s.l2, pulse)} />
          </div>
        </div>
      );
    }

    if (shape === "card") {
      const s = composed.card[key];
      return (
        <div ref={ref} aria-hidden="true" className={cn("inline-flex flex-col", s.gap, className)} {...props}>
          <div className={cn("rounded-lg bg-bg-subtle", s.img, pulse)} />
          <div className={cn("flex flex-col", s.lines)}>
            <div className={cn("rounded-sm bg-bg-subtle", s.l1, pulse)} />
            <div className={cn("rounded-sm bg-bg-subtle", s.l2, pulse)} />
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(skeletonVariants({ shape, size, animate }), className)}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";
