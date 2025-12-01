import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

import Dropdown from "./dropdown";
import { Button } from "../button";
import type { DropdownOptions } from "./types";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    options: {
      control: "object",
      description:
        "An array of dropdown options, which can be individual items or groups.",
    },
    placement: {
      control: { type: "select", options: ["left", "right", "center"] },
      description: "Placement of the dropdown content relative to the trigger.",
    },
    button: {
      control: "object",
      description:
        "Props for the default button trigger if no children are provided.",
    },
    children: {
      control: "text",
      description: "Custom trigger element for the dropdown.",
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
            submenu: [
              {
                label: "Export as PDF",
                icon: "file-text",
                onClick: () => action("Export as PDF clicked")(),
              },
              {
                label: "Export as CSV",
                icon: "file",
                onClick: () => action("Export as CSV clicked")(),
              },
            ],
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
  ...DropdownTemplate,
  args: {
    options: submenuActions,
    button: { label: "With Submenus" },
  },
};

export const WithNestedSubmenus: StoryObj<typeof Dropdown> = {
  ...DropdownTemplate,
  args: {
    options: groupedActions,
    button: { label: "Nested Submenus" },
  },
};
