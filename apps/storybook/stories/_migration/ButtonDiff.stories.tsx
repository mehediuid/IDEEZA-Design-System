import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Button } from "@ideeza/ui";
// The stylesheet from the published 0.2.0 build — the last Tailwind one.
import oldCss from "./old/styles.css?raw";

/**
 * Old Button against new, so the move off Tailwind can be checked rather than
 * hoped about.
 *
 * A rewrite is exactly where "pixel perfect" quietly stops being true, and it
 * fails invisibly: every value still looks plausible on its own. So this
 * renders both implementations of all 40 hierarchy × size combinations and
 * diffs every computed CSS property between them.
 *
 * The old side is a plain `<button>` carrying the class strings the previous
 * Button emitted, taken verbatim from the commit before the migration, styled
 * by the 0.2.0 stylesheet. Rendering the old *component* would have been more
 * faithful still, but Vite will not serve a 400 kB prebuilt bundle out of the
 * stories directory, and the classes are what the old component contributed
 * anyway — everything below them is CSS.
 *
 * The two stylesheets share the page safely: the token variables hold the same
 * values in both, and the class names do not overlap.
 */
const meta: Meta = { title: "_Migration/Button diff", parameters: { layout: "padded" } };
export default meta;

const MOTION_PRESS =
  "transition-[color,background-color,border-color,box-shadow,transform] duration-interaction ease-decelerate active:duration-instant active:scale-[0.97]";
const MOTION_LIFT = "hover:-translate-y-px hover:shadow-2 active:translate-y-0";
const MOTION_SWELL = "hover:scale-[1.02]";

const OLD_BASE =
  "inline-flex items-center justify-center whitespace-nowrap select-none [--bd:0px] font-sans " +
  MOTION_PRESS +
  " outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]" +
  " disabled:pointer-events-none disabled:shadow-none disabled:bg-button-disabled-bg disabled:bg-none" +
  " disabled:text-button-disabled-text disabled:border-transparent";

const OLD_VARIANT: Record<string, string> = {
  primary:
    "bg-button-primary-bg text-button-primary-text shadow-depth-accent " + MOTION_LIFT +
    " hover:bg-button-primary-bg-hover active:bg-button-primary-bg-pressed" +
    " focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-on-fill)]",
  secondary:
    "bg-button-secondary-bg text-button-secondary-text " + MOTION_SWELL +
    " border-solid border-[1.5px] border-button-secondary-border [--bd:1.5px]" +
    " hover:bg-button-secondary-bg-hover hover:border-button-secondary-border-hover" +
    " active:bg-button-secondary-bg-pressed active:border-button-secondary-border-hover" +
    " focus-visible:border-border-focus",
  ghost:
    "bg-transparent text-button-secondary-text " + MOTION_SWELL +
    " hover:bg-button-ghost-bg-hover active:bg-bg-surface-raised",
  danger:
    "bg-button-danger-bg text-button-primary-text shadow-depth-accent " + MOTION_LIFT +
    " hover:bg-button-danger-bg-hover active:bg-button-danger-bg-pressed" +
    " focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-danger)]",
  tonal:
    "bg-button-tonal-bg text-button-tonal-text " + MOTION_SWELL +
    " hover:bg-button-tonal-bg-hover active:bg-button-tonal-bg-pressed" +
    " focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo-on-fill)]",
  outline:
    "bg-transparent text-text-brand " + MOTION_SWELL +
    " border-solid border-[1.5px] border-border-brand [--bd:1.5px]" +
    " hover:bg-button-outline-bg-hover active:bg-button-outline-bg-pressed",
  inverse:
    "bg-button-inverse-bg text-button-inverse-text " + MOTION_SWELL +
    " hover:bg-button-inverse-bg-hover active:bg-button-inverse-bg-pressed" +
    " focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo-inverse)]",
  ai:
    "bg-ai text-text-on-brand shadow-depth-accent " + MOTION_LIFT +
    " hover:bg-ai-hover active:bg-ai-pressed" +
    " focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-on-fill)]",
};

