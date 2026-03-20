import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Skeleton from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          width: "500px",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    className: {
      control: "text",
      description: "Custom CSS classes for sizing and styling.",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => (
    <Skeleton className="w-full h-8 shrink-0 rounded-4xl mx-auto" />
  ),
};

export const Avatar: Story = {
  render: () => (
    <>
      <div className="text-center">
        <div className="flex w-fit items-center gap-4">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="grid gap-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      </div>
    </>
  ),
};

export const Card: Story = {
  render: () => (
    <div className="w-[300px] border border-gray-500/10 dark:border-gray-400 bg-card gap-4 overflow-hidden rounded-xl py-4 flex flex-col">
      <div className="gap-1 px-4 space-y-2 w-full">
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <div className="px-4 group-data-[size=sm]/card:px-3">
        <Skeleton className="aspect-video w-full" />
      </div>
    </div>
  ),
};
