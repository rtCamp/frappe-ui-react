import React, { useCallback } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import {
  LucideBriefcase,
  LucideClipboard,
  LucideMail,
  LucideUserCheck,
  LucideCalendar,
  LucideTrendingUp,
  LucideTrendingDown,
  LucideMoreVertical,
  LucidePlus,
} from "lucide-react";

import { Dashboard } from "./index";
import { Button } from "../button";
import { Progress } from "../progress";
import { Badge } from "../badge";
import { Avatar } from "../avatar";
import { CircularProgressBar } from "../circularProgressBar";
import { AxisChart, DonutChart } from "../charts";
import type { DashboardLayout, Widget, WidgetSizes } from "./types";

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
    widgetSizes: {
      control: "object",
      description:
        "An object defining the width and height for predefined widget sizes.",
    },
    layoutFlow: {
      control: "select",
      options: ["row", "column"],
      description:
        "Defines the flow direction of the dashboard layout, either in rows or columns.",
    },
    autoAdjustWidth: {
      control: "boolean",
      description:
        "Automatically adjust the width of widgets based on their content.",
    },
    widgets: {
      control: "object",
      description: "Array of widgets to be displayed in the dashboard.",
    },
    initialLayout: {
      control: "object",
      description: "The initial layout configuration of the dashboard.",
    },
    savedLayout: {
      control: "object",
      description: "The saved layout configuration of the dashboard.",
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
  <div className="w-full h-32 rounded-lg border border-outline-gray-2 bg-surface-cards p-4 shadow">
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

const simpleWidgets: Widget[] = [
  {
    id: "content",
    name: "Content",
    component: Content,
    supportedSizes: ["large"],
  },
  { id: "stats", name: "Stats", component: Stats, supportedSizes: ["medium"] },
  {
    id: "activity",
    name: "Activity",
    component: Activity,
    supportedSizes: ["medium", "large"],
  },
];

const simpleLayout: DashboardLayout = [
  [{ widgetId: "content", size: "large" }],
  [
    { widgetId: "stats", size: "medium" },
    { widgetId: "activity", size: "medium" },
  ],
  [{ widgetId: "", size: "large" }],
];

const simpleWidgetSizes: WidgetSizes = {
  small: { w: 100, h: 100 },
  medium: { w: 242, h: 128 },
  large: { w: 500, h: 128 },
};

export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    const handleLayoutChange = useCallback(
      (newLayout: DashboardLayout) => {
        updateArgs({ savedLayout: newLayout });
      },
      [updateArgs]
    );

    return (
      <div className="w-full h-screen p-10 flex justify-center items-center">
        <div className="w-[500px]">
          <Dashboard onLayoutChange={handleLayoutChange} {...args} />
        </div>
      </div>
    );
  },
  args: {
    widgets: simpleWidgets,
    initialLayout: simpleLayout,
    widgetSizes: simpleWidgetSizes,
    layoutLock: false,
    dragHandle: false,
    dragHandleOnHover: false,
  },
};

export const LocalStorage: Story = {
  render: function Render(args) {
    const savedLayoutStr = localStorage.getItem("dashboard-saved-layout");
    const savedLayout: DashboardLayout | undefined = savedLayoutStr
      ? JSON.parse(savedLayoutStr)
      : undefined;

    const handleLayoutChange = (newLayout: DashboardLayout) => {
      localStorage.setItem("dashboard-saved-layout", JSON.stringify(newLayout));
    };

    return (
      <div className="w-full h-screen flex flex-col justify-center items-center p-10">
        <div className="w-min flex gap-3 mb-4">
          <Button
            onClick={() => localStorage.removeItem("dashboard-saved-layout")}
          >
            Clear Saved Layout
          </Button>
        </div>
        <div className="w-[500px]">
          <Dashboard
            onLayoutChange={handleLayoutChange}
            savedLayout={savedLayout}
            {...args}
          />
        </div>
      </div>
    );
  },
  args: {
    widgets: simpleWidgets,
    initialLayout: simpleLayout,
    layoutLock: false,
    dragHandle: true,
    dragHandleOnHover: true,
    widgetSizes: simpleWidgetSizes,
  },
};

