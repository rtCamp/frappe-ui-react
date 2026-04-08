import type { Meta, StoryObj } from "@storybook/react-vite";
import { GanttGrid } from "./gantt-grid";

const today = new Date().toISOString().slice(0, 10);

const meta: Meta<typeof GanttGrid> = {
  title: "Components/GanttView/GanttGrid",
  component: GanttGrid,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    startDate: {
      control: "text",
      description:
        "ISO date string (YYYY-MM-DD) for any date within the first week displayed.",
    },
    weekCount: {
      control: { type: "number", min: 1, max: 200, step: 1 },
      description: "Number of weeks to display.",
    },
    rowCount: {
      control: { type: "number", min: 10, max: 5000, step: 10 },
      description: "Total number of rows (tasks / members).",
    },
    showWeekend: {
      control: "boolean",
      description:
        "Include Saturday and Sunday columns. When false, week boundary is every 5th column.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof GanttGrid>;

export const Default: Story = {
  args: {
    startDate: today,
    weekCount: 5,
    rowCount: 50,
  },
};

export const WithoutWeekend: Story = {
  args: {
    startDate: today,
    weekCount: 3,
    rowCount: 50,
    showWeekend: false,
  },
};
