import * as React from "react";
import { cx } from "../../lib/cx";
import { Avatar, type AvatarProps } from "../Avatar/Avatar";

/**
 * AvatarGroup — mirrors Figma `A16c Avatar Group` (Atoms — Display).
 *
 * Figma variant map:
 * - Size  → `size`  (XS 24 · SM 32 · MD 40 · LG 48)
 * - Count → however many children are passed, with `max` folding the rest
 *   into the `More users chip`
 *
 * Overlap is a quarter of the avatar — Figma sets item spacing to -6 / -8 /
 * -10 / -12 at 24 / 32 / 40 / 48, so each face sits 75% along from the last.
 * The contrast ring each Avatar already carries is what separates them.
 * Measurements live in `AvatarGroup.css`.
 */
export type AvatarGroupSize = "xs" | "sm" | "md" | "lg";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: AvatarGroupSize;
  /** Show at most this many faces; the rest collapse into a +N chip. */
  max?: number;
  /** Trailing add button — mirrors Figma's `Add button` slot. */
  onAdd?: () => void;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, size = "md", max, onAdd, children, ...props }, ref) => {
    const faces = React.Children.toArray(children).filter(React.isValidElement);
    const shown = max ? faces.slice(0, max) : faces;
    const hidden = faces.length - shown.length;

    return (
      <div ref={ref} className={cx("ids-avatar-group", `ids-avatar-group--${size}`, className)} {...props}>
        {shown.map((child, i) =>
          React.isValidElement<AvatarProps>(child)
            ? React.cloneElement(child, { key: i, size: child.props.size ?? size })
            : child
        )}
        {hidden > 0 && (
          <span className={cx("ids-avatar-group__chip", `ids-avatar-group__chip--${size}`)}>
            +{hidden}
          </span>
        )}
        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            aria-label="Add person"
            className={cx("ids-avatar-group__add", `ids-avatar-group__add--${size}`)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="ids-avatar-group__add-glyph" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

/**
 * AvatarLabelGroup — mirrors Figma `A16b Avatar Label Group`.
 *
 * Sizes carry their own avatar, gap and type ramp:
 *   SM  32 · gap 8  · Body/SM Medium + Caption/MD
 *   MD  40 · gap 12 · Body/MD Medium + Body/SM
 *   LG  48 · gap 14 · Label/LG       + Body/MD
 *   XL  64 · gap 16 · Label/XL       + Body/LG
 * Name and subtitle sit 2px apart, centred against the avatar.
 */
export type AvatarLabelSize = "sm" | "md" | "lg" | "xl";

const labelAvatar: Record<AvatarLabelSize, AvatarProps["size"]> = {
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
};

export interface AvatarLabelGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: AvatarLabelSize;
  name: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Passed through to the Avatar. */
  avatar?: Omit<AvatarProps, "size">;
}

export const AvatarLabelGroup = React.forwardRef<HTMLDivElement, AvatarLabelGroupProps>(
  ({ className, size = "md", name, subtitle, avatar, ...props }, ref) => {
    return (
      <div ref={ref} className={cx("ids-avatar-label", `ids-avatar-label--${size}`, className)} {...props}>
        <Avatar size={labelAvatar[size]} {...avatar} />
        <span className="ids-avatar-label__text">
          <span className={cx("ids-avatar-label__name", `ids-avatar-label__name--${size}`)}>{name}</span>
          {subtitle && (
            <span className={cx("ids-avatar-label__sub", `ids-avatar-label__sub--${size}`)}>{subtitle}</span>
          )}
        </span>
      </div>
    );
  }
);
AvatarLabelGroup.displayName = "AvatarLabelGroup";
