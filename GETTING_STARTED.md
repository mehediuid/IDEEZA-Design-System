# Getting Started — Push to GitHub

Step-by-step guide jeta tomar IDEEZA design system ta GitHub e push korbe ar live korbe.

## 1. Local install

```bash
cd ideeza-design-system
pnpm install
pnpm build
pnpm storybook   # verify everything works → opens http://localhost:6006
```

Storybook e Button er all variants + light/dark toggle dekhle bujhbe everything is wired up.

## 2. GitHub repo create

GitHub e ekta notun repo banao — naam diye `ideeza-design-system` (private)

```bash
git init
git add .
git commit -m "feat: initial design system scaffold with tokens and Button"
git branch -M main
git remote add origin git@github.com:<your-org>/ideeza-design-system.git
git push -u origin main
```

## 3. npm publishing setup

Du ta option:

### Option A — npm public/private registry
```bash
# Create automation token
npm token create --automation
```
GitHub repo Settings → Secrets and variables → Actions → New repository secret:
- Name: `NPM_TOKEN`
- Value: (the token from above)

### Option B — GitHub Packages (free for private repos)
Each package er `package.json` te add koro:
```json
"publishConfig": {
  "registry": "https://npm.pkg.github.com",
  "access": "restricted"
}
```
Then rename packages from `@ideeza/...` to `@<your-github-org>/...`.

GitHub Packages er jonno extra token lage na — built-in `GITHUB_TOKEN` automatically work kore (already configured in `.github/workflows/release.yml`).

## 4. First release

```bash
pnpm changeset           # describe the change interactively
git add .changeset
git commit -m "chore: add changeset for v0.1.0"
git push
```

Push hobar pore GitHub Action ekta "Version Packages" PR open korbe. Sheta merge korle → automatic publish to npm/GitHub Packages.

## 5. Consume in another product

Tomar onno project e:
```bash
pnpm add @ideeza/tokens @ideeza/ui
```

App entry te (Next.js `app/layout.tsx` / Vite `main.tsx`):
```tsx
import "@ideeza/tokens/css";
import "@ideeza/tokens/reset";

import { Button } from "@ideeza/ui";
```

Done. Tomar product gulo ekhon design system e plugged in.

## 6. Future updates

Figma e ekta token change holo (jemon brand color update) — flow ta:

```bash
# 1. Update tokens.css + relevant TS file in packages/tokens
# 2. Add changeset
pnpm changeset
# 3. Commit + push
git commit -am "feat(tokens): update brand violet to v2"
git push
# 4. Merge the auto-generated Version PR
# 5. Run in your product:
pnpm update @ideeza/tokens
```

Done — color update propagated. Onno product gulo o ekhon update korte parbe jokhon ready.

---

## Troubleshooting

**"Cannot find module '@ideeza/tokens'"** — `pnpm install` at the repo root, not inside a package.

**Tailwind classes na working** — confirm `content` array tomar `tailwind.config.ts` te tomar app er src files cover korche, ar `@ideeza/tokens/css` import hocche tomar entry te.

**Dark mode na switching** — `<html data-theme="dark">` ache kina dekho. Ba useEffect e theme provider lekho jeta `data-theme` set kore.

**`pnpm release` fail kore "no changesets"** — `pnpm changeset` agei run koro before merging.
