import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Button, Kbd, Code, Dot, DeltaChip, InlineMessage, Link, InlineCta, Badge, IconButton, Spinner, Banner, Snackbar } from "@ideeza/ui";
// The stylesheet from the published 0.2.0 build — the last Tailwind one.
import oldCss from "./old/styles.css?raw";

/**
 * Every migrated component against the Tailwind build it replaced.
 *
 * A rewrite is exactly where "pixel perfect" quietly stops being true, and it
 * fails invisibly: each value still looks plausible on its own. So each case
 * renders the old class strings and the new component side by side and diffs
 * every computed CSS property between them.
 *
 * The old side is a plain element carrying the classes the previous component
 * emitted, taken verbatim from the commit before its migration, styled by the
 * 0.2.0 stylesheet. It uses the same tag as the new one on purpose — `kbd` and
 * `code` come with their own user-agent font, and comparing either against a
 * `div` would report differences that are the browser's, not ours.
 *
 * The two stylesheets share the page safely: the token variables hold the same
 * values in both, and the class names do not overlap.
 *
 * Adding a component here is one entry in `CASES`.
 */
const meta: Meta = { title: "_Migration/Diff", parameters: { layout: "padded" } };
export default meta;

const PRESS =
  "transition-[color,background-color,border-color,box-shadow,transform] duration-interaction ease-decelerate active:duration-instant active:scale-[0.97]";
const LIFT = "hover:-translate-y-px hover:shadow-2 active:translate-y-0";
const SWELL = "hover:scale-[1.02]";

interface Case {
  /** Component name, for the report. */
  name: string;
  /** Tag the component renders, so the old side matches its UA styles. */
  tag: keyof React.JSX.IntrinsicElements;
  /** label → the classes the old component emitted. */
  old: Record<string, string>;
  /** label → the new component, rendered. */
  render: (key: string) => React.ReactNode;
  /**
   * The content both sides get, as a value or per key. It has to be identical
   * on both sides: intrinsic width is a computed style, so a different label
   * on each side reports a real-looking width difference that is entirely the
   * harness's doing — and content that varies with the key (DeltaChip draws a
   * different arrow per trend) has to vary on both sides too.
   */
  children?: React.ReactNode | ((key: string) => React.ReactNode);
  /**
   * Differences that are correct — where the new CSS is right and the old
   * build was wrong. Returns the reason, which is printed, so nothing is
   * quietly waved through: a silenced difference has to be argued for in
   * writing, next to the thing it silences.
   */
  expected?: (key: string, prop: string) => string | false;
}

const buttonBase =
  "inline-flex items-center justify-center whitespace-nowrap select-none [--bd:0px] font-sans " +
  PRESS +
  " outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]" +
  " disabled:pointer-events-none disabled:shadow-none disabled:bg-button-disabled-bg disabled:bg-none" +
  " disabled:text-button-disabled-text disabled:border-transparent";

const buttonVariant: Record<string, string> = {
  primary:
    "bg-button-primary-bg text-button-primary-text shadow-depth-accent " + LIFT +
    " hover:bg-button-primary-bg-hover active:bg-button-primary-bg-pressed" +
    " focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-on-fill)]",
  secondary:
    "bg-button-secondary-bg text-button-secondary-text " + SWELL +
    " border-solid border-[1.5px] border-button-secondary-border [--bd:1.5px]" +
    " hover:bg-button-secondary-bg-hover hover:border-button-secondary-border-hover" +
    " active:bg-button-secondary-bg-pressed active:border-button-secondary-border-hover" +
    " focus-visible:border-border-focus",
  ghost: "bg-transparent text-button-secondary-text " + SWELL +
    " hover:bg-button-ghost-bg-hover active:bg-bg-surface-raised",
  danger:
    "bg-button-danger-bg text-button-primary-text shadow-depth-accent " + LIFT +
    " hover:bg-button-danger-bg-hover active:bg-button-danger-bg-pressed" +
    " focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-danger)]",
  tonal: "bg-button-tonal-bg text-button-tonal-text " + SWELL +
    " hover:bg-button-tonal-bg-hover active:bg-button-tonal-bg-pressed" +
    " focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo-on-fill)]",
  outline: "bg-transparent text-text-brand " + SWELL +
    " border-solid border-[1.5px] border-border-brand [--bd:1.5px]" +
    " hover:bg-button-outline-bg-hover active:bg-button-outline-bg-pressed",
  inverse: "bg-button-inverse-bg text-button-inverse-text " + SWELL +
    " hover:bg-button-inverse-bg-hover active:bg-button-inverse-bg-pressed" +
    " focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo-inverse)]",
  ai: "bg-ai text-text-on-brand shadow-depth-accent " + LIFT +
    " hover:bg-ai-hover active:bg-ai-pressed" +
    " focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-on-fill)]",
};

