import * as React from "react";
import { cx } from "../../lib/cx";

/**
 * Code — mirrors Figma `A27 Code` (Atoms — Display).
 *
 * Figma variant map:
 * - Size → `size` (SM 22 · MD 24 · LG 28)
 *
 * Flat inline snippet: bg/subtle, radius 4, no border, text/primary.
 * Kbd (`A25`) is the raised, bordered sibling for keyboard keys.
 */
export type CodeSize = "sm" | "md" | "lg";

export function codeVariants(props: { size?: CodeSize | null; className?: string } = {}) {
  return cx("ids-code", `ids-code--${props.size ?? "md"}`, props.className);
}

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  size?: CodeSize | null;
}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, size, children, ...props }, ref) => (
    <code ref={ref} className={codeVariants({ size, className })} {...props}>
      {children}
    </code>
  )
);
Code.displayName = "Code";
