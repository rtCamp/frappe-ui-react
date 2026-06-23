import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import DurationInput from "./durationInput";

const meta: Meta<typeof DurationInput> = {
  title: "Components/DurationInput/Interactions",
  component: DurationInput,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
  argTypes: {
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
    value: {
      control: "text",
      description: "Current duration value in HH:MM format",
    },
    hoursLeft: {
      control: "text",
      description: "Remaining time used to calculate left or over state",
    },
    maxDuration: {
      control: "text",
      description: "Maximum allowed duration in HH:MM format",
    },
    disabled: {
      control: "boolean",
      description: "Disables the slider and input",
    },
    loading: {
      control: "boolean",
      description: "Shows the loading spinner before the input",
    },
    error: {
      control: "boolean",
      description: "Applies error styling",
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the value changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DurationInput>;

function ControlledDurationInput(args: ComponentProps<typeof DurationInput>) {
  const [value, setValue] = useState(args.value ?? "00:00");

  const handleChange = (nextValue: string) => {
    setValue(nextValue);
    args.onChange?.(nextValue);
  };

  return <DurationInput {...args} value={value} onChange={handleChange} />;
}

export const Input: Story = {
  args: {
    label: "Duration",
    value: "00:00",
    hoursLeft: "08:00",
    maxDuration: "08:00",
    onChange: fn(),
  },
  render: (args) => (
    <div className="w-48">
      <ControlledDurationInput {...args} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, "1");
    await userEvent.tab();

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledWith("01:00");
      expect(input).toHaveValue("01:00");
    });

    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, "7");
    await userEvent.keyboard("{Escape}");

    await waitFor(() => {
      expect(input).toHaveValue("01:00");
    });

    expect(args.onChange).toHaveBeenCalledTimes(1);
  },
};

export const Slider: Story = {
  args: {
    label: "Duration",
    value: "03:30",
    hoursLeft: "04:00",
    maxDuration: "08:00",
    onChange: fn(),
  },
  render: (args) => (
    <div className="w-48">
      <ControlledDurationInput {...args} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole("slider", { name: "Duration" });

    await userEvent.click(slider);
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");

    await waitFor(() => {
      expect(args.onChange).toHaveBeenLastCalledWith("04:30");
      expect(canvas.getByRole("textbox")).toHaveValue("04:30");
      expect(canvas.getByText("0.5h over")).toHaveClass("text-ink-red-4");
    });
  },
};
