import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Textarea, Select, Checkbox, Radio, Input } from "@ideeza/ui";

const meta = {
  title: "Atoms/Form controls",
  parameters: {
    docs: {
      description: {
        component:
          "Textarea (A05), Select (A06), Checkbox and Radio (A08) — all sharing the same field chrome, border weight and focus halo as A04 Input.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

/** Textarea — Figma `Rows` property: SM 80 / MD 104 / LG 128, with matching radius. */
export const TextareaRows: Story = {
  render: () => (
    <div className="flex flex-col gap-[20px] max-w-[420px]">
      <Textarea rows="sm" label="Rows = sm" placeholder="Placeholder text" helperText="Helper text" />
      <Textarea rows="md" label="Rows = md" placeholder="Placeholder text" helperText="Helper text" />
      <Textarea rows="lg" label="Rows = lg" placeholder="Placeholder text" showCount maxLength={200} />
      <Textarea rows="md" label="Error" defaultValue="Too short" error="Please write at least 20 characters" />
      <Textarea rows="md" label="Disabled" placeholder="Placeholder text" helperText="Helper text" disabled />
    </div>
  ),
};

/** Select — native picker under the shared field chrome. */
export const Selects: Story = {
  render: () => {
    const options = (
      <>
        <option value="bd">Bangladesh</option>
        <option value="us">United States</option>
        <option value="de">Germany</option>
        <option value="jp">Japan</option>
      </>
    );
    return (
      <div className="flex flex-col gap-[16px] max-w-[360px]">
        {([32, 36, 40, 44, 48] as const).map((s) => (
          <Select key={s} size={s} label={`Size ${s}`} placeholder="Select option" helperText="Helper text">
            {options}
          </Select>
        ))}
        <Select label="Filled" defaultValue="bd" helperText="Helper text">{options}</Select>
        <Select label="Error" placeholder="Select option" error="Please choose a country">{options}</Select>
        <Select label="Disabled" placeholder="Select option" disabled>{options}</Select>
      </div>
    );
  },
};

/** Checkbox — sm 20 / md 24, plus the indeterminate state. */
export const Checkboxes: Story = {
  render: () => (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[12px]">
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled + checked" defaultChecked disabled />
      </div>
      <div className="flex flex-col gap-[12px]">
        <Checkbox size="md" label="Medium" description="With a supporting line underneath" defaultChecked />
        <Checkbox size="md" label="Medium unchecked" description="Supporting text" />
      </div>
    </div>
  ),
};

/** Radio — selected keeps the white fill, brand ring and brand dot. */
export const Radios: Story = {
  render: () => (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[12px]">
        <Radio name="plan" label="Free" defaultChecked />
        <Radio name="plan" label="Pro" />
        <Radio name="plan" label="Enterprise" />
        <Radio name="plan2" label="Disabled" disabled />
        <Radio name="plan3" label="Disabled + selected" defaultChecked disabled />
      </div>
      <div className="flex flex-col gap-[12px]">
        <Radio size="md" name="tier" label="Medium" description="With a supporting line" defaultChecked />
        <Radio size="md" name="tier" label="Medium unselected" description="Supporting text" />
      </div>
    </div>
  ),
};

/** A whole form, so spacing and alignment can be judged together. */
export const FormExample: Story = {
  render: () => (
    <form className="flex w-[420px] flex-col gap-[20px] rounded-[16px] bg-bg-surface p-[24px]">
      <Input label="Full name" required placeholder="Jane Doe" />
      <Input label="Email" required type="email" placeholder="hello@ideeza.com" helperText="We'll never share it." />
      <Input label="Budget" prefix="$" placeholder="0.00" />
      <Select label="Country" placeholder="Select option" required>
        <option value="bd">Bangladesh</option>
        <option value="us">United States</option>
      </Select>
      <Textarea rows="md" label="Project brief" placeholder="Tell us what you're building" showCount maxLength={200} />
      <div className="flex flex-col gap-[10px]">
        <Checkbox label="Email me product updates" defaultChecked />
        <Checkbox label="Share anonymous usage data" description="Helps us prioritise the roadmap" />
      </div>
    </form>
  ),
};
