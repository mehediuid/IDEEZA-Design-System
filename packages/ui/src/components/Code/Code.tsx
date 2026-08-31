import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Code — mirrors Figma `A27 Code` (Atoms — Display).
 *
 * Figma variant map:
 * - Size → `size` (SM 22 · MD 24 · LG 28)
 *
 * Flat inline snippet: bg/subtle, radius 4, no border, text/primary.
 * Kbd (`A25`) is the raised, bordered sibling for keyboard keys.
 */
export const codeVariants = cva(
  "inline-flex items-center rounded-[4px] font-mono align-middle bg-bg-subtle text-text-primary",
  {
    variants: {
      size: {
        sm: "h-[22px] px-[6px] py-[2px] text-code-sm",
        md: "h-[24px] px-[8px] py-[3px] text-code-sm",
        lg: "h-[28px] px-[10px] py-[4px] text-code-md",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, size, children, ...props }, ref) => (
    <code ref={ref} className={cn(codeVariants({ size }), className)} {...props}>
      {children}
    </code>
  )
);
Code.displayName = "Code";
