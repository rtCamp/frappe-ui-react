import type { Meta } from "@storybook/react-vite";
import { useState } from "react";
import Select from "./select";
import { User } from "lucide-react";
import type { SelectOption } from "./types";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,

  parameters: {
    docs: {
      source: { type: "dynamic" },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Label for the select input" },
    placeholder: { control: "text", description: "Placeholder text when no option is selected" },
    disabled: { control: "boolean", description: "Disables the select interaction" },
    value: { control: "object", description: "Current selected option object" },
    options: { control: "object", description: "Array of options to display" },
    error: { control: "text", description: "Error message to display" },
    prefix: { control: "text", description: "Element to display before the value" },
    size: {
      control: { type: "select", options: ["sm", "md", "lg"] },
      description: "Size of the select input",
    },
    variant: {
      control: { type: "select", options: ["outline", "subtle"] },
      description: "Visual variant of the select input",
    },
    onChange: {
      action: "changed",
      description: "Callback function when the selected value changes",
    },
  },
};

export default meta;

const options: SelectOption[] = [
  { label: "John Doe", value: "john-doe" },
  { label: "Jane Doe", value: "jane-doe" },
  { label: "Disabled User", value: "disabled", disabled: true },
];

export const Default = () => {
  const [selected, setSelected] = useState<SelectOption | undefined>(undefined);
  return (
    <div className="w-72">
      <Select
        label="Assignee"
        options={options}
        value={selected}
        onChange={setSelected}
      />
    </div>
  );
};

export const WithPrefix = () => {
  const [selected, setSelected] = useState<SelectOption>(options[0]);
  return (
    <div className="w-72">
      <Select
        label="User"
        prefix={<User size={14} />}
        options={options}
        value={selected}
        onChange={setSelected}
      />
    </div>
  );
};
