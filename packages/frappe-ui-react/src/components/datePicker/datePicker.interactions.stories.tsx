/**
 * External dependencies.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";

/**
 * Internal dependencies.
 */
import { DatePicker } from "./index";
import type { DatePickerProps } from "./types";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker/Interactions/Date",
  component: DatePicker,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<DatePickerProps>;

function ControlledDatePickerStory(args: DatePickerProps) {
  const [value, setValue] = useState(
    typeof args.value === "string" ? args.value : ""
  );

  const handleChange = (nextValue: string | string[]) => {
    const updatedValue = Array.isArray(nextValue)
      ? nextValue[0] || ""
      : nextValue;
    setValue(updatedValue);
    args.onChange?.(updatedValue);
  };

  return (
    <div className="w-[320px] p-2">
      <DatePicker {...args} value={value} onChange={handleChange} />
    </div>
  );
}

export const KeyboardNavigation: Story = {
  args: {
    label: "Date",
    placeholder: "Select date",
    clearable: false,
    onChange: fn(),
  },
  render: (args) => <ControlledDatePickerStory {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    input.focus();
    await userEvent.keyboard("{Enter}");

    const prevButton = await screen.findByRole("button", {
      name: "Previous month",
    });
    const todayButton = await screen.findByRole("button", { name: "Today" });
    const nextButton = await screen.findByRole("button", {
      name: "Next month",
    });

    prevButton.focus();
    expect(prevButton).toHaveFocus();

    await userEvent.tab();
    expect(todayButton).toHaveFocus();

    await userEvent.tab();
    expect(nextButton).toHaveFocus();

    await userEvent.tab();
    const focusedDate = document.activeElement as HTMLElement;
    expect(focusedDate).toHaveAttribute("role", "gridcell");

    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(input).not.toHaveValue("");
      expect(args.onChange).toHaveBeenCalled();
    });
  },
};

export const QuickActions: Story = {
  args: {
    label: "Date",
    placeholder: "Select date",
    onChange: fn(),
  },
  render: (args) => <ControlledDatePickerStory {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    const today = new Date();
    const tomorrow = new Date(today);
    const formattedToday = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedTomorrow = `${tomorrow.getFullYear()}-${String(
      tomorrow.getMonth() + 1
    ).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;
    const monthLabel = `${today.toLocaleString("en-US", {
      month: "short",
    })} ${today.getFullYear()}`;

    await userEvent.click(input);
    await userEvent.click(
      await screen.findByRole("button", { name: "Previous month" })
    );

    const previousMonthDate = screen
      .getAllByRole("gridcell")
      .find((gridCell) => gridCell.className.includes("text-ink-gray-8"));
    expect(previousMonthDate).toBeDefined();
    await userEvent.click(previousMonthDate as HTMLElement);

    await userEvent.click(input);
    await userEvent.click(await screen.findByRole("button", { name: "Today" }));

    await waitFor(() => {
      expect(input).toHaveValue(formattedToday);
      expect(args.onChange).toHaveBeenLastCalledWith(formattedToday);
    });

    await userEvent.click(input);
    const toggleViewButton = await screen.findByRole("button", {
      name: "Toggle calendar view",
    });
    expect(toggleViewButton).toHaveTextContent(monthLabel);

    const selectedToday = screen
      .getAllByRole("gridcell")
      .find((gridCell) => gridCell.getAttribute("aria-selected") === "true");
    expect(selectedToday).toHaveTextContent(String(today.getDate()));

    await userEvent.click(
      await screen.findByRole("button", { name: "Tomorrow" })
    );

    await waitFor(() => {
      expect(input).toHaveValue(formattedTomorrow);
      expect(args.onChange).toHaveBeenLastCalledWith(formattedTomorrow);
    });

    await userEvent.click(input);
    await userEvent.click(await screen.findByRole("button", { name: "Clear" }));

    await waitFor(() => {
      expect(input).toHaveValue("");
      expect(args.onChange).toHaveBeenLastCalledWith("");
    });

    await userEvent.click(input);
    const resetToggleButton = await screen.findByRole("button", {
      name: "Toggle calendar view",
    });
    expect(resetToggleButton).toHaveTextContent(monthLabel);
  },
};
