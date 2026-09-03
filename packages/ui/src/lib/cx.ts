/**
 * Join class names. That is the whole job.
 *
 * This replaces `cn()` for components that have moved off Tailwind. `cn()`
 * had to do more: Tailwind utilities collide — `px-2` and `px-4` are both
 * padding — so something had to decide which one wins, and that something was
 * tailwind-merge plus a hand-maintained list of our custom font sizes. It got
 * that wrong once and dropped the label colour off every button.
 *
 * Component classes do not collide. `.ids-button--primary` and
 * `.ids-button--lg` set different properties, and where they set the same
 * one the cascade already has an answer. So there is nothing to merge, and
 * this is nine lines instead of a dependency.
 */
/**
 * `cond && "class"` is the call site, and `cond` is often a count or a
 * ReactNode rather than a boolean — so the falsy value that arrives can be
 * `0` as easily as `false`.
 */
export type ClassArg = string | number | false | null | undefined;

export function cx(...args: ClassArg[]) {
  let out = "";
  for (const a of args) {
    if (!a || typeof a !== "string") continue;
    out = out ? out + " " + a : a;
  }
  return out;
}
