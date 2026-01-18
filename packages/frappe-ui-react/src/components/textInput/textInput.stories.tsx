import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import TextInput from "./textInput";
import type { TextInputProps } from "./types";

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
  type: {
    options: [
      "text",
      "number",
      "email",
      "date",
      "datetime-local",
      "password",
      "search",
      "tel",
      "time",
      "url",
    ],
    control: { type: "select" },
    description: "HTML input type",
  },
  size: {
    options: ["sm", "md", "lg", "xl"],
    control: { type: "select" },
    description: "Size of the text input",
  },
  variant: {
    options: ["subtle", "outline"],
    control: { type: "select" },
    description: "Visual variant of the input",
  },
  state: {
    options: ["success", "warning", "error", null],
    control: { type: "select" },
    description: "Validation / feedback state",
  },
  disabled: {
    control: "boolean",
    description: "Disables the input",
  },
  loading: {
    control: "boolean",
    description: "Shows loading spinner and disables input",
  },
  placeholder: {
    control: "text",
    description: "Placeholder text",
  },
  value: {
    control: "text",
    description: "Controlled value of the input",
  },
  prefix: {
    control: false,
    description: "Prefix slot (icon or custom element)",
  },
  suffix: {
    control: false,
    description: "Suffix slot (icon or custom element)",
  },
  onChange: {
    action: "changed",
    description: "Triggered when input value changes",
  },
  htmlId: {
  control: "text",
  description: "HTML id attribute",
  },
  debounce: {
    control: "number",
    description: "Debounce delay in milliseconds",
  },
  required: {
    control: "boolean",
    description: "Marks the input as required",
  },
  className: {
    control: "text",
    description: "Custom CSS class",
  },
 },
};

export default meta;
type Story = StoryObj<TextInputProps>;

const Template: Story = {
  render: (args) => {
    const [val, setVal] = useState(args.value || "");
    return (
      <div className="w-72">
        <TextInput
          {...args}
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            args.onChange?.(e);
          }}
        />
      </div>
    );
  },
};

export const Subtle: Story = {
  ...Template,
  args: {
    type: "email",
    placeholder: "user@example.com",
    variant: "subtle",
    size: "md",
  },
};

export const Outline: Story = {
  ...Template,
  args: {
    type: "email",
    placeholder: "user@example.com",
    variant: "outline",
    size: "md",
  },
};
