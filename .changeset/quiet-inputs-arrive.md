---
"@ideeza/ui": minor
"@ideeza/tokens": minor
---

Add the Atoms — Input family: `Input` (A04), `Textarea` (A05), `Select` (A06), `Checkbox` and `Radio` (A08), all composed from a shared `FieldShell` so label, helper, error and the focus halo behave identically. Geometry, type ramp and per-state colours are extracted from the Figma variants rather than approximated.

Tokens: adds `input.border-disabled`, corrects `input.error-text` to red/700, and fixes eleven `input.*` dark-mode values that were copies of their light values (`input.bg` was white in dark mode, `input.text` was near-black, and so on). Also exposes the `input.*` scale through the Tailwind preset.
