import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@ideeza/ui";

const Mail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 5L2 7" />
  </svg>
);
const Search = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" strokeLinecap="round" />
  </svg>
);

const SIZES = [32, 36, 40, 44, 48] as const;

const meta = {
  title: "Atoms/A04 Input",
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          "Mirrors Figma `Text Input` (A04). Sizes are named by pixel height, as in Figma. Prefix and suffix addons are inset by the border so the field outline stays unbroken.",
      },
    },
  },
  args: { label: "Label", placeholder: "Placeholder text", helperText: "Helper text", size: 40 },
  argTypes: {
    size: { control: "select", options: SIZES },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Every size — 32 / 36 / 40 / 44 / 48, with the Figma radius and type ramp. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-[16px] max-w-[360px]">
      {SIZES.map((s) => (
        <Input key={s} size={s} label={`Size ${s}`} placeholder="Placeholder text" helperText="Helper text" />
      ))}
    </div>
  ),
};

/** All states. Focus and Error + Focus are keyboard states — press Tab. */
export const States: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-[20px] max-w-[760px]">
      <Input label="Default" placeholder="Placeholder text" helperText="Helper text" />
      <Input label="Filled" defaultValue="hello@ideeza.com" helperText="Helper text" />
      <Input label="Error" defaultValue="hello@" error="Enter a valid email address" />
      <Input label="Disabled" placeholder="Placeholder text" helperText="Helper text" disabled />
      <Input label="Required" required placeholder="Placeholder text" helperText="Helper text" />
      <Input label="Focus me" placeholder="Tab into this one" helperText="3px halo, flush to the edge" />
    </div>
  ),
};

/** Icons inside the field, and text addons flush to the edge. */
export const IconsAndAddons: Story = {
  render: () => (
    <div className="flex flex-col gap-[16px] max-w-[360px]">
      <Input label="Leading icon" leftIcon={<Mail />} placeholder="hello@ideeza.com" />
      <Input label="Trailing icon" rightIcon={<Search />} placeholder="Search assets" />
      <Input label="Prefix" prefix="$" placeholder="0.00" />
      <Input label="Suffix" suffix=".com" placeholder="ideeza" />
      <Input label="Both" prefix="https://" suffix=".com" placeholder="ideeza" />
      <Input label="Prefix + error" prefix="$" defaultValue="-20" error="Must be a positive amount" />
    </div>
  ),
};

/** Select addons — Figma `Prefix Select`, `Suffix Select` and `Both Select`. */
export const SelectAddons: Story = {
  render: () => {
    const protocols = (
      <>
        <option>https://</option>
        <option>http://</option>
      </>
    );
    const units = (
      <>
        <option>USD</option>
        <option>EUR</option>
        <option>BDT</option>
      </>
    );
    return (
      <div className="flex flex-col gap-[16px] max-w-[400px]">
        <Input label="Prefix Select" prefixSelect={protocols} placeholder="ideeza.com" />
        <Input label="Suffix Select" suffixSelect={units} placeholder="0.00" />
        <Input label="Both Select" prefixSelect={protocols} suffixSelect={units} placeholder="0.00" />
        <Input label="Disabled" prefixSelect={protocols} placeholder="ideeza.com" disabled />
      </div>
    );
  },
};
