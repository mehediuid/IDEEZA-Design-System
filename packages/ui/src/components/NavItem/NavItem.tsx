import * as React from "react";
import { cx } from "../../lib/cx";

/**
 * NavItem — the row shared by Figma's `M18 Dropdown Menu` and the
 * `parent-row` of `M16 Sidebar Item` (Molecules — Navigation).
 *
 * It is one component in the file too: M16's parent-row is an instance of
 * M18, so the two are the same row with different surroundings. Extracting it
 * here keeps that true — a change to the row reaches both.
 *
 * Measured: 40px tall, radius 6, HORIZONTAL at gap 10, padding 0/12. Slots in
 * order are dot, leading, content (label over description at gap 2) and a
 * trailing row at gap 8 that can hold a badge, a Kbd and a chevron.
 *
 * States:
 *   Default   no fill
 *   Hover     bg/subtle
 *   Selected  bg/brand-subtle, and the label and description both go
 *             text/brand — the description shifts too, which is easy to miss
 *   Disabled  no fill, label and description text/disabled
 */
export type NavItemState = "default" | "hover" | "selected" | "disabled";

export interface NavItemProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /** Mirrors `State=Selected`. */
  selected?: boolean;
  disabled?: boolean;
  /** The 8px status dot before the leading slot. */
  dot?: React.ReactNode;
  leading?: React.ReactNode;
  label: React.ReactNode;
  description?: React.ReactNode;
  /** Badge, Kbd, chevron — laid out at gap 8 as in Figma's trailing-row. */
  trailing?: React.ReactNode;
  /** Renders as a link when set. */
  href?: string;
  as?: "button" | "a" | "div";
}

/** The row's class list — exported for callers styling their own row. */
export const navItemSurface = (selected?: boolean, disabled?: boolean) =>
  cx(
    "ids-nav-item",
    disabled ? "ids-nav-item--disabled" : selected ? "ids-nav-item--selected" : "ids-nav-item--rest"
  );

export const NavItem = React.forwardRef<HTMLElement, NavItemProps>(
  ({ className, selected, disabled, dot, leading, label, description, trailing, href, as, ...props }, ref) => {
    const Comp = (as ?? (href ? "a" : "button")) as React.ElementType;

    return (
      <Comp
        ref={ref as never}
        href={href}
        type={Comp === "button" ? "button" : undefined}
        aria-current={selected ? "page" : undefined}
        aria-disabled={disabled || undefined}
        className={cx(navItemSurface(selected, disabled), className)}
        {...props}
      >
        {dot && <span className="ids-nav-item__dot">{dot}</span>}
        {leading && <span className="ids-nav-item__leading">{leading}</span>}

        <span className="ids-nav-item__content">
          <span className="ids-nav-item__label">{label}</span>
          {description && <span className="ids-nav-item__description">{description}</span>}
        </span>

        {trailing && <span className="ids-nav-item__trailing">{trailing}</span>}
      </Comp>
    );
  }
);
NavItem.displayName = "NavItem";
