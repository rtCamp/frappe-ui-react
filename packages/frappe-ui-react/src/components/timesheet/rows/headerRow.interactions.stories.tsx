import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { HeaderRow, type HeaderRowProps } from "./headerRow";

const meta: Meta<HeaderRowProps> = {
  title: "Components/Timesheet/HeaderRow/Interactions",
  component: HeaderRow,
  parameters: { docs: { source: { type: "dynamic" } } },
  argTypes: {
    nesting: {
      control: "number",
      description: "Nesting level for the week row, used for indentation.",
    },
    breadcrumbs: {
      control: "object",
      description: "Breadcrumbs configuration for the header row.",
    },
    days: {
      control: "object",
      description: "Array of day labels to display in the header row.",
    },
    className: {
      control: "text",
      description: "Additional class names for the header row container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const BREADCRUMBS: HeaderRowProps["breadcrumbs"] = {
  items: [{ label: "Week" }, { label: "Project" }, { label: "Task" }],
  highlightLastItem: false,
  size: "sm",
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const DaysAndTotal: Story = {
  render: () => (
    <div className="w-295 p-4">
      <HeaderRow breadcrumbs={BREADCRUMBS} days={DAYS} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (const day of DAYS) {
      expect(canvas.getByText(day)).toBeInTheDocument();
    }

    expect(canvas.getByText("Total")).toBeInTheDocument();
  },
};

export const BreadcrumbsRender: Story = {
  render: () => (
    <div className="w-295 p-4">
      <HeaderRow breadcrumbs={BREADCRUMBS} days={DAYS} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (const item of BREADCRUMBS.items) {
      expect(canvas.getByText(item.label)).toBeInTheDocument();
    }
  },
};

export const Nesting: Story = {
  render: () => (
    <div className="w-295 p-4 space-y-1">
      <HeaderRow breadcrumbs={BREADCRUMBS} days={DAYS} nesting={0} />
      <HeaderRow breadcrumbs={BREADCRUMBS} days={DAYS} nesting={1} />
      <HeaderRow breadcrumbs={BREADCRUMBS} days={DAYS} nesting={3} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const rows = canvasElement.querySelectorAll(
      ".flex.items-center.border-b.border-outline-gray-1"
    );

    expect(rows[0]).toHaveStyle({ paddingLeft: "4px" });
    expect(rows[1]).toHaveStyle({ paddingLeft: "14px" });
    expect(rows[2]).toHaveStyle({ paddingLeft: "34px" });
  },
};
