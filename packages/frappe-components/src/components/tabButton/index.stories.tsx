import { Meta, StoryObj } from "@storybook/react-vite/*";
import { useState } from "react";

import TabButtons from ".";
import { Story, Variant } from "../Story";
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
    layout: "padded",
  },
  component: TabButtons,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TabButtonsExample: Story = {
  render: () => {
    const [currentTab, setCurrentTab] = useState<string>("mytasks");

    return (
      <Story layout={{ type: "grid", width: "80%" }}>
        <Variant title="Tab Buttons">
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
        </Variant>
      </Story>
    );
  },
  parameters: {
    layout: { type: "grid", width: "80%" },
  },
  name: "Tab Buttons",
};
