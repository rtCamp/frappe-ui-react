import type { Meta, StoryObj } from "@storybook/react-vite";

import { TaskRow, type TaskRowProps } from "./taskRow";

const meta: Meta<TaskRowProps> = {
  title: "Components/Timesheet/TaskRow",
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

const PopOverContent: React.FC<{
  taskIndex: number | undefined;
  dayIndex: number;
}> = ({ taskIndex, dayIndex }) => (
  <div className="w-fit p-2 bg-surface-white border border-outline-gray-1 rounded whitespace-nowrap">
    <p className="text-sm">
      Task Index: {taskIndex}, Day Index: {dayIndex}
    </p>
  </div>
);

export const Default: Story = {
  args: {
    taskIndex: 0,
    label: "UI Responsiveness Testing",
    totalHours: "11:30",
    starred: true,
    status: "open",
    timeEntries: [
      { time: "01:15" },
      { time: "02:00", nonBillable: true },
      { time: "02:30" },
      { time: "01:45" },
      { time: "02:15" },
      { time: "01:00" },
      { time: "00:45" },
    ],
    popoverContent: (taskIndex, dayIndex) => (
      <PopOverContent taskIndex={taskIndex} dayIndex={dayIndex} />
    ),
  },
  render: (args) => {
    return (
      <div className="w-295 p-4">
        <TaskRow {...args} />
      </div>
    );
  },
};

const TASKS: TaskRowProps[] = [
  {
    label: "UI Responsiveness Testing",
    totalHours: "11:30",
    status: "open",
    timeEntries: [
      { time: "01:15" },
      { time: "02:00" },
      { time: "02:30" },
      { time: "01:45" },
      { time: "02:15" },
      { time: "01:00" },
      { time: "00:45" },
    ],
  },
  {
    label: "UI Responsiveness Testing",
    totalHours: "11:30",
    starred: true,
    status: "working",
    timeEntries: [
      { time: "01:15" },
      { time: "02:00", nonBillable: true },
      { time: "02:30" },
      { time: "01:45" },
      { time: "02:15" },
      { time: "01:00" },
      { time: "00:45" },
    ],
  },
  {
    label: "UI Responsiveness Testing",
    totalHours: "11:30",
    status: "pending-rev",
    timeEntries: [
      { time: "01:15" },
      { time: "02:00" },
      { time: "02:30" },
      { time: "01:45" },
      { time: "02:15" },
      { time: "01:00", disabled: true },
      { time: "00:45" },
    ],
  },
  {
    label: "UI Responsiveness Testing",
    totalHours: "11:30",
    status: "overdue",
    timeEntries: [
      { time: "01:15" },
      { time: "02:00" },
      { time: "02:30" },
      { time: "" },
      { time: "" },
      { time: "01:00" },
      { time: "00:45" },
    ],
  },
  {
    label: "UI Responsiveness Testing",
    totalHours: "11:30",
    status: "completed",
    timeEntries: [
      { time: "01:15" },
      { time: "02:00" },
      { time: "02:30" },
      { time: "01:45" },
      { time: "02:15" },
      { time: "01:00" },
      { time: "00:45" },
    ],
  },
  {
    label: "UI Responsiveness Testing",
    totalHours: "11:30",
    status: "cancelled",
    timeEntries: [
      { time: "01:15" },
      { time: "02:00" },
      { time: "02:30" },
      { time: "01:45" },
      { time: "02:15" },
      { time: "01:00" },
      { time: "00:45" },
    ],
  },
];

export const Variants: Story = {
  args: {},
  render: () => {
    return (
      <div className="w-295 p-4">
        {TASKS.map((task, index) => (
          <TaskRow
            key={index}
            taskIndex={index}
            popoverContent={(taskIndex, dayIndex) => (
              <PopOverContent taskIndex={taskIndex} dayIndex={dayIndex} />
            )}
            {...task}
          />
        ))}
      </div>
    );
  },
};
