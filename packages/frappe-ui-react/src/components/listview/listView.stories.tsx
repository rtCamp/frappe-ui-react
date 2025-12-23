import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";

import ListView from "./listView";
import { Avatar } from "../avatar";
import { Badge } from "../badge";
import { Button } from "../button";
import FeatherIcon from "../featherIcon";
import ListHeader from "./listHeader";
import ListHeaderItem from "./listHeaderItem";
import ListRow from "./listRow";
import ListRowItem from "./listRowItem";
import ListRows from "./listRows";
import ListSelectBanner from "./listSelectBanner";

const simple_columns = [
  {
    label: "Name",
    key: "name",
    width: 3,
    getLabel: ({ row }) => row.name,
    prefix: ({ row }) => (
      <Avatar
        shape="circle"
        image={row.user_image}
        size="sm"
        label={row.name}
      />
    ),
  },
  {
    label: "Email",
    key: "email",
    width: "200px",
  },
  {
    label: "Role",
    key: "role",
  },
  {
    label: "Status",
    key: "status",
  },
];

const simple_rows = [
  {
    id: 1,
    name: "John Doe",
    email: "john@doe.com",
    status: "Active",
    role: "Developer",
    user_image: "https://avatars.githubusercontent.com/u/499550",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@doe.com",
    status: "Inactive",
    role: "HR",
    user_image: "https://avatars.githubusercontent.com/u/499120",
  },
];

const group_columns = [
  {
    label: "Name",
    key: "name",
    width: 3,
  },
  {
    label: "Email",
    key: "email",
    width: "200px",
  },
  {
    label: "Role",
    key: "role",
  },
  {
    label: "Status",
    key: "status",
  },
];

const grouped_rows = [
  {
    group: "Developer",
    collapsed: false,
    rows: [
      {
        id: 2,
        name: "Gary Fox",
        email: "gary@fox.com",
        status: "Inactive",
        role: "Developer",
      },
      {
        id: 6,
        name: "Emily Davis",
        email: "emily@davis.com",
        status: "Active",
        role: "Developer",
      },
      {
        id: 9,
        name: "David Lee",
        email: "david@lee.com",
        status: "Inactive",
        role: "Developer",
      },
    ],
  },
  {
    group: "Manager",
    collapsed: false,
    rows: [
      {
        id: 3,
        name: "John Doe",
        email: "john@doe.com",
        status: "Active",
        role: "Manager",
      },
      {
        id: 8,
        name: "Sarah Wilson",
        email: "sarah@wilson.com",
        status: "Active",
        role: "Manager",
      },
    ],
  },
  {
    group: "Designer",
    collapsed: false,
    rows: [
      {
        id: 4,
        name: "Alice Smith",
        email: "alice@smith.com",
        status: "Active",
        role: "Designer",
      },
      {
        id: 10,
        name: "Olivia Taylor",
        email: "olivia@taylor.com",
        status: "Active",
        role: "Designer",
      },
    ],
  },
  {
    group: "HR",
    collapsed: false,
    rows: [
      {
        id: 1,
        name: "Jane Mary",
        email: "jane@doe.com",
        status: "Inactive",
        role: "HR",
      },
      {
        id: 7,
        name: "Michael Brown",
        email: "michael@brown.com",
        status: "Inactive",
        role: "HR",
      },
      {
        id: 12,
        name: "Sophia Martinez",
        email: "sophia@martinez.com",
        status: "Active",
        role: "HR",
      },
    ],
  },
  {
    group: "Tester",
    collapsed: false,
    rows: [
      {
        id: 5,
        name: "Bob Johnson",
        email: "bob@johnson.com",
        status: "Inactive",
        role: "Tester",
      },
      {
        id: 11,
        name: "James Anderson",
        email: "james@anderson.com",
        status: "Inactive",
        role: "Tester",
      },
    ],
  },
];

const custom_columns = [
  { label: "Name", key: "name", width: 3, icon: "user" },
  { label: "Email", key: "email", width: "200px", icon: "at-sign" },
  { label: "Role", key: "role", icon: "users" },
  { label: "Status", key: "status", icon: "check-circle" },
];

const custom_rows = [
  {
    id: 1,
    name: {
      label: "John Doe",
      image: "https://avatars.githubusercontent.com/u/499550",
    },
    email: "john@doe.com",
    status: {
      label: "Active",
      bg_color: "bg-surface-green-3",
    },
    role: {
      label: "Developer",
      color: "green",
    },
  },
  {
    id: 2,
    name: {
      label: "Jane Doe",
      image: "https://avatars.githubusercontent.com/u/499120",
    },
    email: "jane@doe.com",
    status: {
      label: "Inactive",
      bg_color: "bg-surface-red-5",
    },
    role: {
      label: "HR",
      color: "red",
    },
  },
];

const meta: Meta<typeof ListView> = {
  title: "Components/ListView",
  component: ListView,
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: { type: "object" },
    },
    rows: {
      control: { type: "object" },
    },
    columns: {
      control: { type: "object" },
    },
    rowKey: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ListView>;

