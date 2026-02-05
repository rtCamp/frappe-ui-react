import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import Slider from "./slider";
import type { SliderProps, SliderRangeValue, SliderSingleValue } from "./types";

export default {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    min: { control: "number", description: "Minimum value of the slider" },
    max: { control: "number", description: "Maximum value of the slider" },
    step: { control: "number", description: "Step value for the slider" },
    range: { control: "boolean", description: "Enable range selection" },
    knob: { control: "boolean", description: "Show knob on the slider" },
    tooltip: { control: "boolean", description: "Show tooltip on the knob" },
    showValue: { control: "boolean", description: "Display current value" },
    size: {
      control: { type: "select", options: ["sm", "md", "lg", "xl"] },
      description: "Size of the slider",
    },
    value: { control: "object", description: "Current value of the slider" },
    disabled: { control: "boolean", description: "Disable the slider" },
    onChange: {
      action: "changed",
      description: "Callback function when the slider value changes",
    },
  },
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
} as Meta<typeof Slider>;

type Story = StoryObj<SliderProps>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    value: 70,
    range: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-50 p-4 flex flex-col gap-4">
        <Slider
          {...args}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
        <p className="text-xs text-ink-gray-5">
          Value: {value as SliderSingleValue}
        </p>
      </div>
    );
  },
};

export const Range: Story = {
  args: {
    min: 0,
    max: 100,
    value: { min: 30, max: 70 },
    range: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-50 p-4 flex flex-col gap-4">
        <Slider {...args} value={value} onChange={setValue} />
        <div className="w-full flex justify-between flex-wrap">
          <p className="text-xs text-ink-gray-5">
            Min value: {(value as SliderRangeValue)?.min}
          </p>
          <p className="text-xs text-ink-gray-5">
            Max value: {(value as SliderRangeValue)?.max}
          </p>
        </div>
      </div>
    );
  },
};

export const WithTooltip: Story = {
  args: {
    min: 0,
    max: 100,
    value: { min: 20, max: 80 },
    range: true,
    tooltip: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-50 p-4 flex flex-col gap-4">
        <Slider {...args} value={value} onChange={setValue} />
        <div className="w-full flex justify-between flex-wrap">
          <p className="text-xs text-ink-gray-5">
            Min value: {(value as SliderRangeValue)?.min}
          </p>
          <p className="text-xs text-ink-gray-5">
            Max value: {(value as SliderRangeValue)?.max}
          </p>
        </div>
      </div>
    );
  },
};

export const WithValues: Story = {
  args: {
    min: 0,
    max: 100,
    value: 70,
    tooltip: true,
    showValue: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-50 p-4 flex flex-col gap-4">
        <Slider {...args} value={value} onChange={setValue} />
        <p className="text-xs text-ink-gray-5">
          Value: {value as SliderSingleValue}
        </p>
      </div>
    );
  },
};

export const WithoutKnob: Story = {
  args: {
    min: 0,
    max: 100,
    value: 70,
    knob: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-50 p-4">
        <Slider {...args} value={value} onChange={setValue} />
        <p className="text-xs mt-2 text-ink-gray-5">
          Value: {value as SliderSingleValue}
        </p>
      </div>
    );
  },
};
