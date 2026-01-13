import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";

import Tag from "./tag";
import type { TagProps } from "./types";

export default {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for the tag",
    },
    size: {
      control: { type: "select", options: ["sm", "md", "lg"] },
      description: "Size of the tag",
    },
    variant: {
      control: {
        type: "select",
        options: ["solid", "subtle", "outline", "ghost"],
      },
      description: "Variant style of the tag",
    },
    label: {
      control: "text",
      description: "Text label displayed inside the tag",
    },
    disabled: {
      control: "boolean",
      description: "Disables the tag when set to true",
    },
    prefixIcon: {
      control: false,
      description: "Icon component displayed before the label",
    },
    suffixIcon: {
      control: false,
      description: "Icon component displayed after the label",
    },
    visible: {
      control: "boolean",
      description: "Controls the visibility of the tag (controlled mode)",
    },
    onVisibleChange: {
      action: "visibility changed",
      description: "Callback function when the visibility of the tag changes",
    },
    onRemove: {
      action: "removed",
      description: "Callback function when the remove icon is clicked",
    },
  },
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
} as Meta<typeof Tag>;

type Story = StoryObj<TagProps>;

export const Default: Story = {
  args: {
    size: "sm",
    variant: "solid",
    label: "Discover",
  },
  render: (args) => (
    <div className="min-h-20 flex justify-center items-center">
      <Tag {...args} />
    </div>
  ),
};

export const Subtle: Story = {
  args: {
    size: "sm",
    variant: "subtle",
    label: "Discover",
  },
  render: (args) => (
    <div className="min-h-20 flex justify-center items-center">
      <Tag {...args} />
    </div>
  ),
};

export const Outline: Story = {
  args: {
    size: "sm",
    variant: "outline",
    label: "Discover",
  },
  render: (args) => (
    <div className="min-h-20 flex justify-center items-center">
      <Tag {...args} />
    </div>
  ),
};

export const Ghost: Story = {
  args: {
    size: "sm",
    variant: "ghost",
    label: "Discover",
  },
  render: (args) => (
    <div className="min-h-20 flex justify-center items-center">
      <Tag {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    size: "md",
    variant: "solid",
    label: "Discover",
    disabled: true,
  },
  render: (args) => (
    <div className="min-h-20 flex justify-center items-center">
      <Tag {...args} />
    </div>
  ),
};

export const WithPrefix: Story = {
  args: {
    size: "md",
    variant: "solid",
    label: "Mobile",
    prefixIcon: () => <Plus className="w-3 h-3" />,
  },
  render: (args) => (
    <div className="min-h-20 flex justify-center items-center">
      <Tag {...args} />
    </div>
  ),
};
