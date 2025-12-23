import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TextInput from "./textInput";
import { Search, Mail } from "lucide-react"; // Using installed icons
import type { TextInputProps } from "./types";

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["text", "password", "email", "number"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["subtle", "outline"] },
    disabled: { control: "boolean" },
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
          onChange={(e) => setVal(e.target.value)}
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