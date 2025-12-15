import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import TimePicker from "./timePicker";

export default {
  title: "Components/TimePicker",
  component: TimePicker,
  argTypes: {
    value: {
      control: "text",
      description: "The time value (HH:MM format)",
    },
    interval: {
      control: "number",
      description: "Time interval in minutes for generated options",
    },
    variant: {
      control: {
        type: "select",
        options: ["outline", "subtle"],
      },
      description: "Visual variant of the input",
    },
    allowCustom: {
      control: "boolean",
      description: "Allow custom time input",
    },
    autoClose: {
      control: "boolean",
      description: "Auto close on selection",
    },
    use12Hour: {
      control: "boolean",
      description: "Use 12-hour format",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
    placement: {
      control: "select",
      options: [
        "bottom-start",
        "bottom-end",
        "top-start",
        "top-end",
        "right-start",
        "right-end",
        "left-start",
        "left-end",
      ],
      description: "Popover placement",
    },
    scrollMode: {
      control: {
        type: "select",
        options: ["center", "start", "nearest"],
      },
      description: "Scroll behavior when opening",
    },
    minTime: {
      control: "text",
      description: "Minimum time (HH:MM)",
    },
    maxTime: {
      control: "text",
      description: "Maximum time (HH:MM)",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    prefix: {
      control: false,
      description: "Prefix element",
    },
    suffix: {
      control: false,
      description: "Suffix element",
    },
  },
  parameters: {
    docs: {
      source: {
        type: "dynamic",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
} as Meta<typeof TimePicker>;

type Story = StoryObj<typeof TimePicker>;

export const Basic: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div className="p-2 space-y-2">
        <TimePicker {...args} value={value} onChange={setValue} />
        <div className="text-xs text-ink-gray-6">Value: {value || "—"}</div>
      </div>
    );
  },
  args: {
    placeholder: "Select time",
    interval: 15,
    allowCustom: true,
    autoClose: true,
    use12Hour: true,
    variant: "subtle",
    placement: "bottom-start",
    scrollMode: "center",
  },
};

export const TwentyFourHourFormat: Story = {
  render: (args) => {
    const [value, setValue] = useState("13:30");

    return (
      <div className="p-2 space-y-2">
        <TimePicker {...args} value={value} onChange={setValue} />
        <div className="text-xs text-ink-gray-6">Value: {value}</div>
      </div>
    );
  },
  name: "24 Hour Format",
  args: {
    use12Hour: false,
    interval: 15,
    allowCustom: true,
    autoClose: true,
    variant: "subtle",
    placement: "bottom-start",
    scrollMode: "center",
  },
};

export const CustomOptions: Story = {
  render: (args) => {
    const [value, setValue] = useState("09:00");

    const customOptions = [
      { value: "08:00" },
      { value: "09:00" },
      { value: "09:30" },
      { value: "10:00" },
      { value: "11:15" },
      { value: "13:45" },
    ];

    return (
      <div className="p-2 space-y-2">
        <TimePicker
          {...args}
          value={value}
          onChange={setValue}
          options={customOptions}
        />
        <div className="text-xs text-ink-gray-6">Value: {value}</div>
      </div>
    );
  },
  name: "Custom Options (no interval generation)",
  args: {
    allowCustom: false,
    autoClose: true,
    use12Hour: true,
    variant: "subtle",
    placement: "bottom-start",
    scrollMode: "center",
  },
};

export const MinMaxRange: Story = {
  render: (args) => {
    const [value, setValue] = useState("08:00");

    return (
      <div className="p-2 space-y-2">
        <TimePicker {...args} value={value} onChange={setValue} />
        <div className="text-xs text-ink-gray-6">Value: {value}</div>
      </div>
    );
  },
  args: {
    minTime: "08:00",
    maxTime: "12:00",
    interval: 15,
    allowCustom: true,
    autoClose: true,
    use12Hour: true,
    variant: "subtle",
    placement: "bottom-start",
    scrollMode: "center",
  },
};
