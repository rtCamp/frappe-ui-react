import type { Meta, StoryObj } from "@storybook/react-vite";

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
      description: "Status of the timesheet for the task row.",
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

export const Toggle: Story = {
  args: {
    label: "UI Responsiveness Testing",
    totalHours: "11:30",
    starred: true,
    status: "open",
    nesting: 2,
    timeEntries: [
      { time: "01:15" },
      { time: "02:00", nonBillable: true },
      { time: "02:30" },
      { time: "01:45" },
      { time: "02:15" },
      { time: "" },
      { time: "00:45", disabled: true },
    ],
  },
  render: (args) => {
    return (
      <div className="w-295 p-4">
        <TaskRow {...args} />
      </div>
    );
  },
};
