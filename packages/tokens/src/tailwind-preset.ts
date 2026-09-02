/**
 * Tailwind preset for the IDEEZA design system.
 * Maps Tailwind utility classes to the CSS variables exposed by
 * `@ideeza/tokens/css`.
 *
 * Usage (in your app's tailwind.config.ts):
 *
 *   import { ideezaPreset } from "@ideeza/tokens/tailwind-preset";
 *   export default {
 *     presets: [ideezaPreset],
 *     content: ["./src/**\/*.{ts,tsx}"],
 *   };
 */
import type { Config } from "tailwindcss";

/**
 * Expands the compact text-style table below into Tailwind `fontSize` tuples.
 * Every value resolves to a CSS variable, so switching to the mobile mode is
 * a media query in tokens.css and nothing here has to know about it.
 */
type StyleRow = [size: string, line: string, tracking: string, weight: string];
type FontSizeEntry = [
  fontSize: string,
  config: { lineHeight: string; letterSpacing: string; fontWeight: string },
];

const ts = <K extends string>(rows: Record<K, StyleRow>): Record<K, FontSizeEntry> =>
  Object.fromEntries(
    (Object.entries(rows) as [K, StyleRow][]).map(([name, [size, line, tracking, weight]]) => [
      name,
      [
        `var(--font-size-${size})`,
        {
          lineHeight: `var(--line-height-${line})`,
          letterSpacing: `var(--letter-spacing-${tracking})`,
          fontWeight: `var(--font-weight-${weight})`,
        },
      ] satisfies FontSizeEntry,
    ])
  ) as Record<K, FontSizeEntry>;

