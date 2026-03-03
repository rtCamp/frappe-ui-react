import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SelectProps } from "./types";
import Select from "./select";
import { User } from "lucide-react";

export default {
  title: "Components/Select",
  component: Select,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select", options: ["sm", "md", "lg"] },
      description: "Size of the select input",
    },
    variant: {
      control: { type: "select", options: ["outline", "subtle"] },
      description: "Visual variant of the select input",
    },
    disabled: {
      control: "boolean",
      description: "If true, disables the select input",
    },
    value: {
      control: "text",
      description: "Current value of the select input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no value is selected",
    },
    options: {
      control: "object",
      description:
        "Array of options to display in the dropdown, each with a label and value",
    },
    Prefix: {
      control: false,
      description: "Element to display before the selected value",
    },
    id: {
      control: "text",
      description: "HTML id attribute for the select input",
    },
    onChange: {
      action: "changed",
      description: "Callback function when the selected value changes",
    },
  },
} as Meta<typeof Select>;

const OPTIONS = [
  {
    label: "Matcha Tiramisu",
    value: "matcha-tiramisu",
  },
  {
    label: "Strawberry Cheesecake",
    value: "strawberry-cheesecake",
  },
  {
    label: "Chocolate Lava Cake",
    value: "chocolate-lava-cake",
  },
  {
    label: "Mango Sticky Rice",
    value: "mango-sticky-rice",
    disabled: true,
  },
  {
    label: "Pistachio Baklava",
    value: "pistachio-baklava",
  },
  {
    label: "Ube Ice Cream",
    value: "ube-ice-cream",
  },
  {
    label: "Salted Caramel Tart",
    value: "salted-caramel-tart",
  },
];

export const Default: StoryObj<SelectProps> = {
  args: {
    value: "",
    options: OPTIONS,
    placeholder: "Select option",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || "");

    return (
      <Select
        {...args}
        value={value}
        onChange={(value) => setValue(value ?? "")}
      />
    );
  },
};

export const WithPrefix: StoryObj<SelectProps> = {
  args: {
    value: "",
    options: OPTIONS,
    placeholder: "Select option",
    prefix: () => <User size={16} className="text-ink-gray-9" />,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || "");

    return (
      <Select
        {...args}
        value={value}
        onChange={(value) => setValue(value ?? "")}
      />
    );
  },
};

export const WithSuffix: StoryObj<SelectProps> = {
  args: {
    value: "",
    options: OPTIONS,
    placeholder: "Select option",
    suffix: () => <User size={16} className="text-ink-gray-9" />,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || "");

    return (
      <Select
        {...args}
        value={value}
        onChange={(value) => setValue(value ?? "")}
      />
    );
  },
};

export const WithOptionSlot: StoryObj<SelectProps> = {
  args: {
    value: "",
    options: OPTIONS,
    placeholder: "Select option",
    option: ({ option }) => (
      <div className="flex items-center gap-2">
        <User size={16} className="text-ink-gray-9" />
        <span>{option.label}</span>
      </div>
    ),
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || "");

    return (
      <Select
        {...args}
        value={value}
        onChange={(value) => setValue(value ?? "")}
      />
    );
  },
};
