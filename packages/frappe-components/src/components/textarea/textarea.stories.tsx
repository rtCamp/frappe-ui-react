import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./index";
import { Story, Variant } from "../Story";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  tags: ["autodocs"],
  component: Textarea,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

const sizes = ["sm", "md", "lg", "xl"] as const;

export const SubtleVariant: Story = {
  args: {
    size: "sm",
    variant: "subtle",
    placeholder: "Type something...",
    disabled: false,
    value: "",
    label: "Subtle Label",
    className: "border border-gray-200 rounded",
    rows: 3,
    onChange: () => {},
  },
  render: (args) => (
    <Story layout={{ type: "grid", width: 700 }}>
      <Variant title="Subtle Variant">
        <Textarea {...args} />
      </Variant>
    </Story>
  ),
  argTypes: {
    size: {
      control: "select",
      options: sizes,
      description: "Textarea size",
    },
    variant: {
      control: false,
      description: "Visual style variant",
    },
    value: {
      control: "text",
      description: "Textarea value",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    label: {
      control: "text",
      description: "Label for textarea",
    },
    disabled: {
      control: "boolean",
      description: "Disable textarea",
    },
    rows: {
      control: "number",
      description: "Textarea rows",
    },
    onChange: {
      action: "onChange",
      description: "Callback when value changes",
    },
    className: {
      control: "text",
      description: "CSS classes for the Textarea container",
    },
  },
};

export const OutlineVariant: Story = {
  args: {
    size: "sm",
    variant: "outline",
    placeholder: "Type something...",
    disabled: false,
    value: "",
    label: "Outline Label",
    className: "border border-gray-200 rounded",
    rows: 3,
    onChange: () => {},
  },
  render: (args) => (
    <Story layout={{ type: "grid", width: 700 }}>
      <Variant title="Outline Variant">
        <Textarea {...args} />
      </Variant>
    </Story>
  ),
  argTypes: {
    size: {
      control: "select",
      options: sizes,
      description: "Textarea size",
    },
    variant: {
      control: false,
      description: "Visual style variant",
    },
    value: {
      control: "text",
      description: "Textarea value",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    label: {
      control: "text",
      description: "Label for textarea",
    },
    disabled: {
      control: "boolean",
      description: "Disable textarea",
    },
    rows: {
      control: "number",
      description: "Textarea rows",
    },
    onChange: {
      action: "onChange",
      description: "Callback when value changes",
    },
    className: {
      control: "text",
      description: "CSS classes for the Textarea container",
    },
  },
};
