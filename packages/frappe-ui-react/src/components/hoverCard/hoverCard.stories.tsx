import type { Meta, StoryObj } from "@storybook/react-vite";
import HoverCard from "./hoverCard";
import { Avatar } from "../avatar";

const meta: Meta<typeof HoverCard> = {
  title: "Components/HoverCard",
  component: HoverCard,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Side of the trigger the card is placed on",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Alignment of the card relative to the trigger",
    },
    offset: {
      control: "number",
      description: "Distance in pixels between the card and the trigger",
    },
    hoverDelay: {
      control: "number",
      description: "Delay in seconds before showing the card on hover",
    },
    leaveDelay: {
      control: "number",
      description:
        "Delay in seconds before closing the card after pointer leaves",
    },
    arrow: {
      control: "boolean",
      description: "Whether to render a small arrow pointing at the trigger",
    },
    trigger: {
      control: false,
    },
    children: {
      control: false,
    },
    portalTo: {
      control: false,
    },
    collisionPadding: {
      control: false,
    },
    open: {
      control: false,
    },
    defaultOpen: {
      control: false,
    },
    onOpenChange: {
      control: false,
    },
  },
  args: {
    side: "bottom",
    align: "start",
    offset: 4,
    hoverDelay: 0.3,
    leaveDelay: 0.3,
    arrow: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <HoverCard
        {...args}
        trigger={
          <a
            href="#"
            className="text-ink-gray-9 underline underline-offset-2 hover:text-ink-blue-3 focus:text-ink-blue-3 focus:outline-none"
          >
            @jane
          </a>
        }
      >
        <div className="flex w-64 gap-3 p-3">
          <Avatar
            label="Jane Doe"
            image="https://avatars.githubusercontent.com/u/499550?v=4"
            size="2xl"
          />
          <div>
            <p className="text-p-base font-medium text-ink-gray-9">Jane Doe</p>
            <p className="mt-1 text-p-sm text-ink-gray-6">
              Designer. Likes hover cards.
            </p>
          </div>
        </div>
      </HoverCard>
    );
  },
};

export const WithDelays: Story = {
  render: (args) => {
    return (
      <HoverCard
        {...args}
        trigger={
          <a
            href="#"
            className="text-ink-gray-9 underline underline-offset-2 hover:text-ink-blue-3 focus:text-ink-blue-3 focus:outline-none"
          >
            Hover me (slow entry/exit)
          </a>
        }
      >
        <div className="p-3 text-p-sm text-ink-gray-7">
          Opens after 1.0s, closes 0.8s after the pointer leaves.
        </div>
      </HoverCard>
    );
  },
  args: {
    side: "top",
    align: "center",
    hoverDelay: 1.0,
    leaveDelay: 0.8,
  },
};

export const WithArrow: Story = {
  render: (args) => {
    return (
      <HoverCard
        {...args}
        trigger={
          <a
            href="#"
            className="text-ink-gray-9 underline underline-offset-2 hover:text-ink-blue-3 focus:text-ink-blue-3 focus:outline-none"
          >
            @jane (with arrow)
          </a>
        }
      >
        <div className="flex w-64 gap-3 p-3">
          <Avatar
            label="Jane Doe"
            image="https://avatars.githubusercontent.com/u/499550?v=4"
            size="2xl"
          />
          <div>
            <p className="text-p-base font-medium text-ink-gray-9">Jane Doe</p>
            <p className="mt-1 text-p-sm text-ink-gray-6">
              Designer. Likes hover cards.
            </p>
          </div>
        </div>
      </HoverCard>
    );
  },
  args: {
    side: "top",
    align: "start",
    arrow: true,
  },
};
