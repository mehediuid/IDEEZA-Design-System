# IDEEZA Design System

React components, design tokens and icons, built from the IDEEZA Figma library.

Every measurement here was read out of the Figma file with the plugin API
rather than eyeballed, and a parity check in the repo fails if a component
drifts from it.

```bash
npm install ideeza-ds
```

```jsx
import { Button, Input } from "ideeza-ds";
import "ideeza-ds/styles.css";

export default function App() {
  return (
    <>
      <Input label="Email" placeholder="you@example.com" />
      <Button>Continue</Button>
    </>
  );
}
```

That is the whole setup. **You do not need Tailwind.** The stylesheet ships
prebuilt with every rule the components use.

Requires React 18 or newer, and nothing else — the package has no runtime
dependencies. Radix's switch, tooltip and slot primitives are bundled in, so
installing this adds one entry to your lockfile rather than a dozen.

One consequence worth knowing: the bundled Radix carries its own React
context, so our `Tooltip` reads the `TooltipProvider` this package exports,
not one you might already have from your own copy of
`@radix-ui/react-tooltip`. Wrap with ours.

## What's in it

| | |
|---|---|
| Components (46) | Alert, Avatar, AvatarGroup, Badge, Banner, Breadcrumb, Button, ButtonGroup, Checkbox, Code, ColorPicker, DeltaChip, Divider, Dot, DropdownMenu, Field, IconButton, InlineCta, InlineMessage, Input, Kbd, Link, LoadingState, MultiSelect, NavItem, NumberInput, Pagination, ProgressBar, ProgressRing, Radio, Search, Select, SidebarItem, Skeleton, SkeletonLayout, Slider, Snackbar, Spinner, StateView, StatusBlock, Tabs, Tag, Textarea, Toast, Toggle, Tooltip |
| Tokens | 86 primitives, 185 semantic tokens with light and dark modes, plus scales for spacing, radius, type, motion, elevation and z-index |
| Icons | 33 icons under the `Icons` namespace |

## Dark mode

The tokens follow `prefers-color-scheme` on their own. To control it yourself,
put `data-theme` on any ancestor:

```html
<html data-theme="dark">
```

## Icons

Icon names are namespaced, because a few of them (`Link`, `Menu`) would
otherwise collide with component names:

```jsx
import { Icons } from "ideeza-ds";

<Icons.Add01 />
<Icons.Search01 className="size-[20px]" />
```

## Motion

Interactions animate at 120ms on ease-out — the value 7,194 of the Figma
file's prototype reactions use. On top of that, anything clickable presses
(instant down, eased release), raised surfaces lift on hover, flat ones swell,
and marks that travel — the toggle thumb, the tab indicator — move on a
spring.

All of it goes through the motion tokens, so `prefers-reduced-motion: reduce`
flattens the lot without disabling the state changes themselves.

## Styling around it

The system is self-contained: `styles.css` carries the reset, the token
variables and every component rule, and needs no framework or build step.
Custom styling in a consuming app is written against the same CSS variables
the components read. If you would rather bring your own reset, import the
pieces separately:

```css
@import "ideeza-ds/reset.css";   /* optional */
@import "ideeza-ds/tokens.css";  /* the variables */
```

## Server components

The bundle is marked `"use client"`. Components are interactive; import them
from a client component.

## License

MIT
