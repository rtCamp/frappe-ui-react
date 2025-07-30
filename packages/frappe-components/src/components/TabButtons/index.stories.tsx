import { Meta, StoryObj } from "@storybook/react-vite/*";
import { useState } from "react";

import TabButtons from ".";
import { Story, Variant } from "../Story";

const meta: Meta<typeof TabButtons> = {
  title: "Components/TabButtons",
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
          <TabButtons
            buttons={[
              { label: "Tasks assigned to me", value: "mytasks" },
              { label: "Tasks created by me", value: "created" },
            ]}
            value={currentTab}
            onChange={(value) => setCurrentTab(value as string)}
          />
        </Variant>
      </Story>
    );
  },
  parameters: {
    layout: { type: "grid", width: "80%" },
  },
  name: "Tab Buttons",
};
