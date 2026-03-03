import type { Meta, StoryObj } from "@storybook/react-vite";

import { TimeOffRow, type TimeOffRowProps } from "./timeOffRow";

const meta: Meta<TimeOffRowProps> = {
  title: "Components/Timesheet/TimeOffRow",
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
    prefixIcon: {
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

export const Default: Story = {
  args: {
    label: "Time-off",
    totalHours: "04:00",
    nesting: 2,
    timeOffEntries: ["", "04:00", "", "", "", "", ""],
  },
  render: (args) => (
    <div className="w-295 p-4">
      <TimeOffRow {...args} />
    </div>
  ),
};
