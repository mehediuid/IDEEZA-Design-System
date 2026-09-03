# Moving off Tailwind

The design system has been rewritten to carry its own CSS. This file was the
running state of that work, written down so it survived a restart; the
migration is complete, and it stays as the record — how a move was done, and
every trap found on the way.

## Where it stands

**Done. All 46 components carry their own stylesheet, and Tailwind is gone
from the published package.**

`packages/ui/src/styles/index.css` collects the 46 component sheets, and the
published `styles.css` is now the reset, the token variables and those rules —
plain CSS, importable as-is. The utility layer, `cn()`, tailwind-merge, cva
and `lib/motion.ts` retired with the last components; the motion recipes live
in the stylesheets as ordinary declarations, checked by name in
`check-figma-parity.mjs` and `check-css.mjs`. The system is fully
self-contained: the tailwind-preset was removed too (the Figma type map now
lives only in `textStyle`, in the tokens source, where the parity checks read
it), and Storybook's story scaffolding runs on `scaffold.css` — the utilities
the stories used, generated once and frozen as plain CSS on the day Tailwind
left the repo. `tailwindcss` appears nowhere in the workspace.

Every migrated component was verified in the Diff harness before it was
retired: 75 cases, every computed CSS property of every combination identical
to the old build (or a difference argued for in writing). The harness and the
vendored 0.2.0 stylesheet were deleted with the migration, as planned; this
file stays as the record.

Field is the shell the whole form family sits on. Its exports —
`controlChrome`, `controlClass`, `valueClass` — are class names, and every
consumer renders against them. The other exported variant helpers
(`buttonVariants`, `avatarVariants`, `skeletonVariants`, `navItemSurface`)
kept their signatures and return `ids-*` class lists now. `tailwindcss` was
never a dependency of the published package; with the last component moved it
left the workspace entirely — no package or app depends on it.

## How a component moved

1. `node tools/generate-css.mjs <Name>` — prints a draft stylesheet, resolved
   from the built CSS rather than retyped, plus a list of what it could not
   handle. Read the draft. `--write` writes it.
2. Fill in what it flagged. It cannot do classes written inline in JSX, motion
   recipes referenced as identifiers, or anything Tailwind builds out of its
   `--tw-*` variables (`ring-*` especially).
3. Rewrite the component: `cva` becomes a function returning `cx(...)` of
   `ids-<name>` and `ids-<name>--<modifier>` classes, and inline classes become
   named parts, `ids-<name>__<part>`.
4. Add `@import` to `packages/ui/src/styles/index.css`.
5. Add a case to `apps/storybook/stories/_migration/Diff.stories.tsx`.
6. `pnpm build`, open `_Migration/Diff` in Storybook, and read the report.
7. Move that component's checks in `packages/ui/scripts/check-figma-parity.mjs`
   from class strings to `css('<Name>')`.
8. `pnpm test`.

Values are never retyped. They came out of the Figma file with the plugin API
and are checked 268 ways; typing them a second time is how pixel-perfect stops
being true, and it fails invisibly.

## The diff harness

`_Migration/Diff` rendered the old class strings — taken from the commit
before each migration, styled by the vendored 0.2.0 stylesheet — beside the
new component, and compared every computed CSS property. `old/styles.css` and
the whole `_migration` directory were deleted when the migration completed,
after the final run came back green: 75 cases, all matching.

Both sides must be identical in everything but the styling. Every false
positive so far came from breaking that:

- **Different content.** Intrinsic width is a computed style. Different labels,
  a missing wrapper span, a badge on one side only — each reports a real
  looking difference. Content that varies by key must vary on both sides.
- **Different position among siblings.** ButtonGroup's `:first-child` border
  matched the new side and not the old, because the new one sat alone in its
  wrapper. Both sides sit in identical wrappers now.
- **A hidden tab.** Chrome parks transitions at time 0 and throttles
  `requestAnimationFrame` to nothing. Computed styles read mid-transition
  report the value the element is moving *away* from, which looks exactly like
  the new CSS failing to apply. The diff measures with transitions off and
  runs on a timeout.

