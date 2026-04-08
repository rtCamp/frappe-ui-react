import type { Meta, StoryObj } from "@storybook/react-vite";
import { GanttGrid, type GanttRowData } from "./gantt-grid";

const today = new Date().toISOString().slice(0, 10);

const fakeRows: GanttRowData[] = [
  {
    name: "Samantha Robbins",
    role: "Software Engineer",
    badge: "New",
    projects: [
      {
        name: "Atlas UI Stabilisation",
        dateRange: "Jan 12 - Mar 24",
        client: "Atlas Corp",
        badge: "New",
      },
      {
        name: "Dashboard Revamp",
        dateRange: "Feb 1 - Apr 15",
        client: "Acme Inc",
      },
    ],
  },
  {
    name: "James Carter",
    role: "Product Manager",
    badge: "Active",
    projects: [
      {
        name: "Road Map Planning",
        dateRange: "Mar 1 - Mar 31",
        client: "Internal",
        badge: "Active",
      },
    ],
  },
  { name: "Priya Sharma", role: "UX Designer" },
  {
    name: "Luca Bianchi",
    role: "Backend Developer",
    badge: "On Leave",
    projects: [
      {
        name: "API Migration",
        dateRange: "Jan 5 - Feb 28",
        client: "Globex",
        badge: "On Leave",
      },
      { name: "Auth Service", dateRange: "Mar 10 - Apr 30", client: "Globex" },
      {
        name: "Performance Audit",
        dateRange: "May 1 - May 15",
        client: "Globex",
      },
    ],
  },
  { name: "Aiko Tanaka", role: "QA Engineer" },
  {
    name: "Marcus Thompson",
    role: "DevOps Engineer",
    badge: "Active",
    projects: [
      {
        name: "CI/CD Pipeline",
        dateRange: "Feb 10 - Mar 20",
        client: "Internal",
        badge: "Active",
      },
    ],
  },
  { name: "Sofia Müller", role: "Frontend Developer" },
  { name: "Raj Patel", role: "Data Analyst", badge: "New" },
  { name: "Emeka Okafor", role: "Scrum Master" },
  {
    name: "Claire Dupont",
    role: "Tech Lead",
    badge: "Active",
    projects: [
      {
        name: "Platform Upgrade",
        dateRange: "Apr 1 - Jun 30",
        client: "Initech",
        badge: "Active",
      },
    ],
  },
];

const meta: Meta<typeof GanttGrid> = {
  title: "Components/GanttView/GanttGrid",
  component: GanttGrid,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    startDate: {
      control: "text",
      description:
        "ISO date string (YYYY-MM-DD) for any date within the first week displayed.",
    },
    weekCount: {
      control: { type: "number", min: 1, max: 200, step: 1 },
      description: "Number of weeks to display.",
    },
    showWeekend: {
      control: "boolean",
      description:
        "Include Saturday and Sunday columns. When false, week boundary is every 5th column.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof GanttGrid>;

export const Default: Story = {
  args: {
    startDate: today,
    weekCount: 5,
    rows: fakeRows,
  },
};

export const WithoutWeekend: Story = {
  args: {
    startDate: today,
    weekCount: 3,
    rows: fakeRows,
    showWeekend: false,
  },
};
