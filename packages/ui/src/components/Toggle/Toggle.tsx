import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cx } from "../../lib/cx";

/**
 * Toggle — mirrors Figma `_Toggle base` / `A10 Toggle` (Atoms — Input).
 * Built on Radix Switch, so keyboard behaviour and ARIA come for free.
 *
 * Measured off the file — the values live in `Toggle.css`:
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
 * utilities all wrote through one `--tw-translate-x` variable and a shared
 * `transform` declaration, so anything else that touched `transform` on this
 * element silently pinned the thumb at its off position and the switch read
 * as a colour change with no movement. `left` has no such shared channel, and
 * the rule survives the move as plain `left` declarations.
 */
export type ToggleSize = "sm" | "md";

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: ToggleSize;
}

export const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  ToggleProps
>(({ className, size = "md", ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cx("ids-toggle", `ids-toggle--${size}`, className)}
    {...props}
  >
    <SwitchPrimitive.Thumb className={cx("ids-toggle__thumb", `ids-toggle__thumb--${size}`)} />
  </SwitchPrimitive.Root>
));
Toggle.displayName = "Toggle";
