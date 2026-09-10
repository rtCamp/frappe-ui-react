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
      control: { type: "select", options: ["sm", "md", "lg", "xl"] },
      description: "Size of the select input",
    },
    variant: {
      control: { type: "select", options: ["subtle", "outline", "ghost"] },
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
        "Options to display in the dropdown. Accepts either an object with a label and value, or a plain string used as both",
    },
    prefix: {
      control: false,
      description:
        "Render function for an element before the selected value. Receives the current size",
    },
    suffix: {
      control: false,
      description:
        "Render function for an element after the selected value. Defaults to the chevron indicator",
    },
    htmlId: {
      control: "text",
      description: "HTML id attribute for the select input",
    },
    onChange: {
      action: "changed",
      description:
        "Callback fired with a change event whose target.value is the selected value",
    },
    matchTriggerWidth: {
      control: "boolean",
      description:
        "If true, constrains the dropdown width to match the trigger width",
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
        onChange={(event) => setValue(event.target.value)}
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
        onChange={(event) => setValue(event.target.value)}
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
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const WithMatchTriggerWidth: StoryObj<SelectProps> = {
  args: {
    value: "",
    options: OPTIONS,
    placeholder: "Select option",
    matchTriggerWidth: true,
    className: "w-40",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || "");

    return (
      <Select
        {...args}
        value={value}
        onChange={(event) => setValue(event.target.value)}
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
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};
