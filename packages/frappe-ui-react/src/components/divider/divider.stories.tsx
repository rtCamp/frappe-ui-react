import type { Meta, StoryObj } from "@storybook/react-vite";
import Divider from "./divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "Orientation of the divider",
    },
    position: {
      control: { type: "select" },
      options: ["start", "center", "end"],
      description: "Position of the action button",
    },
    flexItem: {
      control: "boolean",
      description: "If true, adapts to flex container",
    },
    action: {
      control: false,
      description: "Optional action button configuration",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-64">
      <p className="text-sm text-ink-gray-7 mb-2">Content above</p>
      <Divider {...args} />
      <p className="text-sm text-ink-gray-7 mt-2">Content below</p>
    </div>
  ),
  args: {
    orientation: "horizontal",
  },
};

export const Vertical: Story = {
  render: (args) => (
    <div className="flex items-center gap-4 h-16">
      <span className="text-sm text-ink-gray-7">Left</span>
      <Divider {...args} />
      <span className="text-sm text-ink-gray-7">Right</span>
    </div>
  ),
  args: {
    orientation: "vertical",
    flexItem: true,
  },
};

export const WithAction: Story = {
  render: (args) => (
    <div className="w-64">
      <p className="text-sm text-ink-gray-7 mb-4">Content above</p>
      <Divider {...args} />
      <p className="text-sm text-ink-gray-7 mt-4">Content below</p>
    </div>
  ),
  args: {
    orientation: "horizontal",
    position: "center",
    action: {
      label: "Load More",
      handler: () => alert("Action clicked!"),
      loading: false,
    },
  },
};

export const ActionPositions: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-64">
      <div>
        <Divider
          orientation="horizontal"
          position="start"
          action={{ label: "Start", handler: () => {} }}
        />
      </div>
      <div>
        <Divider
          orientation="horizontal"
          position="center"
          action={{ label: "Center", handler: () => {} }}
        />
      </div>
      <div>
        <Divider
          orientation="horizontal"
          position="end"
          action={{ label: "End", handler: () => {} }}
        />
      </div>
    </div>
  ),
};
