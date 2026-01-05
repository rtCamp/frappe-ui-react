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
  LucideX,
} from "lucide-react";

import {
  DashboardGrid as Dashboard,
  DashboardWidgetGallery,
  DashboardProvider,
} from "./index";
import { Button } from "../button";
import { Progress } from "../progress";
import { Badge } from "../badge";
import { Avatar } from "../avatar";
import { CircularProgressBar } from "../circularProgressBar";
import { AxisChart, DonutChart } from "../charts";
import type { WidgetLayout, WidgetDefinition } from "./types";
import clsx from "clsx";

const meta: Meta<typeof Dashboard> = {
  title: "Components/DashboardGrid",
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
      options: ["vertical", "horizontal", null],
      description:
        "How to compact the layout: 'vertical' (default) moves widgets up to fill gaps, 'horizontal' moves widgets left, null disables compacting (widgets stay exactly where placed)",
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
    initialLayout: {
      control: "object",
      description: "Initial layout configuration with positions",
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
  },
  {
    id: "stats-1",
    name: "Stats",
    component: Stats,
  },
  {
    id: "activity-1",
    name: "Activity",
    component: Activity,
  },
];

const simpleLayout: WidgetLayout[] = [
  {
    id: "content-1",
    x: 0,
    y: 0,
    w: 12,
    h: 2,
  },
  {
    id: "stats-1",
    x: 0,
    y: 2,
    w: 6,
    h: 2,
  },
  {
    id: "activity-1",
    x: 6,
    y: 2,
    w: 6,
    h: 2,
  },
];

export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    const handleLayoutChange = useCallback(
      (newLayout: WidgetLayout[]) => {
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
    initialLayout: simpleLayout,
    rowHeight: 100,
    layoutLock: false,
    dragHandle: false,
    dragHandleOnHover: false,
  },
};

