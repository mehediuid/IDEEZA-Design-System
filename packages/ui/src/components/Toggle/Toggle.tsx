import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import { motionSpring } from "../../lib/motion";

/**
 * Toggle — mirrors Figma `_Toggle base` / `A10 Toggle` (Atoms — Input).
 * Built on Radix Switch, so keyboard behaviour and ARIA come for free.
 *
 * Measured off the file:
 *   SM  track 36×20 · thumb 16 · inset 2 · on at x=18
 *   MD  track 44×24 · thumb 20 · inset 2 · on at x=22
 *
 * Track fill is a state ramp, not a single colour:
 *   Off        input/border          On        bg/brand
 *   Off hover  input/border-hover    On hover  bg/brand-hover
 *   Disabled   input/bg-disabled (both states)
 * The track carries no border in Figma, and Disabled changes the fill rather
 * than dimming the whole control.
 *
 * The thumb is placed with `left`, not a translate. Tailwind's translate
 * utilities all write through one `--tw-translate-x` variable and a shared
 * `transform` declaration, so anything else that touches `transform` on this
 * element silently pins the thumb at its off position and the switch reads as
 * a colour change with no movement. `left` has no such shared channel.
 */
const trackVariants = cva(
  [
    "group relative inline-flex shrink-0 cursor-pointer rounded-full align-middle",
    "transition-colors duration-interaction ease-decelerate",
    "outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
    "bg-input-border hover:bg-input-border-hover",
    "data-[state=checked]:bg-bg-brand data-[state=checked]:hover:bg-bg-brand-hover",
    // Disabled outranks the checked fill in Figma. `disabled:` and
    // `data-[state=checked]:` have equal specificity, so which one wins would
    // otherwise depend on Tailwind's output order — hence the important flag.
    "disabled:cursor-not-allowed disabled:!bg-input-bg-disabled",
  ],
  {
    variants: {
      size: {
        sm: "h-[20px] w-[36px]",
        md: "h-[24px] w-[44px]",
      },
    },
    defaultVariants: { size: "md" },
  }
);

const thumbVariants = cva(
  [
    "pointer-events-none absolute top-[2px] block rounded-full bg-bg-surface shadow-1",
    "transition-[left] " + motionSpring,
  ],
  {
    variants: {
      size: {
        sm: "size-[16px] left-[2px] data-[state=checked]:left-[18px]",
        md: "size-[20px] left-[2px] data-[state=checked]:left-[22px]",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof trackVariants> {}

export const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  ToggleProps
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitive.Root ref={ref} className={cn(trackVariants({ size }), className)} {...props}>
    <SwitchPrimitive.Thumb className={cn(thumbVariants({ size }))} />
  </SwitchPrimitive.Root>
));
Toggle.displayName = "Toggle";
