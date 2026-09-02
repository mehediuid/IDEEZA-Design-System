import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Button, Kbd, Code, Dot } from "@ideeza/ui";
// The stylesheet from the published 0.2.0 build — the last Tailwind one.
import oldCss from "./old/styles.css?raw";

/**
 * Every migrated component against the Tailwind build it replaced.
 *
 * A rewrite is exactly where "pixel perfect" quietly stops being true, and it
 * fails invisibly: each value still looks plausible on its own. So each case
 * renders the old class strings and the new component side by side and diffs
 * every computed CSS property between them.
 *
 * The old side is a plain element carrying the classes the previous component
 * emitted, taken verbatim from the commit before its migration, styled by the
 * 0.2.0 stylesheet. It uses the same tag as the new one on purpose — `kbd` and
 * `code` come with their own user-agent font, and comparing either against a
 * `div` would report differences that are the browser's, not ours.
 *
 * The two stylesheets share the page safely: the token variables hold the same
 * values in both, and the class names do not overlap.
 *
 * Adding a component here is one entry in `CASES`.
 */
const meta: Meta = { title: "_Migration/Diff", parameters: { layout: "padded" } };
export default meta;

const PRESS =
  "transition-[color,background-color,border-color,box-shadow,transform] duration-interaction ease-decelerate active:duration-instant active:scale-[0.97]";
const LIFT = "hover:-translate-y-px hover:shadow-2 active:translate-y-0";
const SWELL = "hover:scale-[1.02]";

interface Case {
  /** Component name, for the report. */
  name: string;
  /** Tag the component renders, so the old side matches its UA styles. */
  tag: keyof React.JSX.IntrinsicElements;
  /** label → the classes the old component emitted. */
  old: Record<string, string>;
  /** label → the new component, rendered. */
  render: (key: string) => React.ReactNode;
  /**
   * The content both sides get. It has to be identical: intrinsic width is a
   * computed style, so a different label on each side reports a real-looking
   * width difference that is entirely the harness's doing.
   */
  children?: React.ReactNode;
}

const buttonBase =
  "inline-flex items-center justify-center whitespace-nowrap select-none [--bd:0px] font-sans " +
  PRESS +
  " outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]" +
  " disabled:pointer-events-none disabled:shadow-none disabled:bg-button-disabled-bg disabled:bg-none" +
  " disabled:text-button-disabled-text disabled:border-transparent";

const buttonVariant: Record<string, string> = {
  primary:
    "bg-button-primary-bg text-button-primary-text shadow-depth-accent " + LIFT +
    " hover:bg-button-primary-bg-hover active:bg-button-primary-bg-pressed" +
    " focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-on-fill)]",
  secondary:
    "bg-button-secondary-bg text-button-secondary-text " + SWELL +
    " border-solid border-[1.5px] border-button-secondary-border [--bd:1.5px]" +
    " hover:bg-button-secondary-bg-hover hover:border-button-secondary-border-hover" +
    " active:bg-button-secondary-bg-pressed active:border-button-secondary-border-hover" +
    " focus-visible:border-border-focus",
  ghost: "bg-transparent text-button-secondary-text " + SWELL +
    " hover:bg-button-ghost-bg-hover active:bg-bg-surface-raised",
  danger:
    "bg-button-danger-bg text-button-primary-text shadow-depth-accent " + LIFT +
    " hover:bg-button-danger-bg-hover active:bg-button-danger-bg-pressed" +
    " focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-danger)]",
  tonal: "bg-button-tonal-bg text-button-tonal-text " + SWELL +
    " hover:bg-button-tonal-bg-hover active:bg-button-tonal-bg-pressed" +
    " focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo-on-fill)]",
  outline: "bg-transparent text-text-brand " + SWELL +
    " border-solid border-[1.5px] border-border-brand [--bd:1.5px]" +
    " hover:bg-button-outline-bg-hover active:bg-button-outline-bg-pressed",
  inverse: "bg-button-inverse-bg text-button-inverse-text " + SWELL +
    " hover:bg-button-inverse-bg-hover active:bg-button-inverse-bg-pressed" +
    " focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo-inverse)]",
  ai: "bg-ai text-text-on-brand shadow-depth-accent " + LIFT +
    " hover:bg-ai-hover active:bg-ai-pressed" +
    " focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-on-fill)]",
};

