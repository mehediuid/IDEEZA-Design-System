import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Button as NewButton } from "@ideeza/ui";
// The published 0.2.0 build — the last Tailwind one — and its stylesheet,
// vendored into `old/` so the two can be rendered side by side in one page.
// Both are deleted once the migration is finished.
import { Button as OldButton } from "./old/index.js";
import oldCss from "./old/styles.css?raw";

/**
 * Old Button against new, so the move off Tailwind can be checked rather than
 * hoped about.
 *
 * A rewrite is exactly where "pixel perfect" quietly stops being true, and it
 * fails invisibly: every value still looks plausible. So this renders both
 * implementations of all 40 hierarchy × size combinations and diffs their
 * computed styles in the browser. `window.__diff()` returns every property
 * that does not match.
 *
 * The two stylesheets can share a page: the token variables are identical in
 * both, and the class names do not overlap — the old build uses Tailwind
 * utilities, the new one `.ideeza-button`.
 */
const meta: Meta = { title: "_Migration/Button diff", parameters: { layout: "padded" } };
export default meta;

const VARIANTS = ["primary", "secondary", "ghost", "danger", "tonal", "outline", "inverse", "ai"] as const;
const SIZES = ["sm", "md", "lg", "xl", "2xl"] as const;

/** Properties a diff should ignore: they differ by construction, not by design. */
const SKIP = new Set(["transitionProperty", "webkitTransitionProperty"]);

export const Diff: StoryObj = {
  render: () => {
    const [report, setReport] = React.useState<string>("Diff cholche…");

    React.useEffect(() => {
      const style = document.createElement("style");
      style.textContent = oldCss;
      document.head.prepend(style);

      const run = () => {
        const olds = [...document.querySelectorAll<HTMLElement>("[data-old]")];
        const news = [...document.querySelectorAll<HTMLElement>("[data-new]")];
        const problems: string[] = [];

        for (let i = 0; i < olds.length; i++) {
          const oldEl = olds[i];
          const newEl = news[i];
          if (!oldEl || !newEl) continue;
          const a = getComputedStyle(oldEl);
          const b = getComputedStyle(newEl);
          const key = oldEl.dataset.old ?? String(i);
          for (let p = 0; p < a.length; p++) {
            const prop = a[p];
            if (!prop) continue;
            const camel = prop.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());
            if (SKIP.has(camel)) continue;
            const av = a.getPropertyValue(prop);
            const bv = b.getPropertyValue(prop);
            if (av !== bv) problems.push(`${key}  ${prop}\n    purono: ${av}\n    notun : ${bv}`);
          }
        }
        setReport(
          problems.length
            ? `❌ ${problems.length} ta parthokko\n\n` + problems.join("\n")
            : `✅ ${olds.length} ta combination — protita CSS property hubohu mile geche`
        );
        (window as unknown as { __diff: () => string }).__diff = () => report;
      };

      // Fonts change metrics, so measure once they have settled.
      (document as unknown as { fonts: { ready: Promise<unknown> } }).fonts.ready.then(() =>
        requestAnimationFrame(run)
      );
      return () => style.remove();
    }, []);

    return (
      <div>
        <pre
          id="diff-report"
          style={{
            whiteSpace: "pre-wrap",
            font: "12px ui-monospace, monospace",
            padding: "12px",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            marginBottom: "24px",
          }}
        >
          {report}
        </pre>

        {VARIANTS.map((v) => (
          <div key={v} style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 12 }}>
            {SIZES.map((s) => (
              <React.Fragment key={s}>
                <OldButton data-old={`${v}/${s}`} variant={v} size={s}>
                  {v} {s}
                </OldButton>
                <NewButton data-new={`${v}/${s}`} variant={v} size={s}>
                  {v} {s}
                </NewButton>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
