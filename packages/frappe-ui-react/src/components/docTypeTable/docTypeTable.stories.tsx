import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../avatar";
import ListView from "../listview/listView";

const meta: Meta = {
  title: "Components/DocTypeTable",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
DocTypeTable is a general-purpose table component for displaying Frappe DocType documents.

## Key Features
- **Automatic Data Fetching**: Fetches data from Frappe backend using useFrappeGetDocList hook
- **Transparent Parameter Passing**: All useFrappeGetDocList parameters flow directly through the component
- **Configurable Columns**: Define table structure with custom rendering
- **State Management**: Handles loading, error, and empty states
- **Selection Support**: Built-in row selection capability
- **Customizable Components**: Override loading, error, and empty states with custom components

## Usage Example
\`\`\`tsx
<DocTypeTable
  doctype="User"
  columns={[
    {
      label: "Name",
      key: "name",
      width: 3,
      prefix: ({ row }) => <Avatar image={row.user_image} label={row.name} />
    },
    { label: "Email", key: "email", width: "200px" },
    { label: "Type", key: "user_type" },
  ]}
  params={{
    fields: ['name', 'email', 'user_type', 'enabled'],
    filters: { enabled: 1 },
    limit: 20
  }}
  rowKey="name"
/>
\`\`\`

## Component Props
- \`doctype\`: Frappe DocType name (e.g., 'User', 'Employee')
- \`columns\`: Column configuration array
- \`params\`: Query parameters (fields, filters, orderBy, limit, offset)
- \`rowKey\`: Primary key field for identifying rows
- \`auto\`: Auto-fetch on mount (default: true)
- \`loadingComponent\`: Custom loading UI component
- \`emptyComponent\`: Custom empty state component
- \`errorComponent\`: Custom error component
- \`onDataLoad\`: Callback when data loads
- \`onError\`: Callback on error
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const columns = [
  {
    label: "Name",
    key: "name",
    width: 3,
    getLabel: ({ row }: { row: Record<string, unknown> }) => row.name,
    prefix: ({ row }: { row: Record<string, unknown> }) => (
      <Avatar
        shape="circle"
        image={row.user_image as string | undefined}
        size="sm"
        label={row.name as string}
      />
    ),
  },
  {
    label: "Email",
    key: "email",
    width: "200px",
  },
  {
    label: "Type",
    key: "user_type",
  },
  {
    label: "Enabled",
    key: "enabled",
  },
];

const rows = [
  {
    name: "John Doe",
    email: "john@example.com",
    user_type: "System User",
    enabled: 1,
    user_image: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    user_type: "System User",
    enabled: 1,
    user_image: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    user_type: "Website User",
    enabled: 0,
    user_image: "https://i.pravatar.cc/150?img=3",
  },
];

export const Default: Story = {
  render: (args) => (
    <ListView
      columns={columns}
      rows={args.rows as Array<Record<string, unknown>>}
      rowKey={args.rowKey as string}
      options={args.options}
    />
  ),
  args: {
    rows,
    rowKey: "name",
    options: {
      options: {
        selectable: true,
      },
    },
  },
};

export const Loading: Story = {
  render: () => (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        <p className="mt-3 text-gray-600">Loading records...</p>
      </div>
    </div>
  ),
};

export const WithBadges: Story = {
  render: (args) => {
    const columnsWithBadges = [
      {
        label: "Name",
        key: "name",
        width: 3,
        getLabel: ({ row }: { row: Record<string, unknown> }) => row.name,
        prefix: ({ row }: { row: Record<string, unknown> }) => (
          <Avatar
            shape="circle"
            image={row.user_image as string | undefined}
            size="sm"
            label={row.name as string}
          />
        ),
      },
      {
        label: "Email",
        key: "email",
        width: "200px",
      },
      {
        label: "Type",
        key: "user_type",
      },
      {
        label: "Status",
        key: "enabled",
        getLabel: ({ row }: { row: Record<string, unknown> }) => (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              row.enabled
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {row.enabled ? "Active" : "Inactive"}
          </span>
        ),
      },
    ];

    return (
      <ListView
        columns={columnsWithBadges}
        rows={args.rows as Array<Record<string, unknown>>}
        rowKey={args.rowKey as string}
        options={args.options}
      />
    );
  },
  args: {
    rows,
    rowKey: "name",
    options: {
      options: {
        selectable: true,
      },
    },
  },
};

export const Empty: Story = {
  render: () => (
    <div className="text-center py-12 bg-gray-50 rounded-lg">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <p className="text-gray-500 text-lg mt-4">No records found</p>
      <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
    </div>
  ),
};
