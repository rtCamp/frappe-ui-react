import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import DurationInput, { type DurationInputProps } from "./index";

export default {
  title: "Components/DurationInput",
  component: DurationInput,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  tags: ["autodocs"],
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
        "Remaining time available in HH:MM format (used to calculate 'X h left",
    },
    value: {
      control: "text",
      description: "Current duration value in HH:MM format",
    },
    variant: {
      control: { type: "select", options: ["sm", "md"] },
      description: "Variations for the height of input default to sm",
    },
    disabled: {
      control: "boolean",
      description: "If true, disables the slider and text input",
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
      <div className="p-4 w-[300px]">
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
    maxDuration: "08:00",
    hoursLeft: "08:00",
    value: "00:00",
  },
};

export const WithInitialValue: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Duration",
    maxDuration: "08:00",
    hoursLeft: "05:30",
    value: "02:30",
  },
};

export const OverHours: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Duration",
    maxDuration: "08:00",
    hoursLeft: "01:00",
    value: "06:00",
  },
};

export const CustomMax: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Sprint Duration",
    maxDuration: "12:00",
    hoursLeft: "12:00",
    value: "00:00",
  },
};

export const Disabled: StoryObj<DurationInputProps> = {
  ...Template,
  args: {
    label: "Duration",
    maxDuration: "08:00",
    hoursLeft: "05:00",
    value: "00:00",
    disabled: true,
  },
};
