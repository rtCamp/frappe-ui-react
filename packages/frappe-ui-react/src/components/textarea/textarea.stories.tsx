import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Textarea from "./textarea";
import type { TextareaProps } from "./types";

const meta: Meta<typeof Textarea> = {
  title: "Components/TextArea",
  component: Textarea,
  parameters: {
    docs: {
      source: { type: "dynamic" },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { 
      control: "text", 
      description: "Label text displayed above the textarea" 
    },
    placeholder: { 
      control: "text", 
      description: "Placeholder text for the textarea" 
    },
    disabled: { 
      control: "boolean", 
      description: "If true, disables the textarea" 
    },
    variant: { 
      control: "select", 
      options: ["outline", "subtle"], 
      description: "Visual variant of the textarea" 
    },
    size: { 
      control: "select", 
      options: ["sm", "md", "lg", "xl"], 
      description: "Size of the textarea" 
    },
    rows: { 
      control: "number", 
      description: "Number of visible text lines" 
    },
    error: {
      control: "text",
      description: "Error message text displayed below the textarea"
    },
    value: {
      control: "text",
      description: "Current value of the textarea"
    },
    onChange: {
      action: "changed",
      description: "Callback function when the value changes"
    },
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

