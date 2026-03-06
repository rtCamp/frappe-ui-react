import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { userEvent, expect, within, waitFor } from "storybook/test";
import { fn } from "storybook/test";

import { WeekRow, type WeekRowProps } from "./weekRow";

const meta: Meta<WeekRowProps> = {
  title: "Components/Timesheet/WeekRow/Interactions",
  component: WeekRow,
  parameters: { docs: { source: { type: "dynamic" } } },
  argTypes: {
    label: {
      control: "text",
      description: "Label for the week row.",
    },
    nesting: {
      control: "number",
      description: "Nesting level for the week row, used for indentation.",
    },
    collapsed: {
      control: "boolean",
      description: "Whether the week row is collapsed or expanded.",
    },
    thisWeek: {
      control: "boolean",
      description: "Whether the week row represents the current week.",
    },
    dates: {
      control: "object",
      description: "Array of date strings representing the days in the week.",
    },
    today: {
      control: "text",
      description:
        "The date string representing today's date, used for highlighting.",
    },
    status: {
      control: "select",
      options: [
        "not-submitted",
        "approved",
        "rejected",
        "approval-pending",
        "none",
      ],
      description: "Status of the timesheet for the week.",
    },
    totalHours: {
      control: "text",
      description: "Total hours logged for the week.",
    },
    onToggle: {
      action: "toggle",
      description:
        "Callback function when the week row is toggled between collapsed and expanded.",
    },
    onButtonClick: {
      action: "button-clicked",
      description: "Callback function when the action button is clicked.",
    },
    className: {
      control: "text",
      description: "Additional class names for the week row container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DATES = [
  "Dec 29",
  "Dec 30",
  "Dec 31",
  "Jan 1",
  "Jan 2",
  "Jan 3",
  "Jan 4",
];
const TODAY = "Jan 4";

export const Toggle: Story = {
  args: {
    label: "This Week",
    collapsed: false,
    totalHours: "40:00",
    dates: DATES,
    today: TODAY,
    thisWeek: true,
    status: "not-submitted",
    onToggle: fn(),
  },
  render: (args) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className="w-295 p-4">
        <WeekRow
          {...args}
          collapsed={collapsed}
          onToggle={() => {
            setCollapsed((prev) => !prev);
            args.onToggle?.();
          }}
        />
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const getDateCells = () =>
      canvasElement.querySelectorAll(
        '[data-testid="week-row"] > div:nth-child(n+2):nth-last-child(n+3)'
      );
    // Expanded: 7 date cells visible
    expect(getDateCells()).toHaveLength(7);
    expect(canvas.getByText("Total")).toBeInTheDocument();
    expect(canvas.queryByText("40:00")).not.toBeInTheDocument();

    const toggleButton = canvas.getByRole("button", { name: "Toggle week" });

    // Collapse
    await userEvent.click(toggleButton);
    expect(args.onToggle).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(getDateCells()).toHaveLength(0);
      expect(canvas.queryByText("Total")).not.toBeInTheDocument();
      expect(canvas.getByText("40:00")).toBeInTheDocument();
    });

    // Expand again
    await userEvent.click(toggleButton);
    expect(args.onToggle).toHaveBeenCalledTimes(2);

    await waitFor(() => {
      expect(getDateCells()).toHaveLength(7);
      expect(canvas.getByText("Total")).toBeInTheDocument();
      expect(canvas.queryByText("40:00")).not.toBeInTheDocument();
    });
  },
};

export const TodayHighlight: Story = {
  render: () => (
    <div className="w-295 p-4">
      <WeekRow
        label="This week — Jan 4 should be highlighted"
        collapsed={false}
        totalHours="40:00"
        dates={DATES}
        today={TODAY}
        thisWeek={true}
        status="not-submitted"
      />
      <WeekRow
        label="Past week — Jan 4 should NOT be highlighted"
        collapsed={false}
        totalHours="35:00"
        dates={DATES}
        today={TODAY}
        thisWeek={false}
        status="approved"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const dayFourSpans = Array.from(
      canvasElement.querySelectorAll("span")
    ).filter((span) => span.textContent?.trim() === "4");

    expect(dayFourSpans).toHaveLength(2);

    // thisWeek=true row: highlight class applied
    expect(dayFourSpans[0]).toHaveClass("bg-surface-red-5");

    // thisWeek=false row: no highlight
    expect(dayFourSpans[1]).not.toHaveClass("bg-surface-red-5");
  },
};

export const StatusBadge: Story = {
  render: () => (
    <div className="w-295 p-4">
      <WeekRow
        label="Week A"
        collapsed={false}
        totalHours="40:00"
        dates={DATES}
        today={TODAY}
        thisWeek={true}
        status="not-submitted"
      />
      <WeekRow
        label="Week B"
        collapsed={false}
        totalHours="40:00"
        dates={DATES}
        today={TODAY}
        thisWeek={true}
        status="approved"
      />
      <WeekRow
        label="Week C"
        collapsed={false}
        totalHours="40:00"
        dates={DATES}
        today={TODAY}
        thisWeek={true}
        status="rejected"
      />
      <WeekRow
        label="Week D"
        collapsed={false}
        totalHours="40:00"
        dates={DATES}
        today={TODAY}
        thisWeek={true}
        status="approval-pending"
      />
      <WeekRow
        label="Week E"
        collapsed={false}
        totalHours="40:00"
        dates={DATES}
        today={TODAY}
        thisWeek={false}
        status="none"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("Not Submitted")).toBeInTheDocument();
    expect(canvas.getByText("Approved")).toBeInTheDocument();
    expect(canvas.getByText("Rejected")).toBeInTheDocument();
    expect(canvas.getByText("Approval Pending")).toBeInTheDocument();
    expect(canvas.queryByText("None")).not.toBeInTheDocument();

    const actionButtons = canvas.getAllByRole("button", {
      name: "Submit week",
    });
    expect(
      actionButtons[0].querySelector("svg.lucide-send")
    ).toBeInTheDocument();
    expect(
      actionButtons[1].querySelector("svg.lucide-circle-check")
    ).toBeInTheDocument();
    expect(
      actionButtons[2].querySelector("svg.lucide-circle-x")
    ).toBeInTheDocument();
    expect(
      actionButtons[3].querySelector("svg.lucide-hourglass")
    ).toBeInTheDocument();
  },
};

