import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@ideeza/ui";

const meta: Meta<typeof Button> = {
  title: "Atoms/Action/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "blue", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    fullWidth: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Blue: Story = {
  args: { variant: "blue" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Danger: Story = {
  args: { variant: "danger" },
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
      <Button {...args} size="xl">Extra large</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="blue">Blue</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
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

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <Button {...args} leftIcon={<span>←</span>}>Back</Button>
      <Button {...args} rightIcon={<span>→</span>}>Continue</Button>
    </div>
  ),
};
