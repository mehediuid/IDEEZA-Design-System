/**
 * Foundation tokens — spacing, radius, typography, motion, etc.
 * Values include responsive variants (Desktop / Mobile) where applicable.
 * Source: Figma — IDEEZA Design System
 */

// ─────────────────────────────────────────────────────────────────
// Spacing (responsive: Desktop / Mobile)
// ─────────────────────────────────────────────────────────────────
export const spacing = {
  0:  { desktop: 0,   mobile: 0 },
  1:  { desktop: 2,   mobile: 2 },
  2:  { desktop: 4,   mobile: 4 },
  3:  { desktop: 6,   mobile: 6 },
  4:  { desktop: 8,   mobile: 8 },
  5:  { desktop: 10,  mobile: 10 },
  6:  { desktop: 12,  mobile: 12 },
  7:  { desktop: 14,  mobile: 14 },
  8:  { desktop: 16,  mobile: 16 },
  10: { desktop: 20,  mobile: 16 },
  12: { desktop: 24,  mobile: 20 },
  16: { desktop: 32,  mobile: 24 },
  20: { desktop: 40,  mobile: 32 },
  24: { desktop: 48,  mobile: 40 },
  32: { desktop: 64,  mobile: 56 },
  40: { desktop: 80,  mobile: 64 },
  48: { desktop: 96,  mobile: 80 },
} as const;

export const touchTarget = {
  min:         44,
  comfortable: 48,
  large:       56,
} as const;

// ─────────────────────────────────────────────────────────────────
// Radius (responsive)
// ─────────────────────────────────────────────────────────────────
export const radius = {
  none: { desktop: 0,    mobile: 0 },
  xs:   { desktop: 2,    mobile: 4 },
  sm:   { desktop: 4,    mobile: 6 },
  md:   { desktop: 6,    mobile: 8 },
  lg:   { desktop: 8,    mobile: 10 },
  xl:   { desktop: 12,   mobile: 14 },
  "2xl":{ desktop: 16,   mobile: 18 },
  "3xl":{ desktop: 24,   mobile: 28 },
  full: { desktop: 9999, mobile: 9999 },
} as const;

// ─────────────────────────────────────────────────────────────────
// Typography (responsive sizes; weights and families are global)
// ─────────────────────────────────────────────────────────────────
export const fontSize = {
  "2xs": { desktop: 10, mobile: 10 },
  xs:    { desktop: 11, mobile: 11 },
  sm:    { desktop: 12, mobile: 12 },
  md:    { desktop: 14, mobile: 14 },
  lg:    { desktop: 16, mobile: 16 },
  xl:    { desktop: 18, mobile: 16 },
  "2xl": { desktop: 20, mobile: 18 },
  "3xl": { desktop: 24, mobile: 20 },
  "4xl": { desktop: 28, mobile: 24 },
  "5xl": { desktop: 32, mobile: 28 },
  "6xl": { desktop: 48, mobile: 36 },
  "7xl": { desktop: 60, mobile: 44 },
  "8xl": { desktop: 72, mobile: 52 },
} as const;

/**
 * Line height — its own scale, deliberately not paired 1:1 with `fontSize`.
 *
 * A single size takes different line heights at different densities: 12px is
 * 16 as a label and 18 as prose; 18px is 26 as a heading and 28 as prose. A
 * 1:1 pairing cannot express that, so the two scales are independent and
 * `textStyle` below is what joins them.
 *
 * Mirrors the Figma `line/height/*` variables.
 */
export const lineHeight = {
  "2xs": { desktop: 14, mobile: 14 },
  xs:    { desktop: 16, mobile: 16 },
  sm:    { desktop: 18, mobile: 18 },
  md:    { desktop: 20, mobile: 20 },
  lg:    { desktop: 24, mobile: 24 },
  xl:    { desktop: 26, mobile: 24 },
  "2xl": { desktop: 28, mobile: 26 },
  "3xl": { desktop: 30, mobile: 28 },
  "4xl": { desktop: 32, mobile: 28 },
  "5xl": { desktop: 36, mobile: 32 },
  "6xl": { desktop: 40, mobile: 36 },
  "7xl": { desktop: 56, mobile: 42 },
  "8xl": { desktop: 68, mobile: 50 },
  "9xl": { desktop: 80, mobile: 58 },
} as const;

