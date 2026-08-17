import type { Meta, StoryObj } from "@storybook/react-vite";

import FormLabel from "./formLabel";

const meta: Meta<typeof FormLabel> = {
  title: "Components/FormLabel",
  component: FormLabel,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text (used when children is not provided)",
    },
    children: {
      control: "text",
      description: "Label content, takes precedence over label",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Typography size of the label",
    },
    required: {
      control: "boolean",
      description: "If true, renders a required-field asterisk",
    },
    className: {
      control: "text",
      description: "Additional classes merged onto the default label classes",
    },
  },
  args: {
    label: "Label",
    size: "sm",
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const MediumSize: Story = {
  args: { size: "md", required: true },
};

export const WithChildren: Story = {
  args: {
    label: undefined,
    children: "Custom label content",
    required: true,
  },
};

export const WithCustomSpacing: Story = {
  args: {
    size: "md",
    required: true,
    className: "mb-1.5",
  },
};
