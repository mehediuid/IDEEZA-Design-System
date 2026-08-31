import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Search, NumberInput, Slider, ColorPicker } from "@ideeza/ui";

/** A07, A12, A11 and A13 — the input atoms that sit on the shared field ramp. */
const meta = { title: "Atoms/Input atoms" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const sizes = [32, 36, 40, 44, 48] as const;

export const Searches: Story = {
  name: "A07 Search",
  render: () => {
    const [q, setQ] = React.useState("Design tokens");
    return (
      <div className="flex w-[420px] flex-col gap-[20px]">
        {sizes.map((s) => (
          <Search key={s} size={s} placeholder="Search…" label={`Size ${s}`} />
        ))}
        <Search
          label="Filled, with clear"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onClear={() => setQ("")}
        />
        <Search label="Error" error="No results for that query" defaultValue="zzz" onClear={() => {}} />
        <Search label="Disabled" placeholder="Search…" disabled />
      </div>
    );
  },
};

export const NumberInputs: Story = {
  name: "A12 Number Input",
  render: () => (
    <div className="flex w-[420px] flex-col gap-[20px]">
      {sizes.map((s) => (
        <NumberInput key={s} size={s} label={`Size ${s}`} defaultValue={10} />
      ))}
      <NumberInput label="Arrows stepper" stepper="arrows" defaultValue={3} />
      <NumberInput label="Prefix and suffix" prefix="$" suffix="/mo" defaultValue={29} />
      <NumberInput label="Clamped 0–10" min={0} max={10} defaultValue={5} helperText="Steppers respect min and max" />
      <NumberInput label="Disabled" defaultValue={1} disabled />
    </div>
  ),
};

export const Sliders: Story = {
  name: "A11 Slider",
  render: () => (
    <div className="flex w-[320px] flex-col gap-[32px]">
      {(["sm", "md", "lg"] as const).map((s) => (
        <div key={s} className="flex flex-col gap-[10px]">
          <span className="text-caption-sm text-text-tertiary">Size {s}</span>
          <Slider size={s} defaultValue={50} />
        </div>
      ))}
      <div className="flex flex-col gap-[10px]">
        <span className="text-caption-sm text-text-tertiary">Value ramp</span>
        {[0, 25, 75, 100].map((v) => (
          <Slider key={v} defaultValue={v} />
        ))}
      </div>
      <div className="flex flex-col gap-[10px]">
        <span className="text-caption-sm text-text-tertiary">Disabled</span>
        <Slider defaultValue={40} disabled />
      </div>
    </div>
  ),
};

export const ColorPickers: Story = {
  name: "A13 Color Picker",
  render: () => {
    const [hex, setHex] = React.useState("#7C2DB9");
    return (
      <div className="flex w-[420px] flex-col gap-[20px]">
        {sizes.map((s) => (
          <ColorPicker key={s} size={s} label={`Size ${s}`} defaultValue="#7C2DB9" />
        ))}
        <ColorPicker label="Controlled" value={hex} onValueChange={setHex} helperText={`Current: ${hex}`} />
        <ColorPicker label="Error" error="Not a valid hex" defaultValue="#GG0000" />
        <ColorPicker label="Disabled" defaultValue="#94A3B8" disabled />
      </div>
    );
  },
};
