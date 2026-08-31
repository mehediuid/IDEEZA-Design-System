import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dot, Kbd, Code, DeltaChip, ProgressBar, ProgressRing } from "@ideeza/ui";

/** The Display primitives — A26, A25, A27, A30, A22 and A23. */
const meta = { title: "Atoms/Display primitives" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-[8px]">
    <span className="text-caption-sm text-text-tertiary">{label}</span>
    <div className="flex flex-wrap items-center gap-[16px]">{children}</div>
  </div>
);

export const Dots: Story = {
  name: "A26 Dot",
  render: () => (
    <div className="flex flex-col gap-[24px]">
      <Row label="Sizes — XS 6 · SM 8 · MD 10 · LG 12">
        {(["xs", "sm", "md", "lg"] as const).map((s) => (
          <Dot key={s} size={s} />
        ))}
      </Row>
      <Row label="Colours">
        {(["brand", "neutral", "blue", "success", "warning", "error"] as const).map((c) => (
          <Dot key={c} size="lg" color={c} />
        ))}
      </Row>
    </div>
  ),
};

export const KbdAndCode: Story = {
  name: "A25 KBD · A27 Code",
  render: () => (
    <div className="flex flex-col gap-[24px]">
      <Row label="KBD — raised, bordered">
        {(["sm", "md", "lg"] as const).map((s) => (
          <Kbd key={s} size={s}>⌘K</Kbd>
        ))}
      </Row>
      <Row label="Code — flat, no border">
        {(["sm", "md", "lg"] as const).map((s) => (
          <Code key={s} size={s}>pnpm build</Code>
        ))}
      </Row>
      <Row label="In a sentence">
        <span className="text-body-sm text-text-primary">
          Press <Kbd size="sm">⌘</Kbd> <Kbd size="sm">K</Kbd> then run <Code size="sm">pnpm dev</Code>.
        </span>
      </Row>
    </div>
  ),
};

export const DeltaChips: Story = {
  name: "A30 Delta Chip",
  render: () => (
    <div className="flex flex-col gap-[24px]">
      {(["subtle", "filled", "text"] as const).map((v) => (
        <Row key={v} label={v}>
          <DeltaChip variant={v} trend="up">12.5%</DeltaChip>
          <DeltaChip variant={v} trend="down">4.2%</DeltaChip>
          <DeltaChip variant={v} trend="flat">0.0%</DeltaChip>
          <DeltaChip variant={v} trend="up" size="sm">SM</DeltaChip>
        </Row>
      ))}
    </div>
  ),
};

export const ProgressBars: Story = {
  name: "A22 Progress Bar",
  render: () => (
    <div className="flex w-[370px] flex-col gap-[28px]">
      {(["none", "right", "bottom", "top-floating", "bottom-floating"] as const).map((l) => (
        <div key={l} className="flex flex-col gap-[8px]">
          <span className="text-caption-sm text-text-tertiary">Label = {l}</span>
          <ProgressBar value={60} label={l} />
        </div>
      ))}
      <div className="flex flex-col gap-[8px]">
        <span className="text-caption-sm text-text-tertiary">Progress ramp</span>
        {[0, 30, 70, 100].map((v) => (
          <ProgressBar key={v} value={v} />
        ))}
      </div>
    </div>
  ),
};

export const ProgressRings: Story = {
  name: "A23 Progress Ring",
  render: () => (
    <div className="flex flex-col gap-[28px]">
      <Row label="Ring — XS 40 · SM 56 · MD 80 · LG 120 · XL 160">
        {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
          <ProgressRing key={s} size={s} value={40} />
        ))}
      </Row>
      <Row label="Gauge — upper half only">
        {(["sm", "md", "lg"] as const).map((s) => (
          <ProgressRing key={s} size={s} value={40} variant="gauge" />
        ))}
      </Row>
      <Row label="Title + value">
        <ProgressRing size="md" value={40} title="Active users" />
        <ProgressRing size="lg" value={72} title="Storage" />
      </Row>
    </div>
  ),
};
