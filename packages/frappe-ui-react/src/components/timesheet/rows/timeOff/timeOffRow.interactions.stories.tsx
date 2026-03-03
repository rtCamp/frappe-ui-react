import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Star } from "lucide-react";

import { TimeOffRow, type TimeOffRowProps } from "./timeOffRow";

const meta: Meta<TimeOffRowProps> = {
  title: "Components/Timesheet/TimeOffRow/Interactions",
  component: TimeOffRow,
  parameters: { docs: { source: { type: "dynamic" } } },
  argTypes: {
    label: {
      control: "text",
      description: "Label for the time-off row.",
    },
    nesting: {
      control: "number",
      description: "Nesting level for the time-off row, used for indentation.",
    },
    totalHours: {
      control: "text",
      description: "Total time-off hours logged for the week.",
    },
    timeOffEntries: {
      control: "object",
      description: "Array of time-off entries for each day of the week.",
    },
    renderPrefix: {
      control: false,
      description: "Optional icon to display next to the label.",
    },
    className: {
      control: "text",
      description: "Additional class names for the time-off row container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ENTRIES = ["", "", "08:00", "", "08:00", "", ""];
const TOTAL = "16:00";

export const DefaultState: Story = {
  render: () => (
    <div className="w-295 p-4">
      <TimeOffRow timeOffEntries={ENTRIES} totalHours={TOTAL} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getAllByText("08:00")).toHaveLength(2);
    const dashSpans = canvas.getAllByText("-");
    expect(dashSpans).toHaveLength(5);
    dashSpans.forEach((span) => expect(span).toHaveClass("text-ink-gray-4"));

    const totalSpan = canvas.getByText(TOTAL);
    expect(totalSpan).toBeInTheDocument();
    expect(totalSpan.parentElement).toHaveClass("text-ink-amber-4");
  },
};

export const PrefixIcon: Story = {
  render: () => (
    <div className="w-295 p-4 space-y-2">
      <TimeOffRow timeOffEntries={ENTRIES} totalHours={TOTAL} />
      <TimeOffRow
        timeOffEntries={ENTRIES}
        totalHours={TOTAL}
        renderPrefix={() => <Star data-testid="custom-prefix" size={16} />}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rows = canvasElement.querySelectorAll('[data-testid="time-off-row"]');

    expect(
      rows[0].querySelector("svg.lucide-calendar-x-2")
    ).toBeInTheDocument();
    expect(canvas.getByTestId("custom-prefix")).toBeInTheDocument();
    expect(
      rows[1].querySelector("svg.lucide-calendar-x-2")
    ).not.toBeInTheDocument();
  },
};

export const Nesting: Story = {
  render: () => (
    <div className="w-295 p-4 space-y-1">
      <TimeOffRow timeOffEntries={ENTRIES} totalHours={TOTAL} nesting={0} />
      <TimeOffRow timeOffEntries={ENTRIES} totalHours={TOTAL} nesting={1} />
      <TimeOffRow timeOffEntries={ENTRIES} totalHours={TOTAL} nesting={3} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const rows = canvasElement.querySelectorAll('[data-testid="time-off-row"]');

    expect(rows[0]).toHaveStyle({ paddingLeft: "4px" });
    expect(rows[1]).toHaveStyle({ paddingLeft: "14px" });
    expect(rows[2]).toHaveStyle({ paddingLeft: "34px" });
  },
};
