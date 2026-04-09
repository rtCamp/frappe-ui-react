import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Member } from "./types";
import { GanttGrid } from "./gantt-grid";

const fakeRows: Member[] = [
  {
    name: "Samantha Robbins",
    role: "Software Engineer",
    badge: "New",
    projects: [
      {
        name: "Atlas UI Stabilisation",
        dateRange: "Apr 9 - Jun 6",
        client: "Atlas Corp",
        badge: "New",
        allocation: [
          {
            hours: 4,
            startDate: new Date("2026-04-09"),
            endDate: new Date("2026-04-22"),
          },
          {
            hours: 8,
            startDate: new Date("2026-04-23"),
            endDate: new Date("2026-05-06"),
          },
          {
            hours: 6,
            startDate: new Date("2026-05-07"),
            endDate: new Date("2026-05-20"),
          },
        ],
      },
      {
        // overlaps with Atlas UI Stabilisation: Apr 29 – May 14
        name: "Dashboard Revamp",
        dateRange: "Apr 29 - Jul 25",
        client: "Acme Inc",
        allocation: [
          {
            hours: 5,
            startDate: new Date("2026-04-29"),
            endDate: new Date("2026-05-29"),
          },
          {
            hours: 8,
            startDate: new Date("2026-05-30"),
            endDate: new Date("2026-07-08"),
          },
        ],
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
        dateRange: "Apr 9 - May 23",
        client: "Internal",
        badge: "Active",
        allocation: [
          {
            hours: 3,
            startDate: new Date("2026-04-09"),
            endDate: new Date("2026-04-29"),
          },
          {
            hours: 8,
            startDate: new Date("2026-04-30"),
            endDate: new Date("2026-05-23"),
          },
        ],
      },
      {
        // overlaps with Road Map Planning: May 14 – May 23
        name: "Stakeholder Reviews",
        dateRange: "May 14 - Jul 18",
        client: "Internal",
        allocation: [
          {
            hours: 5,
            startDate: new Date("2026-05-14"),
            endDate: new Date("2026-06-13"),
          },
          {
            hours: 10,
            startDate: new Date("2026-06-14"),
            endDate: new Date("2026-07-08"),
          },
        ],
      },
    ],
  },
  {
    name: "Priya Sharma",
    role: "UX Designer",
    projects: [
      {
        name: "Design System",
        dateRange: "Apr 9 - Jun 13",
        client: "Internal",
        allocation: [
          {
            hours: 6,
            startDate: new Date("2026-04-09"),
            endDate: new Date("2026-05-07"),
          },
          {
            hours: 10,
            startDate: new Date("2026-05-08"),
            endDate: new Date("2026-06-13"),
          },
        ],
      },
      {
        // overlaps with Design System: May 29 – Jun 13
        name: "Brand Refresh",
        dateRange: "May 29 - Jul 25",
        client: "Atlas Corp",
        allocation: [
          {
            hours: 8,
            startDate: new Date("2026-05-29"),
            endDate: new Date("2026-07-08"),
          },
        ],
      },
    ],
  },
  {
    name: "Luca Bianchi",
    role: "Backend Developer",
    badge: "On Leave",
    projects: [
      {
        name: "API Migration",
        dateRange: "Apr 9 - May 16",
        client: "Globex",
        badge: "On Leave",
        allocation: [
          {
            hours: 8,
            startDate: new Date("2026-04-09"),
            endDate: new Date("2026-04-30"),
          },
          {
            hours: 4,
            startDate: new Date("2026-05-01"),
            endDate: new Date("2026-05-16"),
          },
        ],
      },
      {
        // overlaps with API Migration: May 9 – May 16
        name: "Auth Service",
        dateRange: "May 9 - Jul 4",
        client: "Globex",
        allocation: [
          {
            hours: 4,
            startDate: new Date("2026-05-09"),
            endDate: new Date("2026-06-13"),
          },
          {
            hours: 8,
            startDate: new Date("2026-06-14"),
            endDate: new Date("2026-07-04"),
          },
        ],
      },
    ],
  },
  {
    name: "Aiko Tanaka",
    role: "QA Engineer",
    projects: [
      {
        name: "Test Automation",
        dateRange: "Apr 9 - Jun 13",
        client: "Internal",
        allocation: [
          {
            hours: 8,
            startDate: new Date("2026-04-09"),
            endDate: new Date("2026-04-23"),
          },
          {
            hours: 11,
            startDate: new Date("2026-04-24"),
            endDate: new Date("2026-05-14"),
          },
          {
            hours: 5,
            startDate: new Date("2026-05-15"),
            endDate: new Date("2026-06-13"),
          },
        ],
      },
      {
        // overlaps with Test Automation: Jun 3 – Jun 13
        name: "Regression Suite",
        dateRange: "Jun 3 - Jul 25",
        client: "Internal",
        allocation: [
          {
            hours: 6,
            startDate: new Date("2026-06-03"),
            endDate: new Date("2026-07-08"),
          },
        ],
      },
    ],
  },
  {
    name: "Marcus Thompson",
    role: "DevOps Engineer",
    badge: "Active",
    projects: [
      {
        name: "CI/CD Pipeline",
        dateRange: "Apr 9 - May 30",
        client: "Internal",
        badge: "Active",
        allocation: [
          {
            hours: 8,
            startDate: new Date("2026-04-09"),
            endDate: new Date("2026-05-07"),
          },
          {
            hours: 8,
            startDate: new Date("2026-05-08"),
            endDate: new Date("2026-05-28"),
          },
        ],
      },
      {
        // overlaps with CI/CD Pipeline: May 19 – May 28
        name: "Infrastructure Hardening",
        dateRange: "May 19 - Jul 18",
        client: "Internal",
        allocation: [
          {
            hours: 4,
            startDate: new Date("2026-05-19"),
            endDate: new Date("2026-06-28"),
          },
          {
            hours: 10,
            startDate: new Date("2026-06-29"),
            endDate: new Date("2026-07-08"),
          },
        ],
      },
    ],
  },
  {
    name: "Sofia Müller",
    role: "Frontend Developer",
    projects: [
      {
        name: "Component Library",
        dateRange: "Apr 9 - Jun 27",
        client: "Internal",
        allocation: [
          {
            hours: 6,
            startDate: new Date("2026-04-09"),
            endDate: new Date("2026-04-30"),
          },
          {
            hours: 8,
            startDate: new Date("2026-05-01"),
            endDate: new Date("2026-05-28"),
          },
          {
            hours: 10,
            startDate: new Date("2026-05-29"),
            endDate: new Date("2026-06-27"),
          },
        ],
      },
      {
        // overlaps with Component Library: Jun 18 – Jun 27
        name: "Mobile First Sprint",
        dateRange: "Jun 18 - Jul 25",
        client: "Internal",
        allocation: [
          {
            hours: 8,
            startDate: new Date("2026-06-18"),
            endDate: new Date("2026-07-08"),
          },
        ],
      },
    ],
  },
  {
    name: "Raj Patel",
    role: "Data Analyst",
    badge: "New",
    projects: [
      {
        name: "Analytics Dashboard",
        dateRange: "Apr 9 - May 23",
        client: "Acme Inc",
        allocation: [
          {
            hours: 8,
            startDate: new Date("2026-04-09"),
            endDate: new Date("2026-05-09"),
          },
          {
            hours: 4,
            startDate: new Date("2026-05-10"),
            endDate: new Date("2026-05-23"),
          },
        ],
      },
      {
        // overlaps with Analytics Dashboard: May 17 – May 23
        name: "Data Pipeline",
        dateRange: "May 17 - Jul 25",
        client: "Acme Inc",
        allocation: [
          {
            hours: 4,
            startDate: new Date("2026-05-17"),
            endDate: new Date("2026-06-18"),
          },
          {
            hours: 8,
            startDate: new Date("2026-06-19"),
            endDate: new Date("2026-07-08"),
          },
        ],
      },
    ],
  },
  {
    name: "Emeka Okafor",
    role: "Scrum Master",
    projects: [
      {
        name: "Sprint Facilitation",
        dateRange: "Ongoing",
        client: "Internal",
        allocation: [
          {
            hours: 3,
            startDate: new Date("2026-04-09"),
            endDate: new Date("2026-07-08"),
          },
        ],
      },
    ],
  },
  {
    name: "Claire Dupont",
    role: "Tech Lead",
    badge: "Active",
    projects: [
      {
        name: "Platform Upgrade",
        dateRange: "Apr 9 - May 30",
        client: "Initech",
        badge: "Active",
        allocation: [
          {
            hours: 8,
            startDate: new Date("2026-04-09"),
            endDate: new Date("2026-04-30"),
          },
          {
            hours: 10,
            startDate: new Date("2026-05-01"),
            endDate: new Date("2026-05-14"),
          },
          {
            hours: 6,
            startDate: new Date("2026-05-15"),
            endDate: new Date("2026-05-28"),
          },
        ],
      },
      {
        name: "Architecture Review",
        dateRange: "Jun 2 - Jul 25",
        client: "Initech",
        allocation: [
          {
            hours: 4,
            startDate: new Date("2026-06-02"),
            endDate: new Date("2026-06-23"),
          },
          {
            hours: 8,
            startDate: new Date("2026-06-24"),
            endDate: new Date("2026-07-08"),
          },
        ],
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
      control: "date",
      description: "Any date within the first week to display.",
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
    startDate: new Date("2026-04-06"),
    weekCount: 14,
    members: fakeRows,
  },
};

export const WithoutWeekend: Story = {
  args: {
    startDate: new Date("2026-04-06"),
    weekCount: 16,
    members: fakeRows,
    showWeekend: false,
  },
};
