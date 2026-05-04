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
