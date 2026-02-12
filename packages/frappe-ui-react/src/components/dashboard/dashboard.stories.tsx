import { useCallback, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { LucidePlus, LucideX } from "lucide-react";

import { Dashboard, DashboardWidgetGallery, DashboardProvider } from "./index";
import { Button } from "../button";
import type {
  WidgetDefinition,
  WidgetSizePresets,
  DashboardLayouts,
  WidgetLayouts,
} from "./types";
import clsx from "clsx";
import {
  EmployeeOverviewWidget,
  SalaryStatisticsWidget,
  EmployeeSatisfactionWidget,
  PerformanceStatsWidget,
  NewEmployeesWidget,
  UpcomingEventsWidget,
  RecentActivitiesWidget,
  QuickActionsWidget,
} from "./stories/sample-widget-components";

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
    },
    dragHandle: {
      control: "boolean",
      description: "Show drag handle on components",
    },
    dragHandleOnHover: {
      control: "boolean",
      description: "Show drag handle only on hover",
    },
    compactType: {
      control: "select",
      options: ["vertical", "horizontal"],
      description:
        "How to compact the layout: 'vertical' (default) moves widgets up to fill gaps, 'horizontal' moves widgets left",
    },
    isBounded: {
      control: "boolean",
      description: "Prevent widgets from being dragged outside the grid bounds",
    },
    cols: {
      control: "object",
      description: "Column counts for each breakpoint",
    },
    breakpoints: {
      control: "object",
      description: "Breakpoints for responsive layout",
    },
    rowHeight: {
      control: "number",
      description: "Height of each row in pixels",
    },
    margin: {
      control: "object",
      description: "Margin between widgets in pixels",
    },
    widgets: {
      control: "object",
      description: "Array of widget definitions",
    },
    initialLayouts: {
      control: "object",
      description: "Initial layout configuration with positions per breakpoint",
    },
    savedLayout: {
      control: "object",
      description: "Saved layout from database/localStorage",
    },
    onLayoutChange: {
      action: "changed",
      description: "Callback function that is called when the layout changes.",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Content = () => (
  <div className="w-full h-full rounded-lg border border-outline-gray-2 bg-surface-cards p-4 shadow">
    <h3 className="text-lg font-semibold">Content</h3>
  </div>
);

const Stats = () => (
  <div className="w-full h-full rounded-lg border border-outline-gray-2 bg-surface-cards p-4 shadow">
    <h3 className="text-lg font-semibold">Stats</h3>
  </div>
);

const Activity = () => (
  <div className="w-full h-full rounded-lg border border-outline-gray-2 bg-surface-cards p-4 shadow">
    <h3 className="text-lg font-semibold">Activity</h3>
  </div>
);

const simpleWidgets: WidgetDefinition[] = [
  {
    id: "content-1",
    name: "Content",
    component: Content,
    size: "large",
  },
  {
    id: "stats-1",
    name: "Stats",
    component: Stats,
    size: "medium",
  },
  {
    id: "activity-1",
    name: "Activity",
    component: Activity,
    size: "medium",
  },
];

const simpleSizePresets: WidgetSizePresets = {
  small: { w: 3, h: 2, minW: 2, maxW: 4, minH: 2, maxH: 4 },
  medium: { w: 6, h: 2, minW: 4, maxW: 8, minH: 2, maxH: 6 },
  large: { w: 12, h: 2, minW: 8, maxW: 12, minH: 2, maxH: 8 },
};

const simpleLayouts: WidgetLayouts = {
  lg: [["content-1"], ["stats-1", "activity-1"]],
};

export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    const handleLayoutChange = useCallback(
      (newLayout: DashboardLayouts) => {
        updateArgs({ savedLayout: newLayout });
      },
      [updateArgs]
    );

    return (
      <div className="w-full h-screen p-10 flex justify-center items-center">
        <div className="w-full max-w-4xl">
          <Dashboard onLayoutChange={handleLayoutChange} {...args} />
        </div>
      </div>
    );
  },
  args: {
    widgets: simpleWidgets,
    initialLayouts: simpleLayouts,
    sizes: simpleSizePresets,
    rowHeight: 100,
    layoutLock: false,
    dragHandle: false,
    dragHandleOnHover: false,
  },
};

