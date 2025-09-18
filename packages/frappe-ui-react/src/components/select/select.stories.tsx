import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { SelectProps } from "./types";
import Select from "./select";

export default {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
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
    prefix: {
      control: "text",
      description: "Element to display before the selected value",
    },
    htmlId: {
      control: "text",
      description: "HTML id attribute for the select input",
    },
    onChange: {
      action: "changed",
      description: "Callback function when the selected value changes",
    },
  },
} as Meta<typeof Select>;

const Template: StoryObj<SelectProps> = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");

    return (
      <div className="p-4 w-[300px]">
        <Select
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          options={[
            { label: "John Doe", value: "john-doe" },
            { label: "Jane Doe", value: "jane-doe" },
            { label: "John Smith", value: "john-smith" },
            { label: "Jane Smith", value: "jane-smith", disabled: true },
            { label: "John Wayne", value: "john-wayne" },
            { label: "Jane Wayne", value: "jane-wayne" },
          ]}
        />
      </div>
    );
  },
};

export const Default = {
  ...Template,
  args: {
    value: "",
  },
};
