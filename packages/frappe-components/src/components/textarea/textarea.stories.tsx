import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { TextareaProps } from "./types";
import TextArea from "./textarea";

export default {
  title: "Components/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Label for the textarea" },
    placeholder: {
      control: "text",
      description: "Placeholder text for the textarea",
    },
    disabled: {
      control: "boolean",
      description: "If true, disables the textarea",
    },
    variant: {
      control: { type: "select", options: ["outline", "subtle"] },
      description: "Visual variant of the textarea",
    },
    size: {
      control: { type: "select", options: ["sm", "md", "lg"] },
      description: "Size of the textarea",
    },
    id: { control: "text", description: "HTML id attribute for the textarea" },
    value: { control: "text", description: "Current value of the textarea" },
    rows: {
      control: "number",
      description: "Number of visible text lines for the textarea",
    },
    onChange: {
      action: "changed",
      description: "Callback function when the textarea value changes",
    },
    debounce: {
      control: "number",
      description: "Debounce time in milliseconds for the onChange event",
    },
    type: {
      control: {
        type: "select",
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
      },
      description: "Type of the text input",
    },
    htmlId: {
      control: "text",
      description: "HTML id attribute for the text input",
    },
  },
} as Meta<typeof TextArea>;

const Template: StoryObj<TextareaProps> = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");

    return (
      <div className="p-4 w-[300px]">
        <TextArea
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

export const SubtleVariant = {
  ...Template,
  args: {
    type: "text",
    placeholder: "Placeholder",
    variant: "subtle",
    value: "",
  },
};

export const OutlineVariant = {
  ...Template,
  args: {
    type: "number",
    placeholder: "Placeholder",
    variant: "outline",
    value: "",
  },
};
