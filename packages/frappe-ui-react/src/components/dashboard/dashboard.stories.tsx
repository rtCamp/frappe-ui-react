import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { Dashboard } from "./index";
import type { LayoutItem, SerializedLayoutItem } from "./types";
import { Button } from "../button";

const meta: Meta = {
  title: "Components/Dashboard",
  component: Dashboard,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Sidebar = () => (
  <div className="w-full h-96 rounded-lg border border-outline-gray-2 bg-surface-cards p-4 shadow">
    <h3 className="text-lg font-semibold">Sidebar</h3>
  </div>
);

const Header = () => (
  <div className="w-full h-20 rounded-lg border border-outline-gray-2 bg-surface-cards p-4 shadow">
    <h3 className="text-lg font-semibold">Header</h3>
  </div>
);

const Content = () => (
  <div className="w-full h-28 rounded-lg border border-outline-gray-2 bg-surface-cards p-4 shadow">
    <h3 className="text-lg font-semibold">Content</h3>
  </div>
);

const Stats = () => (
  <div className="w-48 h-32 rounded-lg border border-outline-gray-2 bg-surface-cards p-4 shadow">
    <h3 className="text-lg font-semibold">Stats</h3>
  </div>
);

const Activity = () => (
  <div className="w-48 h-32 rounded-lg border border-outline-gray-2 bg-surface-cards p-4 shadow">
    <h3 className="text-lg font-semibold">Activity</h3>
  </div>
);

const layout: LayoutItem = {
  id: "main-row",
  type: "row",
  slots: [
    {
      width: "250px",
      height: "100%",
    },
    {
      flex: "1",
    },
  ],
  elements: [
    {
      id: "sidebar-1",
      type: "component",
      component: Sidebar,
      props: {},
    },
    {
      id: "main-stack",
      type: "stack",
      slots: [
        {
          flex: "1",
        },
        {
          flex: "1",
        },
        {
          flex: "1",
        },
        {
          flex: "1",
        }
      ],
      elements: [
        {
          id: "header-1",
          type: "component",
          component: Header,
          props: { userId: "123" },
        },
        {
          id: "content-1",
          type: "component",
          component: Content,
          props: {},
        },
        {
          id: "balance-row",
          type: "row",
          slots: [
            {
              flex: "1",
            },
            {
              flex: "1",
            },
            {
              flex: "1",
            },
          ],
          elements: [
            {
              id: "stats-1",
              type: "component",
              component: Stats,
              props: {},
            },
            {
              id: "activity-1",
              type: "component",
              component: Activity,
              props: {},
            },
          ],
        },
      ],
    },
  ],
};

export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    const handleLayoutChange = (newLayout: SerializedLayoutItem) => {
      updateArgs({ savedLayout: newLayout });
    };

    return (
      <div className="w-full h-screen p-10 flex justify-center items-center">
        <Dashboard
          initialLayout={args.layout}
          savedLayout={args.savedLayout}
          onLayoutChange={handleLayoutChange}
        />
      </div>
    );
  },
  args: {
    layout,
  },
};

export const LocalStorage: Story = {
  render: function Render() {
    const savedLayoutStr = localStorage.getItem("dashboard-saved-layout");
    const savedLayout: SerializedLayoutItem | undefined = savedLayoutStr
      ? JSON.parse(savedLayoutStr)
      : undefined;

    const handleLayoutChange = (newLayout: SerializedLayoutItem) => {
      localStorage.setItem("dashboard-saved-layout", JSON.stringify(newLayout));
    };

    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <Button
          className="mb-4"
          onClick={() => localStorage.removeItem("dashboard-saved-layout")}
        >
          Clear Saved Layout
        </Button>
        <Dashboard
          initialLayout={layout}
          savedLayout={savedLayout}
          onLayoutChange={handleLayoutChange}
        />
      </div>
    );
  },
};
