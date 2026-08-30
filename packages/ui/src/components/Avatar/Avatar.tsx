import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Avatar — mirrors Figma `A16 Avatar` (Atoms — Display).
 *
 * Figma variant map:
 * - Type  → chosen by props: `src` → Image, `children`/`initials` → Initials, otherwise Icon
 * - Size  → `size` (2XS 20 · XS 24 · SM 32 · MD 40 · LG 48 · XL 64)
 * - State → native `:hover` / `:focus-visible` / `disabled`
 *
 * Two details carried over from the file:
 * - The "Contrast border" is an inset ring in `bg/surface`, so avatars stay
 *   separated when they overlap in a group. 1px up to XS, 2px from SM.
 * - Initials step through named text styles rather than raw sizes:
 *   Overline/SM → Label/SM → Label/LG → Heading/H6 → Heading/H5 → Heading/H3.
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
      /** Figma fills the Initials type with bg/brand-subtle and Icon with bg/surface-raised. */
      tone: {
        initials: "bg-bg-brand-subtle text-text-brand",
        icon: "bg-bg-surface-raised text-icon",
        image: "bg-bg-surface-raised",
      },
      interactive: {
        true: "cursor-pointer outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
        false: "",
      },
    },
    defaultVariants: { size: "md", tone: "initials", interactive: false },
  }
);

/** Contrast border weight — Figma uses 1px at 20/24 and 2px from 32 up. */
const ringClass: Record<string, string> = {
  "2xs": "ring-1 ring-inset ring-bg-surface",
  xs: "ring-1 ring-inset ring-bg-surface",
  sm: "ring-2 ring-inset ring-bg-surface",
  md: "ring-2 ring-inset ring-bg-surface",
  lg: "ring-2 ring-inset ring-bg-surface",
  xl: "ring-2 ring-inset ring-bg-surface",
};

/** Status dot diameters, read off the `Status dot` instance in each size. */
const dotSize: Record<string, string> = {
  "2xs": "size-[6px]",
  xs: "size-[7px]",
  sm: "size-[9px]",
  md: "size-[11px]",
  lg: "size-[13px]",
  xl: "size-[16px]",
};

const statusColor = {
  online: "bg-bg-success",
  offline: "bg-text-tertiary",
  busy: "bg-bg-error",
  away: "bg-bg-warning",
} as const;

export type AvatarStatus = keyof typeof statusColor;

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    Omit<VariantProps<typeof avatarVariants>, "tone" | "interactive"> {
  /** Image source. Wins over initials — mirrors `Type=Image`. */
  src?: string;
  alt?: string;
  /** Two-letter initials — mirrors `Type=Initials`. */
  initials?: string;
  /** Fallback glyph when there is neither image nor initials — mirrors `Type=Icon`. */
  icon?: React.ReactNode;
  /** Adds the status dot. */
  status?: AvatarStatus;
  /** Renders as a button and enables hover/focus affordances. */
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  disabled?: boolean;
}

const DefaultIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[55%]" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size = "md", src, alt, initials, icon, status, onClick, disabled, ...props }, ref) => {
    const [failed, setFailed] = React.useState(false);
    const showImage = Boolean(src) && !failed;
    const tone = showImage ? "image" : initials ? "initials" : "icon";
    const key = size ?? "md";

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
            // Figma `State=Hover` is an 8% text/primary wash over the fill.
            onClick && !disabled && "after:absolute after:inset-0 after:bg-text-primary after:opacity-0 hover:after:opacity-[0.08]",
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
            (icon ?? DefaultIcon)
          )}
        </span>
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full ring-2 ring-bg-surface",
              dotSize[key],
              statusColor[status]
            )}
            aria-label={status}
          />
        )}
      </span>
    );
  }
);
Avatar.displayName = "Avatar";
