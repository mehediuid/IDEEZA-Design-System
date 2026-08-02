import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "@ideeza/ui";

const Gear = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
  </svg>
);

const meta = {
  title: "Atoms/A02 Icon Button",
  component: IconButton,
  args: { "aria-label": "Settings", variant: "ghost", size: 40, children: <Gear /> },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "select", options: [32, 36, 40, 44, 48] },
  },
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-[12px]">
      <IconButton variant="primary" aria-label="Settings"><Gear /></IconButton>
      <IconButton variant="secondary" aria-label="Settings"><Gear /></IconButton>
      <IconButton variant="ghost" aria-label="Settings"><Gear /></IconButton>
      <IconButton variant="danger" aria-label="Settings"><Gear /></IconButton>
      <IconButton variant="ghost" size={32} aria-label="Settings"><Gear /></IconButton>
      <IconButton variant="ghost" size={44} aria-label="Settings"><Gear /></IconButton>
      <IconButton variant="ghost" aria-label="Settings" disabled><Gear /></IconButton>
    </div>
  ),
};
