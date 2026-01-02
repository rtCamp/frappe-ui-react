import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import TextInput from "./textInput";
import { Search, Mail, User } from "lucide-react";
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
        "text", "number", "email", "date", "datetime-local",
        "password", "search", "tel", "time", "url"
      ],
      control: { type: "select" },
      description: "Type of the text input (HTML input type attribute)",
      table: {
        defaultValue: { summary: "text" },
      },
    },
    size: {
      options: ["sm", "md", "lg", "xl"],
      control: { type: "select" },
      description: "Size of the text input",
      table: { defaultValue: { summary: "md" } },
    },
    variant: {
      options: ["subtle", "outline"],
      control: { type: "select" },
      description: "Visual variant",
      table: { defaultValue: { summary: "subtle" } },
    },
    state: {
        options: ["success", "warning", "error", null],
        control: { type: "select" },
        description: "Visual state (colors)",
    },
    prefix: {
        options: ["None", "Search", "Mail", "User"],
        mapping: {
            None: null,
            Search: <Search size={16} />,
            Mail: <Mail size={16} />,
            User: <User size={16} />,
        },
        control: { type: "select" },
        description: "Icon before value",
    },
    suffix: { 
      control: "text", 
      description: "Element after value" 
    },
    loading: { control: "boolean", description: "Shows loading spinner" },
    disabled: { control: "boolean", description: "If true, disables the text input" },
    placeholder: { control: "text", description: "Placeholder text" },
    label: { control: "text", description: "Label text" },
    error: { control: "text", description: "Error message text" },
    value: { control: "text", description: "Current value" },
    onChange: { action: "changed", description: "Callback function" },
  },
};

export default meta;
type Story = StoryObj<TextInputProps>;

export const Default: Story = {
  render: (args) => {
    const [val, setVal] = useState(args.value || "");
    return (
      <div className="w-72">
        <TextInput
          {...args}
          value={val}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setVal(e.target.value);
            args.onChange?.(e);
          }}
        />
      </div>
    );
  },
  args: {
    label: "Email",
    placeholder: "user@example.com",
    type: "email",
    variant: "outline",
    size: "md",
  },
};

export const WithIcons: Story = {
  render: (args) => {
    const [val, setVal] = useState(args.value || "");
    return (
      <div className="w-72">
        <TextInput
          {...args}
          value={val}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setVal(e.target.value);
            args.onChange?.(e);
          }}
        />
      </div>
    );
  },
  args: {
    ...Default.args,
    label: "Search",
    placeholder: "Search...",
    prefix: <Search size={16} />,
    suffix: <span className="text-xs text-gray-400">⌘K</span>,
  },
};

