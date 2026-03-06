import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Filter } from "./index";
import type { FilterCondition, FilterField } from "./types";

const meta: Meta<typeof Filter> = {
  title: "Components/Filter",
  tags: ["autodocs"],
  component: Filter,
  parameters: {
    docs: {
      source: { type: "dynamic" },
      story: { height: "400px" },
    },
    layout: "centered",
  },
  argTypes: {
    fields: {
      control: "object",
      description: "Available fields that can be filtered",
    },
    value: {
      control: "object",
      description: "Current filter conditions",
    },
    onChange: {
      action: "changed",
      description: "Callback when filters change",
    },
    maxFilters: {
      control: "number",
      description: "Maximum number of filters allowed",
    },
    showCount: {
      control: "boolean",
      description: "Whether to show the filter count badge",
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the filter panel is open by default",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Filter>;

const projectOptions = [
  { label: "Atlas UI Stabilization", value: "atlas-ui" },
  { label: "Backend Refactor", value: "backend" },
  { label: "Mobile App v2", value: "mobile-v2" },
  { label: "Dashboard Redesign", value: "dashboard" },
  { label: "API Documentation", value: "api-docs" },
];

const statusOptions = [
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in-progress" },
  { label: "Review", value: "review" },
  { label: "Done", value: "done" },
  { label: "Cancelled", value: "cancelled" },
];

const priorityOptions = [
  { label: "Urgent", value: "urgent" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

const assigneeOptions = [
  { label: "John Doe", value: "john" },
  { label: "Jane Smith", value: "jane" },
  { label: "Bob Wilson", value: "bob" },
  { label: "Alice Johnson", value: "alice" },
];

const sampleFields: FilterField[] = [
  {
    name: "project",
    label: "Project",
    type: "select",
    options: projectOptions,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: statusOptions,
  },
  {
    name: "priority",
    label: "Priority",
    type: "select",
    options: priorityOptions,
  },
  {
    name: "assignee",
    label: "Assignee",
    type: "select",
    options: assigneeOptions,
  },
  {
    name: "title",
    label: "Title",
    type: "string",
  },
  {
    name: "due_date",
    label: "Due Date",
    type: "date",
  },
  {
    name: "estimate",
    label: "Estimate (hours)",
    type: "number",
  },
];

// Controlled component wrapper
const FilterWithState = (props: React.ComponentProps<typeof Filter>) => {
  const [filters, setFilters] = React.useState<FilterCondition[]>(
    props.value || []
  );

  return (
    <Filter
      {...props}
      value={filters}
      onChange={(newFilters) => {
        setFilters(newFilters);
        props.onChange?.(newFilters);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <FilterWithState {...args} />,
  args: {
    fields: sampleFields,
  },
};

export const WithInitialFilters: Story = {
  render: (args) => <FilterWithState {...args} />,
  args: {
    fields: sampleFields,
    value: [
      {
        id: "1",
        field: "project",
        operator: "is",
        value: "atlas-ui",
      },
    ],
  },
};

export const MultipleFilters: Story = {
  render: (args) => <FilterWithState {...args} />,
  args: {
    fields: sampleFields,
    value: [
      {
        id: "1",
        field: "project",
        operator: "is",
        value: "atlas-ui",
      },
      {
        id: "2",
        field: "status",
        operator: "is",
        value: "in-progress",
      },
      {
        id: "3",
        field: "assignee",
        operator: "is",
        value: "john",
      },
    ],
  },
};

export const WithoutCount: Story = {
  render: (args) => <FilterWithState {...args} />,
  args: {
    fields: sampleFields,
    showCount: false,
    value: [
      {
        id: "1",
        field: "project",
        operator: "is",
        value: "atlas-ui",
      },
    ],
  },
};

export const LimitedFilters: Story = {
  render: (args) => <FilterWithState {...args} />,
  args: {
    fields: sampleFields,
    maxFilters: 3,
  },
};

export const SimpleFields: Story = {
  render: (args) => <FilterWithState {...args} />,
  args: {
    fields: [
      { name: "name", label: "Name", type: "string" },
      { name: "email", label: "Email", type: "string" },
      { name: "age", label: "Age", type: "number" },
    ],
  },
};

export const DefaultOpen: Story = {
  render: (args) => <FilterWithState {...args} />,
  args: {
    fields: sampleFields,
    defaultOpen: true,
  },
};
