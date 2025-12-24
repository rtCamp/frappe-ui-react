import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Textarea from "./textarea";
import type { TextareaProps } from "./types";

const meta: Meta<typeof Textarea> = {
  title: "Components/TextArea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    variant: { control: "select", options: ["outline", "subtle"] },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    rows: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<TextareaProps>;

const Template: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return (
      <div className="w-72">
        <Textarea
          {...args}
          value={value}
          // Fix: Explicitly type 'e'
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

export const Default = {
  ...Template,
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    rows: 4,
  },
};

export const WithError = {
  ...Template,
  args: {
    label: "Description",
    placeholder: "Type description...",
    value: "Short",
    error: "Description must be at least 50 characters.",
    rows: 3,
  },
};

export const OutlineVariant = {
  ...Template,
  args: {
    label: "Notes",
    variant: "outline",
    rows: 3,
  },

};

export const Disabled = {
  ...Template,
  args: {
    placeholder: "Disabled textarea",
    variant: "outline",
    value: "",
    disabled: true,
  },
  };
