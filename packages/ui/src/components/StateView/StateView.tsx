import * as React from "react";
import { cn } from "../../lib/cn";
import {
  AlertCircle,
  CheckmarkCircle02,
  Clock02,
  CloudServer,
  Inbox,
  Lock,
  SearchRemove,
  Wrench01,
} from "@ideeza/icons";

/**
 * StateView — mirrors ten components on Figma's Molecules — States page:
 * M48 Empty, M49 Error, M52 Success, M53 No Results, M54 Permission Denied,
 * M55 No Connection, M56 Maintenance, M57 Not Found, M58 Coming Soon and
 * M59 Server Error.
 *
 * They are ten components in Figma and one here, because they are the same
 * component: every one is a VERTICAL stack at gap 10 and padding 12, centred,
 * on bg/surface, holding an 80px round badge with a 40px glyph, a text block
 * at gap 4 with Heading/H3 over Body/SM, and an actions row at gap 6. Nothing
 * about the geometry varies. What varies is the glyph, two colours and the
 * copy — so those are props, and `preset` supplies Figma's pairing for each
 * of the ten by name.
 *
 * The badge fill and the glyph colour are set independently, because Figma
 * does not derive one from the other: Not Found and Coming Soon put an
 * icon/secondary glyph on a brand-subtle badge, and Empty and No Results
 * leave the glyph inheriting on a neutral badge. Pairing them by rule would
 * have quietly recoloured four of the ten.
 */
export type StatePreset =
  | "empty"
  | "error"
  | "success"
  | "no-results"
  | "permission-denied"
  | "no-connection"
  | "maintenance"
  | "not-found"
  | "coming-soon"
  | "server-error";

const badgeTone = {
  neutral: "bg-bg-subtle",
  error: "bg-bg-error-subtle",
  success: "bg-bg-success-subtle",
  warning: "bg-bg-warning-subtle",
  info: "bg-bg-info-subtle",
  brand: "bg-bg-brand-subtle",
} as const;

const glyphTone = {
  inherit: "text-icon",
  error: "text-icon-error",
  success: "text-icon-success",
  warning: "text-icon-warning",
  blue: "text-icon-blue",
  secondary: "text-icon-secondary",
} as const;

export type StateBadgeTone = keyof typeof badgeTone;
export type StateGlyphTone = keyof typeof glyphTone;

/** Exactly the pairings in the file — badge and glyph read separately. */
export const statePresets: Record<
  StatePreset,
  { icon: React.ComponentType<{ className?: string }>; badge: StateBadgeTone; glyph: StateGlyphTone }
> = {
  empty: { icon: Inbox, badge: "neutral", glyph: "inherit" },
  error: { icon: AlertCircle, badge: "error", glyph: "error" },
  success: { icon: CheckmarkCircle02, badge: "success", glyph: "success" },
  "no-results": { icon: SearchRemove, badge: "neutral", glyph: "inherit" },
  "permission-denied": { icon: Lock, badge: "warning", glyph: "warning" },
  "no-connection": { icon: AlertCircle, badge: "warning", glyph: "warning" },
  maintenance: { icon: Wrench01, badge: "info", glyph: "blue" },
  "not-found": { icon: AlertCircle, badge: "brand", glyph: "secondary" },
  "coming-soon": { icon: Clock02, badge: "brand", glyph: "secondary" },
  "server-error": { icon: CloudServer, badge: "error", glyph: "error" },
};

export interface StateViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Picks Figma's glyph and colours for one of the ten named states. */
  preset?: StatePreset;
  /** Overrides the preset's glyph. */
  icon?: React.ReactNode;
  badgeTone?: StateBadgeTone;
  glyphTone?: StateGlyphTone;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons, laid out at gap 6 as in Figma's actions frame. */
  actions?: React.ReactNode;
}

export const StateView = React.forwardRef<HTMLDivElement, StateViewProps>(
  ({ className, preset = "empty", icon, badgeTone: badgeOverride, glyphTone: glyphOverride, title, description, actions, children, ...props }, ref) => {
    const p = statePresets[preset];
    const Glyph = p.icon;
    const badge = badgeOverride ?? p.badge;
    const glyph = glyphOverride ?? p.glyph;

    return (
      <div
        ref={ref}
        className={cn("flex w-full flex-col items-center gap-[10px] bg-bg-surface p-[12px] text-center", className)}
        {...props}
      >
        <span className={cn("inline-flex size-[80px] items-center justify-center rounded-full", badgeTone[badge])}>
          {icon ?? <Glyph className={cn("size-[40px]", glyphTone[glyph])} />}
        </span>

        <div className="flex flex-col items-center gap-[4px]">
          {title && <span className="text-heading-h3 text-text-primary">{title}</span>}
          {description && <span className="text-body-sm text-text-secondary">{description}</span>}
          {children}
        </div>

        {actions && <div className="flex items-center gap-[6px]">{actions}</div>}
      </div>
    );
  }
);
StateView.displayName = "StateView";
