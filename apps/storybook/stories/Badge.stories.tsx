import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@ideeza/ui";

const meta = {
  title: "Atoms/A17 Badge",
  component: Badge,
  args: { children: "Badge", variant: "subtle", color: "brand", size: "md" },
  argTypes: {
    variant: { control: "select", options: ["subtle", "solid", "outline"] },
    color: { control: "select", options: ["brand", "neutral", "blue", "success", "warning", "error"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-[12px]">
      {(["subtle", "solid", "outline"] as const).map((v) => (
        <div key={v} className="flex items-center gap-[8px]">
          {(["brand", "neutral", "blue", "success", "warning", "error"] as const).map((c) => (
            <Badge key={c} variant={v} color={c}>{c}</Badge>
          ))}
        </div>
      ))}
      <div className="flex items-center gap-[8px]">
        <Badge variant="subtle" color="success" dot>Online</Badge>
        <Badge variant="subtle" color="blue" onDismiss={() => alert("dismissed")}>Dismissible</Badge>
        <Badge variant="subtle" color="brand" size="lg">Large</Badge>
        <Badge variant="subtle" color="brand" size="sm">Small</Badge>
      </div>
    </div>
  ),
};
