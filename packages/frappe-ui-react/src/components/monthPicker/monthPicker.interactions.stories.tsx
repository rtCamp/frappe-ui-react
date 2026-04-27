import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { userEvent, expect, within, waitFor, fn, screen } from "storybook/test";

import MonthPicker from "./monthPicker";
import type { MonthPickerProps } from "./types";

const meta: Meta<typeof MonthPicker> = {
  title: "Components/MonthPicker/Interactions",
  component: MonthPicker,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
  argTypes: {
    value: {
      control: "text",
      description:
        "Selected month value in 'Month Year' format (e.g., 'January 2026').",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the MonthPicker button.",
    },
    className: {
      control: "text",
      description: "CSS class names to apply to the button.",
    },
    placement: {
      control: "select",
      options: [
        "top-start",
        "top",
        "top-end",
        "bottom-start",
        "bottom",
        "bottom-end",
        "left-start",
        "left",
        "left-end",
        "right-start",
        "right",
        "right-end",
      ],
      description: "Popover placement relative to the target.",
    },
    onChange: {
      action: "onChange",
      description: "Callback fired when the month value changes.",
    },
  },
};

export default meta;
type Story = StoryObj<MonthPickerProps>;

export const SelectMonth: Story = {
  args: {
    placeholder: "Select month",
    onChange: fn(),
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>("");
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };
    return (
      <div className="w-80 p-2">
        <MonthPicker {...args} value={value} onChange={handleChange} />
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Initial state - should show placeholder
    const trigger = canvas.getByRole("button", { name: /select month/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent("Select month");

    // Open the picker
    await userEvent.click(trigger);

    // Wait for popover to open and months to be visible
    const janButton = await screen.findByRole("button", { name: "Jan" });
    expect(janButton).toBeInTheDocument();

    // Verify current year is displayed
    const currentYear = new Date().getFullYear();
    const yearButton = await screen.findByRole("button", {
      name: "Toggle between month and year selection",
    });
    expect(yearButton).toHaveTextContent(String(currentYear));

    // Select March
    const marchButton = await screen.findByRole("button", { name: "Mar" });
    await userEvent.click(marchButton);

    // Verify onChange was called with correct format
    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledWith(`March ${currentYear}`);
    });

    // Verify trigger displays the selected value
    await waitFor(() => {
      expect(trigger).toHaveTextContent(`March ${currentYear}`);
    });
  },
};

export const SelectYearThenMonth: Story = {
  args: {
    placeholder: "Select month",
    onChange: fn(),
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>("");
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };
    return (
      <div className="w-80 p-2">
        <MonthPicker {...args} value={value} onChange={handleChange} />
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Open the picker
    const trigger = canvas.getByRole("button", { name: /select month/i });
    await userEvent.click(trigger);

    // Wait for popover to open
    await screen.findByRole("button", { name: "Jan" });

    // Click on year to toggle to year view
    const currentYear = new Date().getFullYear();
    const yearToggleButton = await screen.findByRole("button", {
      name: "Toggle between month and year selection",
    });
    await userEvent.click(yearToggleButton);

    // Verify year view is displayed - should show year range
    const yearRangeStart = currentYear - (currentYear % 12);
    const rangeText = `${yearRangeStart} - ${yearRangeStart + 11}`;
    await waitFor(async () => {
      const rangeButton = await screen.findByRole("button", {
        name: "Toggle between month and year selection",
      });
      expect(rangeButton).toHaveTextContent(rangeText);
    });

    // Select a next year from current
    const targetYear = currentYear + 1;
    const targetYearButton = await screen.findByRole("button", {
      name: String(targetYear),
    });
    await userEvent.click(targetYearButton);

    // Verify it switches back to month view with target year displayed
    await waitFor(async () => {
      const yearBtn = await screen.findByRole("button", {
        name: "Toggle between month and year selection",
      });
      expect(yearBtn).toHaveTextContent(String(targetYear));
      expect(
        await screen.findByRole("button", { name: "Jan" })
      ).toBeInTheDocument();
    });

    // Now select June
    const juneButton = await screen.findByRole("button", { name: "Jun" });
    await userEvent.click(juneButton);

    // Verify onChange was called with June and target year
    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledWith(`June ${targetYear}`);
    });

    // Verify trigger displays the selected value
    await waitFor(() => {
      expect(trigger).toHaveTextContent(`June ${targetYear}`);
    });
  },
};

