import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import { motionPress } from "../../lib/motion";

/**
 * ButtonGroup — mirrors Figma `A15 Button Group` and `_Button group segment`
 * (Atoms — Action).
 *
 * Figma variant map:
 * - A15 Count → however many children are passed
 * - A15 Size / segment Size → `size` (SM 32 · MD 36 · LG 40 · XL 44)
 * - segment State → hover / `selected` / `disabled` / focus-visible
 *
 * The container carries the radius 8 and the 1px border/default; segments are
 * square and separated by a divider, so only the outer corners round. Figma
 * gives the group no fill of its own — each segment paints bg/surface, and the
 * selected one bg/brand with text/on-brand.
 */
export const buttonGroupSegmentVariants = cva(
  [
    "relative inline-flex flex-1 items-center justify-center gap-[6px] font-sans whitespace-nowrap",
    "bg-bg-surface text-text-primary",
    motionPress,
    "outline-none focus-visible:z-10 focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
    "hover:bg-bg-subtle",
    "aria-pressed:bg-bg-brand aria-pressed:text-text-on-brand aria-pressed:hover:bg-bg-brand",
    "disabled:pointer-events-none disabled:bg-bg-subtle disabled:text-text-disabled",
    // Divider between segments — Figma draws it as the container border showing
    // through, so only the inner edges get a line.
    "border-l border-border first:border-l-0",
  ],
  {
    variants: {
      size: {
        sm: "h-[32px] px-[10px] text-body-xs-medium [&>svg]:size-[14px]",
        md: "h-[36px] px-[12px] text-body-sm-medium [&>svg]:size-[16px]",
        lg: "h-[40px] px-[14px] text-body-md-medium [&>svg]:size-[16px]",
        xl: "h-[44px] px-[16px] text-body-md-medium [&>svg]:size-[16px]",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface ButtonGroupSegmentProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    VariantProps<typeof buttonGroupSegmentVariants> {
  /** Mirrors Figma `State=Selected`. */
  selected?: boolean;
}

export const ButtonGroupSegment = React.forwardRef<HTMLButtonElement, ButtonGroupSegmentProps>(
  ({ className, size, selected, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected || undefined}
      className={cn(buttonGroupSegmentVariants({ size }), className)}
      {...props}
    >
      {children}
    </button>
  )
);
ButtonGroupSegment.displayName = "ButtonGroupSegment";

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupSegmentVariants> {}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, size = "md", children, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        "inline-flex overflow-hidden rounded-[8px] border border-border align-middle",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement<ButtonGroupSegmentProps>(child)
          ? React.cloneElement(child, { size: child.props.size ?? size })
          : child
      )}
    </div>
  )
);
ButtonGroup.displayName = "ButtonGroup";
