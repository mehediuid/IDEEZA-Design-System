/**
 * Semantic color tokens
 * Source: Figma — IDEEZA Design System / 🌗 Semantic collection
 *
 * Each token has a Light and Dark value. In CSS these are exposed as
 * variables that switch based on `[data-theme]` or `prefers-color-scheme`.
 * In TS we expose the resolved hex values for cases where you need them
 * outside CSS (canvas, charts, server-rendered emails, etc.).
 */

type ColorToken = {
  light: string;
  dark: string;
};

export const semanticColors = {
  // ── Backgrounds ────────────────────────────────────────────────
  "bg.page": { light: "#f4f3fa", dark: "#060619" },
  "bg.surface": { light: "#ffffff", dark: "#101322" },
  "bg.surface-raised": { light: "#edeef7", dark: "#21293f" },
  "bg.subtle": { light: "#edeef7", dark: "#21293f" },
  "bg.inverse": { light: "#101322", dark: "#f4f3fa" },
  "bg.overlay": { light: "#101322", dark: "#060619" },
  "bg.brand": { light: "#7c2db9", dark: "#9126d9" },
  "bg.brand-hover": { light: "#6a1fa4", dark: "#ab60f7" },
  "bg.brand-pressed": { light: "#55168a", dark: "#bb96fc" },
  "bg.brand-subtle": { light: "#f8f5ff", dark: "#280850" },
  "bg.blue": { light: "#3b82f6", dark: "#60a5fa" },
  "bg.blue-subtle": { light: "#eff6ff", dark: "#172554" },
  "bg.success": { light: "#22c55e", dark: "#4ade80" },
  "bg.success-subtle": { light: "#f0fdf4", dark: "#14532d" },
  "bg.warning": { light: "#eab308", dark: "#facc15" },
  "bg.warning-subtle": { light: "#fefce8", dark: "#713f12" },
  "bg.error": { light: "#ef4444", dark: "#f87171" },
  "bg.error-subtle": { light: "#fef2f2", dark: "#7f1d1d" },
  "bg.info": { light: "#3b82f6", dark: "#60a5fa" },
  "bg.info-subtle": { light: "#eff6ff", dark: "#172554" },
  "bg.ai": { light: "#7c2db9", dark: "#9126d9" },
  "bg.ai-subtle": { light: "#f8f5ff", dark: "#280850" },

  // ── Text ───────────────────────────────────────────────────────
  "text.primary": { light: "#101322", dark: "#f4f3fa" },
  "text.secondary": { light: "#364058", dark: "#c8cfe0" },
  "text.tertiary": { light: "#49546c", dark: "#939fb8" },
  "text.disabled": { light: "#c8cfe0", dark: "#49546c" },
  "text.inverse": { light: "#ffffff", dark: "#101322" },
  "text.on-brand": { light: "#ffffff", dark: "#ffffff" },
  "text.brand": { light: "#7c2db9", dark: "#bb96fc" },
  "text.blue": { light: "#2563eb", dark: "#93c5fd" },
  "text.link": { light: "#1d4ed8", dark: "#60a5fa" },
  "text.success": { light: "#15803d", dark: "#4ade80" },
  "text.warning": { light: "#a16207", dark: "#facc15" },
  "text.error": { light: "#dc2626", dark: "#f87171" },
  "text.ai": { light: "#7c2db9", dark: "#d9cafe" },

  // ── Borders ────────────────────────────────────────────────────
  "border.default": { light: "#dee1ee", dark: "#21293f" },
  "border.strong": { light: "#c8cfe0", dark: "#49546c" },
  "border.subtle": { light: "#edeef7", dark: "#364058" },
  "border.focus": { light: "#7c2db9", dark: "#ab60f7" },
  "border.error": { light: "#ef4444", dark: "#f87171" },
  "border.brand": { light: "#7c2db9", dark: "#ab60f7" },
  "border.blue": { light: "#3b82f6", dark: "#60a5fa" },
  "border.ai": { light: "#9126d9", dark: "#ab60f7" },
  "border.success": { light: "#22c55e", dark: "#4ade80" },
  "border.warning": { light: "#eab308", dark: "#facc15" },

  // ── Icons ──────────────────────────────────────────────────────
  "icon.default": { light: "#49546c", dark: "#939fb8" },
  "icon.secondary": { light: "#65728d", dark: "#c8cfe0" },
  "icon.disabled": { light: "#c8cfe0", dark: "#49546c" },
  "icon.on-brand": { light: "#ffffff", dark: "#ffffff" },
  "icon.brand": { light: "#7c2db9", dark: "#bb96fc" },
  "icon.blue": { light: "#3b82f6", dark: "#60a5fa" },
  "icon.success": { light: "#16a34a", dark: "#4ade80" },
  "icon.warning": { light: "#ca8a04", dark: "#facc15" },
  "icon.error": { light: "#ef4444", dark: "#f87171" },
  "icon.ai": { light: "#9126d9", dark: "#bb96fc" },
} as const satisfies Record<string, ColorToken>;

