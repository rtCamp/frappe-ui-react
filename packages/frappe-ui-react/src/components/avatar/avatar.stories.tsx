import React from "react";
import Avatar from "./avatar";
import type { StoryObj } from "@storybook/react-vite";

export default {
  title: "Components/Avatar",
  component: Avatar,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
      },
      description: "Size of the avatar",
    },
    shape: {
      control: {
        type: "select",
        options: ["circle", "square"],
      },
      description: "Shape of the avatar",
    },
    label: { control: "text", description: "Initials or text to display" },
    image: { control: "text", description: "URL of the avatar image" },
  },
  tags: ["autodocs"],
};

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="w-10 h-10">
        <Avatar {...args} />
      </div>
    );
  },
  args: {
    label: "EY",
    size: "md",
    shape: "circle",
    image: "https://avatars.githubusercontent.com/u/499550?s=60&v=4",
  },
};

export const WithoutImage: Story = {
  render: (args) => {
    return (
      <div className="w-10 h-10">
        <Avatar {...args} />
      </div>
    );
  },
  args: {
    label: "EY",
    size: "md",
    shape: "circle",
  },
};

export const Square: Story = {
  render: (args) => {
    return (
      <div className="w-10 h-10">
        <Avatar {...args} />
      </div>
    );
  },
  args: {
    label: "EY",
    size: "md",
    shape: "square",
    image: "https://avatars.githubusercontent.com/u/499550?s=60&v=4",
  },
};

export const SquareWithoutImage: Story = {
  render: (args) => {
    return (
      <div className="w-10 h-10">
        <Avatar {...args} />
      </div>
    );
  },
  args: {
    label: "EY",
    size: "md",
    shape: "square",
  },
};

export const WithIndicator: Story = {
  render: (args) => (
    <Avatar
      {...args}
      indicator={
        <div
          style={{
            background: "green",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
          }}
        />
      }
    />
  ),
  args: {
    label: "EY",
    size: "md",
    shape: "circle",
    image: "https://avatars.githubusercontent.com/u/499550?s=60&v=4",
  },
};
