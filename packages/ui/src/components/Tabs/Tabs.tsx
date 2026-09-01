import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * Tabs — mirrors Figma `M14 Tabs` with `_TabFill`, `_TabLine` and
 * `_TabToggle` (Molecules — Navigation).
 *
 * Figma variant map:
 * - M14 Style → `variant` (Fill · Line · Line Full · Toggle)
 * - M14 Width → `fill` (HUG / FILL)
 * - item Size  → `size`  (SM · MD · LG)
 * - item State → hover / `selected` / `disabled`
 *
 * Three item components rather than one, because the styles do not share a
 * ramp — Fill is 36/38/44, Line is 36/40/48 and Toggle is 32/36/44, and each
 * has its own padding. Only the 6px gap and the counter pill are common.
 *
 * The active treatment differs in kind, not just colour:
 *   Fill    fills bg/brand and flips the label to text/inverse
 *   Line    draws a 2px bottom border in border/brand, label text/brand
 *   Toggle  lifts onto bg/surface with a 1px border/subtle
 * Line Full adds a 1px border/subtle under the whole strip so the inactive
 * tabs sit on a rule; Toggle wraps the set in a bg/subtle tray at radius 12.
 */
export type TabsVariant = "fill" | "line" | "line-full" | "toggle";
export type TabsSize = "sm" | "md" | "lg";

const item = {
  fill: {
    sm: "h-[36px] rounded-[6px] px-[12px] py-[8px] text-body-sm-medium",
    md: "h-[38px] rounded-[8px] px-[14px] py-[9px] text-body-sm-medium",
    lg: "h-[44px] rounded-[8px] px-[16px] py-[10px] text-body-md-medium",
  },
  line: {
    sm: "h-[36px] px-[4px] py-[8px] text-body-sm-medium",
    md: "h-[40px] px-[4px] py-[10px] text-body-sm-medium",
    lg: "h-[48px] px-[4px] py-[12px] text-body-md-medium",
  },
  toggle: {
    sm: "h-[32px] rounded-[6px] px-[12px] py-[6px] text-body-sm-medium",
    md: "h-[36px] rounded-[8px] px-[14px] py-[8px] text-body-sm-medium",
    lg: "h-[44px] rounded-[8px] px-[16px] py-[10px] text-body-md-medium",
  },
} as const;

const state = {
  fill: {
    idle: "text-text-tertiary hover:bg-bg-subtle hover:text-text-primary",
    active: "bg-bg-brand text-text-inverse",
    disabled: "bg-bg-subtle text-text-disabled",
  },
  line: {
    idle: "text-text-tertiary border-b-[2px] border-transparent hover:border-border-subtle hover:text-text-primary",
    active: "text-text-brand border-b-[2px] border-border-brand",
    disabled: "text-text-disabled border-b-[2px] border-transparent",
  },
  toggle: {
    idle: "text-text-tertiary hover:bg-bg-subtle hover:text-text-primary",
    active: "bg-bg-surface text-text-primary border border-border-subtle",
    disabled: "text-text-disabled",
  },
} as const;

const container = {
  fill: "h-[38px] gap-0",
  line: "h-[40px] gap-0",
  "line-full": "h-[40px] gap-0 border-b border-border-subtle",
  toggle: "h-[44px] gap-[4px] rounded-[12px] bg-bg-subtle p-[4px]",
} as const;

/** Line Full uses the Line item; the difference is the rule under the strip. */
const itemStyleFor = (v: TabsVariant) => (v === "line-full" ? "line" : v);

interface TabsContextValue {
  variant: TabsVariant;
  size: TabsSize;
  value?: string;
  onValueChange?: (value: string) => void;
}
const TabsContext = React.createContext<TabsContextValue>({ variant: "fill", size: "md" });

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  variant?: TabsVariant;
  size?: TabsSize;
  /** Mirrors Width=FILL — tabs share the row equally. */
  fill?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, variant = "fill", size = "md", fill, value, defaultValue, onValueChange, children, ...props }, ref) => {
    const [inner, setInner] = React.useState(defaultValue);
    const current = value ?? inner;
    const change = (v: string) => {
      if (value === undefined) setInner(v);
      onValueChange?.(v);
    };
    return (
      <TabsContext.Provider value={{ variant, size, value: current, onValueChange: change }}>
        <div
          ref={ref}
          role="tablist"
          className={cn("flex items-center", container[variant], fill && "w-full", className)}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

export interface TabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
  /** The pill after the label — 20px tall, radius full, bg/subtle. */
  counter?: React.ReactNode;
  /** Overrides the group's Width=FILL for this tab. */
  fill?: boolean;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ className, value, counter, fill, disabled, children, onClick, ...props }, ref) => {
    const ctx = React.useContext(TabsContext);
    const style = itemStyleFor(ctx.variant);
    const selected = ctx.value === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={selected}
        disabled={disabled}
        onClick={(e) => {
          ctx.onValueChange?.(value);
          onClick?.(e);
        }}
        className={cn(
          "inline-flex items-center justify-center gap-[6px] whitespace-nowrap font-sans",
          "outline-none transition-colors duration-interaction ease-decelerate",
          "focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
          "disabled:pointer-events-none",
          item[style][ctx.size],
          disabled ? state[style].disabled : selected ? state[style].active : state[style].idle,
          fill && "flex-1",
          className
        )}
        {...props}
      >
        {children}
        {counter !== undefined && (
          <span className="inline-flex h-[20px] min-w-[19px] items-center justify-center rounded-full bg-bg-subtle px-[6px] text-caption-sm text-text-secondary">
            {counter}
          </span>
        )}
      </button>
    );
  }
);
Tab.displayName = "Tab";