const buttonSize: Record<string, string> = {
  sm: "h-[32px] rounded-[8px] px-[calc(12px-var(--bd))] gap-[6px] text-label-md [&_svg]:size-[14px]",
  md: "h-[36px] rounded-[8px] px-[calc(14px-var(--bd))] gap-[6px] text-label-lg [&_svg]:size-[16px]",
  lg: "h-[40px] rounded-[12px] px-[calc(16px-var(--bd))] gap-[6px] text-label-lg [&_svg]:size-[16px]",
  xl: "h-[44px] rounded-[12px] px-[calc(20px-var(--bd))] gap-[8px] text-label-xl [&_svg]:size-[20px]",
  "2xl": "h-[48px] rounded-[16px] px-[calc(24px-var(--bd))] gap-[8px] text-label-xl [&_svg]:size-[20px]",
};

const kbdBase =
  "inline-flex items-center justify-center rounded-[4px] font-mono align-middle whitespace-nowrap" +
  " border border-border bg-bg-surface-raised text-text-secondary";
const kbdSize: Record<string, string> = {
  sm: "h-[22px] px-[6px] py-[2px] text-code-sm",
  md: "h-[24px] px-[8px] py-[3px] text-code-sm",
  lg: "h-[30px] px-[10px] py-[5px] text-code-md",
};

const codeBase = "inline-flex items-center rounded-[4px] font-mono align-middle bg-bg-subtle text-text-primary";
const codeSize: Record<string, string> = {
  sm: "h-[22px] px-[6px] py-[2px] text-code-sm",
  md: "h-[24px] px-[8px] py-[3px] text-code-sm",
  lg: "h-[28px] px-[10px] py-[4px] text-code-md",
};

const dotBase = "inline-block shrink-0 rounded-full ring-2 ring-bg-surface align-middle";
const dotSize: Record<string, string> = {
  xs: "size-[6px]", sm: "size-[8px]", md: "size-[10px]", lg: "size-[12px]",
};
const dotColor: Record<string, string> = {
  brand: "bg-bg-brand", neutral: "bg-bg-inverse", blue: "bg-bg-blue",
  success: "bg-bg-success", warning: "bg-bg-warning", error: "bg-bg-error",
};

const deltaBase = "inline-flex items-center rounded-full font-sans whitespace-nowrap align-middle";
const deltaSize: Record<string, string> = {
  sm: "h-[20px] gap-[3px] px-[8px] py-[2px] text-label-sm [&>svg]:size-[12px]",
  md: "h-[24px] gap-[4px] px-[10px] py-[4px] text-label-md [&>svg]:size-[14px]",
};
/** trend and variant only mean anything together, as in Figma. */
const deltaPair: Record<string, string> = {
  "subtle/up": "bg-chart-delta-up-bg text-chart-delta-up-text",
  "subtle/down": "bg-chart-delta-down-bg text-chart-delta-down-text",
  "subtle/flat": "bg-chart-delta-flat-bg text-chart-delta-flat-text",
  "filled/up": "bg-chart-delta-up-icon text-text-inverse",
  "filled/down": "bg-chart-delta-down-icon text-text-inverse",
  "filled/flat": "bg-chart-delta-flat-icon text-text-inverse",
  "text/up": "text-chart-delta-up-text",
  "text/down": "text-chart-delta-down-text",
  "text/flat": "text-chart-delta-flat-text",
};

