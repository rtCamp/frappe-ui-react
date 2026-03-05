import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Star } from "lucide-react";

import { TotalRow, type TotalRowProps } from "./totalRow";

const meta: Meta<TotalRowProps> = {
  title: "Components/Timesheet/TotalRow/Interactions",
  component: TotalRow,
  parameters: { docs: { source: { type: "dynamic" } } },
  argTypes: {
    nesting: {
      control: "number",
      description: "Nesting level for the total row, used for indentation.",
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
      description: "Status of the timesheet for the total row.",
    },
    totalHours: {
      control: "text",
      description: "Total hours logged for the week.",
    },
    totalTimeEntries: {
      control: "object",
      description: "Array of total time entries for each day of the week.",
    },
    renderPrefix: {
      control: false,
      description:
        "Optional function to render a prefix icon next to the breadcrumbs.",
    },
    className: {
      control: "text",
      description: "Additional class names for the total row container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const BREADCRUMBS: TotalRowProps["breadcrumbs"] = {
  items: [
    { label: "Projects", interactive: false },
    { label: "Tasks", interactive: false },
  ],
  size: "md",
  highlightAllItems: true,
  compactCrumbs: false,
};

const TOTAL_TIME_ENTRIES = [
  "08:30",
  "08:15",
  "08:45",
  "08:30",
  "07:45",
  "02:15",
  "00:45",
];

export const TotalHoursColors: Story = {
  render: () => (
    <div className="w-295 p-4 space-y-2">
      <TotalRow
        breadcrumbs={BREADCRUMBS}
        totalHours="10:00"
        status="not-submitted"
        totalTimeEntries={TOTAL_TIME_ENTRIES}
      />
      <TotalRow
        breadcrumbs={BREADCRUMBS}
        totalHours="20:00"
        status="approved"
        totalTimeEntries={TOTAL_TIME_ENTRIES}
      />
      <TotalRow
        breadcrumbs={BREADCRUMBS}
        totalHours="30:00"
        status="rejected"
        totalTimeEntries={TOTAL_TIME_ENTRIES}
      />
      <TotalRow
        breadcrumbs={BREADCRUMBS}
        totalHours="40:00"
        status="approval-pending"
        totalTimeEntries={TOTAL_TIME_ENTRIES}
      />
      <TotalRow
        breadcrumbs={BREADCRUMBS}
        totalHours="50:00"
        status="none"
        totalTimeEntries={TOTAL_TIME_ENTRIES}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("10:00")).toHaveClass("text-ink-gray-6");
    expect(canvas.getByText("20:00")).toHaveClass("text-ink-green-4");
    expect(canvas.getByText("30:00")).toHaveClass("text-ink-red-4");
    expect(canvas.getByText("40:00")).toHaveClass("text-ink-amber-4");

    const noneSpan = canvas.getByText("50:00");
    expect(noneSpan).not.toHaveClass("text-ink-gray-6");
    expect(noneSpan).not.toHaveClass("text-ink-green-4");
    expect(noneSpan).not.toHaveClass("text-ink-red-4");
    expect(noneSpan).not.toHaveClass("text-ink-amber-4");
  },
};

export const StarAndPrefix: Story = {
  render: () => (
    <div className="w-295 p-4 space-y-2">
      <TotalRow
        breadcrumbs={BREADCRUMBS}
        totalHours="40:00"
        status="approved"
        totalTimeEntries={TOTAL_TIME_ENTRIES}
        starred={true}
      />
      <TotalRow
        breadcrumbs={BREADCRUMBS}
        totalHours="40:00"
        status="approved"
        totalTimeEntries={TOTAL_TIME_ENTRIES}
        starred={false}
      />
      <TotalRow
        breadcrumbs={BREADCRUMBS}
        totalHours="40:00"
        status="approved"
        totalTimeEntries={TOTAL_TIME_ENTRIES}
        renderPrefix={() => <Star data-testid="custom-prefix" size={16} />}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const starIcon = canvasElement.querySelector("svg.lucide-star");
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveClass("fill-current");
    expect(starIcon).toHaveClass("text-ink-amber-2");

    const starOffIcon = canvasElement.querySelector("svg.lucide-star-off");
    expect(starOffIcon).toBeInTheDocument();
    expect(starOffIcon).toHaveClass("text-ink-gray-4");

    expect(canvas.getByTestId("custom-prefix")).toBeInTheDocument();
  },
};
