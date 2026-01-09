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
    },
    size: {
      options: ["sm", "md", "lg", "xl"],
      control: { type: "select" },
    },
    variant: {
      options: ["subtle", "outline"],
      control: { type: "select" },
    },
    state: {
      options: ["success", "warning", "error", null],
      control: { type: "select" },
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    placeholder: { control: "text" },
    value: { control: "text" },
    prefix: { control: false },
    suffix: { control: false },
    onChange: { action: "changed" },
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