/** The arrow paths DeltaChip draws, so the old side can draw the same one. */
const deltaArrow = {
  up: "M12 19V5M5 12l7-7 7 7",
  down: "M12 5v14M19 12l-7 7-7-7",
  flat: "M5 12h14",
} as const;

const messageBase = "inline-flex items-center gap-[4px] text-caption-md";
const messageSeverity: Record<string, string> = {
  helper: "text-text-secondary",
  info: "text-icon-blue",
  success: "text-text-success",
  warning: "text-text-warning",
  error: "text-text-error",
};

const linkBase =
  "inline-flex items-center gap-[4px] font-sans cursor-pointer underline-offset-2 hover:underline" +
  " transition-colors duration-interaction ease-decelerate" +
  " outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)] rounded-[2px]" +
  " aria-disabled:pointer-events-none aria-disabled:text-text-disabled aria-disabled:no-underline";
const linkSize: Record<string, string> = {
  sm: "text-body-xs-medium [&>svg]:size-[12px]",
  md: "text-body-sm-medium [&>svg]:size-[14px]",
  lg: "text-body-md-medium [&>svg]:size-[16px]",
};
const linkColor: Record<string, string> = {
  brand: "text-text-brand hover:text-text-brand-hover",
  neutral: "text-text-primary",
  inverse: "text-text-inverse",
  error: "text-text-error hover:text-text-error-hover",
};

const ctaBase =
  "inline-flex items-center gap-[6px] font-sans cursor-pointer" +
  " transition-colors duration-interaction ease-decelerate" +
  " outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)] rounded-[2px]" +
  " aria-disabled:pointer-events-none aria-disabled:text-text-disabled" +
  " [&>svg]:transition-transform [&>svg]:duration-interaction ease-decelerate";
const ctaSize: Record<string, string> = {
  sm: "text-caption-md [&>svg]:size-[12px]",
  md: "text-body-sm-medium [&>svg]:size-[14px]",
  lg: "text-body-md-medium [&>svg]:size-[16px]",
};
const ctaColor: Record<string, string> = { brand: "text-text-brand", neutral: "text-text-primary" };
const ctaArrowClass: Record<string, string> = {
  right: "hover:[&>svg]:translate-x-[2px]",
  down: "hover:[&>svg]:translate-y-[2px]",
};
const ctaArrowPath = {
  right: "M5 12h14M13 6l6 6-6 6",
  down: "M12 5v14M6 13l6 6 6-6",
} as const;

const badgeBase = "inline-flex items-center font-sans whitespace-nowrap rounded-full";
const badgeSize: Record<string, string> = {
  sm: "h-[20px] gap-[4px] px-[6px] text-caption-sm",
  md: "h-[24px] gap-[4px] px-[8px] text-caption-md",
  lg: "h-[24px] gap-[6px] px-[10px] text-label-sm",
};
/** variant and colour only mean anything together, as in Figma. */
const badgePair: Record<string, string> = {
  "subtle/brand": "bg-badge-brand-bg text-badge-brand-text",
  "subtle/neutral": "bg-bg-subtle text-text-secondary",
  "subtle/blue": "bg-badge-blue-bg text-badge-blue-text",
  "subtle/success": "bg-badge-success-bg text-badge-success-text",
  "subtle/warning": "bg-badge-warning-bg text-badge-warning-text",
  "subtle/error": "bg-badge-error-bg text-badge-error-text",
  "solid/brand": "bg-bg-brand text-text-on-brand",
  "solid/neutral": "bg-bg-inverse text-text-inverse",
  "solid/blue": "bg-bg-blue text-text-inverse",
  "solid/success": "bg-bg-success text-text-inverse",
  "solid/warning": "bg-bg-warning text-text-inverse",
  "solid/error": "bg-bg-error text-text-inverse",
  "outline/brand": "border bg-transparent border-border-brand text-text-brand",
  "outline/neutral": "border bg-transparent border-border text-text-secondary",
  "outline/blue": "border bg-transparent border-border-blue text-text-blue",
  "outline/success": "border bg-transparent border-border-success text-text-success",
  "outline/warning": "border bg-transparent border-border-warning text-text-warning",
  "outline/error": "border bg-transparent border-border-error text-text-error",
};

