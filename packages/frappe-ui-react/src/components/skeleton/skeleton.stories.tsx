import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  tags: ["autodocs"],
  component: Skeleton,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  argTypes: {
    className: {
      control: "text",
      description: "CSS classes for the Skeleton",
      type: "string",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: "w-[100px] h-[100px]",
  },
  render: (args) => {
    return <Skeleton className={args.className} />;
  },
};