Where the new CSS is right and the old build was wrong, the case declares an
`expected` difference with its reason, and the reason is printed next to the
pass. A silenced difference has to be argued for in writing.

## Traps, in the order they bit

Each one produced output that looked entirely reasonable.

- **Tailwind's `--tw-*` defaults.** The project loads `@tailwind utilities`
  only, so Preflight never defined them, and every `transform` in the system
  computed to `none` — the class in the markup, the rule in the stylesheet,
  and the browser discarding the result. reset.css defines them.
- **Five dead classes.** A class naming a token the preset does not expose
  produces no rule at all. `bg-bg-info-subtle`, `text-text-blue`,
  `text-icon-default` and Link's two hover colours had never done anything.
  `tools/find-dead-classes.mjs` checks this on every `pnpm test`.
- **check-figma-parity exited 0 no matter what.** For as long as it had
  existed, a failing check printed a ❌ into a green build.
- **The generator, four times.** It flattened nested variant groups so Dot's
  base inherited the last size and colour; read cva's base to the end of the
  file for one-line calls; read a quoted value to the end of the line, so
  Badge's outline border landed on every subtle badge; and wrote an empty file
  over DeltaChip's stylesheet when regenerating an already-migrated component.
  It refuses to write nothing now.
- **A keyframe in the wrong file.** `@keyframes ids-spin` lived in Button.css
  and Spinner.css used it, so Spinner stopped turning on any page without a
  Button. It is defined once, in index.css.
- **`transition-[colors,box-shadow]` on the field control.** `colors` is not a
  CSS property, so the border and background snapped while only the focus halo
  animated. Every input in the system, since the shell was written.
- **More dead classes, invisible to the checker.** `[&_svg]:text-icon` on
  Input's control and `[&_svg]:text-icon-default` on Select's produced no rule
  in any build — find-dead-classes' prefix match stops at the arbitrary
  variant, so it never reported either. Icons inherited the value colour
  instead of icon/default. Fixed in Input.css and Select.css, argued for there
  in writing; the Diff harness never measures a child svg, so the harness
  cannot vouch for it either way.
- **`iconClass` after Field moved.** Field's `iconClass` export became an
  alias of `controlClass` — fine inside a control, where it is redundant, but
  Search passed it to its glyph and its clear button, handing both the
  control's own height, edge padding and radius. Dropped in Search's
  migration: the control sizes its icons (16/20, Field.css), and the clear
  button shrink-wraps its icon. MultiSelect's chevron carried the same leak.
- **Field's svg ramp reaching further than intended.** NumberInput's stepper
  glyphs said `size-[16px]`, but `.ids-field__control--44/--48 svg { 20px }`
  outranks a bare utility on specificity — the buttons quietly grew 20px
  glyphs at the two largest sizes the day Field moved. NumberInput.css wins it
  back by sheet order, with the same specificity.
- **A one-sided border is two utilities.** `border-b-[2px] border-transparent`
  puts the width on one edge and the colour on all four. Writing it back as
  `border-bottom: 2px solid transparent` left the other three edges on the
  reset's default colour — invisible at zero width, but a real computed
  difference the harness caught on every Line tab. The faithful form is
  `border-color` plus `border-bottom-width`.
- **tailwind-merge was part of the old truth.** The harness's old sides carry
  what cn() emitted, not what the source said: for a disabled option the
  source held both `cursor-pointer` and `cursor-not-allowed`, and
  tailwind-merge dropped the first. Carrying both classes on the old side let
  the sheet's own order pick the wrong one and reported a difference that
  never reached a user.
- **Checks going stale in the other direction.** `hover:scale-[1.02]` stopped
  appearing anywhere once its last user migrated, and a check that only knew
  the class name called that a pass.

## What replaced what

`cn()` and tailwind-merge are gone from migrated components. Utilities collide
— `px-2` and `px-4` are both padding — so something had to decide which wins,
and that something dropped the label colour off every button once. Component
classes do not collide, so `lib/cx.ts` is nine lines and no dependency.

`lib/motion.ts` still holds `motionState`, `motionPress` and `motionSpring`
for the components still on classes. `motionLift` and `motionSwell` were
retired when their last users moved.