export const SimpleList: Story = {
  render: (args) => {
    return (
      <div>
        <ListView
          {...args}
          columns={simple_columns}
          rows={simple_rows}
          rowKey="id"
        />
      </div>
    );
  },
  args: {
    options: {
      options: {
        onRowClick: (row) => `/users/${row.id}`,
        selectable: true,
        showTooltip: true,
        resizeColumn: true,
      },
    },
  },
};

export const CustomList: Story = {
  render: (args) => {
    const [columns, _setColumns] = useState<typeof custom_columns>([]);
    useEffect(() => {
      _setColumns(custom_columns);
    }, []);

    return columns.length > 0 ? (
      <div>
        <ListView {...args} columns={columns} rows={custom_rows} rowKey="id">
          <>
            <ListHeader>
              {columns.map((column, index) => (
                <ListHeaderItem
                  key={column.key}
                  item={column}
                  onColumnWidthUpdated={(width) => {
                    _setColumns((prevColumns) => {
                      const newColumns = [...prevColumns];
                      newColumns[index] = {
                        ...newColumns[index],
                        width: `${width}px`,
                      };
                      return newColumns;
                    });
                  }}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      index === 0 ? "ml-4" : ""
                    }`}
                  >
                    <FeatherIcon name={column.icon} className="h-4 w-4" />
                    <span>{column.label}</span>
                  </div>
                </ListHeaderItem>
              ))}
            </ListHeader>
            <ListRows>
              {custom_rows.map((row) => (
                <ListRow key={row.id} row={row}>
                  {columns.map((column, index) => {
                    //@ts-expect-error item type
                    const item = row[column.key];
                    return (
                      <div className={`${index === 0 ? "ml-4" : ""}`}>
                        <ListRowItem
                          key={column.key}
                          column={column}
                          row={row}
                          item={item}
                          prefix={
                            <>
                              {column.key === "status" && (
                                <div
                                  className="h-3 w-3 rounded-full"
                                  style={{ backgroundColor: item.bg_color }}
                                />
                              )}
                              {column.key === "name" && (
                                <Avatar
                                  shape="circle"
                                  image={item.image}
                                  size="sm"
                                  label={item.label}
                                />
                              )}
                            </>
                          }
                        >
                          <>
                            {column.key === "role" ? (
                              <Badge
                                variant="subtle"
                                theme={item.color}
                                size="md"
                                label={item.label}
                              />
                            ) : (
                              <span className="font-medium text-ink-gray-7">
                                {item.label || item}
                              </span>
                            )}
                          </>
                        </ListRowItem>
                      </div>
                    );
                  })}
                </ListRow>
              ))}
            </ListRows>
            <ListSelectBanner>
              {({ unselectAll }) => (
                <div className="flex w-full justify-between">
                  <Button variant="ghost" label="Delete" />
                  <Button
                    variant="ghost"
                    label="Unselect all"
                    onClick={unselectAll}
                  />
                </div>
              )}
            </ListSelectBanner>
          </>
        </ListView>
      </div>
    ) : (
      <></>
    );
  },
  args: {
    options: {
      options: {
        onRowClick: (row) => console.log(row),
        selectable: true,
        showTooltip: true,
        resizeColumn: true,
      },
    },
  },
};

export const GroupedRows: Story = {
  render: (args) => {
    return (
      <div>
        <ListView
          {...args}
          columns={group_columns}
          rows={grouped_rows}
          rowKey="id"
          options={{
            options: {
              selectable: true,
              showTooltip: true,
              resizeColumn: true,
              onRowClick: (row) => `/users/${row.id}`,
            },
          }}
        />
      </div>
    );
  },
  args: {},
};

export const CellSlot: Story = {
  render: (args) => {
    //@ts-expect-error
    const CustomCell = ({ item, column }) => {
      if (column.key === "status") {
        return <Badge>{item}</Badge>;
      }
      return <span className="font-medium text-ink-gray-7">{item}</span>;
    };

    return (
      <div>
        <ListView
          {...args}
          columns={simple_columns}
          rows={simple_rows}
          rowKey="id"
          options={{
            options: {
              selectable: true,
              showTooltip: true,
              resizeColumn: true,
            },
            slots: {
              cell: CustomCell,
            },
            emptyState: {
              title: "No records found",
              description: "Create a new record to get started",
            },
          }}
        />
      </div>
    );
  },
  args: {},
};

export const EmptyList: Story = {
  render: (args) => {
    return (
      <div>
        <ListView
          {...args}
          columns={simple_columns}
          rows={[]}
          rowKey="id"
          options={{
            options: {
              selectable: true,
              showTooltip: true,
              resizeColumn: true,
            },
            emptyState: {
              title: "No records found",
              description: "Create a new record to get started",
              button: {
                label: "New Record",
                variant: "solid",
                onClick: () => console.log("New Record"),
              },
            },
          }}
        />
      </div>
    );
  },
  args: {},
};
