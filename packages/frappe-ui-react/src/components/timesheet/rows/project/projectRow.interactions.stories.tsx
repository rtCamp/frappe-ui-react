import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { userEvent, expect, within, waitFor } from "storybook/test";
import { fn } from "storybook/test";
import { Star } from "lucide-react";

import { ProjectRow, type ProjectRowProps } from "./projectRow";

const meta: Meta<ProjectRowProps> = {
  title: "Components/Timesheet/ProjectRow/Interactions",
  component: ProjectRow,
  parameters: { docs: { source: { type: "dynamic" } } },
  argTypes: {
    label: {
      control: "text",
      description: "Label for the project row.",
    },
    nesting: {
      control: "number",
      description: "Nesting level for the project row, used for indentation.",
    },
    collapsed: {
      control: "boolean",
      description: "Whether the project row is collapsed or expanded.",
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
      description: "Status of the timesheet for the project row.",
    },
    totalHours: {
      control: "text",
      description: "Total hours logged for the project row.",
    },
    onToggle: {
      action: "toggle",
      description:
        "Callback function when the project row is toggled between collapsed and expanded.",
    },
    timeEntries: {
      control: "object",
      description: "Array of time entries for each day of the week.",
    },
    renderPrefix: {
      control: false,
      description:
        "Optional function to render a prefix icon next to the label.",
    },
    className: {
      control: "text",
      description: "Additional class names for the project row container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ENTRIES = ["05:30", "06:45", "", "06:00", "04:15", "", "03:45"];

export const Toggle: Story = {
  args: {
    label: "Atlas UI Stabilization",
    collapsed: false,
    totalHours: "42:00",
    status: "approved",
    timeEntries: ENTRIES,
    onToggle: fn(),
  },
  render: (args) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className="w-295 p-4">
        <ProjectRow
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
    const toggleButton = canvas.getByRole("button", { name: "Toggle project" });

    expect(toggleButton).toHaveClass("rotate-0");
    expect(toggleButton).not.toHaveClass("-rotate-90");

    await userEvent.click(toggleButton);
    expect(args.onToggle).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(toggleButton).toHaveClass("-rotate-90");
      expect(toggleButton).not.toHaveClass("rotate-0");
    });

    await userEvent.click(toggleButton);
    expect(args.onToggle).toHaveBeenCalledTimes(2);

    await waitFor(() => {
      expect(toggleButton).toHaveClass("rotate-0");
      expect(toggleButton).not.toHaveClass("-rotate-90");
    });
  },
};

export const TimeEntryDisplay: Story = {
  render: () => (
    <div className="w-295 p-4">
      <ProjectRow
        label="Atlas UI Stabilization"
        collapsed={false}
        totalHours="42:00"
        status="approved"
        timeEntries={["05:30", "06:45", "", "06:00", "04:15", "07:15", "03:45"]}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("05:30")).toBeInTheDocument();
    expect(canvas.getByText("06:00")).toBeInTheDocument();

    const dashSpan = canvas.getByText("-");
    expect(dashSpan).toBeInTheDocument();
    expect(dashSpan).toHaveClass("text-ink-gray-4");
  },
};

export const TotalHoursColors: Story = {
  render: () => (
    <div className="w-295 p-4 space-y-1">
      <ProjectRow
        label="Not Submitted"
        collapsed={false}
        totalHours="10:00"
        status="not-submitted"
        timeEntries={[]}
      />
      <ProjectRow
        label="Approved"
        collapsed={false}
        totalHours="20:00"
        status="approved"
        timeEntries={[]}
      />
      <ProjectRow
        label="Rejected"
        collapsed={false}
        totalHours="30:00"
        status="rejected"
        timeEntries={[]}
      />
      <ProjectRow
        label="Approval Pending"
        collapsed={false}
        totalHours="40:00"
        status="approval-pending"
        timeEntries={[]}
      />
      <ProjectRow
        label="None"
        collapsed={false}
        totalHours="50:00"
        status="none"
        timeEntries={[]}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("10:00")).toHaveClass("text-ink-gray-6");
    expect(canvas.getByText("20:00")).toHaveClass("text-ink-green-4");
    expect(canvas.getByText("30:00")).toHaveClass("text-ink-red-4");
    expect(canvas.getByText("40:00")).toHaveClass("text-ink-amber-4");

    const noneSpan = canvas.getByText("50:00");
    expect(noneSpan).not.toHaveClass("text-ink-gray-6");
    expect(noneSpan).not.toHaveClass("text-ink-green-4");
    expect(noneSpan).not.toHaveClass("text-ink-red-4");
    expect(noneSpan).not.toHaveClass("text-ink-amber-4");
  },
};

export const Icons: Story = {
  render: () => (
    <div className="w-295 p-4 space-y-1">
      <ProjectRow
        label="Default icon"
        collapsed={false}
        totalHours="40:00"
        status="approved"
        timeEntries={[]}
      />
      <ProjectRow
        label="Custom prefix"
        collapsed={false}
        totalHours="40:00"
        status="approved"
        timeEntries={[]}
        renderPrefix={() => <Star data-testid="custom-prefix" size={16} />}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // default lucide-folder svg present, no custom prefix
    const rows = canvasElement.querySelectorAll(".flex.items-center.border-b");
    expect(rows[0].querySelector("svg.lucide-folder")).toBeInTheDocument();

    // custom prefix renders, folder does not
    expect(canvas.getByTestId("custom-prefix")).toBeInTheDocument();
    expect(rows[1].querySelector("svg.lucide-folder")).not.toBeInTheDocument();
  },
};
