import type { Meta, StoryObj } from "@storybook/react-vite";

import Tooltip from "./tooltip";
import { Button } from "../button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
			description: "Placement of the tooltip relative to the trigger",
    },
    children: {
      control: false,
			description: "Element that triggers the tooltip on hover",
    },
    body: {
      description: "Custom content to render inside the tooltip",
    },
    text: {
      control: "text",
      description: "Text content of the tooltip",
    },
    hoverDelay: {
      control: "number",
      description: "Delay in seconds before showing the tooltip on hover",
    },
    disabled: {
      control: "boolean",
      description: "If true, the tooltip is disabled",
    },
    arrowClass: {
      control: "text",
      description: "Custom CSS classes for the tooltip arrow",
    },
  },
  args: {
    placement: "top",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithText: Story = {
  render: (args) => {
    return (
        <Tooltip text={args.text} hoverDelay={args.hoverDelay}>
          <Button theme="red">Delete</Button>
        </Tooltip>
    );
  },
  args: {
    text: "This action cannot be undone",
    hoverDelay: 1,
    placement: "top",
    body: null,
  },
};

export const Disabled: Story = {
  render: (args) => {
    return (
        <Tooltip {...args}>
          <Button theme="red">Delete</Button>
        </Tooltip>
    );
  },
  args: {
    ...WithText.args,
    text: "disabled tooltip",
    disabled: true,
  },
};

export const WithCustomContent: Story = {
  render: (args) => {
    return (
        <Tooltip {...args}>
          <Button theme="red">Delete</Button>
        </Tooltip>
    );
  },
  args: {
    ...WithText.args,
    text: "disabled tooltip",
    arrowClass: "fill-surface-white",
    body: (
      <div className="min-w-[6rem] rounded bg-surface-white px-2 py-1 text-xs text-ink-gray-9 shadow-xl">
        test
      </div>
    ),
  },
};