export const LocalStorage: Story = {
  render: function Render(args) {
    const savedLayoutStr = localStorage.getItem("dashboard-saved-layout");
    const savedLayout: DashboardLayouts | undefined = savedLayoutStr
      ? JSON.parse(savedLayoutStr)
      : undefined;

    const handleLayoutChange = (newLayout: DashboardLayouts) => {
      localStorage.setItem("dashboard-saved-layout", JSON.stringify(newLayout));
    };

    return (
      <div className="w-full h-screen flex flex-col justify-center items-center p-10">
        <div className="w-min flex gap-3 mb-4">
          <Button
            onClick={() => {
              localStorage.removeItem("dashboard-saved-layout");
              window.location.reload();
            }}
          >
            Clear Saved Layout
          </Button>
        </div>
        <div className="w-full max-w-4xl">
          <Dashboard
            {...args}
            savedLayout={savedLayout}
            onLayoutChange={handleLayoutChange}
          />
        </div>
      </div>
    );
  },
  args: {
    widgets: simpleWidgets,
    initialLayouts: simpleLayouts,
    sizes: simpleSizePresets,
    rowHeight: 100,
    layoutLock: false,
    dragHandle: true,
    dragHandleOnHover: true,
  },
};

const hrWidgets: WidgetDefinition[] = [
  {
    id: "total-employees",
    name: "Total Employees",
    component: EmployeeOverviewWidget,
    size: "small",
    props: {
      title: "Total Employees",
      value: "1,234",
      subtitle: "Active employees",
      progress: 85,
      trend: "up",
      trendValue: "12%",
    },
    preview: {
      props: {
        title: "Total Employees",
        value: "1,234",
        subtitle: "Active employees",
        progress: 85,
        trend: "up",
        trendValue: "12%",
      },
      description: "Total number of active employees",
    },
  },
  {
    id: "new-hires",
    name: "New Hires",
    component: EmployeeOverviewWidget,
    size: "small",
    props: {
      title: "New Hires",
      value: "48",
      subtitle: "This month",
      progress: 72,
      trend: "up",
      trendValue: "8%",
    },
    preview: {
      props: {
        title: "New Hires",
        value: "48",
        subtitle: "This month",
        progress: 72,
        trend: "up",
        trendValue: "8%",
      },
      description: "New hires this month",
    },
  },
  {
    id: "turnover",
    name: "Turnover Rate",
    component: EmployeeOverviewWidget,
    size: "small",
    isResizable: false,
    props: {
      title: "Turnover Rate",
      value: "4.2%",
      subtitle: "Last 12 months",
      progress: 42,
      trend: "down",
      trendValue: "2%",
    },
    preview: {
      props: {
        title: "Turnover Rate",
        value: "4.2%",
        subtitle: "Last 12 months",
        progress: 42,
        trend: "down",
        trendValue: "2%",
      },
      description: "Employee turnover rate",
    },
  },
  {
    id: "open-positions",
    name: "Open Positions",
    component: EmployeeOverviewWidget,
    size: "small",
    isResizable: false,
    props: {
      title: "Open Positions",
      value: "23",
      subtitle: "Across all departments",
      progress: 65,
    },
    preview: {
      props: {
        title: "Open Positions",
        value: "23",
        subtitle: "Across all departments",
        progress: 65,
      },
      description: "Current open job positions",
    },
  },
  {
    id: "salary-stats",
    name: "Salary Statistics",
    component: SalaryStatisticsWidget,
    size: "large",
    preview: {
      props: {},
      description: "Monthly salary overview with bonuses",
    },
  },
  {
    id: "satisfaction",
    name: "Employee Satisfaction",
    component: EmployeeSatisfactionWidget,
    size: "large",
    preview: {
      props: {},
      description: "Employee satisfaction survey results",
    },
  },
  {
    id: "performance",
    name: "Performance Stats",
    component: PerformanceStatsWidget,
    size: "medium",
    preview: {
      props: {},
      description: "Department performance overview",
    },
  },
  {
    id: "new-employees",
    name: "New Employees",
    component: NewEmployeesWidget,
    size: "medium",
    preview: {
      props: {},
      description: "Hiring trends over last 6 months",
    },
  },
  {
    id: "events",
    name: "Upcoming Events",
    component: UpcomingEventsWidget,
    size: "medium",
    preview: {
      props: {},
      description: "Calendar of upcoming HR events",
    },
  },
  {
    id: "activities",
    name: "Recent Activities",
    component: RecentActivitiesWidget,
    size: "medium",
    preview: {
      props: {},
      description: "Latest employee activities",
    },
  },
  {
    id: "quick-actions",
    name: "Quick Actions",
    component: QuickActionsWidget,
    size: "medium",
    preview: {
      props: {},
      description: "Common HR tasks and shortcuts",
    },
  },
];

