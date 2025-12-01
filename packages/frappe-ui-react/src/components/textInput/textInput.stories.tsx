import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { TextInputProps } from "./types";
import TextInput from "./textInput";
import { Avatar } from "../avatar";
import FeatherIcon from "../featherIcon";

export default {
  title: "Components/TextInput",
  component: TextInput,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
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
    size: {
      control: { type: "select", options: ["sm", "md", "lg"] },
      description: "Size of the text input",
    },
    variant: {
      control: { type: "select", options: ["outline", "subtle"] },
      description: "Visual variant of the text input",
    },
    disabled: {
      control: "boolean",
      description: "If true, disables the text input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the text input",
    },
    htmlId: {
      control: "text",
      description: "HTML id attribute for the text input",
    },
    value: {
      control: "text",
      description: "Current value of the text input",
    },
    debounce: {
      control: "number",
      description: "Debounce time in milliseconds for the onChange event",
    },
    required: {
      control: "boolean",
      description: "If true, marks the text input as required",
    },
    onChange: {
      action: "changed",
      description: "Callback function when the input value changes",
    },
    prefix: {
      control: false,
      description: "Function to render a prefix element inside the input",
    },
    suffix: {
      control: false,
      description: "Function to render a suffix element inside the input",
    },
    className: {
      control: "text",
      description: "Custom CSS classes for the text input",
    },
    style: {
      control: "object",
      description: "Inline styles for the text input",
    },
  },
} as Meta<typeof TextInput>;

const Template: StoryObj<TextInputProps> = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");

    return (
      <div className="p-4 w-[300px]">
        <TextInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

export const Text = {
  ...Template,
  args: {
    type: "text",
    placeholder: "Placeholder",
    value: "",
  },
};

export const Number = {
  ...Template,
  args: {
    type: "number",
    placeholder: "Placeholder",
    value: "",
  },
};

export const Email = {
  ...Template,
  args: {
    type: "email",
    placeholder: "Placeholder",
    value: "",
  },
};

export const Date = {
  ...Template,
  args: {
    type: "date",
    placeholder: "Placeholder",
    value: "",
  },
};
export const DateTimeLocal = {
  ...Template,
  args: {
    type: "datetime-local",
    value: "",
  },
};

export const Password = {
  ...Template,
  args: {
    type: "password",
    placeholder: "Placeholder",
    value: "",
  },
};

export const Search = {
  ...Template,
  args: {
    type: "search",
    placeholder: "Placeholder",
    value: "",
  },
};

export const Telephone = {
  ...Template,
  args: {
    type: "tel",
    placeholder: "Placeholder",
    value: "",
  },
};

export const Time = {
  ...Template,
  args: {
    type: "time",
    value: "",
  },
};

export const Url = {
  ...Template,
  args: {
    type: "url",
    placeholder: "Placeholder",
    value: "",
  },
};

export const PrefixSlotIcon = {
  ...Template,
  args: {
    type: "url",
    placeholder: "Placeholder",
    prefix: (size) => <FeatherIcon className={size === "sm" ? "w-4" : "w-5"} name="search" />,
    value: "",
  },
};

export const SuffixSlotIcon = {
  ...Template,
  args: {
    type: "url",
    placeholder: "Placeholder",
    suffix: () => <FeatherIcon className="w-4" name="search" />,
    value: "",
  },
};

export const PrefixSlotAvatar = {
  ...Template,
  args: {
    type: "url",
    placeholder: "Placeholder",
    prefix: (size) => (
      <Avatar
        shape="circle"
        image="https://avatars.githubusercontent.com/u/499550?s=60&v=4"
        size={size}
      />
    ),
    value: "",
  },
};

export const Default = {
  ...Template,
  args: {
    value: "",
  },
};
