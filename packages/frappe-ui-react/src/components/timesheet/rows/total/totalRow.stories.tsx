import type { Meta, StoryObj } from "@storybook/react-vite";

import { TotalRow, type TotalRowProps } from "./totalRow";

const meta: Meta<TotalRowProps> = {
  title: "Components/Timesheet/TotalRow",
  component: TotalRow,
  parameters: { docs: { source: { type: "dynamic" } } },
  argTypes: {
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

export const Default: Story = {
  args: {
    totalHours: "44:30",
    status: "approved",
    breadcrumbs: {
      items: [
        { label: "Projects", interactive: false },
        { label: "Tasks", interactive: false },
      ],
      size: "md",
      highlightAllItems: true,
      compactCrumbs: false,
    },
    totalTimeEntries: [
      "08:30",
      "08:15",
      "08:45",
      "08:30",
      "07:45",
      "02:15",
      "00:45",
    ],
    starred: true,
  },
  render: (args) => (
    <div className="w-295 p-4">
      <TotalRow {...args} />
    </div>
  ),
};