const OLD_SIZE: Record<string, string> = {
  sm: "h-[32px] rounded-[8px] px-[calc(12px-var(--bd))] gap-[6px] text-label-md [&_svg]:size-[14px]",
  md: "h-[36px] rounded-[8px] px-[calc(14px-var(--bd))] gap-[6px] text-label-lg [&_svg]:size-[16px]",
  lg: "h-[40px] rounded-[12px] px-[calc(16px-var(--bd))] gap-[6px] text-label-lg [&_svg]:size-[16px]",
  xl: "h-[44px] rounded-[12px] px-[calc(20px-var(--bd))] gap-[8px] text-label-xl [&_svg]:size-[20px]",
  "2xl": "h-[48px] rounded-[16px] px-[calc(24px-var(--bd))] gap-[8px] text-label-xl [&_svg]:size-[20px]",
};

const VARIANTS = ["primary", "secondary", "ghost", "danger", "tonal", "outline", "inverse", "ai"] as const;
const SIZES = ["sm", "md", "lg", "xl", "2xl"] as const;

/**
 * Differences that are not differences.
 *
 * `transition-property` lists the same properties in a different syntax.
 * `--tw-*` is Tailwind's own plumbing, which the new CSS simply does not have,
 * and `--bd` was renamed to `--ids-bd`. None of it paints anything.
 */
const ignored = (prop: string) =>
  prop.startsWith("--tw-") ||
  prop === "--bd" ||
  prop === "--ids-bd" ||
  prop === "transition-property" ||
  prop === "-webkit-transition-property";

/**
 * Tailwind puts two fully transparent ring placeholders in front of every
 * box-shadow. They paint nothing, and the new CSS omits them.
 */
const shadow = (value: string) =>
  value
    .split(/,(?![^(]*\))/)
    .map((part) => part.trim())
    .filter((part) => !/^rgba\(0,\s*0,\s*0,\s*0\)\s+0px\s+0px\s+0px\s+0px$/.test(part))
    .join(", ");

export const Diff: StoryObj = {
  render: () => {
    const [report, setReport] = React.useState("Mepe dekhchi…");

    React.useEffect(() => {
      const style = document.createElement("style");
      style.textContent = oldCss;
      // Prepended, so where both sheets define a token the new one still wins
      // and any difference this reports is about the rules, not the values.
      document.head.prepend(style);

      const run = () => {
        // Chrome parks a transition at time 0 while the tab is hidden, so a
        // computed style read mid-transition reports the value the element is
        // moving away from. That looked exactly like the new CSS failing to
        // apply, for an hour. Measure with transitions off.
        const freeze = document.createElement("style");
        freeze.textContent = "*,*::before,*::after{transition:none !important;animation:none !important}";
        document.head.appendChild(freeze);

        const olds = Array.from(document.querySelectorAll<HTMLElement>("[data-old]"));
        const news = Array.from(document.querySelectorAll<HTMLElement>("[data-new]"));
        const problems: string[] = [];

        olds.forEach((oldEl, i) => {
          const newEl = news[i];
          if (!newEl) return;
          const a = getComputedStyle(oldEl);
          const b = getComputedStyle(newEl);
          const key = oldEl.dataset.old ?? String(i);
          for (let p = 0; p < a.length; p++) {
            const prop = a[p];
            if (!prop || ignored(prop)) continue;
            const norm = prop === "box-shadow" ? shadow : (v: string) => v;
            const av = norm(a.getPropertyValue(prop));
            const bv = norm(b.getPropertyValue(prop));
            if (av !== bv) problems.push(`${key}  ${prop}\n     purono: ${av}\n     notun : ${bv}`);
          }
        });

        freeze.remove();

        setReport(
          problems.length
            ? `❌ ${problems.length} ta parthokko (${olds.length} combination)\n\n` + problems.join("\n")
            : `✅ ${olds.length} ta combination — protita CSS property hubohu mile geche`
        );
      };

      // Fonts change metrics, so wait for them — but not forever, and not on
      // requestAnimationFrame: a hidden tab throttles rAF to nothing and the
      // report simply never appears, which reads as the harness being broken.
      const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
      let cancelled = false;
      Promise.race([document.fonts.ready, wait(1000)]).then(() => wait(50)).then(() => {
        if (!cancelled) run();
      });
      return () => {
        cancelled = true;
        style.remove();
      };
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
                <button
                  type="button"
                  data-old={`${v}/${s}`}
                  className={`${OLD_BASE} ${OLD_VARIANT[v]} ${OLD_SIZE[s]}`}
                >
                  {v} {s}
                </button>
                <Button data-new={`${v}/${s}`} variant={v} size={s}>
                  {v} {s}
                </Button>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
