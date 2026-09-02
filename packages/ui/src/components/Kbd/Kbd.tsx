import * as React from "react";
import { cx } from "../../lib/cx";

/**
 * Kbd — mirrors Figma `A25 KBD` (Atoms — Display).
 *
 * Figma variant map:
 * - Size → `size` (SM 22 · MD 24 · LG 30)
 *
 * A raised key: bg/surface-raised with a 1px border/default and radius 4.
 * Type is Code/SM at SM and MD, Code/MD at LG, in text/secondary.
 * Sibling of Code (`A27`), which is a flat inline snippet with no border.
 */
export type KbdSize = "sm" | "md" | "lg";

/** The class list for a size — exported the way `kbdVariants` was. */
export function kbdVariants(props: { size?: KbdSize | null; className?: string } = {}) {
  return cx("ids-kbd", `ids-kbd--${props.size ?? "md"}`, props.className);
}

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: KbdSize | null;
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, children, ...props }, ref) => (
    <kbd ref={ref} className={kbdVariants({ size, className })} {...props}>
      {children}
    </kbd>
  )
);
Kbd.displayName = "Kbd";
