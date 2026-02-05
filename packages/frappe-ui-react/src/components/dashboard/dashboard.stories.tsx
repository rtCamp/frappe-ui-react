import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { Dashboard } from "./index";
import type { LayoutItem, SerializedLayoutItem } from "./types";
import { Button } from "../button";

const meta: Meta<typeof Dashboard> = {
  title: "Components/Dashboard",
  component: Dashboard,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "fullscreen",
  },
  argTypes: {
    layoutLock: {
      control: "boolean",
      description: "Lock the layout to prevent dragging",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    dragHandle: {
      control: "boolean",
      description: "Show drag handle on components (when false, drag anywhere)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    dragHandleOnHover: {
      control: "boolean",
      description:
        "Show drag handle only on hover (requires dragHandle to be true)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
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
  <div className="w-full h-32 rounded-lg border border-outline-gray-2 bg-surface-cards p-4 shadow">
    <h3 className="text-lg font-semibold">Stats</h3>
  </div>
);

const Activity = () => (
  <div className="w-full h-32 rounded-lg border border-outline-gray-2 bg-surface-cards p-4 shadow">
    <h3 className="text-lg font-semibold">Activity</h3>
  </div>
);

const layout: LayoutItem = {
  id: "main-row",
  type: "row",
  slots: [
    {
      id: "sidebar-1",
      type: "component",
      component: Sidebar,
      props: {},
      width: "250px",
      height: "100%",
    },
    {
      id: "main-stack",
      type: "stack",
      flex: "1",
      slots: [
        {
          id: "header-1",
          type: "component",
          component: Header,
          props: { userId: "123" },
          flex: "1",
        },
        {
          id: "content-1",
          type: "component",
          component: Content,
          props: {},
          flex: "1",
        },
        {
          id: "balance-row",
          type: "row",
          flex: "1",
          slots: [
            {
              id: "stats-1",
              type: "component",
              component: Stats,
              props: {},
              flex: "1",
            },
            {
              id: "activity-1",
              type: "component",
              component: Activity,
              props: {},
              flex: "1",
            },
            {
              id: "balance-row-empty-2",
              type: "empty",
              flex: "1",
            },
          ],
        },
        {
          id: "main-stack-empty-3",
          type: "empty",
          flex: "1",
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
          layoutLock={args.layoutLock}
          dragHandle={args.dragHandle}
          dragHandleOnHover={args.dragHandleOnHover}
          initialLayout={args.initialLayout}
          savedLayout={args.savedLayout}
          onLayoutChange={handleLayoutChange}
        />
      </div>
    );
  },
  args: {
    initialLayout: layout,
    layoutLock: false,
    dragHandle: false,
    dragHandleOnHover: false,
  },
};

export const LocalStorage: Story = {
  render: function Render(args) {
    const savedLayoutStr = localStorage.getItem("dashboard-saved-layout");
    const savedLayout: SerializedLayoutItem | undefined = savedLayoutStr
      ? JSON.parse(savedLayoutStr)
      : undefined;

    const handleLayoutChange = (newLayout: SerializedLayoutItem) => {
      localStorage.setItem("dashboard-saved-layout", JSON.stringify(newLayout));
    };

    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="flex gap-3 mb-4">
          <Button
            onClick={() => localStorage.removeItem("dashboard-saved-layout")}
          >
            Clear Saved Layout
          </Button>
        </div>
        <Dashboard
          layoutLock={args.layoutLock}
          dragHandle={args.dragHandle}
          dragHandleOnHover={args.dragHandleOnHover}
          initialLayout={args.initialLayout}
          savedLayout={savedLayout}
          onLayoutChange={handleLayoutChange}
        />
      </div>
    );
  },
  args: {
    initialLayout: layout,
    layoutLock: false,
    dragHandle: true,
    dragHandleOnHover: true,
  },
};
