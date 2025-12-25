import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import TextInput from "./textInput";
import { Search } from "lucide-react";
import type { TextInputProps } from "./types";

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
  parameters: {
    docs: {
      source: { type: "dynamic" },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: {
        type: "select",
        options: [
          "text", "number", "email", "date", "datetime-local",
          "password", "search", "tel", "time", "url"
        ]
      },
      description: "Type of the text input (HTML input type attribute)",
    },
    size: {
      control: { type: "select", options: ["sm", "md", "lg", "xl"] },
      description: "Size of the text input",
    },
    variant: {
      control: { type: "select", options: ["subtle", "outline", "ghost"] },
      description: "Visual variant of the text input",
    },
    disabled: {
      control: "boolean",
      description: "If true, disables the text input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    label: {
      control: "text",
      description: "Label text displayed above the input",
    },
    error: {
      control: "text",
      description: "Error message text displayed below the input",
    },
    value: {
      control: "text",
      description: "Current value of the text input",
    },
    prefix: {
      control: false,
      description: "Element to display before the input value (e.g., Icon)",
    },
    suffix: {
      control: false,
      description: "Element to display after the input value",
    },
    onChange: {
      action: "changed",
      description: "Callback function when the input value changes",
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVal(e.target.value)}
        />
      </div>
    );
  },
};

export const Default = {
  ...Template,
  args: {
    label: "Email",
    placeholder: "user@example.com",
    type: "email",
  },
};

export const WithIcons = {
  ...Template,
  args: {
    label: "Search",
    placeholder: "Search...",
    prefix: <Search size={16} />,
    suffix: <span className="text-xs text-gray-400">⌘K</span>,
  },
};

export const WithError = {
  ...Template,
  args: {
    label: "Password",
    type: "password",
    value: "123",
    error: "Password is too weak",
  },
};
