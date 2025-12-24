import type { Meta, StoryObj } from "@storybook/react-vite";
import TaskStatus, { type TaskStatusProps } from "./index";

export default {
  title: "Components/TaskStatus",
  component: TaskStatus,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: {
        type: "select",
        options: [
          "Open",
          "Working",
          "Pending Review",
          "Overdue",
          "Template",
          "Completed",
          "Cancelled",
        ],
      },
      description: "Status variant for the task",
    },
  },
} as Meta<typeof TaskStatus>;

const Template: StoryObj<{ status: TaskStatusProps }> = {
  render: (args) => (
    <div className="p-4 flex flex-col gap-2 w-[300px]">
      <TaskStatus {...args} />
    </div>
  ),
};

export const Open = {
  ...Template,
  args: { status: "Open" },
};
export const Working = {
  ...Template,
  args: { status: "Working" },
};
export const PendingReview = {
  ...Template,
  args: { status: "Pending Review" },
};
export const Overdue = {
  ...Template,
  args: { status: "Overdue" },
};
export const TemplateStatus = {
  ...Template,
  args: { status: "Template" },
};
export const Completed = {
  ...Template,
  args: { status: "Completed" },
};
export const Cancelled = {
  ...Template,
  args: { status: "Cancelled" },
};

export const AllVariants = {
  render: () => (
    <div className="p-4 flex flex-col gap-2 w-[300px]">
      {[
        "Open",
        "Working",
        "Pending Review",
        "Overdue",
        "Template",
        "Completed",
        "Cancelled",
      ].map((status) => (
        <TaskStatus key={status} status={status as TaskStatusProps} />
      ))}
    </div>
  ),
};