/** Component-scoped semantic tokens (button, input, badge, modal, card, tag, ai, toast). */
export const componentColors = {
  // ── Button ─────────────────────────────────────────────────────
  "button.primary-bg": { light: "#7c2db9", dark: "#7c2db9" },
  "button.primary-bg-hover": { light: "#6a1fa4", dark: "#6a1fa4" },
  "button.primary-bg-pressed": { light: "#55168a", dark: "#55168a" },
  "button.primary-text": { light: "#ffffff", dark: "#ffffff" },
  "button.secondary-bg": { light: "#ffffff", dark: "#ffffff" },
  "button.secondary-border": { light: "#dee1ee", dark: "#dee1ee" },
  "button.secondary-text": { light: "#101322", dark: "#101322" },
  "button.ghost-text": { light: "#101322", dark: "#101322" },
  "button.ghost-bg-hover": { light: "#edeef7", dark: "#edeef7" },
  "button.danger-bg": { light: "#dc2626", dark: "#dc2626" },
  "button.danger-text": { light: "#ffffff", dark: "#ffffff" },
  "button.disabled-bg": { light: "#edeef7", dark: "#edeef7" },
  "button.disabled-text": { light: "#c8cfe0", dark: "#c8cfe0" },

  // ── Input ──────────────────────────────────────────────────────
  "input.bg": { light: "#ffffff", dark: "#ffffff" },
  "input.bg-disabled": { light: "#edeef7", dark: "#edeef7" },
  "input.border": { light: "#dee1ee", dark: "#dee1ee" },
  "input.border-hover": { light: "#c8cfe0", dark: "#c8cfe0" },
  "input.border-focus": { light: "#7c2db9", dark: "#7c2db9" },
  "input.border-error": { light: "#ef4444", dark: "#ef4444" },
  "input.border-disabled": { light: "#edeef7", dark: "#edeef7" },
  "input.text": { light: "#101322", dark: "#101322" },
  "input.placeholder": { light: "#939fb8", dark: "#939fb8" },
  "input.label": { light: "#49546c", dark: "#49546c" },
  "input.helper": { light: "#939fb8", dark: "#939fb8" },
  "input.error-text": { light: "#dc2626", dark: "#dc2626" },

  // ── Badge ──────────────────────────────────────────────────────
  "badge.brand-bg": { light: "#f8f5ff", dark: "#f8f5ff" },
  "badge.brand-text": { light: "#7c2db9", dark: "#7c2db9" },
  "badge.blue-bg": { light: "#eff6ff", dark: "#eff6ff" },
  "badge.blue-text": { light: "#2563eb", dark: "#2563eb" },
  "badge.success-bg": { light: "#f0fdf4", dark: "#f0fdf4" },
  "badge.success-text": { light: "#15803d", dark: "#15803d" },
  "badge.warning-bg": { light: "#fefce8", dark: "#fefce8" },
  "badge.warning-text": { light: "#a16207", dark: "#a16207" },
  "badge.error-bg": { light: "#fef2f2", dark: "#fef2f2" },
  "badge.error-text": { light: "#dc2626", dark: "#dc2626" },

  // ── Modal / Card / Tag / AI / Toast ────────────────────────────
  "modal.bg": { light: "#ffffff", dark: "#ffffff" },
  "modal.border": { light: "#dee1ee", dark: "#dee1ee" },
  "modal.overlay": { light: "#101322", dark: "#101322" },
  "card.bg": { light: "#ffffff", dark: "#ffffff" },
  "card.border": { light: "#dee1ee", dark: "#dee1ee" },
  "card.bg-hover": { light: "#edeef7", dark: "#edeef7" },
  "tag.neutral-bg": { light: "#edeef7", dark: "#edeef7" },
  "tag.neutral-text": { light: "#49546c", dark: "#49546c" },
  "tag.brand-bg": { light: "#f8f5ff", dark: "#f8f5ff" },
  "tag.brand-text": { light: "#7c2db9", dark: "#7c2db9" },
  "ai.prompt-bg": { light: "#ffffff", dark: "#ffffff" },
  "ai.prompt-border": { light: "#7c2db9", dark: "#9126d9" },
  "ai.badge-bg": { light: "#f8f5ff", dark: "#f8f5ff" },
  "ai.badge-text": { light: "#7c2db9", dark: "#7c2db9" },
  "toast.info-bg": { light: "#eff6ff", dark: "#eff6ff" },
  "toast.success-bg": { light: "#f0fdf4", dark: "#f0fdf4" },
  "toast.warning-bg": { light: "#fefce8", dark: "#fefce8" },
  "toast.error-bg": { light: "#fef2f2", dark: "#fef2f2" },
} as const satisfies Record<string, ColorToken>;

