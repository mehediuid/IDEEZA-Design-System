import * as React from "react";
import { cva } from "../../lib/cva";
import type { VariantProps } from "../../lib/types";
import { cn } from "../../lib/cn";

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
export const kbdVariants = cva(
  [
    "inline-flex items-center justify-center rounded-[4px] font-mono align-middle whitespace-nowrap",
    "border border-border bg-bg-surface-raised text-text-secondary",
  ],
  {
    variants: {
      size: {
        sm: "h-[22px] px-[6px] py-[2px] text-code-sm",
        md: "h-[24px] px-[8px] py-[3px] text-code-sm",
        lg: "h-[30px] px-[10px] py-[5px] text-code-md",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, children, ...props }, ref) => (
    <kbd ref={ref} className={cn(kbdVariants({ size }), className)} {...props}>
      {children}
    </kbd>
  )
);
Kbd.displayName = "Kbd";