/**
 * Letter spacing, in px. Negative steps track with size — big type needs
 * pulling in — so they shrink on mobile alongside the sizes they serve.
 * Positive steps track with role, so they are mode-independent.
 *
 * Mirrors the Figma `letter/spacing/*` variables.
 */
export const letterSpacing = {
  tighter: { desktop: -2.5, mobile: -1.8 },
  tight:   { desktop: -2,   mobile: -1.5 },
  snug:    { desktop: -1.5, mobile: -1.1 },
  close:   { desktop: -0.75, mobile: -0.7 },
  near:    { desktop: -0.5, mobile: -0.4 },
  slight:  { desktop: -0.25, mobile: -0.2 },
  normal:  { desktop: 0,    mobile: 0 },
  wide:    { desktop: 0.1,  mobile: 0.1 },
  wider:   { desktop: 0.15, mobile: 0.15 },
  widest:  { desktop: 1.2,  mobile: 1.2 },
  caps:    { desktop: 1.5,  mobile: 1.5 },
} as const;

/**
 * The type ramp — one entry per Figma text style, same names lowercased.
 *
 * This is the layer components are meant to use. Picking a size and a line
 * height separately is how they drifted apart in the first place; a style
 * carries size, line height, tracking and weight as one indivisible choice.
 *
 * `Label/MD` in Figma is `text-label-md` here, and both resolve to the same
 * four variables.
 */
export const textStyle = {
  "display-xl":      { size: "8xl", line: "9xl", tracking: "tighter", weight: "bold" },
  "display-lg":      { size: "7xl", line: "8xl", tracking: "tight",   weight: "semibold" },
  "display-md":      { size: "6xl", line: "7xl", tracking: "snug",    weight: "semibold" },
  "heading-h1":      { size: "5xl", line: "6xl", tracking: "close",   weight: "semibold" },
  "heading-h2":      { size: "4xl", line: "5xl", tracking: "near",    weight: "semibold" },
  "heading-h3":      { size: "3xl", line: "4xl", tracking: "slight",  weight: "semibold" },
  "heading-h4":      { size: "2xl", line: "2xl", tracking: "normal",  weight: "semibold" },
  "heading-h5":      { size: "xl",  line: "xl",  tracking: "normal",  weight: "semibold" },
  "heading-h6":      { size: "lg",  line: "lg",  tracking: "normal",  weight: "semibold" },
  "body-xs":         { size: "sm",  line: "sm",  tracking: "normal",  weight: "regular" },
  "body-sm":         { size: "md",  line: "md",  tracking: "normal",  weight: "regular" },
  "body-md":         { size: "lg",  line: "lg",  tracking: "normal",  weight: "regular" },
  "body-lg":         { size: "xl",  line: "2xl", tracking: "normal",  weight: "regular" },
  "body-xl":         { size: "2xl", line: "3xl", tracking: "normal",  weight: "regular" },
  "body-xs-medium":  { size: "sm",  line: "sm",  tracking: "normal",  weight: "medium" },
  "body-sm-medium":  { size: "md",  line: "md",  tracking: "normal",  weight: "medium" },
  "body-md-medium":  { size: "lg",  line: "lg",  tracking: "normal",  weight: "medium" },
  "body-lg-medium":  { size: "xl",  line: "2xl", tracking: "normal",  weight: "medium" },
  "body-xl-medium":  { size: "2xl", line: "3xl", tracking: "normal",  weight: "medium" },
  "label-xl":        { size: "lg",  line: "lg",  tracking: "wide",    weight: "semibold" },
  "label-lg":        { size: "md",  line: "md",  tracking: "wide",    weight: "semibold" },
  "label-md":        { size: "sm",  line: "xs",  tracking: "wide",    weight: "semibold" },
  "label-sm":        { size: "xs",  line: "xs",  tracking: "wider",   weight: "semibold" },
  "caption-md":      { size: "sm",  line: "xs",  tracking: "normal",  weight: "regular" },
  "caption-sm":      { size: "xs",  line: "xs",  tracking: "normal",  weight: "regular" },
  "overline-md":     { size: "xs",  line: "xs",  tracking: "widest",  weight: "semibold" },
  "overline-sm":     { size: "2xs", line: "2xs", tracking: "caps",    weight: "semibold" },
  "code-md":         { size: "md",  line: "md",  tracking: "normal",  weight: "regular" },
  "code-sm":         { size: "sm",  line: "sm",  tracking: "normal",  weight: "regular" },
} as const;

