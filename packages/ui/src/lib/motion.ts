/**
 * Motion recipes.
 *
 * Figma's prototype reactions specify one thing: state changes cross-fade at
 * 120ms on EASE_OUT. That is correct and `state` below is exactly it — but a
 * colour cross-fade is all it is, and on its own an interface animated only
 * that way feels inert. Nothing moves, so nothing acknowledges the pointer.
 *
 * The rest of this file is the part Figma does not specify, and it is a
 * deliberate addition rather than a transcription:
 *
 * - `press` scales to 0.97 while held. The press itself is instant — any lag
 *   between finger and pixel reads as the control being slow — and the
 *   release eases back over 120ms. Down hard, up soft; that asymmetry is
 *   most of what "responsive" means.
 * - `lift` raises a surface 1px and steps the shadow up on hover. Only for
 *   things that already sit on a shadow; a flat control that lifts looks
 *   detached.
 * - `swell` is what a flat control does instead: it grows 2% in place. No
 *   shadow, no lift, nothing to detach from — it just meets the pointer.
 *   The pair reads as one system rather than two, because both say "this
 *   responds to you" while respecting whether the surface is raised.
 * - `spring` is for a mark that travels — a toggle thumb, a tick, an
 *   indicator. The curve overshoots slightly and settles, which reads as
 *   weight. It is wrong for colour, which cannot overshoot meaningfully, and
 *   wrong for anything that must land exactly on a pixel edge.
 *
 * All four go through the Motion tokens, so `prefers-reduced-motion` still
 * flattens them and the durations stay on the scale.
 */

/**
 * Colour, border and shadow state change. Figma's spec, unchanged.
 * Use on anything that only recolours: badges, chips, links, list rows.
 */
export const motionState =
  "transition-[color,background-color,border-color,box-shadow] duration-interaction ease-decelerate";

/**
 * The above plus transform, with an instant press and an eased release.
 * Use on anything you click: buttons, tabs, menu items, pagination cells.
 */
export const motionPress =
  "transition-[color,background-color,border-color,box-shadow,transform] duration-interaction ease-decelerate " +
  "active:duration-instant active:scale-[0.97]";

/**
 * Hover lift for raised surfaces — 1px up, one shadow step. Pair with
 * `motionPress` so the same element still presses.
 */
export const motionLift = "hover:-translate-y-px hover:shadow-2 active:translate-y-0";

/**
 * Hover for a flat control — grows in place, stays flat. Pair with
 * `motionPress`, which shrinks it back past its resting size on the press.
 *
 * 2%, not 1%: on a 40px control 1% is under half a pixel, which is below the
 * threshold of noticing and so does the job of nothing.
 */
export const motionSwell = "hover:scale-[1.02]";

/**
 * For a mark that travels. Overshoots and settles, at the slower step so the
 * overshoot is legible rather than a twitch.
 */
export const motionSpring = "duration-normal ease-spring";
