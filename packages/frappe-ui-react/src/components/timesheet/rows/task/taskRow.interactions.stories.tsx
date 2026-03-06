import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, expect, within } from "storybook/test";
import { fn } from "storybook/test";

import { TaskRow, type TaskRowProps } from "./taskRow";

const meta: Meta<TaskRowProps> = {
  title: "Components/Timesheet/TaskRow/Interactions",
  component: TaskRow,
  parameters: { docs: { source: { type: "dynamic" } } },
  argTypes: {
    taskIndex: {
      control: "number",
      description:
        "Optional index of the task, used for identifying the task in callbacks.",
    },
    label: {
      control: "text",
      description: "Label for the task row.",
    },
    nesting: {
      control: "number",
      description: "Nesting level for the task row, used for indentation.",
    },
    status: {
      control: "select",
      options: [
        "open",
        "working",
        "pending-rev",
        "overdue",
        "completed",
        "cancelled",
      ],
      description: "Status of the task row.",
    },
    starred: {
      control: "boolean",
      description: "Whether the task row is starred.",
    },
    totalHours: {
      control: "text",
      description: "Total hours logged for the week.",
    },
    timeEntries: {
      control: "object",
      description:
        "Array of time entries for each day of the week for the task.",
    },
    onCellClick: {
      action: "cell-click",
      description:
        "Optional function to handle cell click events, receiving the task index and day index.",
    },
    className: {
      control: "text",
      description: "Additional class names for the task row container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const TIME_ENTRIES: TaskRowProps["timeEntries"] = [
  { time: "01:00" },
  { time: "02:00" },
  { time: "03:00" },
  { time: "" },
  { time: "04:00" },
  { time: "" },
  { time: "01:30" },
];

export const StatusVariants: Story = {
  render: () => (
    <div className="w-295 p-4 space-y-1">
      <TaskRow
        label="Open"
        timeEntries={TIME_ENTRIES}
        totalHours="11:30"
        status="open"
        nesting={0}
      />
      <TaskRow
        label="Working"
        timeEntries={TIME_ENTRIES}
        totalHours="11:30"
        status="working"
        nesting={1}
      />
      <TaskRow
        label="Pending Review"
        timeEntries={TIME_ENTRIES}
        totalHours="11:30"
        status="pending-rev"
        nesting={2}
      />
      <TaskRow
        label="Overdue"
        timeEntries={TIME_ENTRIES}
        totalHours="11:30"
        status="overdue"
        nesting={3}
      />
      <TaskRow
        label="Completed"
        timeEntries={TIME_ENTRIES}
        totalHours="11:30"
        status="completed"
        nesting={4}
      />
      <TaskRow
        label="Cancelled"
        timeEntries={TIME_ENTRIES}
        totalHours="11:30"
        status="cancelled"
        nesting={5}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const rows = canvasElement.querySelectorAll('[data-testid="task-row"]');

    // Status icons
    expect(rows[0].querySelector("svg.lucide-circle")).toBeInTheDocument();
    expect(rows[1].querySelector("svg.lucide-loader")).toBeInTheDocument();
    expect(
      rows[2].querySelector("svg.lucide-clipboard-clock")
    ).toBeInTheDocument();
    expect(rows[3].querySelector("svg.lucide-clock-12")).toBeInTheDocument();
    expect(
      rows[4].querySelector("svg.lucide-circle-check-big")
    ).toBeInTheDocument();
    expect(rows[5].querySelector("svg.lucide-circle-x")).toBeInTheDocument();

    // Icon colors
    expect(rows[0].querySelector("svg.lucide-circle")).toHaveClass(
      "text-ink-gray-3"
    );
    expect(rows[1].querySelector("svg.lucide-loader")).toHaveClass(
      "text-ink-gray-9"
    );
    expect(rows[2].querySelector("svg.lucide-clipboard-clock")).toHaveClass(
      "text-ink-gray-9"
    );
    expect(rows[3].querySelector("svg.lucide-clock-12")).toHaveClass(
      "text-ink-red-4"
    );
    expect(rows[4].querySelector("svg.lucide-circle-check-big")).toHaveClass(
      "text-ink-gray-9"
    );
    expect(rows[5].querySelector("svg.lucide-circle-x")).toHaveClass(
      "text-ink-gray-9"
    );

    // Nesting
    expect(rows[0]).toHaveStyle({ paddingLeft: "4px" });
    expect(rows[1]).toHaveStyle({ paddingLeft: "14px" });
    expect(rows[2]).toHaveStyle({ paddingLeft: "24px" });
    expect(rows[3]).toHaveStyle({ paddingLeft: "34px" });
    expect(rows[4]).toHaveStyle({ paddingLeft: "44px" });
    expect(rows[5]).toHaveStyle({ paddingLeft: "54px" });
  },
};

export const CellInteractions: Story = {
  args: {
    taskIndex: 3,
    label: "Fix Login Bug",
    totalHours: "07:30",
    status: "open",
    timeEntries: [
      { time: "01:00" },
      { time: "" },
      { time: "02:00", nonBillable: true },
      { time: "", disabled: true },
      { time: "03:00" },
      { time: "" },
      { time: "01:30" },
    ],
    onCellClick: fn(),
  },
  render: (args) => (
    <div className="w-295 p-4">
      <TaskRow {...args} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const cellButtons = canvas.getAllByRole("button");

    expect(cellButtons[0]).toHaveTextContent("01:00");
    expect(cellButtons[1]).toHaveTextContent("-");
    expect(
      cellButtons[2].querySelector(".bg-surface-amber-3")
    ).toBeInTheDocument();
    expect(cellButtons[3]).toBeDisabled();

    await userEvent.click(cellButtons[0]);
    expect(args.onCellClick).toHaveBeenCalledWith(3, 0);

    await userEvent.click(cellButtons[4]);
    expect(args.onCellClick).toHaveBeenCalledWith(3, 4);

    await userEvent.click(cellButtons[3]);
    expect(args.onCellClick).toHaveBeenCalledTimes(2);
  },
};

export const LabelAndStar: Story = {
  render: () => (
    <div className="w-295 p-4 space-y-1">
      <TaskRow
        label="Starred Task"
        timeEntries={TIME_ENTRIES}
        totalHours="11:30"
        status="open"
        starred={true}
      />
      <TaskRow
        label="Unstarred Task"
        timeEntries={TIME_ENTRIES}
        totalHours="11:30"
        status="open"
        starred={false}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rows = canvasElement.querySelectorAll('[data-testid="task-row"]');

    expect(canvas.getByText("Starred Task")).toBeInTheDocument();
    expect(canvas.getByText("Unstarred Task")).toBeInTheDocument();

    expect(rows[0].querySelector("svg.lucide-star")).toBeInTheDocument();
    expect(rows[1].querySelector("svg.lucide-star")).not.toBeInTheDocument();
  },
};