const EmployeeOverviewWidget = ({
  title,
  value,
  subtitle,
  progress,
  trend,
  trendValue,
}: {
  title: string;
  value: string;
  subtitle: string;
  progress?: number;
  trend?: "up" | "down";
  trendValue?: string;
}) => (
  <div className="h-full rounded-lg border border-outline-gray-2 bg-surface-cards p-5">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm text-ink-gray-5 font-medium">{title}</p>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-semibold text-ink-gray-9">
            {value}
          </span>
          {trend && trendValue && (
            <span
              className={`flex items-center text-sm ${
                trend === "up" ? "text-ink-green-3" : "text-ink-red-3"
              }`}
            >
              {trend === "up" ? (
                <LucideTrendingUp size={14} />
              ) : (
                <LucideTrendingDown size={14} />
              )}
              <span className="ml-1">{trendValue}</span>
            </span>
          )}
        </div>
        <p className="text-sm text-ink-gray-5 mt-1">{subtitle}</p>
      </div>
      {progress !== undefined && (
        <div className="ml-4">
          <CircularProgressBar
            step={progress}
            totalSteps={100}
            size="lg"
            showPercentage
          />
        </div>
      )}
    </div>
  </div>
);

const SalaryStatisticsWidget = () => {
  const salaryData = [
    { month: "Jan", salary: 45000, bonus: 5000 },
    { month: "Feb", salary: 47000, bonus: 3000 },
    { month: "Mar", salary: 46000, bonus: 8000 },
    { month: "Apr", salary: 48000, bonus: 4000 },
    { month: "May", salary: 52000, bonus: 6000 },
    { month: "Jun", salary: 51000, bonus: 7000 },
  ];

  return (
    <div className="w-full h-full flex flex-col border border-outline-gray-2 rounded-lg bg-surface-cards p-5 overflow-x-auto">
      <h3 className="text-xl font-semibold">Salary Statistics</h3>
      <p className="mt-1.5 text-base text-gray-600">Monthly overview</p>
      <AxisChart
        config={{
          data: salaryData,
          title: "",
          xAxis: { key: "month", type: "category" },
          yAxis: { title: "Amount ($)" },
          colors: ["#1f2937", "#9ca3af"],
          series: [
            { name: "salary", type: "bar" },
            { name: "bonus", type: "bar" },
          ],
        }}
      />
    </div>
  );
};

const EmployeeSatisfactionWidget = () => {
  const satisfactionData = [
    { category: "Very Satisfied", count: 45 },
    { category: "Satisfied", count: 20 },
    { category: "Neutral", count: 25 },
    { category: "Dissatisfied", count: 10 },
  ];

  return (
    <div className="h-full flex flex-col border border-outline-gray-2 rounded-lg bg-surface-cards p-5">
      <h3 className="text-xl font-semibold">Employee Satisfaction</h3>
      <p className="mt-1.5 text-base text-gray-600">Q4 2025 Survey Results</p>
      <DonutChart
        config={{
          data: satisfactionData,
          title: "",
          categoryColumn: "category",
          valueColumn: "count",
          colors: ["#111827", "#374151", "#6b7280", "#d1d5db"],
        }}
      />
    </div>
  );
};

const PerformanceStatsWidget = () => (
  <div className="w-full h-full rounded-lg border border-outline-gray-2 bg-surface-cards p-5">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-ink-gray-9">
        Performance Statistics
      </h3>
      <button className="p-1 hover:bg-surface-gray-3 rounded">
        <LucideMoreVertical size={16} className="text-ink-gray-5" />
      </button>
    </div>
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-ink-gray-7">Engineering</span>
          <span className="text-sm font-medium text-ink-gray-9">92%</span>
        </div>
        <Progress value={92} size="md" />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-ink-gray-7">Design</span>
          <span className="text-sm font-medium text-ink-gray-9">87%</span>
        </div>
        <Progress value={87} size="md" />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-ink-gray-7">Marketing</span>
          <span className="text-sm font-medium text-ink-gray-9">78%</span>
        </div>
        <Progress value={78} size="md" />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-ink-gray-7">Sales</span>
          <span className="text-sm font-medium text-ink-gray-9">85%</span>
        </div>
        <Progress value={85} size="md" />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-ink-gray-7">HR</span>
          <span className="text-sm font-medium text-ink-gray-9">90%</span>
        </div>
        <Progress value={90} size="md" />
      </div>
    </div>
  </div>
);

