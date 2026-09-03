import * as React from "react";
import { cx } from "../../lib/cx";
import { NavItem, type NavItemProps } from "../NavItem/NavItem";

/**
 * DropdownMenu — mirrors Figma `M18 Dropdown Menu` (Molecules — Navigation).
 *
 * Figma variant map:
 * - State → `selected` / `disabled` / hover
 *
 * M18 is the row, not the panel: 280 wide, 40 tall, radius 6, with the dot,
 * leading, content and trailing slots. That row is NavItem, shared with
 * M16 Sidebar Item, which instances M18 for its parent row.
 *
 * `DropdownMenu` is the surface the rows sit on — the file draws menus in
 * context rather than as a component, so the panel here follows the same
 * chrome the other overlays use: bg/surface, 1px border, radius 12, 4px of
 * padding and shadow-3, matching MultiSelect's list.
 *
 * Positioning is deliberately not included. Anchoring, flipping and dismissal
 * belong to whatever opens the menu; Tooltip takes Radix for that reason and
 * a menu would too.
 */
export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="menu"
      className={cx("ids-dropdown-menu", className)}
      {...props}
    >
      {children}
    </div>
  )
);
DropdownMenu.displayName = "DropdownMenu";

export interface DropdownMenuItemProps extends NavItemProps {}

export const DropdownMenuItem = React.forwardRef<HTMLElement, DropdownMenuItemProps>(
  (props, ref) => <NavItem ref={ref} role="menuitem" {...props} />
);
DropdownMenuItem.displayName = "DropdownMenuItem";

/** A hairline between groups of items. */
export const DropdownMenuSeparator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div role="separator" className={cx("ids-dropdown-menu__separator", className)} {...props} />
);

/** Overline label above a group — the pattern menus in the file use. */
export const DropdownMenuLabel = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cx("ids-dropdown-menu__label", className)} {...props} />
);
