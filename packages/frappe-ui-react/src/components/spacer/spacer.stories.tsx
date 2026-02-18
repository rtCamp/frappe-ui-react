import type { Meta, StoryObj } from "@storybook/react-vite";

import Spacer from "./spacer";
import type { SpacerProps } from "./types";

export default {
  title: "Components/Spacer",
  component: Spacer,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the spacer.",
    },
    size: {
      control: "number",
      description: "The size of the spacer in pixels.",
    },
  },
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
} as Meta<typeof Spacer>;

type Story = StoryObj<SpacerProps>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
    size: 100,
  },
  render: (args) => (
    <div className="p-4">
      <p>Element Above Spacer</p>
      <Spacer {...args} />
      <p>Element Below Spacer</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    size: 100,
  },
  render: (args) => (
    <div className="p-4 flex items-center">
      <p>Element Left of Spacer</p>
      <Spacer {...args} />
      <p>Element Right of Spacer</p>
    </div>
  ),
};
