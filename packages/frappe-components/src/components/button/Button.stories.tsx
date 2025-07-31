import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import Button from "./button";
import type { ButtonProps } from "./types";

export default {
  title: "Components/Button",
  component: Button,
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
    route: {
      control: "text",
      description: "Internal route for navigation (uses react-router-dom).",
    },
    link: {
      control: "text",
      description: "External URL for navigation (opens in new tab).",
    },
    onClick: {
      action: "clicked",
      description: "Function to call when the button is clicked.",
    },
    prefixIcon: {
      control: "text",
      description: 'Icon to display before the label (e.g., "plus", "home").',
    },
    suffixIcon: {
      control: "text",
      description: 'Icon to display after the label (e.g., "arrow-right").',
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
  },
  parameters: {
    layout: "centered",
  },
} as Meta<typeof Button>;

const ButtonTemplate: StoryObj<ButtonProps> = {
  render: (args) => (
    <MemoryRouter initialEntries={["/"]}>
      <div className="p-4">
        <Button {...args} />
      </div>
    </MemoryRouter>
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
    theme: "green",
    size: "md",
    variant: "subtle",
  },
};

export const Outline: StoryObj<ButtonProps> = {
  ...ButtonTemplate,
  args: {
    label: "Outline Button",
    //@ts-expect-error -- this tests default fallback behaviour
    theme: "orange",
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