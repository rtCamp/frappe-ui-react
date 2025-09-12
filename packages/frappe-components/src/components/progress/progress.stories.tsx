import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Progress from "./progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  tags: ["autodocs"],
  component: Progress,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
      description: "Current progress value (0-100)",
      table: { category: "Props" },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Progress bar height/size",
      table: { category: "Props" },
    },
    label: {
      control: "text",
      description: "Optional label displayed above the bar",
      table: { category: "Props" },
    },
    hint: {
      control: false,
      description: "Custom hint node (slot-like)",
      table: { category: "Props" },
    },
    intervals: {
      control: "boolean",
      description: "Enable interval/step mode",
      table: { category: "Props" },
    },
    intervalCount: {
      control: { type: "number", min: 1, max: 20 },
      description: "Number of intervals/steps (if intervals enabled)",
      table: { category: "Props" },
    },
    className: {
      control: "text",
      description: "Custom CSS classes for the container",
      table: { category: "Props" },
    },
  },
};
export default meta;

type ProgressStory = StoryObj<typeof Progress>;

const sizes = ["sm", "md", "lg", "xl"] as const;

export const Label: ProgressStory = {
  render: (args: React.ComponentProps<typeof Progress>) => (
    <div className="w-80">
      <Progress {...args} label="Progress" />
    </div>
  ),
  args: {
    value: 50,
    size: "sm",
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 }, name: "Value" },
    size: { control: { type: "select" }, options: sizes, name: "Size" },
  },
};

export const Hint: ProgressStory = {
  render: (args: React.ComponentProps<typeof Progress>) => (
    <div className="w-80">
      <Progress
        {...args}
        label="Progress"
        hint={
          <span className="text-base font-medium text-ink-gray-4">
            {args.value}%
          </span>
        }
      />
    </div>
  ),
  args: {
    value: 50,
    size: "sm",
  },
  argTypes: Label.argTypes,
};

export const Intervals: ProgressStory = {
  render: (args: React.ComponentProps<typeof Progress>) => (
    <div className="w-80">
      <Progress {...args} label="Progress" intervals intervalCount={5} />
    </div>
  ),
  args: {
    value: 50,
    size: "sm",
  },
  argTypes: Label.argTypes,
};