const iconButtonBase =
  "inline-flex items-center justify-center shrink-0 select-none [--bd:0px] " + PRESS +
  " outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]" +
  " disabled:pointer-events-none disabled:shadow-none" +
  " disabled:bg-button-disabled-bg disabled:text-button-disabled-text disabled:border-transparent";
const iconButtonVariantClass: Record<string, string> = {
  primary: "bg-button-primary-bg text-button-primary-text shadow-depth-accent " + LIFT +
    " hover:bg-button-primary-bg-hover active:bg-button-primary-bg-pressed" +
    " focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-on-fill)]",
  secondary: "bg-button-secondary-bg text-button-secondary-text " + SWELL +
    " border-solid border-[1.5px] border-button-secondary-border [--bd:1.5px]" +
    " hover:bg-button-secondary-bg-hover hover:border-button-secondary-border-hover" +
    " active:bg-button-secondary-bg-pressed",
  ghost: "bg-transparent text-icon " + SWELL +
    " hover:bg-button-ghost-bg-hover hover:text-text-primary active:bg-bg-surface-raised",
  danger: "bg-button-danger-bg text-button-danger-text shadow-depth-accent " + LIFT +
    " hover:bg-button-danger-bg-hover active:bg-button-danger-bg-pressed" +
    " focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-danger)]",
};
const iconButtonSize: Record<string, string> = {
  "32": "size-[32px] rounded-[6px] [&_svg]:size-[16px]",
  "36": "size-[36px] rounded-[8px] [&_svg]:size-[18px]",
  "40": "size-[40px] rounded-[8px] [&_svg]:size-[20px]",
  "44": "size-[44px] rounded-[12px] [&_svg]:size-[22px]",
  "48": "size-[48px] rounded-[12px] [&_svg]:size-[24px]",
};

const spinnerBase = "inline-block shrink-0 align-middle relative";
const spinnerSize: Record<string, string> = {
  sm: "size-[16px]", md: "size-[20px]", lg: "size-[24px]", xl: "size-[32px]",
};
const spinnerColor: Record<string, string> = {
  brand: "text-icon-brand", neutral: "text-icon-secondary", inverse: "text-icon-on-brand",
  blue: "text-icon-blue", success: "text-icon-success", warning: "text-icon-warning",
  error: "text-icon-error",
};

const bannerBase = "flex w-full items-center gap-[6px] rounded-[6px] border py-[8px] pl-[12px] pr-[8px]";
const bannerSeverity: Record<string, string> = {
  info: "bg-bg-info-subtle border-border-blue",
  success: "bg-bg-success-subtle border-border-success",
  warning: "bg-bg-warning-subtle border-border-warning",
  error: "bg-bg-error-subtle border-border-error",
  neutral: "bg-bg-subtle border-border",
};

const snackbarBase =
  "flex items-center gap-[6px] rounded-[8px] bg-bg-inverse py-[6px] pl-[8px] pr-[6px] shadow-3";

const cross = <A extends string, B extends string>(
  a: Record<A, string>, b: Record<B, string>
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(a).flatMap(([ka, va]) =>
      Object.entries(b).map(([kb, vb]) => [`${ka}/${kb}`, `${va} ${vb}`])
    )
  );

