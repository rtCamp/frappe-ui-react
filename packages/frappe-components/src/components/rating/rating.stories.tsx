import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Rating from "./rating";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  tags: ["autodocs"],
  component: Rating,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: {
      control: { type: "number", min: 0, max: 5 },
      description: "Current rating value",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Size of the rating icons",
    },
    label: {
      control: "text",
      description: "Optional label for the rating",
    },
    onChange: {
      action: "onChange",
      description: "Callback when rating changes",
    },
    className: {
      control: "text",
      description: "Custom CSS classes for the container",
    },
    ratingFrom: {
      control: { type: "number", min: 0, max: 5 },
      description: "Rating scale",
    },
    readonly: {
      control: "boolean",
      description: "If true, the rating is read-only",
    },
  },
};
export default meta;

type RatingStory = StoryObj<typeof Rating>;

export const Default: RatingStory = {
  render: (args) => {
    const [value, setValue] = React.useState(0);

    return (
          <div className="p-2">
            <Rating {...args} value={value} onChange={setValue} />
          </div>
        
    );
  },
  args: {
    value: 0,
    size: "md",
    label: "Rating",
  },
};
