import type { Meta, StoryObj } from "@storybook/react-vite";
import { Timeline, ActivityFeed } from "./index";
import type { TimelineItem } from "./types";
import { Badge } from "../badge";
import FeatherIcon from "../featherIcon";

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  tags: ["autodocs"],
  component: Timeline,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

const sampleItems: TimelineItem[] = [
  {
    id: "1",
    title: "Project Created",
    description: "New project 'Website Redesign' was created",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    color: "blue",
  },
  {
    id: "2",
    title: "Task Assigned",
    description: "Task 'Design Homepage' was assigned to John Doe",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    color: "green",
  },
  {
    id: "3",
    title: "Comment Added",
    description: "Jane Smith added a comment on the design",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    color: "yellow",
  },
  {
    id: "4",
    title: "Status Changed",
    description: "Project status changed from 'Planning' to 'In Progress'",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    color: "purple",
  },
  {
    id: "5",
    title: "File Uploaded",
    description: "Design mockup file was uploaded",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    color: "gray",
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    orientation: "vertical",
    variant: "default",
    showTimestamps: true,
    showIcons: true,
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <Timeline {...args} />
    </div>
  ),
  argTypes: {
    items: {
      control: "object",
      description: "Array of timeline items",
    },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "Orientation of the timeline",
    },
    variant: {
      control: "select",
      options: ["default", "compact", "detailed"],
      description: "Variant of the timeline",
    },
    showTimestamps: {
      control: "boolean",
      description: "Whether to show timestamps",
    },
    showIcons: {
      control: "boolean",
      description: "Whether to show icons",
    },
    renderItem: {
      control: false,
      description: "Custom render function for items",
    },
    className: {
      control: "text",
      description: "Custom class name",
    },
  },
};

export const Horizontal: Story = {
  args: {
    ...Default.args,
    orientation: "horizontal",
  },
  render: (args) => (
    <div style={{ width: "100%" }}>
      <Timeline {...args} />
    </div>
  ),
};

export const Compact: Story = {
  args: {
    ...Default.args,
    variant: "compact",
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <Timeline {...args} />
    </div>
  ),
};

export const WithCustomIcons: Story = {
  args: {
    items: sampleItems.map((item, index) => ({
      ...item,
      icon: (
        <FeatherIcon
          name={index % 2 === 0 ? "check" : "file"}
          height={16}
          width={16}
        />
      ),
    })),
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <Timeline {...args} />
    </div>
  ),
};

export const WithContent: Story = {
  args: {
    items: sampleItems.map((item) => ({
      ...item,
      content: (
        <div className="mt-2 p-3 bg-surface-gray-1 rounded">
          <Badge label="Important" theme="red" variant="subtle" />
        </div>
      ),
    })),
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <Timeline {...args} />
    </div>
  ),
};

export const ActivityFeedExample: Story = {
  render: () => {
    const feedItems: TimelineItem[] = [
      ...sampleItems,
      {
        id: "6",
        title: "Review Completed",
        description: "Code review was completed and approved",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        color: "green",
      },
      {
        id: "7",
        title: "Deployment Started",
        description: "Application deployment to production started",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
        color: "blue",
      },
      {
        id: "8",
        title: "Bug Reported",
        description: "A bug was reported in the login flow",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        color: "red",
      },
    ];

    return (
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <ActivityFeed
          items={feedItems}
          maxItems={5}
          showLoadMore={true}
          onLoadMore={() => console.log("Load more clicked")}
        />
      </div>
    );
  },
};


