import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { action } from "storybook/actions";
import { useState } from "react";

import { MemberRow, type MemberRowProps } from "./memberRow";

const meta: Meta<MemberRowProps> = {
  title: "Components/Timesheet/MemberRow",
  component: MemberRow,
  parameters: { docs: { source: { type: "dynamic" } } },
  argTypes: {
    label: {
      control: "text",
      description: "Name of the member.",
    },
    nesting: {
      control: "number",
      description: "Nesting level for the member row, used for indentation.",
    },
    collapsed: {
      control: "boolean",
      description: "Whether the member row is collapsed or expanded.",
    },
    timeEntries: {
      control: "object",
      description:
        "Array of time entries for each day of the week for the member.",
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
      description: "Status of the timesheet for the member.",
    },
    totalHours: {
      control: "text",
      description: "Total hours logged for the member.",
    },
    onToggle: {
      action: "toggle",
      description:
        "Callback function when the member row is toggled between collapsed and expanded.",
    },
    onButtonClick: {
      action: "button-clicked",
      description: "Callback function when the action button is clicked.",
    },
    className: {
      control: "text",
      description: "Additional class names for the member row container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Julian Andrews",
    avatarUrl: "https://randomuser.me/api/portraits/men/57.jpg",
    collapsed: false,
    totalHours: "44:30",
    timeEntries: [
      "08:30",
      "08:15",
      "08:45",
      "08:30",
      "07:45",
      "02:15",
      "00:30",
    ],
    status: "approval-pending",
    onButtonClick: action("Button clicked"),
  },
  render: (args) => {
    const [_args, setUseArgs] = useArgs();
    return (
      <div className="w-295 p-4">
        <MemberRow
          {...args}
          onToggle={() => setUseArgs({ collapsed: !_args.collapsed })}
        />
      </div>
    );
  },
};

const WEEK_ENTRIES = [
  {
    label: "Julian Andrews",
    avatarUrl: "https://randomuser.me/api/portraits/men/57.jpg",
    status: "approval-pending",
    totalHours: "44:30",
    timeEntries: [
      "08:30",
      "08:15",
      "08:45",
      "08:30",
      "07:45",
      "02:15",
      "00:30",
    ],
  },
  {
    label: "Christina Chang",
    avatarUrl: "https://randomuser.me/api/portraits/women/56.jpg",
    status: "approved",
    totalHours: "43:15",
    timeEntries: ["07:30", "08:30", "08:45", "08:00", "03:30", "", ""],
  },
  {
    label: "David Liu",
    avatarUrl: "https://randomuser.me/api/portraits/men/55.jpg",
    status: "rejected",
    totalHours: "35:00",
    timeEntries: [
      "08:30",
      "08:15",
      "08:45",
      "08:30",
      "07:45",
      "02:15",
      "00:30",
    ],
  },
  {
    label: "Emily White",
    avatarUrl: "https://randomuser.me/api/portraits/women/55.jpg",
    status: "none",
    totalHours: "35:00",
    timeEntries: [
      "08:30",
      "08:15",
      "08:45",
      "08:30",
      "07:45",
      "02:15",
      "00:30",
    ],
  },
] as const;

export const Variants: Story = {
  args: {},
  render: () => {
    const [collapseds, setCollapseds] = useState<Record<string, boolean>>(
      Object.fromEntries(WEEK_ENTRIES.map(({ label }) => [label, false]))
    );
    const toggle = (label: string) =>
      setCollapseds((prev: Record<string, boolean>) => ({
        ...prev,
        [label]: !prev[label],
      }));

    return (
      <div className="w-295 p-4">
        <div className="w-full text-sm">
          {WEEK_ENTRIES.map(
            ({ label, avatarUrl, status, timeEntries, totalHours }) => (
              <MemberRow
                key={`${label}-true`}
                label={label}
                avatarUrl={avatarUrl}
                collapsed={collapseds[label]}
                timeEntries={[...timeEntries]}
                totalHours={totalHours}
                onToggle={() => toggle(label)}
                status={status}
              />
            )
          )}
        </div>
      </div>
    );
  },
};
