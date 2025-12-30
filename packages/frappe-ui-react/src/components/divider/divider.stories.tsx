import type { Meta, StoryObj } from "@storybook/react-vite";
import Divider from "./divider";
import { Button } from "../button";
import { action } from "storybook/internal/actions";

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
    slot: {
      control: false,
      description: "Element to render in the divider slot",
    },
    position: {
      control: { type: "select" },
      options: ["start", "center", "end"],
      description: "Position of the action button",
    },
    padding: {
      control: "number",
      description: "Padding around the divider in pixels",
    },
    flexItem: {
      control: "boolean",
      description: "If true, adapts to flex container",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-80">
      <p className="text-sm text-ink-gray-7">Content above</p>
      <Divider {...args} />
      <p className="text-sm text-ink-gray-7">Content below</p>
    </div>
  ),
  args: {
    orientation: "horizontal",
    padding: 16,
  },
};

export const Vertical: Story = {
  render: (args) => (
    <div className="flex items-center h-16">
      <span className="text-sm text-ink-gray-7">Left</span>
      <Divider {...args} />
      <span className="text-sm text-ink-gray-7">Right</span>
    </div>
  ),
  args: {
    orientation: "vertical",
    flexItem: true,
    padding: 16,
  },
};

export const WithSlot: Story = {
  render: (args) => (
    <div className="w-80">
      <p className="text-sm text-ink-gray-7">Content above</p>
      <Divider {...args} />
      <p className="text-sm text-ink-gray-7">Content below</p>
    </div>
  ),
  args: {
    orientation: "horizontal",
    position: "center",
    padding: 6,
    slot: () => (
      <Button
        label="Load More"
        size="sm"
        variant="outline"
        onClick={() => action("Action clicked!")}
      />
    ),
  },
};

export const SlotPositionsHorizontal: Story = {
  render: () => (
    <div className="flex flex-col gap-14 w-80">
      <Divider
        orientation="horizontal"
        position="start"
        slot={() => (
          <Button
            label="Start"
            size="sm"
            variant="outline"
            onClick={() => action("Start clicked!")}
          />
        )}
      />
      <Divider
        orientation="horizontal"
        position="center"
        slot={() => (
          <Button
            label="Center"
            size="sm"
            variant="outline"
            onClick={() => action("Center clicked!")}
          />
        )}
      />
      <Divider
        orientation="horizontal"
        position="end"
        slot={() => (
          <Button
            label="End"
            size="sm"
            variant="outline"
            onClick={() => action("End clicked!")}
          />
        )}
      />
    </div>
  ),
};

export const SlotPositionsVertical: Story = {
  render: () => (
    <div className="flex items-center gap-20 h-48">
      <Divider
        orientation="vertical"
        position="start"
        flexItem
        slot={() => (
          <Button
            label="Start"
            size="sm"
            variant="outline"
            onClick={() => action("Start clicked!")}
          />
        )}
      />
      <Divider
        orientation="vertical"
        position="center"
        flexItem
        slot={() => (
          <Button
            label="Center"
            size="sm"
            variant="outline"
            onClick={() => action("Center clicked!")}
          />
        )}
      />
      <Divider
        orientation="vertical"
        position="end"
        flexItem
        slot={() => (
          <Button
            label="End"
            size="sm"
            variant="outline"
            onClick={() => action("End clicked!")}
          />
        )}
      />
    </div>
  ),
};
