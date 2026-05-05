# IDEEZA Design System

> A complete design system for the IDEEZA AI platform — synced from Figma, distributed as npm packages, and consumed across multiple products.

[![Built with Turborepo](https://img.shields.io/badge/built_with-turborepo-cc00ff)](https://turbo.build) [![Versioned with Changesets](https://img.shields.io/badge/versioned-changesets-blue)](https://github.com/changesets/changesets)

---

## What's inside

This monorepo contains the source of truth for IDEEZA's UI — tokens, components, icons, and documentation — published as installable packages so any product can stay in sync.

```
ideeza-design-system/
├── packages/
│   ├── tokens/        @ideeza/tokens  ─ design tokens (CSS vars + TS constants)
│   ├── ui/            @ideeza/ui      ─ React components
│   └── icons/         @ideeza/icons   ─ Lucide icon set (planned)
└── apps/
    └── storybook/     @ideeza/storybook ─ component playground
```

### Token coverage

Generated from the IDEEZA Figma file (`V3uizmZLHo5Xhy65Dp3F0O`):

| Collection      | Tokens | Modes              |
| --------------- | -----: | ------------------ |
| Primitives      |     68 | Value              |
| Semantic colors |    120 | Light / Dark       |
| Spacing         |     20 | Desktop / Mobile   |
| Radius          |      9 | Desktop / Mobile   |
| Typography      |     21 | Desktop / Mobile   |
| Elevation       |      8 | Light / Dark       |
| Motion          |     10 | Value              |
| Opacity         |      5 | Value              |
| Border width    |      5 | Value              |
| Z-index         |     10 | Value              |
| Safe areas      |      7 | Value              |

### Component coverage (planned)

~149 components across the atomic structure used in Figma:

- **Atoms** — Action, Input, Display
- **Molecules** — Feedback, Overlay, Navigation, Data Display, Charts, Pickers, Form, IDEEZA, Utility
- **Organisms** — App, Marketing
- **Screens** — Auth, Core, Settings, Marketing, Email Templates

This repo currently ships the tokens package and `Button` as a starter. Add components incrementally — see [Adding a component](#adding-a-component).

---

## Installation in a product

```bash
pnpm add @ideeza/tokens @ideeza/ui
```

In your app's root (e.g. `app/layout.tsx` for Next.js, `main.tsx` for Vite):

```tsx
import "@ideeza/tokens/css";   // CSS variables (light + dark, responsive)
import "@ideeza/tokens/reset"; // optional reset
```

For Tailwind users, in `tailwind.config.ts`:

```ts
import { ideezaPreset } from "@ideeza/tokens/tailwind-preset";

export default {
  presets: [ideezaPreset],
  content: ["./src/**/*.{ts,tsx}"],
};
```

Theme switching:

```html
<html data-theme="dark">
```

(Or omit the attribute to follow the OS `prefers-color-scheme`.)

Use components:

```tsx
import { Button } from "@ideeza/ui";

<Button variant="primary" size="md">Get started</Button>
<Button variant="ghost" leftIcon={<Icon />}>Cancel</Button>
```

---

## Local development

Requires Node 18.17+ and pnpm 9.

```bash
pnpm install
pnpm dev          # build all packages in watch mode
pnpm storybook    # open the component playground at localhost:6006
pnpm typecheck
pnpm test
```

---

## Update flow

> The Figma file is the source of truth. Changes flow Figma → tokens → components → release.

### 1. Designer updates Figma
A token value changes (e.g. `color/violet/600` updated). They post a heads-up in `#design-system`.

### 2. Sync tokens
Re-export tokens from Figma. Update the relevant constants in `packages/tokens/src/` and the corresponding CSS variables in `packages/tokens/css/tokens.css`.

> **Tip:** keep these two in lockstep — TS for tooling, CSS for runtime. The CSS file is what every product actually consumes.

### 3. Add a changeset

```bash
pnpm changeset
```

Pick which packages changed and whether it's a major/minor/patch bump. Write a one-line summary; this becomes the changelog entry.

### 4. Open a PR

When merged to `main`, the GitHub Action either:
- Opens a "Version Packages" PR that bumps versions and updates `CHANGELOG.md`, **or**
- Publishes the package to npm if the Version PR was already merged.

### 5. Consumers update

```bash
pnpm update @ideeza/ui @ideeza/tokens
```

---

## Adding a component

1. Create the folder in `packages/ui/src/components/<Name>/`
2. Add three files: `<Name>.tsx`, `index.ts` (re-export), and a Storybook story in `apps/storybook/stories/<Name>.stories.tsx`
3. Reference Figma — open `1:5` (Atoms — Action) or the relevant page, copy the variant matrix into a CVA config
4. Use semantic tokens (e.g. `bg-button-primary-bg`) instead of primitives — this is what makes light/dark work for free
5. Add `export * from "./components/<Name>/index.js"` to `packages/ui/src/index.ts`
6. `pnpm changeset` → describe the addition

Reference: see `packages/ui/src/components/Button/Button.tsx` for the full pattern (CVA + Radix Slot + tokens).

---

## Architecture decisions

**Why a monorepo?** Tokens, components, and icons are independently versionable but tightly coupled — a token change should trigger a UI release. Turborepo gives us shared caching across packages.

**Why CSS variables?** Light/dark switching is a single attribute toggle on `<html>`, and responsive token values use one media query. No JS theme provider, no FOUC, works with any framework, and Tailwind utilities map directly via the preset.

**Why CVA?** Variant matrices in Figma map cleanly to CVA configs. It produces ergonomic typed APIs (`<Button variant="primary" size="md" />`) and integrates well with `tailwind-merge` for prop-driven overrides.

**Why Radix?** ~80% of the molecules in Figma (Dialog, Dropdown, Tooltip, Toast, Popover, Toggle, Tabs, Accordion) need accessibility primitives. Radix gives us those for free; we own the styling.

**Why Manrope?** Already specified in the Figma typography tokens. Loaded via Google Fonts in consuming apps:

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Roboto+Mono&display=swap" rel="stylesheet">
```

---

## Publishing

The release workflow auto-publishes on merge to `main` when a changeset is present. To enable:

1. Create an npm automation token: `npm token create --automation`
2. Add it as the `NPM_TOKEN` repo secret in GitHub
3. (Optional) Switch to GitHub Packages by changing `publishConfig.registry` in each package's `package.json`

---

## Roadmap

- [x] Tokens package (full)
- [x] UI package scaffold + `Button`
- [ ] `Input`, `Toggle`, `IconButton` (Atoms — Action / Input)
- [ ] `Badge`, `Tag`, `Avatar`, `Tooltip` (Atoms — Display)
- [ ] `Dialog`, `Sheet`, `Popover`, `Toast` (Molecules — Overlay / Feedback)
- [ ] Icons package (Lucide wrapper)
- [ ] Charts package (Recharts wrapper using tokens)
- [ ] Storybook deployed to GitHub Pages

---

## License

Private — internal use within IDEEZA only.
