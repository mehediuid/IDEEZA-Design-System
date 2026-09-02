import * as React from "react";
import { cx } from "../../lib/cx";

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
export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "line" | "fill";
export type DividerAlign = "center" | "left" | "right";

export function dividerVariants(
  props: { orientation?: DividerOrientation | null; className?: string } = {}
) {
  return cx(
    "ids-divider",
    props.orientation === "vertical" && "ids-divider--vertical",
    props.className
  );
}

const Line = () => <span className="ids-divider__line" aria-hidden="true" />;

export interface DividerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  align?: DividerAlign;
  children?: React.ReactNode;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = "horizontal", variant = "line", align = "center", children, ...props }, ref) => {
    const vertical = orientation === "vertical";

    if (variant === "fill") {
      return (
        <div
          ref={ref}
          role="separator"
          className={cx("ids-divider", "ids-divider--fill", `ids-divider--${align}`, className)}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (!children) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation={vertical ? "vertical" : "horizontal"}
          className={cx("ids-divider", vertical && "ids-divider--vertical", className)}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={vertical ? "vertical" : "horizontal"}
        className={cx(
          "ids-divider",
          "ids-divider--labelled",
          vertical && "ids-divider--vertical",
          className
        )}
        {...props}
      >
        {align !== "left" && <Line />}
        <span className="ids-divider__label">{children}</span>
        {align !== "right" && <Line />}
      </div>
    );
  }
);
Divider.displayName = "Divider";