const CASES: Case[] = [
  {
    name: "Button",
    tag: "button",
    old: Object.fromEntries(
      Object.entries(buttonVariant).flatMap(([v, vc]) =>
        Object.entries(buttonSize).map(([s, sc]) => [`${v}/${s}`, `${buttonBase} ${vc} ${sc}`])
      )
    ),
    children: "Continue",
    render: (key) => {
      const [variant, size] = key.split("/");
      return <Button variant={variant as never} size={size as never}>Continue</Button>;
    },
  },
  {
    name: "Kbd",
    tag: "kbd",
    old: Object.fromEntries(Object.entries(kbdSize).map(([s, c]) => [s, `${kbdBase} ${c}`])),
    children: "\u2318K",
    render: (key) => <Kbd size={key as never}>{"\u2318K"}</Kbd>,
  },
  {
    name: "Code",
    tag: "code",
    old: Object.fromEntries(Object.entries(codeSize).map(([s, c]) => [s, `${codeBase} ${c}`])),
    children: "npm i",
    render: (key) => <Code size={key as never}>npm i</Code>,
  },
  {
    name: "DeltaChip",
    tag: "span",
    old: Object.fromEntries(
      Object.entries(deltaSize).flatMap(([sz, szc]) =>
        Object.entries(deltaPair).map(([pair, pc]) => [`${sz}/${pair}`, `${deltaBase} ${szc} ${pc}`])
      )
    ),
    // The same arrow the component draws for that trend, so the two sides hold
    // the same content and the width comparison means something.
    children: (key) => {
      const trend = key.split("/")[2] as keyof typeof deltaArrow;
      return (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={deltaArrow[trend]} />
          </svg>
          12.4%
        </>
      );
    },
    render: (key) => {
      const [size, variant, trend] = key.split("/");
      return (
        <DeltaChip size={size as never} variant={variant as never} trend={trend as never}>
          12.4%
        </DeltaChip>
      );
    },
  },
  {
    name: "InlineMessage",
    tag: "span",
    old: Object.fromEntries(
      Object.entries(messageSeverity).map(([k, c]) => [k, `${messageBase} ${c}`])
    ),
    // Compared without the glyph: the old side sized it with a class on the
    // icon and the new side sizes it from the parent, so including it would
    // compare two different elements' children rather than the message itself.
    children: "Helper text",
    render: (key) => (
      <InlineMessage severity={key as never} hideIcon>
        Helper text
      </InlineMessage>
    ),
  },
  {
    name: "Link",
    tag: "a",
    old: Object.fromEntries(
      Object.entries(linkSize).flatMap(([sz, szc]) =>
        Object.entries(linkColor).map(([col, cc]) => [`${sz}/${col}`, `${linkBase} ${szc} ${cc}`])
      )
    ),
    children: "Read the docs",
    render: (key) => {
      const [size, color] = key.split("/");
      return <Link size={size as never} color={color as never}>Read the docs</Link>;
    },
  },
  {
    name: "InlineCta",
    tag: "a",
    old: Object.fromEntries(
      Object.entries(ctaSize).flatMap(([sz, szc]) =>
        Object.entries(ctaColor).flatMap(([col, cc]) =>
          Object.entries(ctaArrowClass).map(([ar, ac]) => [
            `${sz}/${col}/${ar}`,
            `${ctaBase} ${szc} ${cc} ${ac}`,
          ])
        )
      )
    ),
    children: (key) => {
      const arrow = key.split("/")[2] as keyof typeof ctaArrowPath;
      return (
        <>
          Get started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={ctaArrowPath[arrow]} />
          </svg>
        </>
      );
    },
    render: (key) => {
      const [size, color, arrow] = key.split("/");
      return (
        <InlineCta size={size as never} color={color as never} arrow={arrow as never}>
          Get started
        </InlineCta>
      );
    },
  },
  {
    name: "Badge",
    tag: "span",
    old: Object.fromEntries(
      Object.entries(badgeSize).flatMap(([sz, szc]) =>
        Object.entries(badgePair).map(([pair, pc]) => [`${sz}/${pair}`, `${badgeBase} ${szc} ${pc}`])
      )
    ),
    // `text-text-blue` was one of the five dead classes: the token existed and
    // the preset never exposed it under `text`, so the outline-blue badge has
    // been rendering with the inherited colour. The old side still shows that;
    // the new side is the fix.
    expected: (key, prop) =>
      key.includes("outline/blue") && /color$/.test(prop) && !prop.startsWith("border")
        ? "text-text-blue was dead in 0.2.0 — new side is the fix"
        : false,
    children: "Active",
    render: (key) => {
      const [size, variant, color] = key.split("/");
      return (
        <Badge size={size as never} variant={variant as never} color={color as never}>
          Active
        </Badge>
      );
    },
  },
  {
    name: "IconButton",
    tag: "button",
    old: Object.fromEntries(
      Object.entries(iconButtonVariantClass).flatMap(([v, vc]) =>
        Object.entries(iconButtonSize).map(([s2, sc]) => [`${v}/${s2}`, `${iconButtonBase} ${vc} ${sc}`])
      )
    ),
    children: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
    render: (key) => {
      const [variant, size] = key.split("/");
      return (
        <IconButton variant={variant as never} size={Number(size) as never} aria-label="Add">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </IconButton>
      );
    },
  },
  {
    name: "Spinner",
    tag: "span",
    old: Object.fromEntries(
      Object.entries(spinnerSize).flatMap(([sz, szc]) =>
        Object.entries(spinnerColor).map(([col, cc]) => [`${sz}/${col}`, `${spinnerBase} ${szc} ${cc}`])
      )
    ),
    // Compared as an empty box: the arc's geometry comes from measured props
    // rather than CSS, and both sides would need the same SVG for the size
    // comparison to mean anything.
    render: (key) => {
      const [size, color] = key.split("/");
      return <Spinner size={size as never} color={color as never} variant="arc" />;
    },
    expected: (_key, prop) =>
      prop === "animation-duration" || prop === "animation-name" || prop === "animation-iteration-count" ||
      prop === "animation-timing-function" || prop === "animation-play-state" || prop === "animation-composition" ||
      prop === "animation-fill-mode" || prop === "animation-direction" || prop === "animation-delay" ||
      prop === "animation-range" || prop === "animation-timeline" || prop === "animation-range-start" ||
      prop === "animation-range-end"
        ? "the spin moved from the wrapper to the svg inside it"
        : false,
  },
  {
    name: "Banner",
    tag: "div",
    old: Object.fromEntries(
      Object.entries(bannerSeverity).map(([k, c]) => [k, `${bannerBase} ${c}`])
    ),
    // Compared without the glyph and body: those are named parts on the new
    // side and inline classes on the old, so including them would compare two
    // different elements' children rather than the banner itself.
    children: "Heads up",
    render: (key) => (
      <Banner severity={key as never} hideIcon>
        Heads up
      </Banner>
    ),
    // `bg-bg-info-subtle` was one of the five dead classes: the token existed
    // and the preset never exposed it, so the info banner has had no
    // background at all. The old side still shows that.
    expected: (key, prop) =>
      key === "info" && prop.startsWith("background")
        ? "bg-bg-info-subtle was dead in 0.2.0 — new side is the fix"
        : false,
  },
  {
    name: "Snackbar",
    tag: "div",
    old: { info: snackbarBase, success: snackbarBase, warning: snackbarBase, error: snackbarBase },
    // The message carries its own line-height, so the old side needs the same
    // wrapper — a bare text node made the row 1px shorter and read as a real
    // geometry difference.
    children: (
      <span className="min-w-0 flex-1 text-body-sm-medium text-text-inverse">Saved</span>
    ),
    render: (key) => (
      <Snackbar severity={key as never} hideIcon>
        Saved
      </Snackbar>
    ),
  },
  {
    name: "Dot",
    tag: "span",
    old: Object.fromEntries(
      Object.entries(cross(dotSize, dotColor)).map(([k, c]) => [k, `${dotBase} ${c}`])
    ),
    render: (key) => {
      const [size, color] = key.split("/");
      return <Dot size={size as never} color={color as never} />;
    },
  },
];