const hrSizePresets: WidgetSizePresets = {
  small: { w: 3, h: 2, minW: 3, maxW: 3, minH: 2, maxH: 2, isResizable: false },
  medium: { w: 4, h: 4, minW: 3, maxW: 6, minH: 3, maxH: 6, isResizable: true },
  large: { w: 6, h: 4, minW: 4, maxW: 12, minH: 3, maxH: 8, isResizable: true },
};

const hrLayouts: WidgetLayouts = {
  lg: [
    ["total-employees", "new-hires", "turnover", "open-positions"],
    ["salary-stats", "satisfaction"],
    ["performance", "new-employees", "events"],
    ["activities", "quick-actions"],
  ],
  md: [
    ["total-employees", "new-hires", "turnover"],
    ["open-positions"],
    ["salary-stats"],
    ["satisfaction"],
    ["performance", "new-employees"],
    ["events", "activities"],
    ["quick-actions"],
  ],
  sm: [
    ["total-employees", "new-hires"],
    ["turnover", "open-positions"],
    ["salary-stats"],
    ["satisfaction"],
    ["performance"],
    ["new-employees"],
    ["events"],
    ["activities"],
    ["quick-actions"],
  ],
  xs: [
    ["total-employees"],
    ["new-hires"],
    ["turnover"],
    ["open-positions"],
    ["salary-stats"],
    ["satisfaction"],
    ["performance"],
    ["new-employees"],
    ["events"],
    ["activities"],
    ["quick-actions"],
  ],
};

export const HRDashboardExample: Story = {
  render: function Render(args) {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const savedLayoutStr = localStorage.getItem("hr-dashboard-saved-layout");
    const savedLayout: DashboardLayouts | undefined = savedLayoutStr
      ? JSON.parse(savedLayoutStr)
      : undefined;

    const handleLayoutChange = (newLayout: DashboardLayouts) => {
      localStorage.setItem(
        "hr-dashboard-saved-layout",
        JSON.stringify(newLayout)
      );
    };

    return (
      <DashboardProvider>
        <div className="w-full h-screen bg-surface-gray-2 relative">
          <div
            className={clsx(
              "absolute top-0 left-0 h-full w-80 bg-surface-cards border-r border-outline-gray-2 flex flex-col z-10 shadow-lg transition-transform duration-300",
              isGalleryOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="p-4 border-b border-outline-gray-2 flex items-center justify-between">
              <h3 className="font-semibold text-ink-gray-9">Widget Gallery</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsGalleryOpen(false)}
                icon={() => <LucideX size={16} />}
              />
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <DashboardWidgetGallery
                description="Drag widgets to the dashboard."
                onWidgetAdd={() => setIsGalleryOpen(false)}
                onWidgetDrag={() => setIsGalleryOpen(false)}
                onWidgetDrop={() => setIsGalleryOpen(true)}
              />
            </div>
          </div>

          <div className="relative w-full h-full overflow-auto">
            <div className="fixed bottom-2 right-2 z-1 flex gap-2">
              <Button
                variant="solid"
                iconLeft={() => <LucidePlus size={16} />}
                onClick={() => setIsGalleryOpen(!isGalleryOpen)}
                className=""
              >
                {isGalleryOpen ? "Close gallery" : "Add widget"}
              </Button>
              <Button
                variant="solid"
                onClick={() => {
                  localStorage.removeItem("hr-dashboard-saved-layout");
                  window.location.reload();
                }}
              >
                Clear saved layout
              </Button>
            </div>

            <Dashboard
              {...args}
              savedLayout={savedLayout}
              onLayoutChange={handleLayoutChange}
            />
          </div>
        </div>
      </DashboardProvider>
    );
  },
  args: {
    widgets: hrWidgets,
    initialLayouts: hrLayouts,
    sizes: hrSizePresets,
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 80,
    margin: [10, 10],
    layoutLock: false,
    dragHandle: true,
    dragHandleOnHover: true,
    isBounded: true,
  },
};
