import { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { DatePicker, DateTimePicker, DateRangePicker } from "./index";

const meta: Meta = {
  title: "Components/DatePicker",
  tags: ["autodocs"],
  component: DatePicker,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
    docs: { autodocs: true },
  },
};
export default meta;

type DatePickerStory = StoryObj<typeof DatePicker>;
type DateTimePickerStory = StoryObj<typeof DateTimePicker>;
type DateRangePickerStory = StoryObj<typeof DateRangePicker>;

const commonArgs = {
  label: "Label",
  placeholder: "Placeholder",
};

export const Date: DatePickerStory = {
  args: {
    ...commonArgs,
    value: "",
  },
  render: (args) => {
    const [dateValue, setDateValue] = useState("");
    return (
      <DatePicker
        {...args}
        value={dateValue}
        onChange={(val) =>
          setDateValue(Array.isArray(val) ? val[0] || "" : val)
        }
      />
    );
  },
  argTypes: {
    value: {
      control: false,
      description: "The selected date value (controlled).",
    },
    onChange: {
      action: "onChange",
      description: "Callback when date changes. Receives a string or string[].",
    },
    label: { control: "text", description: "Label for the input field." },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input field.",
    },
  },
};

export const DateTime: DateTimePickerStory = {
  args: {
    ...commonArgs,
    value: "",
  },
  render: (args) => {
    const [dateTimeValue, setDateTimeValue] = useState("");
    return (
      <DateTimePicker
        {...args}
        value={dateTimeValue}
        onChange={(val) =>
          setDateTimeValue(Array.isArray(val) ? val[0] || "" : val)
        }
      />
    );
  },
  argTypes: {
    value: {
      control: false,
      description: "The selected date/time value (controlled).",
    },
    onChange: {
      action: "onChange",
      description:
        "Callback when date/time changes. Receives a string or string[].",
    },
    label: { control: "text", description: "Label for the input field." },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input field.",
    },
  },
};

export const DateRange: DateRangePickerStory = {
  args: {
    ...commonArgs,
    value: ["", ""],
  },
  render: (args) => {
    const [dateRangeValue, setDateRangeValue] = useState(["", ""]);
    return (
      <DateRangePicker
        {...args}
        value={dateRangeValue}
        onChange={(val) =>
          setDateRangeValue(Array.isArray(val) ? val : [val, ""])
        }
      />
    );
  },
  argTypes: {
    value: {
      control: false,
      description:
        "The selected date range value as [start, end] (controlled).",
    },
    onChange: {
      action: "onChange",
      description:
        "Callback when date range changes. Receives a string or string[].",
    },
    label: { control: "text", description: "Label for the input field." },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input field.",
    },
  },
};
