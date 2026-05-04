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
  "bg.page": { light: "#f8fafc", dark: "#020513" },
  "bg.surface": { light: "#ffffff", dark: "#0c121d" },
  "bg.surface-raised": { light: "#f1f5f9", dark: "#1e293b" },
  "bg.subtle": { light: "#f1f5f9", dark: "#1e293b" },
  "bg.inverse": { light: "#0c121d", dark: "#f8fafc" },
  "bg.overlay": { light: "#0c121d", dark: "#020513" },
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
  "text.primary": { light: "#0c121d", dark: "#f8fafc" },
  "text.secondary": { light: "#475569", dark: "#cbd5e1" },
  "text.tertiary": { light: "#94a3b8", dark: "#64748b" },
  "text.disabled": { light: "#cbd5e1", dark: "#475569" },
  "text.inverse": { light: "#ffffff", dark: "#0c121d" },
  "text.on-brand": { light: "#ffffff", dark: "#ffffff" },
  "text.brand": { light: "#7c2db9", dark: "#bb96fc" },
  "text.blue": { light: "#2563eb", dark: "#93c5fd" },
  "text.link": { light: "#2563eb", dark: "#60a5fa" },
  "text.success": { light: "#15803d", dark: "#4ade80" },
  "text.warning": { light: "#a16207", dark: "#facc15" },
  "text.error": { light: "#dc2626", dark: "#f87171" },
  "text.ai": { light: "#7c2db9", dark: "#d9cafe" },

  // ── Borders ────────────────────────────────────────────────────
  "border.default": { light: "#e2e8f0", dark: "#1e293b" },
  "border.strong": { light: "#cbd5e1", dark: "#475569" },
  "border.subtle": { light: "#f1f5f9", dark: "#334155" },
  "border.focus": { light: "#7c2db9", dark: "#ab60f7" },
  "border.error": { light: "#ef4444", dark: "#f87171" },
  "border.brand": { light: "#7c2db9", dark: "#ab60f7" },
  "border.blue": { light: "#3b82f6", dark: "#60a5fa" },
  "border.ai": { light: "#9126d9", dark: "#ab60f7" },
  "border.success": { light: "#22c55e", dark: "#4ade80" },
  "border.warning": { light: "#eab308", dark: "#facc15" },

  // ── Icons ──────────────────────────────────────────────────────
  "icon.default": { light: "#475569", dark: "#94a3b8" },
  "icon.secondary": { light: "#94a3b8", dark: "#64748b" },
  "icon.disabled": { light: "#cbd5e1", dark: "#475569" },
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
  "button.secondary-border": { light: "#e2e8f0", dark: "#e2e8f0" },
  "button.secondary-text": { light: "#0c121d", dark: "#0c121d" },
  "button.ghost-text": { light: "#0c121d", dark: "#0c121d" },
  "button.ghost-bg-hover": { light: "#f1f5f9", dark: "#f1f5f9" },
  "button.danger-bg": { light: "#ef4444", dark: "#ef4444" },
  "button.danger-text": { light: "#ffffff", dark: "#ffffff" },
  "button.disabled-bg": { light: "#f1f5f9", dark: "#f1f5f9" },
  "button.disabled-text": { light: "#cbd5e1", dark: "#cbd5e1" },

  // ── Input ──────────────────────────────────────────────────────
  "input.bg": { light: "#ffffff", dark: "#ffffff" },
  "input.bg-disabled": { light: "#f1f5f9", dark: "#f1f5f9" },
  "input.border": { light: "#e2e8f0", dark: "#e2e8f0" },
  "input.border-hover": { light: "#cbd5e1", dark: "#cbd5e1" },
  "input.border-focus": { light: "#7c2db9", dark: "#7c2db9" },
  "input.border-error": { light: "#ef4444", dark: "#ef4444" },
  "input.border-disabled": { light: "#f1f5f9", dark: "#f1f5f9" },
  "input.text": { light: "#0c121d", dark: "#0c121d" },
  "input.placeholder": { light: "#94a3b8", dark: "#94a3b8" },
  "input.label": { light: "#475569", dark: "#475569" },
  "input.helper": { light: "#94a3b8", dark: "#94a3b8" },
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
  "modal.border": { light: "#e2e8f0", dark: "#e2e8f0" },
  "modal.overlay": { light: "#0c121d", dark: "#0c121d" },
  "card.bg": { light: "#ffffff", dark: "#ffffff" },
  "card.border": { light: "#e2e8f0", dark: "#e2e8f0" },
  "card.bg-hover": { light: "#f1f5f9", dark: "#f1f5f9" },
  "tag.neutral-bg": { light: "#f1f5f9", dark: "#f1f5f9" },
  "tag.neutral-text": { light: "#475569", dark: "#475569" },
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
