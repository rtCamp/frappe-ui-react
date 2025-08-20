import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { SelectProps } from "./types";
import Select from "./select";

export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of option objects ({ label, value, disabled? })',
    },
    value: {
      control: 'text',
      description: 'The currently selected value',
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