const NewEmployeesWidget = () => {
  const newHiresData = [
    { month: "Jul", hires: 8 },
    { month: "Aug", hires: 12 },
    { month: "Sep", hires: 6 },
    { month: "Oct", hires: 15 },
    { month: "Nov", hires: 9 },
    { month: "Dec", hires: 11 },
  ];

  return (
    <div className="h-full flex flex-col border border-outline-gray-2 rounded-lg bg-surface-cards p-5 overflow-x-auto">
      <h3 className="text-xl font-semibold">New Employees</h3>
      <p className="mt-1.5 text-base text-gray-600">Last 6 months hiring</p>
      <AxisChart
        config={{
          data: newHiresData,
          title: "",
          xAxis: { key: "month", type: "category" },
          yAxis: { title: "Count" },
          colors: ["#374151"],
          series: [{ name: "hires", type: "bar" }],
        }}
      />
    </div>
  );
};

const UpcomingEventsWidget = () => {
  const events = [
    {
      id: 1,
      title: "Team Meeting",
      date: "Jan 21",
      time: "10:00 AM",
      type: "meeting",
    },
    {
      id: 2,
      title: "Performance Review",
      date: "Jan 22",
      time: "2:00 PM",
      type: "review",
    },
    {
      id: 3,
      title: "New Hire Orientation",
      date: "Jan 23",
      time: "9:00 AM",
      type: "onboarding",
    },
    {
      id: 4,
      title: "Quarterly Planning",
      date: "Jan 25",
      time: "11:00 AM",
      type: "planning",
    },
  ];

  return (
    <div className="w-full h-full rounded-lg border border-outline-gray-2 bg-surface-cards p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-ink-gray-9">
          Upcoming Events
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconLeft={() => <LucidePlus size={14} className="mr-1" />}
        >
          Add
        </Button>
      </div>
      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-3 p-2 rounded hover:bg-surface-gray-2"
          >
            <div className="w-10 h-10 rounded-lg bg-surface-gray-3 flex items-center justify-center">
              <LucideCalendar size={18} className="text-ink-gray-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-ink-gray-8">
                {event.title}
              </p>
              <p className="text-xs text-ink-gray-5">
                {event.date} • {event.time}
              </p>
            </div>
            <Badge theme="gray" size="sm" variant="subtle">
              {event.type}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

const RecentActivitiesWidget = () => {
  const activities = [
    {
      id: 1,
      user: "John Doe",
      action: "joined the Engineering team",
      time: "2 hours ago",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      user: "Sarah Smith",
      action: "completed onboarding",
      time: "4 hours ago",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "submitted leave request",
      time: "Yesterday",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      user: "Emily Brown",
      action: "updated profile",
      time: "Yesterday",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
  ];

  return (
    <div className="w-full h-full rounded-lg border border-outline-gray-2 bg-surface-cards p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-ink-gray-9">
          Recent Activities
        </h3>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-2">
            <Avatar size="sm" shape="circle" image={activity.avatar} />
            <div className="flex-1">
              <p className="text-sm text-ink-gray-8">
                <span className="font-medium">{activity.user}</span>{" "}
                {activity.action}
              </p>
              <p className="text-xs text-ink-gray-5 mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuickActionsWidget = () => (
  <div className="w-full h-full rounded-lg border border-outline-gray-2 bg-surface-cards p-5">
    <h3 className="text-lg font-semibold text-ink-gray-9 mb-4">
      Quick Actions
    </h3>
    <div className="flex flex-col gap-3">
      <Button
        variant="subtle"
        size="md"
        className="justify-start"
        iconLeft={() => <LucideUserCheck size={16} />}
      >
        Add Employee
      </Button>
      <Button
        variant="subtle"
        size="md"
        className="justify-start"
        iconLeft={() => <LucideBriefcase size={16} />}
      >
        Post Job
      </Button>
      <Button
        variant="subtle"
        size="md"
        className="justify-start"
        iconLeft={() => <LucideClipboard size={16} />}
      >
        Create Report
      </Button>
      <Button
        variant="subtle"
        size="md"
        className="justify-start"
        iconLeft={() => <LucideMail size={16} />}
      >
        Send Announcement
      </Button>
    </div>
  </div>
);

const hrWidgets: Widget[] = [
  {
    id: "total-employees",
    name: "Total Employees",
    component: EmployeeOverviewWidget,
    props: {
      title: "Total Employees",
      value: "1,234",
      subtitle: "Active employees",
      progress: 85,
      trend: "up",
      trendValue: "12%",
    },
    supportedSizes: ["small"],
  },
  {
    id: "new-hires",
    name: "New Hires",
    component: EmployeeOverviewWidget,
    props: {
      title: "New Hires",
      value: "48",
      subtitle: "This month",
      progress: 72,
      trend: "up",
      trendValue: "8%",
    },
    supportedSizes: ["small"],
  },
  {
    id: "turnover",
    name: "Turnover Rate",
    component: EmployeeOverviewWidget,
    props: {
      title: "Turnover Rate",
      value: "4.2%",
      subtitle: "Last 12 months",
      progress: 42,
      trend: "down",
      trendValue: "2%",
    },
    supportedSizes: ["small"],
  },
  {
    id: "open-positions",
    name: "Open Positions",
    component: EmployeeOverviewWidget,
    props: {
      title: "Open Positions",
      value: "23",
      subtitle: "Across all departments",
      progress: 65,
    },
    supportedSizes: ["small"],
  },
  {
    id: "salary-stats",
    name: "Salary Statistics",
    component: SalaryStatisticsWidget,
    supportedSizes: ["large"],
  },
  {
    id: "satisfaction",
    name: "Employee Satisfaction",
    component: EmployeeSatisfactionWidget,
    supportedSizes: ["large"],
  },
  {
    id: "performance",
    name: "Performance Stats",
    component: PerformanceStatsWidget,
    supportedSizes: ["medium"],
  },
  {
    id: "new-employees",
    name: "New Employees",
    component: NewEmployeesWidget,
    supportedSizes: ["medium", "large"],
  },
  {
    id: "events",
    name: "Upcoming Events",
    component: UpcomingEventsWidget,
    supportedSizes: ["medium", "large"],
  },
  {
    id: "activities",
    name: "Recent Activities",
    component: RecentActivitiesWidget,
    supportedSizes: ["medium"],
  },
  {
    id: "quick-actions",
    name: "Quick Actions",
    component: QuickActionsWidget,
    supportedSizes: ["medium"],
  },
];

const hrLayout: DashboardLayout = [
  [
    { widgetId: "total-employees", size: "small" },
    { widgetId: "new-hires", size: "small" },
    { widgetId: "turnover", size: "small" },
    { widgetId: "open-positions", size: "small" },
  ],
  [
    { widgetId: "salary-stats", size: "large" },
    { widgetId: "satisfaction", size: "large" },
  ],
  [
    { widgetId: "performance", size: "medium" },
    { widgetId: "new-employees", size: "medium" },
    { widgetId: "events", size: "medium" },
  ],
  [
    { widgetId: "activities", size: "medium" },
    { widgetId: "quick-actions", size: "medium" },
    { widgetId: "", size: "medium" },
  ],
];

const hrWidgetSizes: WidgetSizes = {
  small: { w: 300, h: 150 },
  medium: { w: 404, h: 350 },
  large: { w: 616, h: 350 },
};

export const HRDashboardExample: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    const handleLayoutChange = useCallback(
      (newLayout: DashboardLayout) => {
        updateArgs({ savedLayout: newLayout });
      },
      [updateArgs]
    );

    return (
      <div className="w-full bg-surface-gray-2 p-6">
        <Dashboard onLayoutChange={handleLayoutChange} {...args} />
      </div>
    );
  },
  args: {
    widgets: hrWidgets,
    initialLayout: hrLayout,
    widgetSizes: hrWidgetSizes,
    layoutLock: false,
    dragHandle: true,
    dragHandleOnHover: true,
    autoAdjustWidth: true,
    layoutFlow: "row",
  },
};
