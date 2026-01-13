import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowUpDown, ChevronDown, ListFilter, SmilePlus } from "lucide-react";

import ButtonGroup from "./buttonGroup";
import type { ButtonGroupProps } from "./types";

export default {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for the button group container",
    },
    buttons: {
      control: "object",
      description: "Array of button configurations",
    },
    size: {
      control: { type: "select", options: ["sm", "md", "lg", "xl", "2xl"] },
      description: "Size of the buttons in the group",
    },
    variant: {
      control: {
        type: "select",
        options: ["solid", "subtle", "outline", "ghost"],
      },
      description: "Variant style of the buttons",
    },
    theme: {
      control: { type: "select", options: ["gray", "blue", "green", "red"] },
      description: "Theme color of the buttons",
    },
  },
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
} as Meta<typeof ButtonGroup>;

type Story = StoryObj<ButtonGroupProps>;

export const Default: Story = {
  args: {
    buttons: [
      {
        id: "btn-1",
        label: "Group by",
      },
      {
        id: "btn-2",
        label: "Sort",
      },
      {
        id: "btn-3",
        label: "Filters",
      },
    ],
    size: "sm",
    variant: "subtle",
  },
  render: (args) => (
    <div className="p-4">
      <ButtonGroup {...args} />
    </div>
  ),
};

export const IconSubtle: Story = {
  args: {
    buttons: [
      {
        id: "btn-1",
        icon: "phone",
      },
      {
        id: "btn-2",
        icon: "mail",
      },
      {
        id: "btn-3",
        icon: "external-link",
      },
    ],
    size: "sm",
    variant: "subtle",
    theme: "gray",
  },
  render: (args) => (
    <div className="p-4">
      <ButtonGroup {...args} />
    </div>
  ),
};

export const IconMixedVariant: Story = {
  args: {
    buttons: [
      {
        id: "btn-1",
        icon: "corner-up-left",
      },
      {
        id: "btn-2",
        icon: "map-pin",
      },
      {
        id: "btn-3",
        variant: "subtle",
        icon: () => <SmilePlus className="w-4 h-4" />,
      },
      {
        id: "btn-4",
        icon: "more-horizontal",
      },
    ],
    size: "sm",
    variant: "ghost",
    theme: "gray",
  },
  render: (args) => (
    <div className="p-4">
      <ButtonGroup {...args} />
    </div>
  ),
};

export const IconWithLabelSubtle: Story = {
  args: {
    buttons: [
      {
        id: "btn-1",
        label: "Save view",
        iconLeft: "plus",
      },
      {
        id: "btn-2",
        label: "Sort",
        iconLeft: () => <ArrowUpDown className="w-4 h-4" />,
      },
      {
        id: "btn-3",
        label: "Filter",
        iconLeft: () => <ListFilter className="w-4 h-4" />,
        iconRight: () => <ChevronDown className="w-4 h-4" />,
      },
      {
        id: "btn-4",
        label: "Column",
        iconLeft: "columns",
      },
      {
        id: "btn-5",
        icon: "more-horizontal",
      },
    ],
    size: "md",
    variant: "subtle",
    theme: "gray",
  },
  render: (args) => (
    <div className="p-4">
      <ButtonGroup {...args} />
    </div>
  ),
};

export const IconWithLabelOutline: Story = {
  args: {
    buttons: [
      {
        id: "btn-1",
        label: "Save view",
        iconLeft: "plus",
      },
      {
        id: "btn-2",
        label: "Sort",
        iconLeft: () => <ArrowUpDown className="w-4 h-4" />,
      },
      {
        id: "btn-3",
        label: "Filter",
        iconLeft: () => <ListFilter className="w-4 h-4" />,
        iconRight: () => <ChevronDown className="w-4 h-4" />,
      },
      {
        id: "btn-4",
        label: "Column",
        iconLeft: "columns",
      },
      {
        id: "btn-5",
        icon: "more-horizontal",
      },
    ],
    size: "md",
    variant: "outline",
    theme: "gray",
  },
  render: (args) => (
    <div className="p-4">
      <ButtonGroup {...args} />
    </div>
  ),
};
