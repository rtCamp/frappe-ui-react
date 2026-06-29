/**
 * External dependencies.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";

/**
 * Internal dependencies.
 */
import { DateRangePicker } from "./index";
import type { DateRangePickerProps } from "./types";

const meta: Meta<typeof DateRangePicker> = {
  title: "Components/DatePicker/Interactions/DateRange",
  component: DateRangePicker,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<DateRangePickerProps>;

function ControlledDateRangePickerStory(args: DateRangePickerProps) {
  const [value, setValue] = useState<string[]>(
    Array.isArray(args.value) ? args.value : ["", ""]
  );

  const handleChange = (nextValue: string[]) => {
    setValue(nextValue);
    args.onChange?.(nextValue);
  };

  return (
    <div className="w-[320px] p-2">
      <DateRangePicker {...args} value={value} onChange={handleChange} />
    </div>
  );
}

export const KeyboardNavigation: Story = {
  args: {
    label: "Date range",
    placeholder: "Select date range",
    onChange: fn(),
  },
  render: (args) => <ControlledDateRangePickerStory {...args} />,
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
    const firstFocusedDate = document.activeElement as HTMLElement;
    expect(firstFocusedDate).toHaveAttribute("role", "gridcell");

    await userEvent.keyboard("{Enter}");

    let secondFocusedDate: HTMLElement | null = null;
    for (let i = 0; i < 6; i++) {
      await userEvent.tab();
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement?.getAttribute("role") === "gridcell") {
        secondFocusedDate = activeElement;
        break;
      }
    }

    expect(secondFocusedDate).not.toBeNull();
    expect(secondFocusedDate).toHaveAttribute("role", "gridcell");

    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toContain(" to ");
      expect(args.onChange).toHaveBeenCalled();
    });
  },
};

export const QuickActions: Story = {
  args: {
    label: "Date range",
    placeholder: "Select date range",
    onChange: fn(),
  },
  render: (args) => <ControlledDateRangePickerStory {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
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

    await userEvent.click(await screen.findByRole("button", { name: "Today" }));

    await waitFor(() => {
      expect(input).toHaveValue(`${formattedToday} to ${formattedToday}`);
      expect(args.onChange).toHaveBeenLastCalledWith([
        formattedToday,
        formattedToday,
      ]);
    });

    await userEvent.click(input);
    const toggleViewButton = await screen.findByRole("button", {
      name: "Toggle calendar view",
    });
    expect(toggleViewButton).toHaveTextContent(monthLabel);

    const selectedToday = screen
      .getAllByRole("gridcell")
      .find((gridCell) => gridCell.getAttribute("aria-pressed") === "true");
    expect(selectedToday).toHaveTextContent(String(today.getDate()));

    await userEvent.click(await screen.findByRole("button", { name: "Clear" }));

    await waitFor(() => {
      expect(input).toHaveValue("");
      expect(args.onChange).toHaveBeenLastCalledWith(["", ""]);
    });

    await userEvent.click(input);
    const resetToggleButton = await screen.findByRole("button", {
      name: "Toggle calendar view",
    });
    expect(resetToggleButton).toHaveTextContent(monthLabel);
  },
};
