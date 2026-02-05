import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import Alert from "./alert";
import { Button } from "../button";
import { BadgeInfo } from "lucide-react";

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
        options: ["yellow", "blue", "red", "green"],
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
    <div className="w-[500px]">
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
    title: "Source successfully added",
    description:
      "Discover the new feature to enhance your experience. See how it can help you.",
    theme: "yellow",
  },
};

export const Error: Story = {
  ...AlertTemplate,
  args: {
    title: "Source successfully added",
    description:
      "Discover the new feature to enhance your experience. See how it can help you.",
    theme: "red",
  },
};

export const Info: Story = {
  ...AlertTemplate,
  args: {
    title: "Source successfully added",
    description:
      "Discover the new feature to enhance your experience. See how it can help you.",
    theme: "blue",
  },
};

export const ControlledState: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(true);

    return (
      <div className="min-w-[500px] min-h-34 w-[500px]">
        <Button
          variant="solid"
          label="Toggle Alert"
          onClick={() => setVisible(!visible)}
          className="mb-3"
        />

        <Alert
          {...args}
          visible={visible}
          onVisibleChange={setVisible}
          title="Source successfully added"
          description="Discover the new feature to enhance your experience. See how it can help you."
        />
      </div>
    );
  },
  args: {},
};

export const CustomSlots: Story = {
  render: (args) => (
    <div className="w-[500px]">
      <Alert
        {...args}
        title="Your trial ends soon!"
        variant="outline"
        description="Upgrade to keep enjoying features and future technical support."
        icon={() => <BadgeInfo className="w-4 h-4" />}
        footer={() => (
          <Button className="w-full" variant="solid" label="Update now" />
        )}
      />
    </div>
  ),
  args: {},
};
