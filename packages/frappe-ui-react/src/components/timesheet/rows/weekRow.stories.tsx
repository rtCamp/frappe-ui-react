import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { action } from "storybook/actions";

import { WeekRow, type WeekRowProps } from "./weekRow";

const meta: Meta<WeekRowProps> = {
  title: "Components/Timesheet/WeekRow",
  component: WeekRow,
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
    thisWeek: {
      control: "boolean",
      description: "Whether the week row represents the current week.",
    },
    dates: {
      control: "object",
      description: "Array of date strings representing the days in the week.",
    },
    today: {
      control: "text",
      description:
        "The date string representing today's date, used for highlighting.",
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
    onButtonClick: {
      action: "button-clicked",
      description: "Callback function when the action button is clicked.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "This Week",
    collapsed: false,
    totalHours: "40:00",
    dates: ["Dec 29", "Dec 30", "Dec 31", "Jan 1", "Jan 2", "Jan 3", "Jan 4"],
    today: "Jan 4",
    thisWeek: true,
    status: "Not Submitted",
    onButtonClick: action("Button clicked"),
  },
  render: (args) => {
    const [_args, setUseArgs] = useArgs();
    return (
      <div className="w-295 p-4">
        <WeekRow
          {...args}
          onToggle={() => setUseArgs({ collapsed: !_args.collapsed })}
        />
      </div>
    );
  },
};

export const Variants: Story = {
  args: {},
  render: () => {
    const [collapseds, setCollapseds] = useState({
      "This Week": false,
      "Last Week": false,
      "Dec 15 - Dec 21, 2025": false,
      "Dec 8 - Dec 14, 2025": false,
      "Dec 1 - Dec 7, 2025": false,
    });

    return (
      <div className="w-295 p-4">
        <div className="w-full text-sm">
          <h2 className="py-4">This Week = True</h2>
          <WeekRow
            label="This Week"
            collapsed={collapseds["This Week"]}
            totalHours="40:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "This Week": !prev["This Week"],
              }))
            }
            dates={[
              "Dec 29",
              "Dec 30",
              "Dec 31",
              "Jan 1",
              "Jan 2",
              "Jan 3",
              "Jan 4",
            ]}
            thisWeek={true}
            today="Jan 4"
            status="Not Submitted"
          />
          <WeekRow
            label="Last Week"
            collapsed={collapseds["Last Week"]}
            totalHours="35:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "Last Week": !prev["Last Week"],
              }))
            }
            dates={[
              "Dec 29",
              "Dec 30",
              "Dec 31",
              "Jan 1",
              "Jan 2",
              "Jan 3",
              "Jan 4",
            ]}
            today="Jan 4"
            thisWeek={true}
            status="Approval Pending"
          />
          <WeekRow
            label="Dec 15 - Dec 21, 2025"
            collapsed={collapseds["Dec 15 - Dec 21, 2025"]}
            totalHours="35:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "Dec 15 - Dec 21, 2025": !prev["Dec 15 - Dec 21, 2025"],
              }))
            }
            dates={[
              "Dec 29",
              "Dec 30",
              "Dec 31",
              "Jan 1",
              "Jan 2",
              "Jan 3",
              "Jan 4",
            ]}
            today="Jan 4"
            thisWeek={true}
            status="Rejected"
          />
          <WeekRow
            label="Dec 8 - Dec 14, 2025"
            collapsed={collapseds["Dec 8 - Dec 14, 2025"]}
            totalHours="35:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "Dec 8 - Dec 14, 2025": !prev["Dec 8 - Dec 14, 2025"],
              }))
            }
            dates={[
              "Dec 29",
              "Dec 30",
              "Dec 31",
              "Jan 1",
              "Jan 2",
              "Jan 3",
              "Jan 4",
            ]}
            today="Jan 4"
            thisWeek={false}
            status="Approved"
          />
          <WeekRow
            label="Dec 1 - Dec 7, 2025"
            collapsed={collapseds["Dec 1 - Dec 7, 2025"]}
            totalHours="35:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "Dec 1 - Dec 7, 2025": !prev["Dec 1 - Dec 7, 2025"],
              }))
            }
            dates={[
              "Dec 29",
              "Dec 30",
              "Dec 31",
              "Jan 1",
              "Jan 2",
              "Jan 3",
              "Jan 4",
            ]}
            today="Jan 4"
            thisWeek={false}
            status="None"
          />
          <h2 className="py-4">This Week = False</h2>
          <WeekRow
            label="This Week"
            collapsed={collapseds["This Week"]}
            totalHours="40:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "This Week": !prev["This Week"],
              }))
            }
            dates={[
              "Dec 22",
              "Dec 23",
              "Dec 24",
              "Dec 25",
              "Dec 26",
              "Dec 27",
              "Jan 28",
            ]}
            thisWeek={false}
            today="Jan 4"
            status="Not Submitted"
          />
          <WeekRow
            label="Last Week"
            collapsed={collapseds["Last Week"]}
            totalHours="35:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "Last Week": !prev["Last Week"],
              }))
            }
            dates={[
              "Dec 22",
              "Dec 23",
              "Dec 24",
              "Dec 25",
              "Dec 26",
              "Dec 27",
              "Jan 28",
            ]}
            today="Jan 4"
            thisWeek={false}
            status="Approval Pending"
          />
          <WeekRow
            label="Dec 15 - Dec 21, 2025"
            collapsed={collapseds["Dec 15 - Dec 21, 2025"]}
            totalHours="35:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "Dec 15 - Dec 21, 2025": !prev["Dec 15 - Dec 21, 2025"],
              }))
            }
            dates={[
              "Dec 22",
              "Dec 23",
              "Dec 24",
              "Dec 25",
              "Dec 26",
              "Dec 27",
              "Jan 28",
            ]}
            today="Jan 4"
            thisWeek={false}
            status="Rejected"
          />
          <WeekRow
            label="Dec 8 - Dec 14, 2025"
            collapsed={collapseds["Dec 8 - Dec 14, 2025"]}
            totalHours="35:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "Dec 8 - Dec 14, 2025": !prev["Dec 8 - Dec 14, 2025"],
              }))
            }
            dates={[
              "Dec 22",
              "Dec 23",
              "Dec 24",
              "Dec 25",
              "Dec 26",
              "Dec 27",
              "Jan 28",
            ]}
            today="Jan 4"
            thisWeek={false}
            status="Approved"
          />
          <WeekRow
            label="Dec 1 - Dec 7, 2025"
            collapsed={collapseds["Dec 1 - Dec 7, 2025"]}
            totalHours="35:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "Dec 1 - Dec 7, 2025": !prev["Dec 1 - Dec 7, 2025"],
              }))
            }
            dates={[
              "Dec 22",
              "Dec 23",
              "Dec 24",
              "Dec 25",
              "Dec 26",
              "Dec 27",
              "Jan 28",
            ]}
            today="Jan 4"
            thisWeek={false}
            status="None"
          />
        </div>
      </div>
    );
  },
};
