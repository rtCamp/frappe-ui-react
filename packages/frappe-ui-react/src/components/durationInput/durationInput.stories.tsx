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
    maxDurationInHours: {
      control: { type: "number", min: 1, max: 24 },
      description: "Maximum allowed duration in hours",
    },
    hoursLeft: {
      control: { type: "number" },
      description: "Remaining hours available (used to calculate 'X h left')",
    },
    value: {
      control: { type: "number", min: 0, step: 0.5 },
      description: "Current duration value in hours",
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
      description: "Callback fired with the new duration in hours",
    },
  },
} as Meta<typeof DurationInput>;

const Template: StoryObj<DurationInputProps> = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? 0);

    return (
      <div className="p-4 w-[300px]">
        <DurationInput
          {...args}
          value={value}
          onChange={(v) => {
            setValue(v);
            args.onChange?.(v);
          }}
        />
      </div>
    );
  },
};

export const Default = {
  ...Template,
  args: {
    label: "Duration",
    maxDurationInHours: 8,
    hoursLeft: 8,
    value: 0,
  },
};

export const WithInitialValue = {
  ...Template,
  args: {
    label: "Duration",
    maxDurationInHours: 8,
    hoursLeft: 5.5,
    value: 2.5,
  },
};

export const OverHours = {
  ...Template,
  args: {
    label: "Duration",
    maxDurationInHours: 8,
    hoursLeft: 1,
    value: 6,
  },
};

export const CustomMax = {
  ...Template,
  args: {
    label: "Sprint Duration",
    maxDurationInHours: 12,
    hoursLeft: 12,
    value: 0,
  },
};

export const Disabled = {
  ...Template,
  args: {
    label: "Duration",
    maxDurationInHours: 8,
    hoursLeft: 5,
    value: 3,
    disabled: true,
  },
};
