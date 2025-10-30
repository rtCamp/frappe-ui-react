import { Meta, StoryObj } from "@storybook/react-vite";
import CircularProgressBar from "./circularProgressBar";
import type { CircularProgressBarProps } from "./types";

export default {
  title: "Components/CircularProgressBar",
  component: CircularProgressBar,
  argTypes: {
    step: {
      control: { type: "number", min: 0 },
      description: "The current step or progress value.",
    },
    totalSteps: {
      control: { type: "number", min: 1 },
      description: "The total number of steps to completion.",
    },
    showPercentage: {
      control: "boolean",
      description: "If true, shows percentage instead of the step number.",
    },
    theme: {
      control: {
        type: "select",
        options: ["black", "red", "green", "blue", "orange"],
      },
      description: "Predefined color theme for the progress bar.",
    },
    size: {
      control: { type: "select", options: ["xs", "sm", "md", "lg", "xl"] },
      description: "The size of the progress bar.",
    },
    themeComplete: {
      control: "color",
      description: "Color of the progress bar when completion is reached.",
    },
    variant: {
      control: { type: "select", options: ["solid", "outline"] },
      description: "Visual variant of the progress bar.",
    },
  },
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  tags: ["autodocs"],
} as Meta<typeof CircularProgressBar>;

const Template: StoryObj<CircularProgressBarProps> = {
  render: (args) => (
    <div className="p-4 flex justify-center items-center">
      <CircularProgressBar {...args} />
    </div>
  ),
};

export const Default: StoryObj<CircularProgressBarProps> = {
  ...Template,
  args: {
    step: 1,
    totalSteps: 4,
  },
};

export const LargeSize: StoryObj<CircularProgressBarProps> = {
  ...Template,
  args: {
    step: 1,
    totalSteps: 4,
    size: "lg",
    showPercentage: true,
  },
};

export const Theme: StoryObj<CircularProgressBarProps> = {
  ...Template,
  args: {
    step: 3,
    totalSteps: 4,
    theme: "orange",
  },
};

export const CustomTheme: StoryObj<CircularProgressBarProps> = {
  ...Template,
  args: {
    step: 2,
    totalSteps: 6,
    theme: {
      primary: "#2376f5",
      secondary: "#ddd5d5",
    },
  },
};

export const CompletedSolid: StoryObj<CircularProgressBarProps> = {
  ...Template,
  args: {
    step: 9,
    totalSteps: 9,
    variant: "solid",
    themeComplete: "lightgreen",
  },
};

export const CompletedOutline: StoryObj<CircularProgressBarProps> = {
  ...Template,
  args: {
    step: 9,
    totalSteps: 9,
    variant: "outline",
    themeComplete: "lightgreen",
  },
};
