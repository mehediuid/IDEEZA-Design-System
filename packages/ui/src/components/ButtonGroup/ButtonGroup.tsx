import * as React from "react";
import { cx } from "../../lib/cx";

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
export type ButtonGroupSize = "sm" | "md" | "lg" | "xl";

export function buttonGroupSegmentVariants(
  props: { size?: ButtonGroupSize | null; className?: string } = {}
) {
  return cx(
    "ids-button-group__segment",
    `ids-button-group__segment--${props.size ?? "md"}`,
    props.className
  );
}

export interface ButtonGroupSegmentProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  size?: ButtonGroupSize | null;
  selected?: boolean;
}

export const ButtonGroupSegment = React.forwardRef<HTMLButtonElement, ButtonGroupSegmentProps>(
  ({ className, size, selected, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected || undefined}
      className={buttonGroupSegmentVariants({ size, className })}
      {...props}
    >
      {children}
    </button>
  )
);
ButtonGroupSegment.displayName = "ButtonGroupSegment";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ButtonGroupSize | null;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, size = "md", children, ...props }, ref) => (
    <div ref={ref} role="group" className={cx("ids-button-group", className)} {...props}>
      {React.Children.map(children, (child) =>
        React.isValidElement<ButtonGroupSegmentProps>(child)
          ? React.cloneElement(child, { size: child.props.size ?? size })
          : child
      )}
    </div>
  )
);
ButtonGroup.displayName = "ButtonGroup";
