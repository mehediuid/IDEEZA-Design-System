import * as React from "react";
import { cn } from "../../lib/cn";

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

export const navItemSurface = (selected?: boolean, disabled?: boolean) =>
  cn(
    "flex h-[40px] w-full items-center gap-[10px] rounded-[6px] px-[12px] text-left",
    "outline-none transition-colors duration-fast ease-standard",
    "focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
    disabled
      ? "pointer-events-none"
      : selected
        ? "bg-bg-brand-subtle"
        : "hover:bg-bg-subtle"
  );

export const NavItem = React.forwardRef<HTMLElement, NavItemProps>(
  ({ className, selected, disabled, dot, leading, label, description, trailing, href, as, ...props }, ref) => {
    const Comp = (as ?? (href ? "a" : "button")) as React.ElementType;
    const tone = disabled ? "text-text-disabled" : selected ? "text-text-brand" : undefined;

    return (
      <Comp
        ref={ref as never}
        href={href}
        type={Comp === "button" ? "button" : undefined}
        aria-current={selected ? "page" : undefined}
        aria-disabled={disabled || undefined}
        className={cn(navItemSurface(selected, disabled), className)}
        {...props}
      >
        {dot && <span className="flex size-[8px] shrink-0 items-center justify-center">{dot}</span>}
        {leading && <span className="inline-flex size-[20px] shrink-0 items-center justify-center [&>svg]:size-[20px]">{leading}</span>}

        <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <span className={cn("truncate text-body-sm-medium", tone ?? "text-text-primary")}>{label}</span>
          {description && (
            <span className={cn("truncate text-caption-md", tone ?? "text-text-secondary")}>{description}</span>
          )}
        </span>

        {trailing && <span className="flex shrink-0 items-center gap-[8px]">{trailing}</span>}
      </Comp>
    );
  }
);
NavItem.displayName = "NavItem";
