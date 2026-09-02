import * as React from "react";
import { cva } from "../../lib/cva";
import type { VariantProps } from "../../lib/types";
import { cn } from "../../lib/cn";

/**
 * Avatar — mirrors Figma `A16 Avatar` (Atoms — Display).
 *
 * Figma variant map:
 * - Type  → chosen by props: `src` → Image, `initials` → Initials, otherwise Icon
 * - Size  → `size` (2XS 20 · XS 24 · SM 32 · MD 40 · LG 48 · XL 64)
 * - State → native `:hover` / `:focus-visible` / `disabled`
 *
 * Every number below is measured off the file, not derived from a ratio — the
 * icon frame is 12/14/18/22/26/36, which is 60% of the box at 2XS but 54% at
 * LG, so a single percentage does not reproduce it.
 */
export const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-sans align-middle select-none",
  {
    variants: {
      size: {
        "2xs": "size-[20px] text-overline-sm",
        xs: "size-[24px] text-label-sm",
        sm: "size-[32px] text-label-lg",
        md: "size-[40px] text-heading-h6",
        lg: "size-[48px] text-heading-h5",
        xl: "size-[64px] text-heading-h3",
      },
      /** Figma fills Initials with bg/brand-subtle and Icon with bg/surface-raised. */
      tone: {
        initials: "bg-bg-brand-subtle text-text-brand",
        icon: "bg-bg-surface-raised text-icon",
        image: "bg-bg-surface-raised",
      },
      interactive: {
        true: "cursor-pointer outline-none transition-[colors,box-shadow] duration-interaction ease-decelerate focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
        false: "",
      },
    },
    defaultVariants: { size: "md", tone: "initials", interactive: false },
  }
);

/** Contrast border — 1px at 20/24, 2px from 32 up. */
const ringClass = {
  "2xs": "ring-1 ring-inset ring-bg-surface",
  xs: "ring-1 ring-inset ring-bg-surface",
  sm: "ring-2 ring-inset ring-bg-surface",
  md: "ring-2 ring-inset ring-bg-surface",
  lg: "ring-2 ring-inset ring-bg-surface",
  xl: "ring-2 ring-inset ring-bg-surface",
} as const;

/** `Icon` frame inside the avatar, measured per size. */
const iconClass = {
  "2xs": "size-[12px]",
  xs: "size-[14px]",
  sm: "size-[18px]",
  md: "size-[22px]",
  lg: "size-[26px]",
  xl: "size-[36px]",
} as const;

/**
 * `_Status dot` is a 12px component: a `bg/surface` Ring with an 8px coloured
 * Dot inside — so the coloured core is two thirds of the overall diameter, and
 * the surface-coloured margin is what separates it from the avatar. Instances
 * sit flush at 2XS–MD and inset 1px at LG/XL.
 */
const dotClass = {
  "2xs": "size-[6px] right-0 bottom-0",
  xs: "size-[7px] right-0 bottom-0",
  sm: "size-[9px] right-0 bottom-0",
  md: "size-[11px] right-0 bottom-0",
  lg: "size-[13px] right-[1px] bottom-[1px]",
  xl: "size-[16px] right-[1px] bottom-[1px]",
} as const;

/** Figma offers exactly these three; there is no busy or away variant. */
const statusColor = {
  online: "bg-icon-success",
  offline: "bg-icon-disabled",
  verified: "bg-icon-blue",
} as const;

export type AvatarStatus = keyof typeof statusColor;
type AvatarSize = keyof typeof ringClass;

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    Omit<VariantProps<typeof avatarVariants>, "tone" | "interactive"> {
  /** Image source — mirrors `Type=Image`. Falls back to initials, then icon. */
  src?: string;
  alt?: string;
  /** Two-letter initials — mirrors `Type=Initials`. */
  initials?: string;
  /** Overrides the default glyph — mirrors `Type=Icon`. */
  icon?: React.ReactNode;
  /** Adds the status dot — Online · Offline · Verified. */
  status?: AvatarStatus;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  disabled?: boolean;
}

const UserGlyph = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size = "md", src, alt, initials, icon, status, onClick, disabled, ...props }, ref) => {
    const [failed, setFailed] = React.useState(false);
    const showImage = Boolean(src) && !failed;
    const tone = showImage ? "image" : initials ? "initials" : "icon";
    const key = (size ?? "md") as AvatarSize;

    return (
      <span className="relative inline-flex">
        <span
          ref={ref}
          role={onClick ? "button" : undefined}
          tabIndex={onClick && !disabled ? 0 : undefined}
          aria-disabled={disabled || undefined}
          aria-label={!showImage && !initials ? alt : undefined}
          onClick={disabled ? undefined : onClick}
          className={cn(
            avatarVariants({ size, tone, interactive: Boolean(onClick) && !disabled }),
            ringClass[key],
            // `Hover overlay` — text/primary at 8% over the fill.
            onClick && !disabled && "after:absolute after:inset-0 after:bg-text-primary after:opacity-0 after:transition-opacity after:duration-interaction after:ease-decelerate hover:after:opacity-[0.08]",
            disabled && "pointer-events-none opacity-50",
            className
          )}
          {...props}
        >
          {showImage ? (
            <img src={src} alt={alt ?? ""} onError={() => setFailed(true)} className="size-full object-cover" />
          ) : initials ? (
            initials.slice(0, 2).toUpperCase()
          ) : (
            <span className={cn("inline-flex items-center justify-center", iconClass[key])}>{icon ?? UserGlyph}</span>
          )}
        </span>
        {status && (
          // Ring in bg/surface, coloured core at two thirds — matches `_Status dot`.
          <span
            className={cn("absolute inline-flex items-center justify-center rounded-full bg-bg-surface", dotClass[key])}
            role="img"
            aria-label={status}
          >
            <span className={cn("h-2/3 w-2/3 rounded-full", statusColor[status])}>
              {status === "verified" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-icon-on-brand)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="size-full" aria-hidden="true">
                  <path d="M5 12.5l5 5 9-10" />
                </svg>
              )}
            </span>
          </span>
        )}
      </span>
    );
  }
);
Avatar.displayName = "Avatar";
