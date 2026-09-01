import * as React from "react";
import { cn } from "../../lib/cn";
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
 */
export type AvatarGroupSize = "xs" | "sm" | "md" | "lg";

/** Negative item spacing per size, straight off the file. */
const overlap: Record<AvatarGroupSize, string> = {
  xs: "-space-x-[6px]",
  sm: "-space-x-[8px]",
  md: "-space-x-[10px]",
  lg: "-space-x-[12px]",
};

/** The chip reuses the avatar box, so it lines up with the faces. */
const chipType: Record<AvatarGroupSize, string> = {
  xs: "size-[24px] text-overline-sm",
  sm: "size-[32px] text-label-sm",
  md: "size-[40px] text-label-md",
  lg: "size-[48px] text-label-lg",
};

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
      <div ref={ref} className={cn("flex items-center", overlap[size], className)} {...props}>
        {shown.map((child, i) =>
          React.isValidElement<AvatarProps>(child)
            ? React.cloneElement(child, { key: i, size: child.props.size ?? size })
            : child
        )}
        {hidden > 0 && (
          <span
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-full font-sans",
              "bg-bg-surface-raised text-text-secondary ring-2 ring-inset ring-bg-surface",
              chipType[size]
            )}
          >
            +{hidden}
          </span>
        )}
        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            aria-label="Add person"
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-full",
              "border border-dashed border-border-strong bg-bg-surface text-icon",
              "outline-none transition-colors duration-interaction ease-decelerate hover:bg-bg-subtle focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
              chipType[size]
            )}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-[45%]" aria-hidden="true">
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

const labelGroup: Record<AvatarLabelSize, { avatar: AvatarProps["size"]; gap: string; name: string; sub: string }> = {
  sm: { avatar: "sm", gap: "gap-[8px]", name: "text-body-sm-medium", sub: "text-caption-md" },
  md: { avatar: "md", gap: "gap-[12px]", name: "text-body-md-medium", sub: "text-body-sm" },
  lg: { avatar: "lg", gap: "gap-[14px]", name: "text-label-lg", sub: "text-body-md" },
  xl: { avatar: "xl", gap: "gap-[16px]", name: "text-label-xl", sub: "text-body-lg" },
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
    const s = labelGroup[size];
    return (
      <div ref={ref} className={cn("inline-flex items-center", s.gap, className)} {...props}>
        <Avatar size={s.avatar} {...avatar} />
        <span className="flex flex-col gap-[2px]">
          <span className={cn(s.name, "text-text-primary")}>{name}</span>
          {subtitle && <span className={cn(s.sub, "text-text-secondary")}>{subtitle}</span>}
        </span>
      </div>
    );
  }
);
AvatarLabelGroup.displayName = "AvatarLabelGroup";
