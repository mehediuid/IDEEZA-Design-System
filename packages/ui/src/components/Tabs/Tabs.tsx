import * as React from "react";
import { cn } from "../../lib/cn";
import { motionPress, motionSpring } from "../../lib/motion";
import { mergeRefs } from "../../lib/refs";
import { useIsomorphicLayoutEffect } from "../../lib/use-isomorphic-layout-effect";

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
 *
 * The active treatment is painted by one absolutely positioned element that
 * slides between tabs, rather than by the selected tab drawing its own. At
 * rest the two are pixel-identical — the indicator is measured from the tab's
 * own box — so this changes nothing about the Figma geometry; it only means
 * the mark travels instead of blinking from one tab to the next. It travels on
 * the spring, which is what distinguishes it from a cross-fade.
 *
 * The indicator is measured, so it cannot exist in server-rendered markup; it
 * appears in the layout effect, before the browser paints. Under SSR the very
 * first painted frame is therefore the hydrated one, not the server one.
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

// The active row carries only what does not move: the label colour, and the
// transparent border that reserves the Line underline's 2px so selecting a tab
// never changes its height. The fill, the tray card and the underline itself
// are drawn by the sliding indicator below.
const state = {
  fill: {
    idle: "text-text-tertiary hover:bg-bg-subtle hover:text-text-primary",
    active: "text-text-inverse",
    disabled: "bg-bg-subtle text-text-disabled",
  },
  line: {
    idle: "text-text-tertiary border-b-[2px] border-transparent hover:border-border-subtle hover:text-text-primary",
    active: "text-text-brand border-b-[2px] border-transparent",
    disabled: "text-text-disabled border-b-[2px] border-transparent",
  },
  toggle: {
    idle: "text-text-tertiary hover:bg-bg-subtle hover:text-text-primary",
    active: "text-text-primary",
    disabled: "text-text-disabled",
  },
} as const;

/**
 * The indicator's own paint, per style. Radius matches the item so the pill
 * lands exactly on the tab's corners; `line` is the 2px rule and is pinned to
 * the tab's bottom edge rather than filling it.
 */
const indicator = {
  fill: { sm: "rounded-[6px]", md: "rounded-[8px]", lg: "rounded-[8px]" },
  toggle: { sm: "rounded-[6px]", md: "rounded-[8px]", lg: "rounded-[8px]" },
  line: { sm: "", md: "", lg: "" },
} as const;

const indicatorPaint = {
  fill: "bg-bg-brand",
  line: "bg-border-brand",
  toggle: "bg-bg-surface border border-border-subtle",
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

    const style = itemStyleFor(variant);
    const list = React.useRef<HTMLDivElement>(null);
    const [box, setBox] = React.useState<{ left: number; top: number; width: number; height: number } | null>(null);
    // First placement must not animate, or the indicator slides in from the
    // left edge on mount. Only movement between tabs travels.
    const placed = React.useRef(false);

    useIsomorphicLayoutEffect(() => {
      const el = list.current;
      if (!el) return;
      const measure = () => {
        const tab = el.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
        setBox(
          tab
            ? { left: tab.offsetLeft, top: tab.offsetTop, width: tab.offsetWidth, height: tab.offsetHeight }
            : null
        );
      };
      measure();
      // Width=FILL tabs and any label that reflows change the geometry without
      // changing the selection, so the indicator has to follow the box, not
      // just the value.
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      el.querySelectorAll('[role="tab"]').forEach((t) => ro.observe(t));
      return () => ro.disconnect();
    }, [current, variant, size, fill, children]);

    React.useEffect(() => {
      if (box) placed.current = true;
    }, [box]);

    return (
      <TabsContext.Provider value={{ variant, size, value: current, onValueChange: change }}>
        <div
          ref={mergeRefs(ref, list)}
          role="tablist"
          className={cn("relative flex items-center", container[variant], fill && "w-full", className)}
          {...props}
        >
          {box && (
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute",
                indicatorPaint[style],
                indicator[style][size],
                placed.current && "transition-[left,top,width,height] " + motionSpring
              )}
              style={
                style === "line"
                  ? { left: box.left, width: box.width, top: box.top + box.height - 2, height: 2 }
                  : { left: box.left, top: box.top, width: box.width, height: box.height }
              }
            />
          )}
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
          // `relative` puts the label above the absolutely positioned indicator;
          // it changes no geometry.
          "relative inline-flex items-center justify-center gap-[6px] whitespace-nowrap font-sans",
          "outline-none " + motionPress,
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
