import type { Meta, StoryObj } from "@storybook/react-vite";

import { HeaderRow, type HeaderRowProps } from "./headerRow";

const meta: Meta<HeaderRowProps> = {
  title: "Components/Timesheet/HeaderRow",
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

export const Default: Story = {
  args: {
    breadcrumbs: {
      items: [
        { label: "Week" },
        { label: "Project" },
        { label: "Member" },
        { label: "Task" },
      ],
      highlightLastItem: false,
      size: "sm",
    },
    nesting: 1,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  render: (args) => (
    <div className="w-295 p-4">
      <HeaderRow {...args} />
    </div>
  ),
};
