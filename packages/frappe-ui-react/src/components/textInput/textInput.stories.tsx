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
      options: ["sm", "md", "lg"],
      control: { type: "select" },
      description: "Size of the text input",
      table: { defaultValue: { summary: "md" } },
    },
    variant: {
      options: ["subtle", "outline", "ghost", "underline"],
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
    suffix: { control: false },
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
};

Default.args = {
  label: "Email",
  placeholder: "user@example.com",
  type: "email",
  variant: "subtle",
  size: "md",
};

export const WithIcons = {
  ...Template,
  args: {
    label: "Search",
    placeholder: "Search...",
    prefix: <Search size={16} />, 
    suffix: <span className="text-xs text-gray-400"></span>,
  },
};



export const AllSubtle = () => (
    <div className="space-y-6 w-72 p-6 border rounded bg-white dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Subtle Variants</h3>
        <TextInput variant="subtle" placeholder="Default" />
        <TextInput variant="subtle" state="success" placeholder="Success" value="Success" />
        <TextInput variant="subtle" state="warning" placeholder="Warning" value="Warning" />
        <TextInput variant="subtle" state="error" placeholder="Error" value="Error" />
    </div>
);

export const AllOutline = () => (
    <div className="space-y-6 w-72 p-6 border rounded bg-white dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Outline Variants</h3>
        <TextInput variant="outline" placeholder="Default" />
        <TextInput variant="outline" state="success" placeholder="Success" value="Success" />
        <TextInput variant="outline" state="warning" placeholder="Warning" value="Warning" />
        <TextInput variant="outline" state="error" placeholder="Error" value="Error" />
    </div>
);

export const AllGhost = () => (
    <div className="space-y-6 w-72 p-6 border rounded bg-white dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Ghost Variants</h3>
        <TextInput variant="ghost" placeholder="Default" />
        <TextInput variant="ghost" state="success" placeholder="Success" value="Success" />
        <TextInput variant="ghost" state="warning" placeholder="Warning" value="Warning" />
        <TextInput variant="ghost" state="error" placeholder="Error" value="Error" />
    </div>
);

export const AllUnderline = () => (
    <div className="space-y-6 w-72 p-6 border rounded bg-white dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Underline Variants</h3>
        <TextInput variant="underline" placeholder="Default" />
        <TextInput variant="underline" state="success" placeholder="Success" value="Success" />
        <TextInput variant="underline" state="warning" placeholder="Warning" value="Warning" />
        <TextInput variant="underline" state="error" placeholder="Error" value="Error" />
    </div>
);

