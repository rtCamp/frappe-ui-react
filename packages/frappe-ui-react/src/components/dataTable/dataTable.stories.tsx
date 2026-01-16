import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable } from "./index";
import type { DataTableColumn } from "./types";
import { Badge } from "../badge";
import { Button } from "../button";

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  tags: ["autodocs"],
  component: DataTable,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
}

const sampleData: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "active", createdAt: "2024-01-15" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "active", createdAt: "2024-01-20" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "User", status: "inactive", createdAt: "2024-02-01" },
  { id: "4", name: "Alice Williams", email: "alice@example.com", role: "Moderator", status: "active", createdAt: "2024-02-10" },
  { id: "5", name: "Charlie Brown", email: "charlie@example.com", role: "User", status: "active", createdAt: "2024-02-15" },
];

const columns: DataTableColumn<User>[] = [
  {
    id: "name",
    label: "Name",
    accessor: "name",
    sortable: true,
  },
  {
    id: "email",
    label: "Email",
    accessor: "email",
    sortable: true,
  },
  {
    id: "role",
    label: "Role",
    accessor: "role",
    sortable: true,
  },
  {
    id: "status",
    label: "Status",
    accessor: "status",
    sortable: true,
    render: (value) => (
      <Badge
        label={String(value)}
        theme={value === "active" ? "green" : "red"}
        variant="subtle"
      />
    ),
  },
  {
    id: "createdAt",
    label: "Created At",
    accessor: "createdAt",
    sortable: true,
  },
  {
    id: "actions",
    label: "Actions",
    accessor: () => null,
    render: () => (
      <div className="flex gap-2">
        <Button label="Edit" theme="blue" variant="ghost" size="sm" />
        <Button label="Delete" theme="red" variant="ghost" size="sm" />
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
    loading: false,
    selectable: false,
    showPagination: false,
  },
  render: (args) => (
    <div style={{ width: "100%" }}>
      <DataTable {...args} />
    </div>
  ),
  argTypes: {
    data: {
      control: "object",
      description: "Array of data rows",
    },
    columns: {
      control: "object",
      description: "Column definitions",
    },
    loading: {
      control: "boolean",
      description: "Whether to show loading state",
    },
    selectable: {
      control: "boolean",
      description: "Whether rows are selectable",
    },
    showPagination: {
      control: "boolean",
      description: "Whether to show pagination",
    },
    onSelectionChange: {
      control: false,
      description: "Callback when selection changes",
    },
    onSortChange: {
      control: false,
      description: "Callback when sort changes",
    },
    onRowClick: {
      control: false,
      description: "Callback when a row is clicked",
    },
    emptyMessage: {
      control: "text",
      description: "Custom empty state message",
    },
    className: {
      control: "text",
      description: "Custom class name",
    },
  },
};

export const WithSelection: Story = {
  args: {
    ...Default.args,
    selectable: true,
  },
  render: (args) => (
    <div style={{ width: "100%" }}>
      <DataTable {...args} />
    </div>
  ),
};

export const WithEditDelete: Story = {
  args: {
    ...Default.args,
    showActions: true,
    onRowEdit: (row, index) => {
      alert(`Edit row ${index}: ${JSON.stringify(row)}`);
    },
    onRowDelete: (row, index) => {
      if (confirm(`Delete row ${index}?`)) {
        alert(`Deleted: ${JSON.stringify(row)}`);
      }
    },
  },
  render: (args) => (
    <div style={{ width: "100%" }}>
      <DataTable {...args} />
    </div>
  ),
};

export const WithPagination: Story = {
  args: {
    ...Default.args,
    showPagination: true,
    pagination: {
      page: 1,
      pageSize: 2,
      total: sampleData.length,
      onPageChange: (page) => console.log("Page changed:", page),
      onPageSizeChange: (pageSize) => console.log("Page size changed:", pageSize),
    },
  },
  render: (args) => (
    <div style={{ width: "100%" }}>
      <DataTable {...args} />
    </div>
  ),
};

export const WithSorting: Story = {
  args: {
    ...Default.args,
    sort: {
      columnId: "name",
      direction: "asc",
    },
  },
  render: (args) => (
    <div style={{ width: "100%" }}>
      <DataTable {...args} />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
  render: (args) => (
    <div style={{ width: "100%" }}>
      <DataTable {...args} />
    </div>
  ),
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: [],
  },
  render: (args) => (
    <div style={{ width: "100%" }}>
      <DataTable {...args} />
    </div>
  ),
};


