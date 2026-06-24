import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import DurationInput from "./durationInput";
import type { DurationInputProps } from "./types";

export default {
  title: "Components/DurationInput",
  component: DurationInput,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  tags: ["autodocs"],
  args: {
    size: "sm",
    variant: "subtle",
    snap: "step",
    loading: false,
    error: false,
    disabled: false,
    allowOverflow: false,
    value: 0.5,
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label displayed above the input",
      table: {
        type: {
          summary: "string | false",
        },
      },
    },
    maxDuration: {
      control: "number",
      description: "Maximum allowed duration in hours",
    },
    hoursLeft: {
      control: "number",
      description:
        "Remaining time available in hours (used to calculate 'X h left' or 'X h over')",
    },
    snap: {
      control: "select",
      options: ["step", "smooth"],
      description:
        "Controls whether the slider snaps continuously or moves smoothly",
    },
    value: {
      control: "number",
      description: "Current duration value in hours",
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
    allowOverflow: {
      control: "boolean",
      description:
        "Allows manual text input to exceed maxDuration while keeping the slider capped",
    },
    className: {
      control: "text",
      description: "Class applied to the root wrapper",
    },
    classNames: {
      control: "object",
      description: "Per-slot class overrides for the duration input internals",
    },
    onChange: {
      action: "changed",
      description: "Callback fired with the new duration value in hours",
    },
  },
} as Meta<typeof DurationInput>;

const Template: StoryObj<DurationInputProps> = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? 0.5);

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
    snap: "step",
    maxDuration: 8,
    hoursLeft: 8,
    value: 0.5,
  },
};

export const WithInitialValue: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Duration",
    size: "sm",
    variant: "subtle",
    snap: "step",
    maxDuration: 8,
    hoursLeft: 5.5,
    value: 2.5,
  },
};

export const OverHours: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Duration",
    size: "sm",
    variant: "subtle",
    snap: "step",
    maxDuration: 8,
    hoursLeft: 1,
    value: 6,
  },
};

export const CustomMax: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Sprint Duration",
    size: "sm",
    variant: "subtle",
    snap: "step",
    maxDuration: 10,
    hoursLeft: 10,
    value: 0.5,
  },
};

export const Disabled: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Duration",
    size: "sm",
    variant: "subtle",
    snap: "step",
    maxDuration: 8,
    hoursLeft: 5,
    value: 0.5,
    disabled: true,
  },
};

export const Outline: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Duration",
    size: "sm",
    variant: "outline",
    snap: "step",
    maxDuration: 8,
    hoursLeft: 8,
    value: 2,
  },
};

export const Loading: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Duration",
    size: "sm",
    variant: "subtle",
    snap: "step",
    loading: true,
    maxDuration: 8,
    hoursLeft: 8,
    value: 2,
  },
};

export const Error: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Duration",
    size: "sm",
    variant: "subtle",
    snap: "step",
    error: true,
    maxDuration: 8,
    hoursLeft: 8,
    value: 2,
  },
};
