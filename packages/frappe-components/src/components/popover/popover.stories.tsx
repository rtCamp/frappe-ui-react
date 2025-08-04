import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import Popover from "./popover";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    show: {
      control: "boolean",
      description: "Controls the visibility of the popover.",
    },
    trigger: {
      control: "select",
      options: ["click", "hover"],
      description: "Event that triggers the popover to open/close.",
    },
    hoverDelay: {
      control: "number",
      description: "Delay in seconds before opening on hover.",
    },
    leaveDelay: {
      control: "number",
      description: "Delay in seconds before closing on hover.",
    },
    placement: {
      control: "select",
      options: [
        "auto",
        "auto-start",
        "auto-end",
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "right",
        "right-start",
        "right-end",
        "left",
        "left-start",
        "left-end",
      ],
      description: "Placement of the popover relative to the target.",
    },
    popoverClass: {
      control: "text",
      description: "CSS classes to apply to the popover body container.",
    },
    transition: {
      control: "boolean",
      description:
        "Enable/disable default transition (custom transitions need object).",
    },
    hideOnBlur: {
      control: "boolean",
      description: "Whether to hide the popover when clicking outside.",
    },
    onOpen: { action: "opened", description: "Callback when popover opens." },
    onClose: { action: "closed", description: "Callback when popover closes." },
    onUpdateShow: {
      action: "update:show",
      description: "Callback for controlled `show` prop.",
    },
  },
  args: {
    trigger: "click",
    hideOnBlur: true,
    placement: "bottom-start",
    hoverDelay: 0,
    leaveDelay: 0,
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

// Helper to provide common Popover content
const DefaultPopoverContent = () => (
  <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
    <p className="text-gray-800 text-sm">Hello from Popover!</p>
    <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs">
      Action
    </button>
  </div>
);

export const Default: Story = {
  args: {
    target: ({ togglePopover }) => (
      <button
        onClick={togglePopover}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Click Me (Default)
      </button>
    ),
    body: () => <DefaultPopoverContent />,
  },
};

export const HoverTrigger: Story = {
  args: {
    trigger: "hover",
    hoverDelay: 0.2,
    leaveDelay: 0.1,
    target: () => (
      <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
        Hover Me
      </button>
    ),
    body: () => <DefaultPopoverContent />,
  },
};
