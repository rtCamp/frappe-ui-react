import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "./button";
import type { ButtonProps } from "./types";

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Text content of the button. Overridden by children.",
    },
    theme: {
      control: { type: "select", options: ["gray", "blue", "green", "red"] },
      description: "Color theme of the button.",
    },
    size: {
      control: { type: "select", options: ["sm", "md", "lg", "xl", "2xl"] },
      description: "Size of the button.",
    },
    variant: {
      control: {
        type: "select",
        options: ["solid", "subtle", "outline", "ghost"],
      },
      description: "Visual variant of the button.",
    },
    loading: {
      control: "boolean",
      description:
        "If true, shows a loading indicator and disables the button.",
    },
    loadingText: {
      control: "text",
      description: "Text to display when the button is in a loading state.",
    },
    disabled: {
      control: "boolean",
      description: "If true, disables the button.",
    },
    link: {
      control: "text",
      description: "External URL for navigation (opens in new tab).",
    },
    onClick: {
      action: "clicked",
      description: "Function to call when the button is clicked.",
    },
    icon: {
      control: "text",
      description: "Main icon for icon-only buttons.",
    },
    children: {
      control: "text",
      description:
        "Content rendered inside the button. Overrides `label` prop.",
    },
    iconLeft: { control: "text", description: "Left side icon for the button" },
    iconRight: {
      control: "text",
      description: "Right side icon for the button",
    },
  },
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
} as Meta<typeof Button>;

const ButtonTemplate: StoryObj<ButtonProps> = {
  render: (args) => (
    <div className="p-4">
      <Button {...args} />
    </div>
  ),
};

export const Default: StoryObj<ButtonProps> = {
  ...ButtonTemplate,
  args: {
    label: "Default Button",
    theme: "gray",
    size: "md",
    variant: "subtle",
  },
};

export const Solid: StoryObj<ButtonProps> = {
  ...ButtonTemplate,
  args: {
    label: "Solid Button",
    theme: "blue",
    size: "md",
    variant: "solid",
  },
};

export const Subtle: StoryObj<ButtonProps> = {
  ...ButtonTemplate,
  args: {
    label: "Subtle Button",
    theme: "gray",
    size: "md",
    variant: "subtle",
  },
};

export const Outline: StoryObj<ButtonProps> = {
  ...ButtonTemplate,
  args: {
    label: "Outline Button",
    theme: "gray",
    size: "md",
    variant: "outline",
  },
};

export const Ghost: StoryObj<ButtonProps> = {
  ...ButtonTemplate,
  args: {
    label: "Ghost Button",
    theme: "red",
    size: "md",
    variant: "ghost",
  },
};
