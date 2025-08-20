import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { TextareaProps } from "./types";
import TextArea from "./textarea";

export default {
  title: 'Components/TextArea',
  component: TextArea,
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
    type: 'text',
    placeholder: 'Placeholder',
    variant: 'subtle',
    value: "",
  },
};

export const OutlineVariant = {
  ...Template,
  args: {
    type: 'number',
    placeholder: 'Placeholder',
    variant: 'outline',
    value: "",
  },
};