const buttonSize: Record<string, string> = {
  sm: "h-[32px] rounded-[8px] px-[calc(12px-var(--bd))] gap-[6px] text-label-md [&_svg]:size-[14px]",
  md: "h-[36px] rounded-[8px] px-[calc(14px-var(--bd))] gap-[6px] text-label-lg [&_svg]:size-[16px]",
  lg: "h-[40px] rounded-[12px] px-[calc(16px-var(--bd))] gap-[6px] text-label-lg [&_svg]:size-[16px]",
  xl: "h-[44px] rounded-[12px] px-[calc(20px-var(--bd))] gap-[8px] text-label-xl [&_svg]:size-[20px]",
  "2xl": "h-[48px] rounded-[16px] px-[calc(24px-var(--bd))] gap-[8px] text-label-xl [&_svg]:size-[20px]",
};

const kbdBase =
  "inline-flex items-center justify-center rounded-[4px] font-mono align-middle whitespace-nowrap" +
  " border border-border bg-bg-surface-raised text-text-secondary";
const kbdSize: Record<string, string> = {
  sm: "h-[22px] px-[6px] py-[2px] text-code-sm",
  md: "h-[24px] px-[8px] py-[3px] text-code-sm",
  lg: "h-[30px] px-[10px] py-[5px] text-code-md",
};

const codeBase = "inline-flex items-center rounded-[4px] font-mono align-middle bg-bg-subtle text-text-primary";
const codeSize: Record<string, string> = {
  sm: "h-[22px] px-[6px] py-[2px] text-code-sm",
  md: "h-[24px] px-[8px] py-[3px] text-code-sm",
  lg: "h-[28px] px-[10px] py-[4px] text-code-md",
};

const dotBase = "inline-block shrink-0 rounded-full ring-2 ring-bg-surface align-middle";
const dotSize: Record<string, string> = {
  xs: "size-[6px]", sm: "size-[8px]", md: "size-[10px]", lg: "size-[12px]",
};
const dotColor: Record<string, string> = {
  brand: "bg-bg-brand", neutral: "bg-bg-inverse", blue: "bg-bg-blue",
  success: "bg-bg-success", warning: "bg-bg-warning", error: "bg-bg-error",
};

const cross = <A extends string, B extends string>(
  a: Record<A, string>, b: Record<B, string>
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(a).flatMap(([ka, va]) =>
      Object.entries(b).map(([kb, vb]) => [`${ka}/${kb}`, `${va} ${vb}`])
    )
  );

const CASES: Case[] = [
  {
    name: "Button",
    tag: "button",
    old: Object.fromEntries(
      Object.entries(buttonVariant).flatMap(([v, vc]) =>
        Object.entries(buttonSize).map(([s, sc]) => [`${v}/${s}`, `${buttonBase} ${vc} ${sc}`])
      )
    ),
    children: "Continue",
    render: (key) => {
      const [variant, size] = key.split("/");
      return <Button variant={variant as never} size={size as never}>Continue</Button>;
    },
  },
  {
    name: "Kbd",
    tag: "kbd",
    old: Object.fromEntries(Object.entries(kbdSize).map(([s, c]) => [s, `${kbdBase} ${c}`])),
    children: "\u2318K",
    render: (key) => <Kbd size={key as never}>{"\u2318K"}</Kbd>,
  },
  {
    name: "Code",
    tag: "code",
    old: Object.fromEntries(Object.entries(codeSize).map(([s, c]) => [s, `${codeBase} ${c}`])),
    children: "npm i",
    render: (key) => <Code size={key as never}>npm i</Code>,
  },
  {
    name: "Dot",
    tag: "span",
    old: Object.fromEntries(
      Object.entries(cross(dotSize, dotColor)).map(([k, c]) => [k, `${dotBase} ${c}`])
    ),
    render: (key) => {
      const [size, color] = key.split("/");
      return <Dot size={size as never} color={color as never} />;
    },
  },
];

