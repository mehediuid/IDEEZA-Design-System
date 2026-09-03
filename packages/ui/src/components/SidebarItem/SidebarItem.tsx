import * as React from "react";
import { cx } from "../../lib/cx";
import { ChevronDown } from "../../lib/icons";
import { NavItem, type NavItemProps } from "../NavItem/NavItem";

/**
 * SidebarItem — mirrors Figma `M16 Sidebar Item` with `_Nav Sub-item`
 * (Molecules — Navigation).
 *
 * Figma variant map:
 * - State    → `selected` / `disabled` / hover
 * - Expanded → `defaultExpanded` / `expanded`
 *
 * The parent row is an instance of M18 in the file, so it is NavItem here
 * rather than a second copy. What M16 adds is the sub-item list: a VERTICAL
 * stack at gap 2, each sub-item 36px at radius 6 with 40px of left padding —
 * the indent that lines a child up under the parent's label, past the icon.
 *
 * Sub-item states match the parent's: hover bg/subtle, selected
 * bg/brand-subtle with a text/brand label, disabled text/disabled.
 */
export interface SidebarSubItem {
  label: React.ReactNode;
  href?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface SidebarItemProps extends Omit<NavItemProps, "trailing"> {
  items?: SidebarSubItem[];
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  /** Kept for badges and counters; the chevron is added automatically. */
  trailing?: React.ReactNode;
}

export const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  ({ className, items, expanded, defaultExpanded, onExpandedChange, trailing, disabled, onClick, ...props }, ref) => {
    const [inner, setInner] = React.useState(defaultExpanded ?? false);
    const open = expanded ?? inner;
    const hasChildren = Boolean(items?.length);

    const toggle = () => {
      if (!hasChildren) return;
      if (expanded === undefined) setInner(!open);
      onExpandedChange?.(!open);
    };

    return (
      <div ref={ref} className={cx("ids-sidebar-item", className)}>
        <NavItem
          {...props}
          disabled={disabled}
          onClick={(e) => {
            toggle();
            onClick?.(e as never);
          }}
          aria-expanded={hasChildren ? open : undefined}
          trailing={
            <>
              {trailing}
              {hasChildren && (
                <ChevronDown
                  className={cx("ids-sidebar-item__chevron", open ? "ids-sidebar-item__chevron--open" : null)}
                  aria-hidden="true"
                />
              )}
            </>
          }
        />

        {hasChildren && open && (
          <div className="ids-sidebar-item__list">
            {items!.map((sub, i) => {
              const Comp = (sub.href ? "a" : "button") as React.ElementType;
              return (
                <Comp
                  key={i}
                  href={sub.href}
                  type={sub.href ? undefined : "button"}
                  onClick={sub.onClick}
                  aria-current={sub.selected ? "page" : undefined}
                  aria-disabled={sub.disabled || undefined}
                  className={cx(
                    "ids-sidebar-item__sub",
                    sub.disabled
                      ? "ids-sidebar-item__sub--disabled"
                      : sub.selected
                        ? "ids-sidebar-item__sub--selected"
                        : "ids-sidebar-item__sub--rest"
                  )}
                >
                  <span className="ids-sidebar-item__sub-label">{sub.label}</span>
                </Comp>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);
SidebarItem.displayName = "SidebarItem";
