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
    label: { control: "text", description: "Label text" },
    placeholder: { control: "text", description: "Placeholder text" },
    disabled: { control: "boolean", description: "Disables the textarea" },
    loading: { control: "boolean", description: "Shows loading state (disabled)" },
    rows: { control: "number", description: "Number of visible lines" },
    error: { control: "text", description: "Error message" },
    value: { control: "text", description: "Current value" },
    onChange: { action: "changed", description: "Callback function" },
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
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

export const Default = {
  ...Template,
};

Default.args = {
  label: "Bio",
  placeholder: "Tell us about yourself...",
  rows: 4,
  variant: "subtle",
  size: "md",
};


export const AllSubtle = () => (
    <div className="space-y-6 w-72 p-6 border rounded bg-white dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Subtle Variants</h3>
        <Textarea variant="subtle" placeholder="Default" />
        <Textarea variant="subtle" state="success" placeholder="Success" value="Success State" />
        <Textarea variant="subtle" state="warning" placeholder="Warning" value="Warning State" />
        <Textarea variant="subtle" state="error" placeholder="Error" value="Error State" />
    </div>
);

export const AllOutline = () => (
    <div className="space-y-6 w-72 p-6 border rounded bg-white dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Outline Variants</h3>
        <Textarea variant="outline" placeholder="Default" />
        <Textarea variant="outline" state="success" placeholder="Success" value="Success State" />
        <Textarea variant="outline" state="warning" placeholder="Warning" value="Warning State" />
        <Textarea variant="outline" state="error" placeholder="Error" value="Error State" />
    </div>
);

export const AllGhost = () => (
    <div className="space-y-6 w-72 p-6 border rounded bg-white dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Ghost Variants</h3>
        <Textarea variant="ghost" placeholder="Default" />
        <Textarea variant="ghost" state="success" placeholder="Success" value="Success State" />
        <Textarea variant="ghost" state="warning" placeholder="Warning" value="Warning State" />
        <Textarea variant="ghost" state="error" placeholder="Error" value="Error State" />
    </div>
);

export const AllUnderline = () => (
    <div className="space-y-6 w-72 p-6 border rounded bg-white dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Underline Variants</h3>
        <Textarea variant="underline" placeholder="Default" />
        <Textarea variant="underline" state="success" placeholder="Success" value="Success State" />
        <Textarea variant="underline" state="warning" placeholder="Warning" value="Warning State" />
        <Textarea variant="underline" state="error" placeholder="Error" value="Error State" />
    </div>
);


