import * as React from "react";
import { cx } from "../../lib/cx";

/**
 * IconButton — mirrors Figma `A02 Icon Button` (Atoms — Action), 80 variants.
 * Square icon-only button. `aria-label` is required for accessibility.
 *
 * Figma geometry (Hierarchy: Primary / Secondary / Ghost / Danger):
 *   32 · radius/md  6 · icon 16
 *   36 · radius/lg  8 · icon 18
 *   40 · radius/lg  8 · icon 20
 *   44 · radius/xl 12 · icon 22
 *   48 · radius/xl 12 · icon 24
 *
 * Sizes are named by their pixel height to match Figma exactly — A02 uses a
 * different radius ramp from A01 Button, so reusing sm/md/lg here would be
 * misleading.
 *
 * Note: A02 has no `Focus` state in Figma. The halo below is the repo's own
 * addition so keyboard users are not stranded; keep it until Figma catches up.
 */
export type IconButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type IconButtonSize = 32 | 36 | 40 | 44 | 48;

/** The two that carry Depth/Top-line accent, and so the two that lift. */
const RAISED: readonly IconButtonVariant[] = ["primary", "danger"];

export function iconButtonVariants(
  props: { variant?: IconButtonVariant | null; size?: IconButtonSize | null; className?: string } = {}
) {
  const variant = props.variant ?? "ghost";
  return cx(
    "ids-icon-button",
    `ids-icon-button--${variant}`,
    `ids-icon-button--${props.size ?? 40}`,
    RAISED.includes(variant) ? "ids-icon-button--raised" : "ids-icon-button--flat",
    props.className
  );
}

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant | null;
  size?: IconButtonSize | null;
  "aria-label": string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <button ref={ref} className={iconButtonVariants({ variant, size, className })} {...props}>
      {children}
    </button>
  )
);
IconButton.displayName = "IconButton";
