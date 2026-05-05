import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@ideeza/ui";

const meta: Meta<typeof Button> = {
  title: "Atoms/Action/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    hierarchy: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl"],
    },
    fullWidth: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Button",
    hierarchy: "primary",
    size: "md",
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { hierarchy: "secondary" },
};

export const Ghost: Story = {
  args: { hierarchy: "ghost" },
};

export const Danger: Story = {
  args: { hierarchy: "danger" },
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="sm">SM</Button>
      <Button {...args} size="md">MD</Button>
      <Button {...args} size="lg">LG</Button>
      <Button {...args} size="xl">XL</Button>
      <Button {...args} size="2xl">2XL</Button>
    </div>
  ),
};

export const AllHierarchies: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button hierarchy="primary">Primary</Button>
      <Button hierarchy="secondary">Secondary</Button>
      <Button hierarchy="ghost">Ghost</Button>
      <Button hierarchy="danger">Danger</Button>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <Button {...args}>Default</Button>
      <Button {...args} disabled>Disabled</Button>
      <Button {...args} loading>Loading</Button>
    </div>
  ),
};

export const FullMatrix: Story = {
  render: () => {
    const hierarchies = ["primary", "secondary", "ghost", "danger"] as const;
    const sizes = ["sm", "md", "lg", "xl", "2xl"] as const;
    return (
      <div className="flex flex-col gap-6">
        {hierarchies.map((h) => (
          <div key={h} className="flex flex-col gap-2">
            <p className="text-sm text-text-tertiary uppercase tracking-wider">{h}</p>
            <div className="flex items-center gap-3">
              {sizes.map((s) => (
                <Button key={s} hierarchy={h} size={s}>
                  Button
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
