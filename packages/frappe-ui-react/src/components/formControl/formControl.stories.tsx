import type { Meta, StoryObj } from "@storybook/react-vite";

import FormControl from "./formControl";
import FeatherIcon from "../featherIcon";
import { useState } from "react";

const meta: Meta<typeof FormControl> = {
  title: "Components/FormControl",
  component: FormControl,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["subtle", "outline"],
      description: "Visual variant of the form control",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size of the form control",
    },
    disabled: {
      control: "boolean",
      description: "If true, disables the form control",
    },
    label: {
      control: "text",
      description: "Label for the form control",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the form control",
    },
    type: {
      control: false,
      description:
        "Type of the form control (e.g., text, number, email, date, password, search, textarea, select, autocomplete, checkbox)",
    },
    description: {
      control: "text",
      description: "Description text for the form control",
    },
    required: {
      control: "boolean",
      description: "If true, marks the form control as required",
    },
    prefix: {
      control: false,
      description: "Function to render a prefix element inside the input",
    },
    suffix: {
      control: false,
      description: "Function to render a suffix element inside the input",
    },
    children: {
      control: "text",
      description: "Children elements to render inside the form control",
    },
    options: {
      control: "object",
      description: "Options for select and autocomplete types",
    },
    htmlId: {
      control: "text",
      description: "HTML id attribute for the form control",
    },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder",
    variant: "subtle",
    size: "sm",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: "text",
  },
};

export const Number: Story = {
  args: {
    type: "number",
  },
};

export const Email: Story = {
  args: {
    type: "email",
  },
};

export const Date: Story = {
  args: {
    type: "date",
  },
};

export const Password: Story = {
  args: {
    type: "password",
  },
};

export const Search: Story = {
  args: {
    type: "search",
  },
};

export const Textarea: Story = {
  args: {
    type: "textarea",
  },
};

export const Select: Story = {
  args: {
    type: "select",
    htmlId: "select",
    options: [
      { label: "One", value: "1" },
      { label: "Two", value: "2" },
      { label: "Three", value: "3" },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="w-40">
        <FormControl
          {...args}
          value={value}
          onChange={(_value: string) => setValue(_value)}
        />
      </div>
    );
  },
};

export const Autocomplete: Story = {
  args: {
    type: "autocomplete",
    options: [
      { label: "One", value: "1" },
      { label: "Two", value: "2" },
      { label: "Three", value: "3" },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <FormControl
        {...args}
        value={value}
        onChange={(_value: string) => setValue(_value)}
      />
    );
  },
};

export const Checkbox: Story = {
  args: {
    type: "checkbox",
    label: "Checkbox Label",
  },
  render: (args) => {
    const [value, setValue] = useState(false);
    return (
      <FormControl
        {...args}
        value={value}
        onChange={(_value: boolean) => setValue(_value)}
      />
    );
  },
};

export const WithPrefixIcon: Story = {
  args: {
    type: "text",
    placeholder: "",
    prefix: () => <FeatherIcon className="w-4" name="search" />,
  },
};