export const NavigateBetweenYears: Story = {
  args: {
    placeholder: "Select month",
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>("");
    return (
      <div className="w-80 p-2">
        <MonthPicker {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open the picker
    const trigger = canvas.getByRole("button", { name: /select month/i });
    await userEvent.click(trigger);

    // Wait for popover to open
    await screen.findByRole("button", { name: "Jan" });

    const currentYear = new Date().getFullYear();

    // Click next year button
    const nextButton = await screen.findByLabelText("Next month");
    await userEvent.click(nextButton);

    // Verify year incremented
    await waitFor(async () => {
      const yearBtn = await screen.findByRole("button", {
        name: "Toggle between month and year selection",
      });
      expect(yearBtn).toHaveTextContent(String(currentYear + 1));
    });

    // Click previous year button twice
    const prevButton = await screen.findByLabelText("Previous month");
    await userEvent.click(prevButton);
    await userEvent.click(prevButton);

    // Verify year decremented by 2 (net -1 from original)
    await waitFor(async () => {
      const yearBtn = await screen.findByRole("button", {
        name: "Toggle between month and year selection",
      });
      expect(yearBtn).toHaveTextContent(String(currentYear - 1));
    });

    // Select a month in the past year
    const septemberButton = await screen.findByRole("button", { name: "Sep" });
    await userEvent.click(septemberButton);

    // Verify the selected value shows the correct past year
    await waitFor(() => {
      expect(trigger).toHaveTextContent(`September ${currentYear - 1}`);
    });
  },
};

export const NavigateYearRanges: Story = {
  args: {
    placeholder: "Select month",
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>("");
    return (
      <div className="w-80 p-2">
        <MonthPicker {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open the picker
    const trigger = canvas.getByRole("button", { name: /select month/i });
    await userEvent.click(trigger);

    // Wait for popover to open
    await screen.findByRole("button", { name: "Jan" });

    // Toggle to year view
    const yearToggleButton = await screen.findByRole("button", {
      name: "Toggle between month and year selection",
    });
    await userEvent.click(yearToggleButton);

    const currentYear = new Date().getFullYear();
    const yearRangeStart = currentYear - (currentYear % 12);

    // Verify initial year range
    await waitFor(async () => {
      const rangeButton = await screen.findByRole("button", {
        name: "Toggle between month and year selection",
      });
      expect(rangeButton).toHaveTextContent(
        `${yearRangeStart} - ${yearRangeStart + 11}`
      );
    });

    // Navigate to next year range (12 years forward)
    const nextButton = await screen.findByLabelText("Next years");
    await userEvent.click(nextButton);

    // Verify year range advanced by 12
    await waitFor(async () => {
      const rangeButton = await screen.findByRole("button", {
        name: "Toggle between month and year selection",
      });
      expect(rangeButton).toHaveTextContent(
        `${yearRangeStart + 12} - ${yearRangeStart + 23}`
      );
    });

    // Navigate to previous year range twice (24 years back total)
    const prevButton = await screen.findByLabelText("Previous years");
    await userEvent.click(prevButton);
    await userEvent.click(prevButton);

    // Verify year range went back 12 years net from original
    await waitFor(async () => {
      const rangeButton = await screen.findByRole("button", {
        name: "Toggle between month and year selection",
      });
      expect(rangeButton).toHaveTextContent(
        `${yearRangeStart - 12} - ${yearRangeStart - 1}`
      );
    });
  },
};

export const ReopenPicker: Story = {
  args: {
    placeholder: "Select month",
  },
  render: function Render(args) {
    const currentYear = new Date().getFullYear();
    const initialValue = `March ${currentYear + 1}`;
    const [value, setValue] = useState<string>(initialValue);
    return (
      <div className="w-80 p-2">
        <MonthPicker {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const currentYear = new Date().getFullYear();
    const targetYear = currentYear + 1;
    const initialValue = `March ${targetYear}`;

    const trigger = canvas.getByRole("button", {
      name: new RegExp(initialValue, "i"),
    });

    // Open picker
    await userEvent.click(trigger);

    // Verify it opens in month view with correct year
    const yearBtn = await screen.findByRole("button", {
      name: "Toggle between month and year selection",
    });
    expect(yearBtn).toHaveTextContent(String(targetYear));
    await screen.findByRole("button", { name: "Jan" });

    // Verify March is highlighted
    const marchButton = await screen.findByRole("button", { name: "Mar" });
    expect(marchButton).toHaveClass("bg-surface-gray-7");

    // Toggle to year view
    const yearToggleButton = await screen.findByRole("button", {
      name: "Toggle between month and year selection",
    });
    await userEvent.click(yearToggleButton);

    // Verify year view is shown
    await waitFor(async () => {
      const targetYearButton = await screen.findByRole("button", {
        name: String(targetYear),
      });
      expect(targetYearButton).toHaveClass("bg-surface-gray-7");
    });

    // Close picker by clicking trigger again
    await userEvent.click(trigger);

    // Wait for popover to close
    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: "Jan" })
      ).not.toBeInTheDocument();
    });

    // Reopen picker
    await userEvent.click(trigger);

    // Verify it resets to month view
    await screen.findByRole("button", { name: "Jan" });
    const reopenedYearBtn = await screen.findByRole("button", {
      name: "Toggle between month and year selection",
    });
    expect(reopenedYearBtn).toHaveTextContent(String(targetYear));

    // Verify year range is not shown (confirming we're in month view)
    const yearRangeStart = targetYear - (targetYear % 12);
    expect(
      screen.queryByText(
        new RegExp(`${yearRangeStart} - ${yearRangeStart + 11}`)
      )
    ).not.toBeInTheDocument();
  },
};
