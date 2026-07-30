import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

import { useState } from "react";
import Dropdown from "./dropdown";
import { Button } from "../button";
import { Calendar, Delete, DotHorizontal, Duplicate, Edit, Kanban, List } from "../../icons";
import type { DropdownOptions } from "./types";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    options: {
      control: "object",
      description: "An array of dropdown options, which can be individual items or groups.",
    },
    placement: {
      control: { type: "select", options: ["left", "right", "center"] },
      description: "Placement of the dropdown content relative to the trigger.",
    },
    side: {
      control: { type: "select", options: ["top", "bottom", "left", "right"] },
      description: "Which side of the trigger the dropdown opens on.",
    },
    button: {
      control: "object",
      description: "Props for the default button trigger if no children are provided.",
    },
    children: {
      control: "text",
      description: "Custom trigger element for the dropdown.",
    },
    dropdownClassName: {
      control: "text",
      description: "Additional class name for the dropdown content.",
    },
    groupClassName: {
      control: "text",
      description: "Additional class name for dropdown groups.",
    },
    renderItems: {
      control: false,
      description: "Function to render custom dropdown items, receives options as argument.",
    },
    renderMenuItem: {
      control: false,
      description:
        "Overrides the rendering of plain menu items. Receives the default item props (className, children with icon + label) and `{ item }` as state.",
    },
    selectedKey: {
      control: "text",
      description: "Key of the currently selected dropdown item, used for highlighting.",
    },
    selectedGroupKey: {
      control: "text",
      description: "Key of the currently selected dropdown group, used for highlighting.",
    },
  },
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  tags: ["autodocs"],
} as Meta<typeof Dropdown>;

const actions: DropdownOptions = [
  {
    label: "Edit",
    icon: "edit",
    onClick: () => action("Edit clicked")(),
  },
  {
    label: "Delete",
    icon: "trash-2",
    theme: "red",
    onClick: () => action("Delete clicked")(),
  },
];

const groupedActions: DropdownOptions = [
  {
    group: "Actions",
    key: "actions-group",
    items: [
      {
        label: "Edit",
        icon: "edit",
        onClick: () => action("Edit clicked")(),
      },
      {
        label: "Duplicate",
        icon: "copy",
        onClick: () => action("Duplicate clicked")(),
      },
      {
        label: "More Actions",
        icon: "more-horizontal",
        submenu: [
          {
            label: "Archive",
            icon: "archive",
            onClick: () => action("Archive clicked")(),
          },
          {
            label: "Export",
            icon: "download",
          },
          {
            label: "Share",
            icon: "share",
            onClick: () => action("Share clicked")(),
          },
        ],
      },
    ],
  },
  {
    group: "Danger",
    key: "danger-group",
    items: [
      {
        label: "Delete",
        icon: "trash-2",
        theme: "red",
        onClick: () => action("Delete clicked")(),
      },
    ],
  },
];

const submenuActions: DropdownOptions = [
  {
    label: "New",
    icon: "plus",
    submenu: [
      {
        group: "Documents",
        key: "new-docs-group",
        items: [
          {
            label: "New Document",
            icon: "file-plus",
            onClick: () => action("New Document clicked")(),
          },
          {
            label: "New Template",
            icon: "file-text",
            onClick: () => action("New Template clicked")(),
          },
          {
            label: "Delete",
            icon: "trash-2",
            theme: "red",
            onClick: () => action("Delete clicked")(),
          },
        ],
      },
      {
        group: "Organization",
        key: "new-org-group",
        items: [
          {
            label: "New Folder",
            icon: "folder-plus",
            onClick: () => action("New Folder clicked")(),
          },
          {
            label: "New Project",
            icon: "briefcase",
            onClick: () => action("New Project clicked")(),
          },
        ],
      },
    ],
  },
  {
    label: "Edit",
    icon: "edit",
    onClick: () => action("Edit clicked")(),
  },
  {
    label: "Share",
    icon: "share",
    submenu: [
      {
        label: "Share with Link",
        icon: "link",
        onClick: () => action("Share with Link clicked")(),
      },
      {
        label: "Share with Email",
        icon: "mail",
        onClick: () => action("Share with Email clicked")(),
      },
      {
        group: "Advanced",
        key: "share-advanced-group",
        items: [
          {
            label: "Share Settings",
            icon: "settings",
            onClick: () => action("Share Settings clicked")(),
          },
          {
            label: "Permission Management",
            icon: "shield",
            onClick: () => action("Permission Management clicked")(),
          },
        ],
      },
    ],
  },
];

const DropdownTemplate: StoryObj<typeof Dropdown> = {
  render: (args) => (
    <div className="p-4 flex justify-center items-center h-40">
      <Dropdown {...args} />
    </div>
  ),
};

export const Default: StoryObj<typeof Dropdown> = {
  ...DropdownTemplate,
  args: {
    options: actions,
    button: { label: "Options" },
  },
};

