import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { BadgeInfo } from "lucide-react";

import Alert from "./alert";
import { Button } from "../button";

export default {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    title: {
      control: "text",
      description: "The title text of the alert",
    },
    theme: {
      control: {
        type: "select",
        options: ["yellow", "blue", "red", "green", "default"],
      },
      description: "Color theme of the alert",
    },
    variant: {
      control: {
        type: "select",
        options: ["subtle", "outline"],
      },
      description: "Visual variant of the alert",
    },
    description: {
      control: "text",
      description: "Description text displayed below the title",
    },
    dismissable: {
      control: "boolean",
      description: "Whether the alert can be dismissed",
    },
    visible: {
      control: "boolean",
      description: "Controls the visibility of the alert (controlled mode)",
    },
    icon: {
      control: false,
      description: "Custom icon to display in the alert",
    },
    footer: {
      control: false,
      description: "Custom footer content for the alert",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the alert container",
    },
  },
  parameters: {
    docs: {
      source: {
        type: "dynamic",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
} as Meta<typeof Alert>;

type Story = StoryObj<typeof Alert>;

const AlertTemplate: Story = {
  render: (args) => (
    <div className="min-w-125 min-h-34 w-125">
      <Alert {...args} />
    </div>
  ),
};

export const Success: Story = {
  ...AlertTemplate,
  args: {
    title: "Source successfully added",
    description:
      "Discover the new feature to enhance your experience. See how it can help you.",
    theme: "green",
  },
};

export const Warning: Story = {
  ...AlertTemplate,
  args: {
    title: "Scheduled maintenance coming",
    description:
      "We will be performing scheduled maintenance soon. Services may be unavailable during this time.",
    theme: "yellow",
  },
};

export const Error: Story = {
  ...AlertTemplate,
  args: {
    title: "Connection failed",
    description:
      "Unable to connect to the server. Please check your internet connection and try again.",
    theme: "red",
  },
};

export const Info: Story = {
  ...AlertTemplate,
  args: {
    title: "New feature available",
    description:
      "Discover the new feature to enhance your experience. See how it can help you.",
    theme: "blue",
  },
};

export const ControlledState: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(true);

    return (
      <div className="min-w-125 min-h-34 w-125">
        <Button
          variant="solid"
          label="Toggle Alert"
          onClick={() => setVisible(!visible)}
          className="mb-3"
        />

        <Alert {...args} visible={visible} onVisibleChange={setVisible} />
      </div>
    );
  },
  args: {
    title: "Source successfully added",
    description:
      "Discover the new feature to enhance your experience. See how it can help you.",
    icon: false,
  },
};

export const CustomSlots: Story = {
  ...AlertTemplate,
  args: {
    title: "Your trial ends soon!",
    variant: "outline",
    description:
      "Upgrade to keep enjoying features and future technical support.",
    icon: () => <BadgeInfo className="w-4 h-4" />,
    footer: () => (
      <Button className="w-full" variant="solid" label="Update now" />
    ),
  },
};
