import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Select from "./select";
import type { SelectOption } from "./types";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
  size: {
    options: ["sm", "md", "lg"],
    control: { type: "select" },
    description: "Size of the select input",
  },
  variant: {
    options: ["subtle", "outline", "ghost"],
    control: { type: "select" },
    description: "Visual variant of the select component",
  },
  state: {
    options: ["success", "warning", "error", null],
    control: { type: "select" },
    description: "Validation / feedback state",
  },
  disabled: {
    control: "boolean",
    description: "Disables the select input",
  },
  loading: {
    control: "boolean",
    description: "Shows loading indicator and disables the select",
  },
  placeholder: {
    control: "text",
    description: "Placeholder text shown when no value is selected",
  },
  options: {
    control: "object",
    description: "List of selectable options",
  },
  value: {
    control: false,
    description: "Currently selected option",
  },
  htmlId: {
    control: "text",
    description: "HTML id attribute for the select element",
  },
  className: {
    control: "text",
    description: "Custom CSS class applied to the select wrapper",
  },
  prefix: {
    control: false,
    description: "ReactNode rendered before the selected value",
  },
  suffix: {
    control: false,
    description: "ReactNode rendered after the selected value",
  },
  onChange: {
    action: "changed",
    description: "Callback triggered when the selected value changes",
  },
},
};

export default meta;
type Story = StoryObj<typeof Select>;

const options: SelectOption[] = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

const Template: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<SelectOption | undefined>(args.value);
    return (
      <div className="w-72">
        <Select
          {...args}
          value={selected}
          onChange={(val) => {
            setSelected(val);
            args.onChange?.(val);
          }}
        />
      </div>
    );
  },
};

export const Subtle: Story = {
  ...Template,
  args: {
    variant: "subtle",
    placeholder: "Select option",
    options,
  },
};

export const Outline: Story = {
  ...Template,
  args: {
    variant: "outline",
    placeholder: "Select option",
    options,
  },
};

export const Ghost: Story = {
  ...Template,
  args: {
    variant: "ghost",
    placeholder: "Select option",
    options,
  },
};
