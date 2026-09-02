import { ideezaPreset as preset } from "@ideeza/tokens/tailwind-preset";

/**
 * Only for consumers who already use Tailwind and want to write utility
 * classes in our scale — spacing, colours, type, motion, radius.
 *
 * Using the components does NOT require this. `styles.css` already contains
 * every class they need, prebuilt.
 *
 * The type is written out structurally rather than as Tailwind's `Config`.
 * `export ... from` would leave `@ideeza/tokens` in the .d.ts, which is a
 * package npm has never heard of, and importing Tailwind's own types would
 * make this file need tailwindcss installed to typecheck — for a consumer
 * who by definition may not have it.
 */
export const ideezaPreset: { [key: string]: unknown } = preset;
export default ideezaPreset;