/** Glass-effect colors with alpha (alpha is the semantic value, hex is the base). */
export const glassColors = {
  "glass.fill-xs": { light: "rgba(255,255,255,0.30)", dark: "rgba(0,0,0,0.25)" },
  "glass.fill-sm": { light: "rgba(255,255,255,0.50)", dark: "rgba(0,0,0,0.40)" },
  "glass.fill-md": { light: "rgba(255,255,255,0.65)", dark: "rgba(0,0,0,0.55)" },
  "glass.fill-lg": { light: "rgba(255,255,255,0.75)", dark: "rgba(0,0,0,0.70)" },
  "glass.fill-xl": { light: "rgba(255,255,255,0.85)", dark: "rgba(0,0,0,0.80)" },
  "glass.fill-brand": { light: "rgba(124,45,185,0.15)", dark: "rgba(124,45,185,0.25)" },
  "glass.fill-ai": { light: "rgba(124,45,185,0.20)", dark: "rgba(124,45,185,0.30)" },
  "glass.border-subtle": { light: "rgba(255,255,255,0.10)", dark: "rgba(255,255,255,0.08)" },
  "glass.border-default": { light: "rgba(255,255,255,0.18)", dark: "rgba(255,255,255,0.15)" },
  "glass.border-strong": { light: "rgba(255,255,255,0.30)", dark: "rgba(255,255,255,0.25)" },
  "glass.highlight": { light: "rgba(255,255,255,0.40)", dark: "rgba(255,255,255,0.20)" },
  "glass.shadow": { light: "rgba(0,0,0,0.08)", dark: "rgba(0,0,0,0.30)" },
} as const satisfies Record<string, ColorToken>;

export type SemanticColorToken = keyof typeof semanticColors;
export type ComponentColorToken = keyof typeof componentColors;
export type GlassColorToken = keyof typeof glassColors;
