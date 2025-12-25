import type { Meta, StoryObj } from "@storybook/react-vite";

import RadioButton from "./radioButton";
import type { RadioButtonProps } from "./types";
import { useState } from "react";

export default {
  title: "Components/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for the button group container",
    },
    size: {
      control: { type: "select", options: ["sm", "md", "lg", "xl", "2xl"] },
      description: "Size of the buttons in the group",
    },
    flow: {
      control: { type: "select", options: ["row", "column"] },
      description: "Layout flow of the radio buttons",
    },
    options: {
      control: "object",
      description: "Array of radio button options",
    },
    value: {
      control: "text",
      description: "Currently selected value",
    },
    onChange: {
      action: "changed",
      description: "Callback function when a radio button is selected",
    },
  },
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
} as Meta<typeof RadioButton>;

type Story = StoryObj<RadioButtonProps>;

export const Default: Story = {
  args: {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    value: "option1",
    size: "sm",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="p-4">
        <RadioButton {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  args: {
    options: [
      { value: "option1" },
      { value: "option2" },
      { value: "option3" },
    ],
    value: "option1",
    size: "sm",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="p-4">
        <RadioButton {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};
