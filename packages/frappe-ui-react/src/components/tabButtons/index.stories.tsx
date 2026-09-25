import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import TabButtons from ".";

const meta: Meta<typeof TabButtons> = {
  title: "Components/TabButtons",
  tags: ["autodocs"],
  argTypes: {
    buttons: {
      control: "object",
      description: "Array of button items with label and value.",
    },
    value: {
      control: "text",
      description: "Currently selected tab value. Accepts a string or number.",
    },
    onChange: {
      action: "changed",
      description:
        "Function called with the newly selected value, typed to match the item values as a string or number.",
    },
    className: {
      control: "text",
      description: "Additional classes applied to the tab group.",
    },
    buttonClassName: {
      control: "text",
      description: "Additional classes applied to each tab item.",
    },
  },
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  component: TabButtons,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TabButtonsExample: Story = {
  render: () => {
    const [currentTab, setCurrentTab] = useState<string>("mytasks");

    return (
      <TabButtons
        buttons={[
          { label: "Tasks assigned to me", value: "mytasks" },
          { label: "Tasks created by me", value: "created" },
          { label: "Tasks disabled", value: "disabled", disabled: true },
        ]}
        value={currentTab}
        onChange={(value) => setCurrentTab(value as string)}
      />
    );
  },
};