export type TextStyleName = keyof typeof textStyle;

export const fontWeight = {
  regular:   400,
  medium:    500,
  semibold:  600,
  bold:      700,
  extrabold: 800,
} as const;

export const fontFamily = {
  display: '"Manrope", system-ui, -apple-system, sans-serif',
  body:    '"Manrope", system-ui, -apple-system, sans-serif',
  mono:    '"Roboto Mono", ui-monospace, "SF Mono", monospace',
} as const;

// ─────────────────────────────────────────────────────────────────
// Other foundations
// ─────────────────────────────────────────────────────────────────
export const opacity = {
  disabled: 0.4,
  muted:    0.6,
  overlay:  0.8,
  hover:    0.08,
  pressed:  0.12,
} as const;

export const borderWidth = {
  1:    1,
  "1-5": 1.5,
  2:    2,
  3:    3,
  4:    4,
} as const;

export const motion = {
  duration: {
    instant: 0,
    fast:    100,
    normal:  200,
    slow:    300,
    slower:  500,
  },
  easing: {
    standard:   "cubic-bezier(0.4, 0, 0.2, 1)",
    decelerate: "cubic-bezier(0, 0, 0.2, 1)",
    accelerate: "cubic-bezier(0.4, 0, 1, 1)",
    sharp:      "cubic-bezier(0.4, 0, 0.6, 1)",
    spring:     "cubic-bezier(0.5, 1.25, 0.75, 1.25)",
  },
} as const;

export const elevation = {
  0: { light: "none", dark: "none" },
  1: {
    light: "0px 1px 2px 0px rgba(0,0,0,0.05)",
    dark:  "0px 1px 2px 0px rgba(0,0,0,0.5)",
  },
  2: {
    light: "0px 2px 4px 0px rgba(0,0,0,0.08)",
    dark:  "0px 2px 4px 0px rgba(0,0,0,0.6)",
  },
  3: {
    light: "0px 4px 8px 0px rgba(0,0,0,0.10)",
    dark:  "0px 4px 8px 0px rgba(0,0,0,0.7)",
  },
  4: {
    light: "0px 8px 16px 0px rgba(0,0,0,0.12)",
    dark:  "0px 8px 16px 0px rgba(0,0,0,0.75)",
  },
  5: {
    light: "0px 12px 24px 0px rgba(0,0,0,0.14)",
    dark:  "0px 12px 24px 0px rgba(0,0,0,0.8)",
  },
  6: {
    light: "0px 16px 32px 0px rgba(0,0,0,0.16)",
    dark:  "0px 16px 32px 0px rgba(0,0,0,0.85)",
  },
  inner: {
    light: "inset 0px 1px 2px 0px rgba(0,0,0,0.06)",
    dark:  "inset 0px 1px 2px 0px rgba(0,0,0,0.4)",
  },
} as const;

export const zIndex = {
  base:         0,
  sticky:       10,
  dropdown:     1000,
  overlay:      1100,
  sheet:        1200,
  modal:        1300,
  popover:      1400,
  toast:        1500,
  notification: 1600,
  max:          9999,
} as const;

export const safeArea = {
  top:    44,
  bottom: 34,
  left:   0,
  right:  0,
} as const;

export const inset = {
  statusBar: 24,
  navBar:    48,
  keyboard:  0,
} as const;

/** Breakpoint at which the responsive token "Mobile" mode applies. */
export const breakpoint = {
  mobile: 0,
  desktop: 768, // px
} as const;
