import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@ideeza/ui";

const Star = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-[16px]" aria-hidden="true">
    <path d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.8l-5.8 3 1.1-6.4L2.6 9.8l6.5-.9L12 3z" strokeLinejoin="round" />
  </svg>
);

const meta = {
  title: "Atoms/A01 Button",
  component: Button,
  args: { children: "Button", variant: "primary", size: "md" },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg", "xl", "2xl"] },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-[16px]">
      {(["primary", "secondary", "ghost", "danger"] as const).map((v) => (
        <div key={v} className="flex items-center gap-[12px]">
          <Button variant={v} size="sm">Button</Button>
          <Button variant={v} size="md">Button</Button>
          <Button variant={v} size="lg">Button</Button>
          <Button variant={v} size="md" leftIcon={<Star />}>With icon</Button>
          <Button variant={v} size="md" loading>Loading</Button>
          <Button variant={v} size="md" disabled>Disabled</Button>
        </div>
      ))}
    </div>
  ),
};
