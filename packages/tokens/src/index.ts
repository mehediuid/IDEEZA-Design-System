/**
 * @ideeza/tokens
 * Design tokens for the IDEEZA AI platform.
 *
 * For framework-agnostic styling, import the CSS file:
 *   import "@ideeza/tokens/css";
 *
 * This module exports the same token values as TS constants, useful for
 * canvas, charts, server-rendered emails, or wherever you need the
 * resolved hex/px values outside of CSS.
 */

export * from "./primitives.js";
export * from "./semantic.js";
export * from "./foundations.js";

// Convenient grouped export
import { primitives } from "./primitives.js";
import { semanticColors, componentColors, glassColors } from "./semantic.js";
import {
  spacing,
  radius,
  fontSize,
  fontWeight,
  fontFamily,
  opacity,
  borderWidth,
  motion,
  elevation,
  zIndex,
  safeArea,
  inset,
  touchTarget,
  breakpoint,
} from "./foundations.js";

export const tokens = {
  primitives,
  semanticColors,
  componentColors,
  glassColors,
  spacing,
  radius,
  fontSize,
  fontWeight,
  fontFamily,
  opacity,
  borderWidth,
  motion,
  elevation,
  zIndex,
  safeArea,
  inset,
  touchTarget,
  breakpoint,
} as const;

export type Tokens = typeof tokens;
