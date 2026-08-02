import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@ideeza/ui";

const Star = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.8l-5.8 3 1.1-6.4L2.6 9.8l6.5-.9L12 3z" strokeLinejoin="round" />
  </svg>
);
const Sparkle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 3v6M12 15v6M3 12h6M15 12h6" strokeLinecap="round" />
  </svg>
);

const VARIANTS = ["primary", "secondary", "ghost", "danger", "tonal", "outline", "inverse", "ai"] as const;
const SIZES = ["sm", "md", "lg", "xl", "2xl"] as const;

/** Figma geometry, for the size table. */
const SIZE_SPEC: Record<(typeof SIZES)[number], string> = {
  sm: "SM · 32 · r8 · px12 · 12/16",
  md: "MD · 36 · r8 · px14 · 14/20",
  lg: "LG · 40 · r12 · px16 · 14/20",
  xl: "XL · 44 · r12 · px20 · 16/24",
  "2xl": "2XL · 48 · r16 · px24 · 16/24",
};

const meta = {
  title: "Atoms/A01 Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "Mirrors Figma `A01 Button` — 8 hierarchies × 5 sizes. Geometry, colours, depth and focus are taken from the Figma variants, not approximated.",
      },
    },
  },
  args: { children: "Button", variant: "primary", size: "lg" },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    size: { control: "select", options: SIZES },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Every hierarchy in every state. Inverse sits on a dark surface, as in Figma. */
export const AllHierarchies: Story = {
  render: () => (
    <div className="flex flex-col gap-[20px]">
      {VARIANTS.map((v) => (
        <div
          key={v}
          className={
            "flex flex-col gap-[8px] rounded-[12px] p-[16px] " +
            (v === "inverse" ? "bg-bg-inverse" : "bg-bg-surface")
          }
        >
          <span
            className={
              "text-[11px] font-semibold uppercase tracking-wide " +
              (v === "inverse" ? "text-text-inverse" : "text-text-tertiary")
            }
          >
            {v}
          </span>
          <div className="flex flex-wrap items-center gap-[12px]">
            <Button variant={v}>Default</Button>
            <Button variant={v} leftIcon={<Star />}>With icon</Button>
            <Button variant={v} rightIcon={<Sparkle />}>Trailing</Button>
            <Button variant={v} loading>Loading</Button>
            <Button variant={v} disabled>Disabled</Button>
          </div>
        </div>
      ))}
    </div>
  ),
};

/** Size scale — matches Figma SM 32 / MD 36 / LG 40 / XL 44 / 2XL 48. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-[16px]">
      {SIZES.map((s) => (
        <div key={s} className="flex items-center gap-[12px]">
          <span className="w-[190px] text-[11px] font-semibold text-text-tertiary">{SIZE_SPEC[s]}</span>
          <Button size={s} variant="primary">Button</Button>
          <Button size={s} variant="secondary">Button</Button>
          <Button size={s} variant="tonal">Button</Button>
          <Button size={s} variant="outline">Button</Button>
          <Button size={s} variant="primary" leftIcon={<Star />}>Icon</Button>
        </div>
      ))}
    </div>
  ),
};

/** The halo each hierarchy uses, so the state can be shown without a keyboard. */
const FORCED: Record<(typeof VARIANTS)[number], string> = {
  primary: "shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-on-fill)]",
  danger: "shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-danger)]",
  ai: "shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-on-fill)]",
  tonal: "shadow-[0_0_0_3px_var(--color-focus-halo-on-fill)]",
  secondary: "shadow-[0_0_0_3px_var(--color-focus-halo)] !border-border-focus",
  outline: "shadow-[0_0_0_3px_var(--color-focus-halo)]",
  ghost: "shadow-[0_0_0_3px_var(--color-focus-halo)]",
  inverse: "shadow-[0_0_0_3px_var(--color-focus-halo-inverse)]",
};

/**
 * Focus halo — 3px spread at offset 0, flush against the edge.
 *
 * Clicking a button with the mouse deliberately does **not** show the halo:
 * `:focus-visible` only matches keyboard focus, which is the accessible
 * behaviour. Press Tab on the first row to see the real thing. The second row
 * forces the same styles on so the state can be reviewed without a keyboard.
 */
export const FocusHalo: Story = {
  render: () => (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[8px]">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
          Real focus — press Tab (mouse click will not show it, by design)
        </span>
        <div className="flex flex-wrap items-center gap-[12px] rounded-[12px] bg-bg-surface p-[16px]">
          {VARIANTS.filter((v) => v !== "inverse").map((v) => (
            <Button key={v} variant={v}>{v}</Button>
          ))}
        </div>
        <div className="flex items-center gap-[12px] rounded-[12px] bg-bg-inverse p-[16px]">
          <Button variant="inverse">inverse</Button>
        </div>
      </div>

      <div className="flex flex-col gap-[8px]">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-brand">
          Forced focus — same styles, always on
        </span>
        <div className="flex flex-wrap items-center gap-[12px] rounded-[12px] bg-bg-surface p-[16px]">
          {VARIANTS.filter((v) => v !== "inverse").map((v) => (
            <Button key={v} variant={v} className={FORCED[v]}>{v}</Button>
          ))}
        </div>
        <div className="flex items-center gap-[12px] rounded-[12px] bg-bg-inverse p-[16px]">
          <Button variant="inverse" className={FORCED.inverse}>inverse</Button>
        </div>
      </div>
    </div>
  ),
};
