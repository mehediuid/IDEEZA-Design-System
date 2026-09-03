import * as React from "react";
import { cx } from "../../lib/cx";

/**
 * Avatar — mirrors Figma `A16 Avatar` (Atoms — Display).
 *
 * Figma variant map:
 * - Type  → chosen by props: `src` → Image, `initials` → Initials, otherwise Icon
 * - Size  → `size` (2XS 20 · XS 24 · SM 32 · MD 40 · LG 48 · XL 64)
 * - State → native `:hover` / `:focus-visible` / `disabled`
 *
 * Every number is measured off the file, not derived from a ratio — see
 * `Avatar.css`, which holds all of it.
 */
export type AvatarSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarTone = "initials" | "icon" | "image";

/**
 * The class list for a size, tone and interactivity — exported so a consumer
 * can put avatar styling on another element, which is what `avatarVariants`
 * did before.
 */
export function avatarVariants(
  props: { size?: AvatarSize | null; tone?: AvatarTone | null; interactive?: boolean | null; className?: string } = {}
) {
  const size = props.size ?? "md";
  const tone = props.tone ?? "initials";
  return cx(
    "ids-avatar",
    `ids-avatar--${size}`,
    `ids-avatar--${tone}`,
    props.interactive ? "ids-avatar--interactive" : null,
    props.className
  );
}

/** Figma offers exactly these three; there is no busy or away variant. */
export type AvatarStatus = "online" | "offline" | "verified";

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  size?: AvatarSize;
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
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ids-avatar__glyph" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size = "md", src, alt, initials, icon, status, onClick, disabled, ...props }, ref) => {
    const [failed, setFailed] = React.useState(false);
    const showImage = Boolean(src) && !failed;
    const tone: AvatarTone = showImage ? "image" : initials ? "initials" : "icon";

    return (
      <span className="ids-avatar__wrap">
        <span
          ref={ref}
          role={onClick ? "button" : undefined}
          tabIndex={onClick && !disabled ? 0 : undefined}
          aria-disabled={disabled || undefined}
          aria-label={!showImage && !initials ? alt : undefined}
          onClick={disabled ? undefined : onClick}
          className={cx(
            avatarVariants({ size, tone, interactive: Boolean(onClick) && !disabled }),
            disabled ? "ids-avatar--disabled" : null,
            className
          )}
          {...props}
        >
          {showImage ? (
            <img src={src} alt={alt ?? ""} onError={() => setFailed(true)} className="ids-avatar__image" />
          ) : initials ? (
            initials.slice(0, 2).toUpperCase()
          ) : (
            <span className={cx("ids-avatar__icon", `ids-avatar__icon--${size}`)}>{icon ?? UserGlyph}</span>
          )}
        </span>
        {status && (
          // Ring in bg/surface, coloured core at two thirds — matches `_Status dot`.
          <span
            className={cx("ids-avatar__status", `ids-avatar__status--${size}`)}
            role="img"
            aria-label={status}
          >
            <span className={cx("ids-avatar__status-core", `ids-avatar__status-core--${status}`)}>
              {status === "verified" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-icon-on-brand)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="ids-avatar__glyph" aria-hidden="true">
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
