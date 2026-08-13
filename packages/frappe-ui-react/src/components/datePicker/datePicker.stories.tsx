/**
 * External dependencies.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

/**
 * Internal dependencies.
 */
import { DatePicker, DateTimePicker, DateRangePicker } from "./index";

const meta: Meta = {
  title: "Components/DatePicker",
  tags: ["autodocs"],
  component: DatePicker,
  parameters: {
    layout: "centered",
    docs: {
      source: { type: "dynamic" },
      autodocs: true,
    },
  },
};
export default meta;

type DatePickerStory = StoryObj<typeof DatePicker>;
type DateTimePickerStory = StoryObj<typeof DateTimePicker>;
type DateRangePickerStory = StoryObj<typeof DateRangePicker>;

const commonArgs = {
  label: "Label",
  placeholder: "Placeholder",
  disabled: false,
};

export const Date: DatePickerStory = {
  args: {
    ...commonArgs,
    value: "",
  },
  render: (args) => {
    const [dateValue, setDateValue] = useState("");
    return (
      <div className="w-[300px]">
        <DatePicker
          {...args}
          value={dateValue}
          onChange={(val) => setDateValue(Array.isArray(val) ? val[0] || "" : val)}
        />
      </div>
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

const DATE_PRESETS: { label: string; value: string }[] = [
  { label: "New Year", value: "2024-01-01" },
  { label: "Christmas", value: "2024-12-25" },
];

export const DateWithFooter: DatePickerStory = {
  args: {
    ...commonArgs,
    value: "",
  },
  render: (args) => {
    const [dateValue, setDateValue] = useState("");
    return (
      <div className="w-[300px]">
        <DatePicker
          {...args}
          value={dateValue}
          onChange={(val) => setDateValue(Array.isArray(val) ? val[0] || "" : val)}
          footer={(props, { setValue, clear, close }) => (
            <div {...props} className="flex flex-wrap items-center gap-1">
              {DATE_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  className="rounded px-2 py-1 text-sm text-ink-gray-7 hover:bg-surface-gray-2"
                  onClick={() => {
                    setValue(preset.value);
                    close();
                  }}
                >
                  {preset.label}
                </button>
              ))}
              <button
                type="button"
                className="rounded px-2 py-1 text-sm text-ink-gray-5 hover:bg-surface-gray-2"
                onClick={clear}
              >
                Reset
              </button>
            </div>
          )}
        />
      </div>
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
    footer: {
      control: false,
      description:
        "base-ui useRender slot for the popup footer. Accepts a ReactElement or a render function (props, state) where state is { value, setValue, clear, close }. Replaces the default Today / Tomorrow / Clear actions.",
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
      <div className="w-[300px]">
        <DateTimePicker
          {...args}
          value={dateTimeValue}
          onChange={(val) => setDateTimeValue(Array.isArray(val) ? val[0] || "" : val)}
        />
      </div>
    );
  },
  argTypes: {
    value: {
      control: false,
      description: "The selected date/time value (controlled).",
    },
    onChange: {
      action: "onChange",
      description: "Callback when date/time changes. Receives a string or string[].",
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
      <div className="w-[300px]">
        <DateRangePicker
          {...args}
          value={dateRangeValue}
          onChange={(val) => setDateRangeValue(Array.isArray(val) ? val : [val, ""])}
        />
      </div>
    );
  },
  argTypes: {
    value: {
      control: false,
      description: "The selected date range value as [start, end] (controlled).",
    },
    onChange: {
      action: "onChange",
      description: "Callback when date range changes. Receives a string or string[].",
    },
    label: { control: "text", description: "Label for the input field." },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input field.",
    },
  },
};

const DATE_RANGE_PRESETS: { label: string; range: [string, string] }[] = [
  { label: "First Week", range: ["2024-01-01", "2024-01-07"] },
  { label: "First Month", range: ["2024-01-01", "2024-01-31"] },
];

export const DateRangeWithFooter: DateRangePickerStory = {
  args: {
    ...commonArgs,
    value: ["", ""],
  },
  render: (args) => {
    const [dateRangeValue, setDateRangeValue] = useState<string[]>(["", ""]);
    return (
      <div className="w-[300px]">
        <DateRangePicker
          {...args}
          value={dateRangeValue}
          onChange={(val) => setDateRangeValue(Array.isArray(val) ? val : [val, ""])}
          footer={({ setRange, clear, close }) => (
            <div className="flex flex-wrap items-center gap-1">
              {DATE_RANGE_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  className="rounded px-2 py-1 text-sm text-ink-gray-7 hover:bg-surface-gray-2"
                  onClick={() => {
                    setRange(preset.range[0], preset.range[1]);
                    close();
                  }}
                >
                  {preset.label}
                </button>
              ))}
              <button
                type="button"
                className="rounded px-2 py-1 text-sm text-ink-gray-5 hover:bg-surface-gray-2"
                onClick={clear}
              >
                Reset
              </button>
            </div>
          )}
        />
      </div>
    );
  },
  argTypes: {
    value: {
      control: false,
      description: "The selected date range value as [start, end] (controlled).",
    },
    onChange: {
      action: "onChange",
      description: "Callback when date range changes. Receives a string or string[].",
    },
    footer: {
      control: false,
      description:
        "Render-prop slot for the popup footer. Receives { from, to, setRange, clear, close } so callers can add presets or custom actions.",
    },
    label: { control: "text", description: "Label for the input field." },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input field.",
    },
  },
};