export const ideezaPreset = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-family-body)"],
        display: ["var(--font-family-display)"],
        mono: ["var(--font-family-mono)"],
      },
      /**
       * One class per Figma text style — `Label/MD` is `text-label-md`.
       *
       * There is deliberately no bare `text-sm`/`text-md`. Choosing a size
       * and then a line height separately is how the two drifted apart; a
       * style is one indivisible choice covering size, line height, tracking
       * and weight. If a design needs a combination that isn't here, the
       * answer is a new style in Figma, not an arbitrary value in a class.
       */
      fontSize: ts({
        "display-xl":     ["8xl", "9xl", "tighter", "bold"],
        "display-lg":     ["7xl", "8xl", "tight", "semibold"],
        "display-md":     ["6xl", "7xl", "snug", "semibold"],
        "heading-h1":     ["5xl", "6xl", "close", "semibold"],
        "heading-h2":     ["4xl", "5xl", "near", "semibold"],
        "heading-h3":     ["3xl", "4xl", "slight", "semibold"],
        "heading-h4":     ["2xl", "2xl", "normal", "semibold"],
        "heading-h5":     ["xl", "xl", "normal", "semibold"],
        "heading-h6":     ["lg", "lg", "normal", "semibold"],
        "body-xs":        ["sm", "sm", "normal", "regular"],
        "body-sm":        ["md", "md", "normal", "regular"],
        "body-md":        ["lg", "lg", "normal", "regular"],
        "body-lg":        ["xl", "2xl", "normal", "regular"],
        "body-xl":        ["2xl", "3xl", "normal", "regular"],
        "body-xs-medium": ["sm", "sm", "normal", "medium"],
        "body-sm-medium": ["md", "md", "normal", "medium"],
        "body-md-medium": ["lg", "lg", "normal", "medium"],
        "body-lg-medium": ["xl", "2xl", "normal", "medium"],
        "body-xl-medium": ["2xl", "3xl", "normal", "medium"],
        "label-xl":       ["lg", "lg", "wide", "semibold"],
        "label-lg":       ["md", "md", "wide", "semibold"],
        "label-md":       ["sm", "xs", "wide", "semibold"],
        "label-sm":       ["xs", "xs", "wider", "semibold"],
        "caption-md":     ["sm", "xs", "normal", "regular"],
        "caption-sm":     ["xs", "xs", "normal", "regular"],
        "overline-md":    ["xs", "xs", "widest", "semibold"],
        "overline-sm":    ["2xs", "2xs", "caps", "semibold"],
        "code-md":        ["md", "md", "normal", "regular"],
        "code-sm":        ["sm", "sm", "normal", "regular"],
      }),
      fontWeight: {
        regular: "var(--font-weight-regular)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
        extrabold: "var(--font-weight-extrabold)",
      },
      spacing: {
        0: "var(--spacing-0)",
        1: "var(--spacing-1)",
        2: "var(--spacing-2)",
        3: "var(--spacing-3)",
        4: "var(--spacing-4)",
        5: "var(--spacing-5)",
        6: "var(--spacing-6)",
        7: "var(--spacing-7)",
        8: "var(--spacing-8)",
        10: "var(--spacing-10)",
        12: "var(--spacing-12)",
        16: "var(--spacing-16)",
        20: "var(--spacing-20)",
        24: "var(--spacing-24)",
        32: "var(--spacing-32)",
        40: "var(--spacing-40)",
        48: "var(--spacing-48)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        full: "var(--radius-full)",
      },
      borderWidth: {
        1: "var(--border-width-1)",
        "1-5": "var(--border-width-1-5)",
        2: "var(--border-width-2)",
        3: "var(--border-width-3)",
        4: "var(--border-width-4)",
      },
      boxShadow: {
        none: "var(--elevation-0)",
        1: "var(--elevation-1)",
        2: "var(--elevation-2)",
        3: "var(--elevation-3)",
        4: "var(--elevation-4)",
        5: "var(--elevation-5)",
        6: "var(--elevation-6)",
        inner: "var(--elevation-inner)",
        /** Figma effect style `Depth/Top-line accent` — filled buttons only. */
        "depth-accent": "var(--shadow-depth-accent)",
      },
      backgroundImage: {
        /** Figma paint style `Brand/AI gradient` — the AI button hierarchy. */
        ai: "var(--gradient-ai)",
        "ai-hover": "var(--gradient-ai-hover)",
        "ai-pressed": "var(--gradient-ai-pressed)",
      },
      transitionDuration: {
        instant: "var(--motion-duration-instant)",
        fast: "var(--motion-duration-fast)",
        interaction: "var(--motion-duration-interaction)",
        normal: "var(--motion-duration-normal)",
        slow: "var(--motion-duration-slow)",
        slower: "var(--motion-duration-slower)",
      },
      transitionTimingFunction: {
        standard: "var(--motion-easing-standard)",
        decelerate: "var(--motion-easing-decelerate)",
        accelerate: "var(--motion-easing-accelerate)",
        sharp: "var(--motion-easing-sharp)",
        spring: "var(--motion-easing-spring)",
      },
      zIndex: {
        base: "var(--z-base)",
        sticky: "var(--z-sticky)",
        dropdown: "var(--z-dropdown)",
        overlay: "var(--z-overlay)",
        sheet: "var(--z-sheet)",
        modal: "var(--z-modal)",
        popover: "var(--z-popover)",
        toast: "var(--z-toast)",
        notification: "var(--z-notification)",
        max: "var(--z-max)",
      },
      colors: {
        // Primitives
        violet: {
          50: "var(--color-violet-50)",
          100: "var(--color-violet-100)",
          200: "var(--color-violet-200)",
          300: "var(--color-violet-300)",
          400: "var(--color-violet-400)",
          500: "var(--color-violet-500)",
          600: "var(--color-violet-600)",
          700: "var(--color-violet-700)",
          800: "var(--color-violet-800)",
          900: "var(--color-violet-900)",
          950: "var(--color-violet-950)",
        },
        // Semantic — bg
        bg: {
          page: "var(--color-bg-page)",
          surface: "var(--color-bg-surface)",
          "surface-raised": "var(--color-bg-surface-raised)",
          subtle: "var(--color-bg-subtle)",
          inverse: "var(--color-bg-inverse)",
          overlay: "var(--color-bg-overlay)",
          brand: "var(--color-bg-brand)",
          "brand-hover": "var(--color-bg-brand-hover)",
          "brand-pressed": "var(--color-bg-brand-pressed)",
          "brand-subtle": "var(--color-bg-brand-subtle)",
          blue: "var(--color-bg-blue)",
          "blue-subtle": "var(--color-bg-blue-subtle)",
          "info-subtle": "var(--color-bg-info-subtle)",
          success: "var(--color-bg-success)",
          "success-subtle": "var(--color-bg-success-subtle)",
          warning: "var(--color-bg-warning)",
          "warning-subtle": "var(--color-bg-warning-subtle)",
          error: "var(--color-bg-error)",
          "error-subtle": "var(--color-bg-error-subtle)",
          ai: "var(--color-bg-ai)",
          "ai-subtle": "var(--color-bg-ai-subtle)",
        },
        // Semantic — text
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          disabled: "var(--color-text-disabled)",
          inverse: "var(--color-text-inverse)",
          "on-brand": "var(--color-text-on-brand)",
          brand: "var(--color-text-brand)",
          "brand-hover": "var(--color-text-brand-hover)",
          link: "var(--color-text-link)",
          blue: "var(--color-text-blue)",
          success: "var(--color-text-success)",
          warning: "var(--color-text-warning)",
          error: "var(--color-text-error)",
          "error-hover": "var(--color-text-error-hover)",
          ai: "var(--color-text-ai)",
        },
        // Semantic — border
        border: {
          DEFAULT: "var(--color-border-default)",
          strong: "var(--color-border-strong)",
          subtle: "var(--color-border-subtle)",
          focus: "var(--color-border-focus)",
          error: "var(--color-border-error)",
          brand: "var(--color-border-brand)",
          ai: "var(--color-border-ai)",
          blue: "var(--color-border-blue)",
          info: "var(--color-border-info)",
          success: "var(--color-border-success)",
          warning: "var(--color-border-warning)",
          "focus-danger": "var(--color-border-focus-danger)",
          "focus-inverse": "var(--color-border-focus-inverse)",
          "focus-on-fill": "var(--color-border-focus-on-fill)",
        },
        // Semantic — icon. Separate from `text` because Figma keeps them apart:
        // icon/secondary is gray-500 while text/secondary is gray-700, and
        // icon/brand goes violet-300 in Dark where text/brand goes violet-300
        // too but icon/ai and text/ai diverge. Spinner and any glyph read here.
        icon: {
          DEFAULT: "var(--color-icon-default)",
          secondary: "var(--color-icon-secondary)",
          disabled: "var(--color-icon-disabled)",
          "on-brand": "var(--color-icon-on-brand)",
          brand: "var(--color-icon-brand)",
          blue: "var(--color-icon-blue)",
          info: "var(--color-icon-info)",
          success: "var(--color-icon-success)",
          warning: "var(--color-icon-warning)",
          error: "var(--color-icon-error)",
          ai: "var(--color-icon-ai)",
        },
        // Component-scoped families that mirror Figma's own component tokens.
        // These have existed in tokens.css since the Figma port but had no
        // utility classes, so components reached past them to bg/* and text/*
        // and the component token was never actually used.
        badge: {
          "brand-bg": "var(--color-badge-brand-bg)",
          "brand-text": "var(--color-badge-brand-text)",
          "blue-bg": "var(--color-badge-blue-bg)",
          "blue-text": "var(--color-badge-blue-text)",
          "success-bg": "var(--color-badge-success-bg)",
          "success-text": "var(--color-badge-success-text)",
          "warning-bg": "var(--color-badge-warning-bg)",
          "warning-text": "var(--color-badge-warning-text)",
          "error-bg": "var(--color-badge-error-bg)",
          "error-text": "var(--color-badge-error-text)",
        },
        tag: {
          "brand-bg": "var(--color-tag-brand-bg)",
          "brand-text": "var(--color-tag-brand-text)",
          "neutral-bg": "var(--color-tag-neutral-bg)",
          "neutral-text": "var(--color-tag-neutral-text)",
        },
        card: {
          bg: "var(--color-card-bg)",
          "bg-hover": "var(--color-card-bg-hover)",
          border: "var(--color-card-border)",
        },
        modal: {
          bg: "var(--color-modal-bg)",
          border: "var(--color-modal-border)",
          overlay: "var(--color-modal-overlay)",
        },
        chart: {
          axis: "var(--chart-axis)",
          grid: "var(--chart-grid)",
          muted: "var(--chart-muted)",
          neutral: "var(--chart-neutral)",
          positive: "var(--chart-positive)",
          negative: "var(--chart-negative)",
          "categorical-01": "var(--chart-categorical-01)",
          "categorical-02": "var(--chart-categorical-02)",
          "categorical-03": "var(--chart-categorical-03)",
          "categorical-04": "var(--chart-categorical-04)",
          "categorical-05": "var(--chart-categorical-05)",
          "categorical-06": "var(--chart-categorical-06)",
          "categorical-07": "var(--chart-categorical-07)",
          "categorical-08": "var(--chart-categorical-08)",
          "delta-up-bg": "var(--chart-delta-up-bg)",
          "delta-up-icon": "var(--chart-delta-up-icon)",
          "delta-up-text": "var(--chart-delta-up-text)",
          "delta-down-bg": "var(--chart-delta-down-bg)",
          "delta-down-icon": "var(--chart-delta-down-icon)",
          "delta-down-text": "var(--chart-delta-down-text)",
          "delta-flat-bg": "var(--chart-delta-flat-bg)",
          "delta-flat-icon": "var(--chart-delta-flat-icon)",
          "delta-flat-text": "var(--chart-delta-flat-text)",
        },
        toast: {
          "success-bg": "var(--color-toast-success-bg)",
          "warning-bg": "var(--color-toast-warning-bg)",
          "error-bg": "var(--color-toast-error-bg)",
          "info-bg": "var(--color-toast-info-bg)",
        },
        // Component-scoped — handy for direct utility access
        input: {
          bg: "var(--color-input-bg)",
          "bg-disabled": "var(--color-input-bg-disabled)",
          border: "var(--color-input-border)",
          "border-hover": "var(--color-input-border-hover)",
          "border-focus": "var(--color-input-border-focus)",
          "border-error": "var(--color-input-border-error)",
          "border-disabled": "var(--color-input-border-disabled)",
          text: "var(--color-input-text)",
          placeholder: "var(--color-input-placeholder)",
          label: "var(--color-input-label)",
          helper: "var(--color-input-helper)",
          "error-text": "var(--color-input-error-text)",
        },
        button: {
          "primary-bg": "var(--color-button-primary-bg)",
          "primary-bg-hover": "var(--color-button-primary-bg-hover)",
          "primary-bg-pressed": "var(--color-button-primary-bg-pressed)",
          "primary-text": "var(--color-button-primary-text)",
          "secondary-bg": "var(--color-button-secondary-bg)",
          "secondary-border": "var(--color-button-secondary-border)",
          "secondary-text": "var(--color-button-secondary-text)",
          "ghost-bg-hover": "var(--color-button-ghost-bg-hover)",
          "danger-bg": "var(--color-button-danger-bg)",
          "danger-bg-hover": "var(--color-button-danger-bg-hover)",
          "danger-bg-pressed": "var(--color-button-danger-bg-pressed)",
          "danger-text": "var(--color-button-danger-text)",
          "secondary-bg-hover": "var(--color-button-secondary-bg-hover)",
          "secondary-bg-pressed": "var(--color-button-secondary-bg-pressed)",
          "secondary-border-hover": "var(--color-button-secondary-border-hover)",
          "tonal-bg": "var(--color-button-tonal-bg)",
          "tonal-bg-hover": "var(--color-button-tonal-bg-hover)",
          "tonal-bg-pressed": "var(--color-button-tonal-bg-pressed)",
          "tonal-text": "var(--color-button-tonal-text)",
          "outline-bg-hover": "var(--color-button-outline-bg-hover)",
          "outline-bg-pressed": "var(--color-button-outline-bg-pressed)",
          "inverse-bg": "var(--color-button-inverse-bg)",
          "inverse-bg-hover": "var(--color-button-inverse-bg-hover)",
          "inverse-bg-pressed": "var(--color-button-inverse-bg-pressed)",
          "inverse-text": "var(--color-button-inverse-text)",
          "disabled-bg": "var(--color-button-disabled-bg)",
          "disabled-text": "var(--color-button-disabled-text)",
        },
      },
    },
  },
} satisfies Partial<Config>;

export default ideezaPreset;
