import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { userEvent, expect, within, waitFor } from "storybook/test";
import { fn } from "storybook/test";

import { MemberRow, type MemberRowProps } from "./memberRow";

const meta: Meta<MemberRowProps> = {
  title: "Components/Timesheet/MemberRow/Interactions",
  component: MemberRow,
  parameters: { docs: { source: { type: "dynamic" } } },
  argTypes: {
    label: {
      control: "text",
      description: "Name of the member.",
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

const TIME_ENTRIES = ["1:00", "2:00", "3:00", "", "4:00", "5:00", ""];
const TOTAL_HOURS = "15:00";

const getTimeEntryCells = (canvasElement: HTMLElement) =>
  canvasElement.querySelectorAll(
    '[data-testid="member-row"] > div:nth-child(n+2):nth-last-child(n+3)'
  );

export const Toggle: Story = {
  args: {
    label: "John Doe",
    collapsed: false,
    totalHours: TOTAL_HOURS,
    timeEntries: TIME_ENTRIES,
    status: "not-submitted",
    onToggle: fn(),
  },
  render: (args) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className="w-295 p-4">
        <MemberRow
          {...args}
          collapsed={collapsed}
          onToggle={() => {
            setCollapsed((prev) => !prev);
            args.onToggle?.();
          }}
        />
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    expect(getTimeEntryCells(canvasElement)).toHaveLength(7);
    const toggleButton = canvas.getByRole("button", { name: "Toggle member" });
    expect(toggleButton).not.toHaveClass("-rotate-90");

    await userEvent.click(toggleButton);
    expect(args.onToggle).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(toggleButton).toHaveClass("-rotate-90");
    });

    expect(getTimeEntryCells(canvasElement)).toHaveLength(7);
    await userEvent.click(toggleButton);
    expect(args.onToggle).toHaveBeenCalledTimes(2);

    await waitFor(() => {
      expect(toggleButton).not.toHaveClass("-rotate-90");
    });
  },
};

export const StatusVariants: Story = {
  render: () => (
    <div className="w-295 p-4 space-y-1">
      <MemberRow
        label="Member A"
        timeEntries={TIME_ENTRIES}
        totalHours="20:00"
        status="approved"
      />
      <MemberRow
        label="Member B"
        timeEntries={TIME_ENTRIES}
        totalHours="30:00"
        status="rejected"
      />
      <MemberRow
        label="Member C"
        timeEntries={TIME_ENTRIES}
        totalHours="40:00"
        status="approval-pending"
      />
      <MemberRow
        label="Member D"
        timeEntries={TIME_ENTRIES}
        totalHours="50:00"
        status="none"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rows = canvasElement.querySelectorAll('[data-testid="member-row"]');

    // Badges
    expect(canvas.getByText("Approved")).toBeInTheDocument();
    expect(canvas.getByText("Rejected")).toBeInTheDocument();
    expect(canvas.getByText("Approval Pending")).toBeInTheDocument();
    expect(canvas.queryByText("None")).not.toBeInTheDocument();

    // Action button icons
    expect(
      rows[0].querySelector("svg.lucide-circle-check")
    ).toBeInTheDocument();
    expect(rows[1].querySelector("svg.lucide-circle-x")).toBeInTheDocument();
    expect(
      rows[2].querySelector("svg.lucide-circle-check")
    ).toBeInTheDocument();
    expect(rows[3].querySelector(".shrink-0.w-12 button")).toBeNull();

    // Total hours colors
    expect(canvas.getByText("20:00")).toHaveClass("text-ink-green-4");
    expect(canvas.getByText("30:00")).toHaveClass("text-ink-red-4");
    expect(canvas.getByText("40:00")).toHaveClass("text-ink-amber-4");
    expect(canvas.getByText("50:00")).toHaveClass("text-ink-green-4");
  },
};

export const AvatarAndLabel: Story = {
  render: () => (
    <div className="w-295 p-4">
      <MemberRow
        label="Jane Smith"
        avatarUrl="https://randomuser.me/api/portraits/men/58.jpg"
        timeEntries={TIME_ENTRIES}
        totalHours={TOTAL_HOURS}
        status="approved"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("Jane Smith")).toBeInTheDocument();

    const avatar = canvasElement.querySelector("img");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute(
      "src",
      "https://randomuser.me/api/portraits/men/58.jpg"
    );
  },
};
