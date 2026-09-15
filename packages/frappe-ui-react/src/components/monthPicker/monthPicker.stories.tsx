import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { SmallDown } from "../../icons";
import MonthPicker from "./monthPicker";
import type { MonthPickerProps } from "./types";

export default {
  title: "Components/MonthPicker",
  component: MonthPicker,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description:
        "Selected month value in 'Month Year' format (e.g., 'January 2026').",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the MonthPicker button.",
    },
    className: {
      control: "text",
      description: "CSS class names to apply to the button.",
    },
    inputIcon: {
      control: false,
      description:
        "Icon rendered at the trigger's right edge. Defaults to a calendar icon.",
    },
    placement: {
      control: "select",
      options: [
        "top-start",
        "top",
        "top-end",
        "bottom-start",
        "bottom",
        "bottom-end",
        "left-start",
        "left",
        "left-end",
        "right-start",
        "right",
        "right-end",
      ],
      description: "Popover placement relative to the target.",
    },
    onChange: {
      action: "onChange",
      description: "Callback fired when the month value changes.",
    },
  },
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
} as Meta<typeof MonthPicker>;

type Story = StoryObj<MonthPickerProps>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="w-80 p-2">
        <MonthPicker {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    placeholder: "Select month",
  },
};

export const FitWidth: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="p-2">
        <MonthPicker {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    placeholder: "Select month",
  },
};

export const InlineTrigger: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>("January 2026");
    return (
      <div className="p-2 text-sm text-ink-gray-5">
        <MonthPicker {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    inputIcon: SmallDown,
    className:
      "h-auto! w-auto! justify-center! gap-0.5 bg-transparent! p-0! text-sm text-ink-gray-5! hover:bg-transparent!",
  },
};