/**
 * Differences that are not differences: `transition-property` lists the same
 * properties in a different syntax, `--tw-*` is Tailwind's own plumbing, and
 * `--bd` was renamed to `--ids-bd`. None of it paints anything.
 */
const ignored = (prop: string) =>
  prop.startsWith("--tw-") ||
  prop === "--bd" ||
  prop === "--ids-bd" ||
  prop === "transition-property" ||
  prop === "-webkit-transition-property";

/**
 * Tailwind puts ring and shadow placeholders in front of every box-shadow.
 * They paint nothing — either because they are transparent, or because every
 * offset, blur and spread is zero — and the new CSS omits them. A shadow with
 * no geometry is dropped whatever its colour: `rgb(255,255,255) 0 0 0 0` is as
 * invisible as `rgba(0,0,0,0) 0 0 0 0`, and Dot's surface ring produces one.
 */
const paints = (part: string) => {
  const lengths = part.match(/-?[\d.]+px/g) || [];
  return lengths.length === 0 || lengths.some((l) => parseFloat(l) !== 0);
};
const shadow = (value: string) =>
  value
    .split(/,(?![^(]*\))/)
    .map((p) => p.trim())
    .filter(paints)
    .join(", ");

export const Diff: StoryObj = {
  render: () => {
    const [report, setReport] = React.useState("Mepe dekhchi…");

    React.useEffect(() => {
      const style = document.createElement("style");
      style.textContent = oldCss;
      document.head.prepend(style);

      const run = () => {
        // Chrome parks a transition at time 0 while the tab is hidden, so a
        // computed style read mid-transition reports the value the element is
        // moving away from — which looks exactly like the new CSS not applying.
        const freeze = document.createElement("style");
        freeze.textContent = "*,*::before,*::after{transition:none !important;animation:none !important}";
        document.head.appendChild(freeze);

        const lines: string[] = [];
        for (const c of CASES) {
          const problems: string[] = [];
          const allowed = new Set<string>();
          const keys = Object.keys(c.old);
          for (const key of keys) {
            const a = document.querySelector<HTMLElement>(`[data-old="${c.name}:${key}"]`);
            const b = document.querySelector<HTMLElement>(`[data-new="${c.name}:${key}"]`);
            if (!a || !b) { problems.push(`${key}: element pawa gelo na`); continue; }
            const sa = getComputedStyle(a);
            const sb = getComputedStyle(b);
            for (let p = 0; p < sa.length; p++) {
              const prop = sa[p];
              if (!prop || ignored(prop)) continue;
              const norm = prop === "box-shadow" ? shadow : (v: string) => v;
              const av = norm(sa.getPropertyValue(prop));
              const bv = norm(sb.getPropertyValue(prop));
              if (av === bv) continue;
              const why = c.expected?.(key, prop);
              if (why) { allowed.add(why); continue; }
              problems.push(`${key}  ${prop}\n     purono: ${av}\n     notun : ${bv}`);
            }
          }
          const note = allowed.size ? ` (${[...allowed].join("; ")})` : "";
          lines.push(
            problems.length
              ? `❌ ${c.name} — ${problems.length} ta parthokko (${keys.length} combination)${note}\n` +
                problems.map((p) => "   " + p).join("\n")
              : `✅ ${c.name} — ${keys.length} ta combination, sob mile geche${note}`
          );
        }

        freeze.remove();
        setReport(lines.join("\n"));
      };

      // Not requestAnimationFrame: a hidden tab throttles it to nothing and the
      // report simply never appears, which reads as the harness being broken.
      const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
      let cancelled = false;
      Promise.race([document.fonts.ready, wait(1000)])
        .then(() => wait(50))
        .then(() => { if (!cancelled) run(); });
      return () => { cancelled = true; style.remove(); };
    }, []);

    return (
      <div>
        <pre
          id="diff-report"
          style={{
            whiteSpace: "pre-wrap",
            font: "12px ui-monospace, monospace",
            padding: "12px",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            marginBottom: "24px",
          }}
        >
          {report}
        </pre>

        {CASES.map((c) => (
          <section key={c.name} style={{ marginBottom: 20 }}>
            <h3 style={{ font: "600 12px ui-monospace, monospace", marginBottom: 8 }}>{c.name}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              {Object.entries(c.old).map(([key, classes]) => (
                <React.Fragment key={key}>
                  {React.createElement(
                    c.tag,
                    { "data-old": `${c.name}:${key}`, className: classes },
                    typeof c.children === "function" ? c.children(key) : c.children
                  )}
                  <span data-new-wrap={key} style={{ display: "contents" }}>
                    {React.cloneElement(
                      c.render(key) as React.ReactElement,
                      { "data-new": `${c.name}:${key}` } as never
                    )}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  },
};
