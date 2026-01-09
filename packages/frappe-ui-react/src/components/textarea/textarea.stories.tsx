import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Textarea from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    docs: {
      source: { type: "dynamic" },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: { 
      options: ["sm", "md", "lg"], 
      control: { type: "select" },
      description: "Size of the textarea",
      table: { defaultValue: { summary: "md" } },
    },
    variant: { 
      options: ["subtle", "outline", "ghost", "underline"], 
      control: { type: "select" },
      description: "Visual variant of the textarea",
      table: { defaultValue: { summary: "subtle" } },
    },
    state: {
      options: ["success", "warning", "error", null],
      control: { type: "select" },
      description: "Visual state (colors)",
    },
    placeholder: { control: "text", description: "Placeholder text" },
    disabled: { control: "boolean", description: "Disables the textarea" },
    loading: { control: "boolean", description: "Shows loading state (disabled)" },
    rows: { control: "number", description: "Number of visible lines" },
    value: { control: "text", description: "Current value" },
    onChange: { action: "changed", description: "Callback function" },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

const Template: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return (
      <div className="w-72">
        <Textarea
          {...args}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
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
    placeholder: "Tell us about yourself...",
    rows: 4,
    variant: "subtle",
    size: "md",
  },
};

export const Outline: Story = {
  ...Template,
  args: {
    placeholder: "Tell us about yourself...",
    rows: 4,
    variant: "outline",
    size: "md",
  },
};

export const Ghost: Story = {
  ...Template,
  args: {
    placeholder: "Tell us about yourself...",
    rows: 4,
    variant: "ghost",
    size: "md",
  },
};

export const Underline: Story = {
  ...Template,
  args: {
    placeholder: "Tell us about yourself...",
    rows: 4,
    variant: "underline",
    size: "md",
  },
};
