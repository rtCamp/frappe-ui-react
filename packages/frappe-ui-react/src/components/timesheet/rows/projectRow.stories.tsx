import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";

import { ProjectRow, type ProjectRowProps } from "./projectRow";

const meta: Meta<ProjectRowProps> = {
  title: "Components/Timesheet/ProjectRow",
  component: ProjectRow,
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
    status: {
      control: "select",
      options: [
        "Not Submitted",
        "Approved",
        "Rejected",
        "Approval Pending",
        "None",
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
    timeEntries: {
      control: "object",
      description: "Array of time entries for each day of the week.",
    },
    prefixIcon: {
      control: false,
      description: "Optional icon to display next to the label.",
    },
    suffixIcon: {
      control: false,
      description: "Optional icon to display next to the label.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Atlas UI Stabilization",
    collapsed: false,
    totalHours: "42:00",
    status: "Approved",
    nesting: 2,
    timeEntries: [
      "05:30",
      "06:45",
      "07:15",
      "06:00",
      "04:15",
      "04:15",
      "03:45",
    ],
  },
  render: (args) => {
    const [_args, setUseArgs] = useArgs();
    return (
      <div className="w-295 p-4">
        <ProjectRow
          {...args}
          onToggle={() => setUseArgs({ collapsed: !_args.collapsed })}
        />
      </div>
    );
  },
};

export const Variants: Story = {
  args: {
    label: "Atlas UI Stabilization",
    collapsed: false,
    totalHours: "42:00",
    status: "Approved",
    nesting: 2,
    timeEntries: [
      "05:30",
      "06:45",
      "07:15",
      "06:00",
      "04:15",
      "04:15",
      "03:45",
    ],
  },
  render: (args) => {
    const [collapseds, setCollapseds] = useState({
      row_1: false,
      row_2: false,
    });

    return (
      <div className="w-295 p-4">
        <div className="w-full text-sm">
          <ProjectRow
            {...args}
            collapsed={collapseds.row_1}
            onToggle={() =>
              setCollapseds((prev) => ({ ...prev, row_1: !prev.row_1 }))
            }
          />
          <ProjectRow
            {...args}
            totalHours="37:00"
            status="Rejected"
            timeEntries={[
              "07:15",
              "07:15",
              "07:15",
              "06:45",
              "07:00",
              "01:30",
              "",
            ]}
            collapsed={collapseds.row_2}
            onToggle={() =>
              setCollapseds((prev) => ({ ...prev, row_2: !prev.row_2 }))
            }
          />
        </div>
      </div>
    );
  },
};
