import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "@ideeza/ui";

const meta = {
  title: "Atoms/A10 Toggle",
  component: Toggle,
  args: { size: "md", "aria-label": "Toggle" },
  argTypes: { size: { control: "select", options: ["sm", "md"] } },
} satisfies Meta<typeof Toggle>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-[20px]">
      <Toggle defaultChecked aria-label="On" />
      <Toggle aria-label="Off" />
      <Toggle size="sm" defaultChecked aria-label="Small" />
      <Toggle disabled aria-label="Disabled" />
      <Toggle disabled defaultChecked aria-label="Disabled on" />
    </div>
  ),
};
