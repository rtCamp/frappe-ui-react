import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { TextInputProps } from "./types";
import TextInput from "./textInput";
import { Avatar } from "../avatar";
import FeatherIcon from "../featherIcon";

export default {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of option objects ({ label, value, disabled? })',
    },
    value: {
      control: 'text',
      description: 'The currently selected value',
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
    type: 'text',
    placeholder: 'Placeholder',
    value: "",
  },
};

export const Number = {
  ...Template,
  args: {
    type: 'number',
    placeholder: 'Placeholder',
    value: "",
  },
};

export const Email = {
  ...Template,
  args: {
    type: 'email',
    placeholder: 'Placeholder',
    value: "",
  },
};

export const Date = {
  ...Template,
  args: {
    type: 'date',
    placeholder: 'Placeholder',
    value: "",
  },
};
export const DateTimeLocal = {
  ...Template,
  args: {
    type: 'datetime-local',
    value: "",
  },
};

export const Password = {
  ...Template,
  args: {
    type: 'password',
    placeholder: 'Placeholder',
    value: "",
  },
};

export const Search = {
  ...Template,
  args: {
    type: 'search',
    placeholder: 'Placeholder',
    value: "",
  },
};

export const Telephone = {
  ...Template,
  args: {
    type: 'tel',
    placeholder: 'Placeholder',
    value: "",
  },
};

export const Time = {
  ...Template,
  args: {
    type: 'time',
    value: "",
  },
};

export const Url = {
  ...Template,
  args: {
    type: 'url',
    placeholder: 'Placeholder',
    value: "",
  },
};

export const PrefixSlotIcon = {
  ...Template,
  args: {
    type: 'url',
    placeholder: 'Placeholder',
    prefix: () => <FeatherIcon
        className="w-4"
        name="search"
      />,
    value: "",
  },
};

export const SuffixSlotIcon = {
  ...Template,
  args: {
    type: 'url',
    placeholder: 'Placeholder',
    suffix: () => <FeatherIcon
        className="w-4"
        name="search"
      />,
    value: "",
  },
};

export const PrefixSlotAvatar = {
  ...Template,
  args: {
    type: 'url',
    placeholder: 'Placeholder',
    prefix: () => <Avatar shape="circle" image="https://avatars.githubusercontent.com/u/499550?s=60&v=4" />,
    value: "",
  },
};

export const Default = {
  ...Template,
  args: {
    value: "",
  },
};
