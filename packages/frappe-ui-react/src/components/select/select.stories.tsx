import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Select from "./select";
import { Users, ChevronDown } from "lucide-react";
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
      table: { defaultValue: { summary: "md" } },
    },
    variant: {
      options: ["subtle", "outline", "ghost"],
      control: { type: "select" },
      description: "Visual variant",
      table: { defaultValue: { summary: "subtle" } },
    },
    state: {
      options: ["success", "warning", "error", null],
      control: { type: "select" },
      description: "Visual state (colors)",
    },
    className: { control: "text", description: "Custom CSS class" },
    label: { control: "text", description: "Label for the select input" },
    placeholder: { control: "text", description: "Placeholder text" },
    disabled: { control: "boolean", description: "Disables interaction" },
    loading: { control: "boolean", description: "Shows loading spinner and disables input" },
    value: { control: "object", description: "Current selected option" },
    options: { control: "object", description: "Array of options" },
    error: { control: "text", description: "Error message" },

   
    prefix: { control: "boolean", description: "Enable prefix icon" },
    prefixIcon: {
       control: { type: "select" },
       options: ["none", "users"],
       mapping: {
       none: undefined,
       users: <Users size={14} />,
       },
     },
    suffix: { control: "boolean", description: "Enable suffix icon" },
    suffixIcon: {
     control: { type: "select" },
     options: ["none", "chevron"],
     mapping: {
       none: undefined,
       chevron: <ChevronDown size={14} />,
       },
    },
    onChange: { action: "changed", description: "Change callback" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const options: SelectOption[] = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

function autoInjectIcons(args: any) {
  return {
    ...args,
        prefixIcon:
          args.prefix && args.prefixIcon !== "none"
          ? args.prefixIcon || <Users size={14} />
          : undefined,

       suffixIcon:
         args.suffix && args.suffixIcon !== "none"
         ? args.suffixIcon || <ChevronDown size={14} />
        : undefined,
  };
}

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<SelectOption | undefined>(args.value);
    const resolvedArgs = autoInjectIcons(args);
    return (
      <div className="w-72">
        <Select
          {...resolvedArgs}
          value={selected}
          onChange={(val) => {
            setSelected(val);
            args.onChange?.(val);
          }}
        />
      </div>
    );
  },
  args: {
    label: "Label",
    placeholder: "Select...",
    options,
    disabled: false,
    loading: false,
    size: "md",
    variant: "outline",
    prefix: false,
    suffix: false,
  },
};

export const WithPrefix: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<SelectOption | undefined>(args.value);
    const resolvedArgs = autoInjectIcons(args);
    return (
      <div className="w-72">
        <Select
          {...resolvedArgs}
          value={selected}
          onChange={(val) => {
            setSelected(val);
            args.onChange?.(val);
          }}
        />
      </div>
    );
  },
  args: {
    ...Default.args,
    label: "Assignee",
    prefix: true,
    suffix: true,
    variant: "outline",
  },
};




