import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import DurationInput, { type DurationInputProps } from "./durationInput";

export default {
  title: "Components/DurationInput",
  component: DurationInput,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  tags: ["autodocs"],
  args: {
    size: "sm",
    variant: "subtle",
    loading: false,
    error: false,
    disabled: false,
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label displayed above the input",
    },
    maxDuration: {
      control: "text",
      description: "Maximum allowed duration in HH:MM",
    },
    hoursLeft: {
      control: "text",
      description:
        "Remaining time available in HH:MM format (used to calculate 'X h left' or 'X h over')",
    },
    value: {
      control: "text",
      description: "Current duration value in HH:MM format",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Height of the duration input",
    },
    variant: {
      control: "select",
      options: ["subtle", "outline"],
      description: "Visual style of the duration input",
    },
    disabled: {
      control: "boolean",
      description: "If true, disables the slider and text input",
    },
    loading: {
      control: "boolean",
      description: "If true, shows a spinner before the input value",
    },
    error: {
      control: "boolean",
      description: "If true, applies error styling",
    },
    onChange: {
      action: "changed",
      description:
        "Callback fired with the new duration value as a string (e.g. 'HH:MM')",
    },
  },
} as Meta<typeof DurationInput>;

const Template: StoryObj<DurationInputProps> = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? "00:00");

    return (
      <div className="w-48">
        <DurationInput
          {...args}
          value={value}
          onChange={(v) => {
            setValue(v);
          }}
        />
      </div>
    );
  },
};

export const Default: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Duration",
    size: "sm",
    variant: "subtle",
    maxDuration: "08:00",
    hoursLeft: "08:00",
    value: "00:00",
  },
};

export const WithInitialValue: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Duration",
    size: "sm",
    variant: "subtle",
    maxDuration: "08:00",
    hoursLeft: "05:30",
    value: "02:30",
  },
};

export const OverHours: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Duration",
    size: "sm",
    variant: "subtle",
    maxDuration: "08:00",
    hoursLeft: "01:00",
    value: "06:00",
  },
};

export const CustomMax: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Sprint Duration",
    size: "sm",
    variant: "subtle",
    maxDuration: "12:00",
    hoursLeft: "12:00",
    value: "00:00",
  },
};

export const Disabled: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Duration",
    size: "sm",
    variant: "subtle",
    maxDuration: "08:00",
    hoursLeft: "05:00",
    value: "00:00",
    disabled: true,
  },
};

export const Outline: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Duration",
    size: "sm",
    variant: "outline",
    maxDuration: "08:00",
    hoursLeft: "08:00",
    value: "02:00",
  },
};

export const Loading: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Duration",
    size: "sm",
    variant: "subtle",
    loading: true,
    maxDuration: "08:00",
    hoursLeft: "08:00",
    value: "02:00",
  },
};

export const Error: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Duration",
    size: "sm",
    variant: "subtle",
    error: true,
    maxDuration: "08:00",
    hoursLeft: "08:00",
    value: "02:00",
  },
};
