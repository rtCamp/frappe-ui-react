import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { Dashboard } from "./index";
import type { LayoutItem } from "./types";

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
  <div className="w-64 h-96 rounded-lg border border-outline-gray-2 bg-surface-cards p-4 shadow">
    <h3 className="text-lg font-semibold">Sidebar</h3>
  </div>
);

const Header = () => (
  <div className="h-20 rounded-lg border border-outline-gray-2 bg-surface-cards p-4 shadow">
    <h3 className="text-lg font-semibold">Header</h3>
  </div>
);

const Content = () => (
  <div className="min-h-48 flex-1 rounded-lg border border-outline-gray-2 bg-surface-cards p-4 shadow">
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

export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    const handleLayoutChange = (
      newLayout: LayoutItem[] | ((prevLayout: LayoutItem[]) => LayoutItem[])
    ) => {
      const resolvedLayout =
        typeof newLayout === "function"
          ? newLayout(args.layout || [])
          : newLayout;
      updateArgs({ layout: resolvedLayout });
    };

    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Dashboard layout={args.layout || []} setLayout={handleLayoutChange} />
      </div>
    );
  },
  args: {
    layout: [
      {
        id: "main-row",
        type: "row",
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
      },
    ],
  },
};