export const WithCustomButton: StoryObj<typeof Dropdown> = {
  ...DropdownTemplate,
  args: {
    options: actions,
    children: <Button variant="solid">Custom Trigger</Button>,
  },
};

export const WithGroups: StoryObj<typeof Dropdown> = {
  ...DropdownTemplate,
  args: {
    options: groupedActions,
    button: { label: "Grouped Options" },
  },
};

export const RightAligned: StoryObj<typeof Dropdown> = {
  ...DropdownTemplate,
  args: {
    options: actions,
    placement: "right",
    button: { label: "Right Aligned" },
  },
};

export const CenterAligned: StoryObj<typeof Dropdown> = {
  ...DropdownTemplate,
  args: {
    options: actions,
    placement: "center",
    button: { label: "Center Aligned" },
  },
};

export const WithSubmenus: StoryObj<typeof Dropdown> = {
  args: {
    options: submenuActions,
    button: { label: "With Submenus" },
  },
  render: function Render(args) {
    const [collaborateValue, setCollaborateValue] = useState(false);

    const options: DropdownOptions = [
      ...submenuActions,
      {
        label: "Collaborate",
        switch: true,
        icon: "file-text",
        switchValue: collaborateValue,
        onClick: (val) => {
          setCollaborateValue(val as boolean);
          action("Collaborate switch value:")(val);
        },
      },
    ];

    return (
      <div className="p-4 flex justify-center items-center h-40">
        <Dropdown {...args} options={options} />
      </div>
    );
  },
};

export const WithSwitches: StoryObj<typeof Dropdown> = {
  args: {
    button: { label: "With Switches" },
  },
  render: function Render(args) {
    const [lockValue, setLockValue] = useState(true);
    const [collaborateValue, setCollaborateValue] = useState(false);

    const options: DropdownOptions = [
      {
        label: "Rename",
        icon: "edit",
        onClick: () => action("Rename clicked")(),
      },
      {
        label: "Lock",
        icon: "lock",
        switch: true,
        switchValue: lockValue,
        onClick: (val) => {
          setLockValue(val as boolean);
          action("Lock switch value:")(val);
        },
      },
      {
        label: "Collaborate",
        switch: true,
        icon: "users",
        switchValue: collaborateValue,
        onClick: (val) => {
          setCollaborateValue(val as boolean);
          action("Collaborate switch value:")(val);
        },
      },
    ];

    return (
      <div className="p-4 flex justify-center items-center h-40">
        <Dropdown {...args} options={options} />
      </div>
    );
  },
};

export const WithNestedSubmenus: StoryObj<typeof Dropdown> = {
  ...DropdownTemplate,
  args: {
    options: groupedActions,
    button: { label: "Nested Submenus" },
  },
};

export const OpensToTheRight: StoryObj<typeof Dropdown> = {
  ...DropdownTemplate,
  args: {
    options: actions,
    side: "right",
    button: { label: "Opens Right" },
  },
};

const views: DropdownOptions = [
  {
    label: "List",
    key: "list",
    icon: <List className="mr-2 h-4 w-4" />,
    onClick: () => action("List clicked")(),
  },
  {
    label: "Kanban",
    key: "kanban",
    icon: <Kanban className="mr-2 h-4 w-4" />,
    onClick: () => action("Kanban clicked")(),
  },
  {
    label: "Calendar",
    key: "calendar",
    icon: <Calendar className="mr-2 h-4 w-4" />,
    onClick: () => action("Calendar clicked")(),
  },
];

const viewActions: DropdownOptions = [
  {
    group: "",
    key: "view-actions",
    items: [
      {
        label: "Duplicate",
        icon: <Duplicate className="mr-2 h-4 w-4" />,
        onClick: () => action("Duplicate clicked")(),
      },
      {
        label: "Edit",
        icon: <Edit className="mr-2 h-4 w-4" />,
        onClick: () => action("Edit clicked")(),
      },
    ],
  },
  {
    group: "",
    key: "view-danger-actions",
    items: [
      {
        label: "Delete",
        icon: <Delete className="mr-2 h-4 w-4" />,
        theme: "red",
        onClick: () => action("Delete clicked")(),
      },
    ],
  },
];

export const WithRenderMenuItem: StoryObj<typeof Dropdown> = {
  ...DropdownTemplate,
  args: {
    options: views,
    selectedKey: "list",
    button: { label: "Views" },
    renderMenuItem: (props, state) =>
      state.item.key === "list" ? (
        <button {...props} />
      ) : (
        <div {...props}>
          {props.children}
          <div className="ml-auto">
            <Dropdown options={viewActions} side="right">
              <button
                type="button"
                aria-label={`Actions for ${state.item.label}`}
                className="flex rounded p-0.5 text-ink-gray-6 hover:bg-surface-gray-4"
                onClick={(event) => event.stopPropagation()}
              >
                <DotHorizontal className="h-4 w-4" />
              </button>
            </Dropdown>
          </div>
        </div>
      ),
  },
};
