import type { Meta, StoryObj } from "@storybook/react-vite";

import Dashboard from "./Dashboard";
import type { DashboardProps } from "./types";
import Button from "../button/button";

const meta: Meta<typeof Dashboard> = {
  title: "Components/Dashboard",
  component: Dashboard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<DashboardProps>;

const ButtonWidget1: React.FC = () => (
  <div className="h-full w-full flex items-center justify-center border border-outline-gray-2 rounded bg-surface-gray-1">
    <Button label="Widget 1" />
  </div>
);

const ButtonWidget2: React.FC = () => (
  <div className="h-full w-full flex items-center justify-center border border-outline-gray-2 rounded bg-surface-gray-1">
    <Button label="Widget 2" />
  </div>
);

const widgets: DashboardProps["widgets"] = [
  {
    id: "button1",
    component: ButtonWidget1,
    defaultSize: { w: 3, h: 2 },
  },
  {
    id: "button2",
    component: ButtonWidget2,
    defaultSize: { w: 3, h: 2 },
    minSize: { w: 2, h: 2 },
    maxSize: { w: 6, h: 3 },
  },
];

const layout: DashboardProps["layout"] = [
  { widgetId: "button1", x: 0, y: 0, w: 3, h: 2 },
  { widgetId: "button2", x: 3, y: 0, w: 3, h: 2 },
];

export const Default: Story = {
  args: {
    widgets,
    layout,
  },
};

export const Themed: Story = {
  args: {
    widgets,
    layout,
    className: "bg-surface-gray-2 border border-outline-gray-1",
  },
};


