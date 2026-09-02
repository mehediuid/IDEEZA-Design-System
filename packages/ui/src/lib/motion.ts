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
 * The hover pair — lift for a raised surface, swell for a flat one — used to
 * live here too. Button and IconButton were their only users and both now
 * carry those rules in their own CSS, where they read as `transform:
 * translateY(-1px)` rather than as a class name. Nothing was dropped; it
 * moved, and `find-dead-classes` is what noticed the leftovers.
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
 * For a mark that travels. Overshoots and settles, at the slower step so the
 * overshoot is legible rather than a twitch.
 */
export const motionSpring = "duration-normal ease-spring";