/**
 * Differences that are not differences: `transition-property` lists the same
 * properties in a different syntax, `--tw-*` is Tailwind's own plumbing, and
 * `--bd` was renamed to `--ids-bd`. None of it paints anything.
 */
const ignored = (prop: string) =>
  prop.startsWith("--tw-") ||
  prop === "--bd" ||
  prop === "--ids-bd" ||
  prop === "transition-property" ||
  prop === "-webkit-transition-property";

/**
 * Tailwind puts ring and shadow placeholders in front of every box-shadow.
 * They paint nothing — either because they are transparent, or because every
 * offset, blur and spread is zero — and the new CSS omits them. A shadow with
 * no geometry is dropped whatever its colour: `rgb(255,255,255) 0 0 0 0` is as
 * invisible as `rgba(0,0,0,0) 0 0 0 0`, and Dot's surface ring produces one.
 */
const paints = (part: string) => {
  const lengths = part.match(/-?[\d.]+px/g) || [];
  return lengths.length === 0 || lengths.some((l) => parseFloat(l) !== 0);
};
const shadow = (value: string) =>
  value
    .split(/,(?![^(]*\))/)
    .map((p) => p.trim())
    .filter(paints)
    .join(", ");

export const Diff: StoryObj = {
  render: () => {
    const [report, setReport] = React.useState("Mepe dekhchi…");

    React.useEffect(() => {
      const style = document.createElement("style");
      style.textContent = oldCss;
      document.head.prepend(style);

      const run = () => {
        // Chrome parks a transition at time 0 while the tab is hidden, so a
        // computed style read mid-transition reports the value the element is
        // moving away from — which looks exactly like the new CSS not applying.
        const freeze = document.createElement("style");
        freeze.textContent = "*,*::before,*::after{transition:none !important;animation:none !important}";
        document.head.appendChild(freeze);

        const lines: string[] = [];
        for (const c of CASES) {
          const problems: string[] = [];
          const keys = Object.keys(c.old);
          for (const key of keys) {
            const a = document.querySelector<HTMLElement>(`[data-old="${c.name}:${key}"]`);
            const b = document.querySelector<HTMLElement>(`[data-new="${c.name}:${key}"]`);
            if (!a || !b) { problems.push(`${key}: element pawa gelo na`); continue; }
            const sa = getComputedStyle(a);
            const sb = getComputedStyle(b);
            for (let p = 0; p < sa.length; p++) {
              const prop = sa[p];
              if (!prop || ignored(prop)) continue;
              const norm = prop === "box-shadow" ? shadow : (v: string) => v;
              const av = norm(sa.getPropertyValue(prop));
              const bv = norm(sb.getPropertyValue(prop));
              if (av !== bv) problems.push(`${key}  ${prop}\n     purono: ${av}\n     notun : ${bv}`);
            }
          }
          lines.push(
            problems.length
              ? `❌ ${c.name} — ${problems.length} ta parthokko (${keys.length} combination)\n` +
                problems.map((p) => "   " + p).join("\n")
              : `✅ ${c.name} — ${keys.length} ta combination, sob mile geche`
          );
        }

        freeze.remove();
        setReport(lines.join("\n"));
      };

      // Not requestAnimationFrame: a hidden tab throttles it to nothing and the
      // report simply never appears, which reads as the harness being broken.
      const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
      let cancelled = false;
      Promise.race([document.fonts.ready, wait(1000)])
        .then(() => wait(50))
        .then(() => { if (!cancelled) run(); });
      return () => { cancelled = true; style.remove(); };
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

        {CASES.map((c) => (
          <section key={c.name} style={{ marginBottom: 20 }}>
            <h3 style={{ font: "600 12px ui-monospace, monospace", marginBottom: 8 }}>{c.name}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              {Object.entries(c.old).map(([key, classes]) => (
                <React.Fragment key={key}>
                  {React.createElement(
                    c.tag,
                    { "data-old": `${c.name}:${key}`, className: classes },
                    c.children
                  )}
                  <span data-new-wrap={key} style={{ display: "contents" }}>
                    {React.cloneElement(
                      c.render(key) as React.ReactElement,
                      { "data-new": `${c.name}:${key}` } as never
                    )}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  },
};
