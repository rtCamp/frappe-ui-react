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
      description:
        "Additional CSS classes for the radio button group container",
    },
    size: {
      control: { type: "select", options: ["sm", "md"] },
      description: "Size of the buttons in the group",
    },
    flow: {
      control: { type: "select", options: ["row", "column"] },
      description: "Layout flow of the radio buttons",
    },
    disabled: {
      control: "boolean",
      description: "Disables all radio buttons when set to true",
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
      { label: "John Doe", value: "john-doe" },
      { label: "Jane Smith", value: "jane-smith" },
      { label: "Bob Wilson", value: "bob-wilson" },
    ],
    value: "john-doe",
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
    options: [{ value: "option1" }, { value: "option2" }, { value: "option3" }],
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

export const Horizontal: Story = {
  args: {
    options: [
      { label: "John Doe", value: "john-doe" },
      { label: "Jane Smith", value: "jane-smith" },
      { label: "Bob Wilson", value: "bob-wilson" },
    ],
    value: "john-doe",
    size: "sm",
    flow: "row",
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

export const DisabledOptions: Story = {
  args: {
    options: [
      { label: "John Doe", value: "john-doe" },
      { label: "Jane Smith", value: "jane-smith", disabled: true },
      { label: "Bob Wilson", value: "bob-wilson" },
    ],
    value: "john-doe",
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

export const GroupDisabled: Story = {
  args: {
    options: [
      { label: "John Doe", value: "john-doe" },
      { label: "Jane Smith", value: "jane-smith" },
      { label: "Bob Wilson", value: "bob-wilson" },
    ],
    value: "john-doe",
    size: "sm",
    disabled: true,
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