export const ActionButtonState: Story = {
  render: () => (
    <div className="w-295 p-4 space-y-2">
      <WeekRow
        label="Not Submitted — action enabled"
        collapsed={false}
        totalHours="40:00"
        dates={DATES}
        today={TODAY}
        thisWeek={true}
        status="not-submitted"
      />
      <WeekRow
        label="None — action disabled"
        collapsed={false}
        totalHours="35:00"
        dates={DATES}
        today={TODAY}
        thisWeek={false}
        status="none"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const actionButtons = canvas.getAllByRole("button", {
      name: "Submit week",
    });

    expect(actionButtons[0]).not.toBeDisabled();
    expect(actionButtons[1]).toBeUndefined();
  },
};

export const TotalHoursVisibility: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => setCollapsed((prev) => !prev);
    return (
      <div className="w-295 p-4 space-y-2">
        <WeekRow
          label="Status: None"
          collapsed={collapsed}
          totalHours="35:00"
          dates={DATES}
          today={TODAY}
          thisWeek={false}
          status="none"
          onToggle={toggle}
        />
        <WeekRow
          label="Status: Not Submitted"
          collapsed={collapsed}
          totalHours="40:00"
          dates={DATES}
          today={TODAY}
          thisWeek={false}
          status="not-submitted"
          onToggle={toggle}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Expanded: both rows show "Total"
    const totals = canvas.getAllByText("Total");
    expect(totals).toHaveLength(2);

    const toggleButtons = canvas.getAllByRole("button", {
      name: "Toggle week",
    });
    await userEvent.click(toggleButtons[0]);

    expect(canvas.queryByText("35:00")).not.toBeInTheDocument();
    expect(canvas.getByText("40:00")).toBeInTheDocument();
    expect(canvas.queryByText("Total")).not.toBeInTheDocument();
  },
};

export const TotalHoursColors: Story = {
  render: () => (
    <div className="w-295 p-4 space-y-2">
      <WeekRow
        label="Not Submitted"
        collapsed={true}
        totalHours="10:00"
        dates={DATES}
        today={TODAY}
        thisWeek={true}
        status="not-submitted"
      />
      <WeekRow
        label="Approved"
        collapsed={true}
        totalHours="20:00"
        dates={DATES}
        today={TODAY}
        thisWeek={true}
        status="approved"
      />
      <WeekRow
        label="Rejected"
        collapsed={true}
        totalHours="30:00"
        dates={DATES}
        today={TODAY}
        thisWeek={true}
        status="rejected"
      />
      <WeekRow
        label="Approval Pending (this week → amber)"
        collapsed={true}
        totalHours="40:00"
        dates={DATES}
        today={TODAY}
        thisWeek={true}
        status="approval-pending"
      />
      <WeekRow
        label="Approval Pending (past week → red)"
        collapsed={true}
        totalHours="50:00"
        dates={DATES}
        today={TODAY}
        thisWeek={false}
        status="approval-pending"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const notSubmittedSpan = canvas.getByText("10:00");
    const approvedSpan = canvas.getByText("20:00");
    const rejectedSpan = canvas.getByText("30:00");
    const apThisWeekSpan = canvas.getByText("40:00");
    const apPastWeekSpan = canvas.getByText("50:00");

    expect(notSubmittedSpan).toHaveClass("text-ink-green-4");
    expect(approvedSpan).toHaveClass("text-ink-green-4");
    expect(rejectedSpan).toHaveClass("text-ink-red-4");
    expect(apThisWeekSpan).toHaveClass("text-ink-amber-4");
    expect(apPastWeekSpan).toHaveClass("text-ink-red-4");
  },
};

export const RejectedPastWeekButton: Story = {
  render: () => (
    <div className="w-295 p-4 space-y-2">
      <WeekRow
        label="Rejected — this week"
        collapsed={false}
        totalHours="40:00"
        dates={DATES}
        today={TODAY}
        thisWeek={true}
        status="rejected"
      />
      <WeekRow
        label="Rejected — past week"
        collapsed={false}
        totalHours="35:00"
        dates={DATES}
        today={TODAY}
        thisWeek={false}
        status="rejected"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const actionButtons = canvas.getAllByRole("button", {
      name: "Submit week",
    });

    // thisWeek=true: red button
    expect(actionButtons[0]).toHaveClass("text-ink-red-4");
    expect(actionButtons[0]).not.toHaveClass("text-ink-gray-5");

    // thisWeek=false: overridden to gray
    expect(actionButtons[1]).toHaveClass("text-ink-gray-5");
    expect(actionButtons[1]).not.toHaveClass("text-ink-red-4");
  },
};