export const LocalStorage: Story = {
  render: function Render(args) {
    const savedLayoutStr = localStorage.getItem("dashboard-saved-layout");
    const savedLayout: WidgetLayout[] | undefined = savedLayoutStr
      ? JSON.parse(savedLayoutStr)
      : undefined;

    const handleLayoutChange = (newLayout: WidgetLayout[]) => {
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
            widgets={simpleWidgets}
            initialLayout={simpleLayout}
            savedLayout={savedLayout}
            onLayoutChange={handleLayoutChange}
          />
        </div>
      </div>
    );
  },
  args: {
    rowHeight: 100,
    layoutLock: false,
    dragHandle: true,
    dragHandleOnHover: true,
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

const hrWidgets: WidgetDefinition[] = [
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
    preview: {
      props: {
        title: "Total Employees",
        value: "1,234",
        subtitle: "Active employees",
        progress: 85,
        trend: "up",
        trendValue: "12%",
      },
      defaultW: 3,
      defaultH: 2,
      description: "Total number of active employees",
    },
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
    preview: {
      props: {
        title: "New Hires",
        value: "48",
        subtitle: "This month",
        progress: 72,
        trend: "up",
        trendValue: "8%",
      },
      defaultW: 3,
      defaultH: 2,
      description: "New hires this month",
    },
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
    preview: {
      props: {
        title: "Turnover Rate",
        value: "4.2%",
        subtitle: "Last 12 months",
        progress: 42,
        trend: "down",
        trendValue: "2%",
      },
      defaultW: 3,
      defaultH: 2,
      description: "Employee turnover rate",
    },
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
    preview: {
      props: {
        title: "Open Positions",
        value: "23",
        subtitle: "Across all departments",
        progress: 65,
      },
      defaultW: 3,
      defaultH: 2,
      description: "Current open job positions",
    },
  },
  {
    id: "salary-stats",
    name: "Salary Statistics",
    component: SalaryStatisticsWidget,
    preview: {
      props: {},
      defaultW: 6,
      defaultH: 4,
      description: "Monthly salary overview with bonuses",
    },
  },
  {
    id: "satisfaction",
    name: "Employee Satisfaction",
    component: EmployeeSatisfactionWidget,
    preview: {
      props: {},
      defaultW: 6,
      defaultH: 4,
      description: "Employee satisfaction survey results",
    },
  },
  {
    id: "performance",
    name: "Performance Stats",
    component: PerformanceStatsWidget,
    preview: {
      props: {},
      defaultW: 4,
      defaultH: 4,
      description: "Department performance overview",
    },
  },
  {
    id: "new-employees",
    name: "New Employees",
    component: NewEmployeesWidget,
    preview: {
      props: {},
      defaultW: 4,
      defaultH: 4,
      description: "Hiring trends over last 6 months",
    },
  },
  {
    id: "events",
    name: "Upcoming Events",
    component: UpcomingEventsWidget,
    preview: {
      props: {},
      defaultW: 4,
      defaultH: 4,
      description: "Calendar of upcoming HR events",
    },
  },
  {
    id: "activities",
    name: "Recent Activities",
    component: RecentActivitiesWidget,
    preview: {
      props: {},
      defaultW: 4,
      defaultH: 4,
      description: "Latest employee activities",
    },
  },
  {
    id: "quick-actions",
    name: "Quick Actions",
    component: QuickActionsWidget,
    preview: {
      props: {},
      defaultW: 4,
      defaultH: 4,
      description: "Common HR tasks and shortcuts",
    },
  },
];

const hrLayout: WidgetLayout[] = [
  // Row 1: 4 small widgets - each taking 3 columns
  { id: "total-employees", x: 0, y: 0, w: 3, h: 2 },
  { id: "new-hires", x: 3, y: 0, w: 3, h: 2 },
  { id: "turnover", x: 6, y: 0, w: 3, h: 2 },
  { id: "open-positions", x: 9, y: 0, w: 3, h: 2 },

  // Row 2: 2 large widgets - each taking 6 columns
  { id: "salary-stats", x: 0, y: 2, w: 6, h: 4 },
  { id: "satisfaction", x: 6, y: 2, w: 6, h: 4 },

  // Row 3: 3 medium widgets - each taking 4 columns
  { id: "performance", x: 0, y: 6, w: 4, h: 4 },
  { id: "new-employees", x: 4, y: 6, w: 4, h: 4 },
  { id: "events", x: 8, y: 6, w: 4, h: 4 },

  // Row 4: 2 medium widgets
  { id: "activities", x: 0, y: 10, w: 4, h: 4 },
  { id: "quick-actions", x: 4, y: 10, w: 4, h: 4 },
];

export const HRDashboardExample: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    const handleLayoutChange = useCallback(
      (newLayout: WidgetLayout[]) => {
        updateArgs({ savedLayout: newLayout });
      },
      [updateArgs]
    );

    // @ts-expect-error - isGalleryOpen is only this story specific
    const isGalleryOpen = args.isGalleryOpen || false;

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
                onClick={() => updateArgs({ isGalleryOpen: false })}
                icon={() => <LucideX size={16} />}
              />
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <DashboardWidgetGallery
                widgets={hrWidgets}
                mode="list"
                description="Drag widgets to the dashboard."
              />
            </div>
          </div>

          <div className="relative w-full h-full overflow-auto">
            <Button
              variant="solid"
              iconLeft={() => <LucidePlus size={16} />}
              onClick={() => updateArgs({ isGalleryOpen: !isGalleryOpen })}
              className="fixed bottom-2 right-2 z-1"
            >
              {isGalleryOpen ? "Close Gallery" : "Add Widget"}
            </Button>

            <Dashboard onLayoutChange={handleLayoutChange} {...args} />
          </div>
        </div>
      </DashboardProvider>
    );
  },
  args: {
    widgets: hrWidgets,
    initialLayout: hrLayout,
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 80,
    layoutLock: false,
    dragHandle: true,
    dragHandleOnHover: true,
    isBounded: true,
    // @ts-expect-error - isGalleryOpen is only this story specific
    isGalleryOpen: false,
  },
};
