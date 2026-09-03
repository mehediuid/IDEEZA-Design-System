# Moving off Tailwind

The design system is being rewritten to carry its own CSS. This file is the
state of that work, written down so it survives a restart — the components
that have moved, the ones that have not, how a move is done, and every trap
found so far.

## Where it stands

20 of 46 components carry their own stylesheet. The other 26 still use
Tailwind classes, and both run side by side: `packages/ui/src/styles/index.css`
collects the component sheets and is loaded ahead of the utility layer in the
published `styles.css`. Nothing is broken in between.

**Moved** — Alert, Badge, Banner, Button, ButtonGroup, Code, DeltaChip,
Divider, Dot, IconButton, InlineCta, InlineMessage, Kbd, Link, LoadingState,
Field, Snackbar, Spinner, StatusBlock, Tag

**Not yet** — Avatar, AvatarGroup, Breadcrumb, Checkbox, ColorPicker,
DropdownMenu, Input, MultiSelect, NavItem, NumberInput, Pagination,
ProgressBar, ProgressRing, Radio, Search, Select, SidebarItem, Skeleton,
SkeletonLayout, Slider, StateView, Tabs, Textarea, Toast, Toggle, Tooltip

Field has moved, and it is the shell the rest of the form family sits on. Its
exports — `controlChrome`, `controlClass`, `valueClass` — are class names now
rather than Tailwind strings, so the components that consume them already
render against the new CSS for their chrome. Each still has its own parts to
move.

Tailwind goes when the last one moves. Until then `tailwindcss` stays a
dev-dependency of tokens, design-system and storybook. It has never been a
dependency of the published package.

## How a component moves

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

`_Migration/Diff` renders the old class strings — taken from the commit before
each migration, styled by the vendored 0.2.0 stylesheet — beside the new
component, and compares every computed CSS property. `old/styles.css` and the
whole `_migration` directory are deleted when the migration is.

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
