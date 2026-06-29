/**
 * External dependencies.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";

/**
 * Internal dependencies.
 */
import { DateTimePicker } from "./index";
import type { DateTimePickerProps } from "./types";

const meta: Meta<typeof DateTimePicker> = {
  title: "Components/DatePicker/Interactions/DateTime",
  component: DateTimePicker,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<DateTimePickerProps>;

function ControlledDateTimePickerStory(args: DateTimePickerProps) {
  const [value, setValue] = useState(args.value || "");

  const handleChange = (nextValue: string) => {
    setValue(nextValue);
    args.onChange?.(nextValue);
  };

  return (
    <div className="w-[320px] p-2">
      <DateTimePicker {...args} value={value} onChange={handleChange} />
    </div>
  );
}

export const KeyboardNavigation: Story = {
  args: {
    label: "Date & time",
    placeholder: "Select date and time",
    clearable: false,
    onChange: fn(),
  },
  render: (args) => <ControlledDateTimePickerStory {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    input.focus();
    await userEvent.keyboard("{Enter}");

    const prevButton = await screen.findByRole("button", {
      name: "Previous month",
    });
    const nowButton = await screen.findByRole("button", { name: "Now" });
    const nextButton = await screen.findByRole("button", {
      name: "Next month",
    });

    prevButton.focus();
    expect(prevButton).toHaveFocus();

    await userEvent.tab();
    expect(nowButton).toHaveFocus();

    await userEvent.tab();
    expect(nextButton).toHaveFocus();

    await userEvent.tab();
    const focusedDate = document.activeElement as HTMLElement;
    expect(focusedDate).toHaveAttribute("role", "gridcell");

    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect((input as HTMLInputElement).value).not.toBe("");
      expect(args.onChange).toHaveBeenCalled();
    });
  },
};

export const QuickActions: Story = {
  args: {
    label: "Date & time",
    placeholder: "Select date and time",
    onChange: fn(),
  },
  render: (args) => <ControlledDateTimePickerStory {...args} />,
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
    await userEvent.click(await screen.findByRole("button", { name: "Now" }));

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toContain(formattedToday);
      expect(args.onChange).toHaveBeenCalled();
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
      expect((input as HTMLInputElement).value).toContain(formattedTomorrow);
    });

    await userEvent.click(await screen.findByRole("button", { name: "Clear" }));

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe("");
      expect(args.onChange).toHaveBeenLastCalledWith("");
    });

    await userEvent.click(input);
    const resetToggleButton = await screen.findByRole("button", {
      name: "Toggle calendar view",
    });
    expect(resetToggleButton).toHaveTextContent(monthLabel);
  },
};
