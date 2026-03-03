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
        "not-submitted",
        "approved",
        "rejected",
        "approval-pending",
        "none",
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
    className: {
      control: "text",
      description: "Additional class names for the week row container.",
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
    status: "not-submitted",
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

const WEEK_ENTRIES = [
  { label: "This Week", status: "not-submitted", totalHours: "40:00" },
  { label: "Last Week", status: "approval-pending", totalHours: "35:00" },
  { label: "Dec 15 - Dec 21, 2025", status: "rejected", totalHours: "35:00" },
  { label: "Dec 8 - Dec 14, 2025", status: "approved", totalHours: "35:00" },
  { label: "Dec 1 - Dec 7, 2025", status: "none", totalHours: "35:00" },
] as const;

const THIS_WEEK_DATES = [
  "Dec 29",
  "Dec 30",
  "Dec 31",
  "Jan 1",
  "Jan 2",
  "Jan 3",
  "Jan 4",
];
const PAST_WEEK_DATES = [
  "Dec 22",
  "Dec 23",
  "Dec 24",
  "Dec 25",
  "Dec 26",
  "Dec 27",
  "Jan 28",
];

export const Variants: Story = {
  args: {},
  render: () => {
    const [collapseds, setCollapseds] = useState<Record<string, boolean>>(
      Object.fromEntries(WEEK_ENTRIES.map(({ label }) => [label, false]))
    );
    const toggle = (label: string) =>
      setCollapseds((prev) => ({ ...prev, [label]: !prev[label] }));

    return (
      <div className="w-295 p-4">
        <div className="w-full text-sm">
          <h2 className="py-4">This Week = True</h2>
          {WEEK_ENTRIES.map(({ label, status, totalHours }) => (
            <WeekRow
              key={`${label}-true`}
              label={label}
              collapsed={collapseds[label]}
              totalHours={totalHours}
              onToggle={() => toggle(label)}
              dates={THIS_WEEK_DATES}
              today="Jan 4"
              thisWeek={true}
              status={status}
            />
          ))}
          <h2 className="py-4">This Week = False</h2>
          {WEEK_ENTRIES.map(({ label, status, totalHours }) => (
            <WeekRow
              key={`${label}-false`}
              label={label}
              collapsed={collapseds[label]}
              totalHours={totalHours}
              onToggle={() => toggle(label)}
              dates={PAST_WEEK_DATES}
              today="Jan 4"
              thisWeek={false}
              status={status}
            />
          ))}
        </div>
      </div>
    );
  },
};
