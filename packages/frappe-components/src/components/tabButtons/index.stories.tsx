import { Meta, StoryObj } from "@storybook/react-vite/*";
import { useState } from "react";

import TabButtons from ".";
import { MemoryRouter } from "react-router";

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
      description: "Currently selected tab value.",
    },
    onChange: {
      action: "changed",
      description: "Function called when the selected tab changes.",
    },
  },
  parameters: {
    layout: "centered",
  },
  component: TabButtons,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TabButtonsExample: Story = {
  render: () => {
    const [currentTab, setCurrentTab] = useState<string>("mytasks");

    return (
      <MemoryRouter>
        <TabButtons
          buttons={[
            { label: "Tasks assigned to me", value: "mytasks" },
            { label: "Tasks created by me", value: "created" },
          ]}
          value={currentTab}
          onChange={(value) => setCurrentTab(value as string)}
        />
      </MemoryRouter>
    );
  },
};
