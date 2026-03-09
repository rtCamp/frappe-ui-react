import type { Meta, StoryObj } from "@storybook/react-vite";
import { Home, LucideSettings, LucideUser } from "lucide-react";

import Sidebar from "./sidebar";
import {
  Batches,
  Notifications,
  Search,
  Tasks,
  Layers,
  Reports,
  Folder,
  Time,
  People
} from "../../icons";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  tags: ["autodocs"],
  parameters: { docs: { source: { type: "dynamic" } }, layout: "padded" },
  argTypes: {
    header: {
      control: "object",
      description: "Header configuration for the sidebar.",
    },
    sections: {
      control: "object",
      description: "Sections configuration for the sidebar.",
    },
    collapsed: {
      control: "boolean",
      description: "Whether the sidebar is collapsed.",
    },
    onCollapseChange: {
      action: "onCollapseChange",
      description:
        "Callback function triggered when the sidebar collapse state changes.",
    },
    children: {
      control: "object",
      description: "Child elements to be rendered inside the sidebar.",
    },
    className: {
      control: "text",
      description: "Custom CSS class name for the sidebar.",
    },
  },
  component: Sidebar,
};

export default meta;
type Story = StoryObj<typeof meta>;

const crmSidebar = {
  header: {
    title: "Frappe CRM",
    subtitle: "Jane Doe",
    logo: "https://raw.githubusercontent.com/frappe/crm/develop/.github/logo.svg",
    menuItems: [
      {
        label: "Help",
        to: "/help",
        icon: <LucideSettings size={16} className="text-ink-gray-6 mr-2" />,
        onClick: () => alert("Help clicked!"),
      },
      {
        label: "Logout",
        to: "/logout",
        icon: <LucideUser size={16} className="text-ink-gray-6 mr-2" />,
        onClick: () => alert("Logging out..."),
      },
    ],
  },
  sections: [
    {
      label: "",
      items: [
        {
          label: "Notifications",
          icon: Notifications,
          to: "",
        },
        {
          label: "Search",
          icon: Search,
          to: "",
        },
      ],
    },
    {
      label: "",
      items: [
        {
          label: "Home",
          icon: Home,
          to: "",
        },
        {
          label: "Tasks",
          icon: Tasks,
          to: "",
        },
        {
          label: "Projects",
          icon: Folder,
          to: "",
        },
      ],
    },
    {
      label: "Timesheet",
      collapsible: true,
      items: [
        {
          label: "Personal",
          icon: Time,
          to: "",
        },
        {
          label: "Team",
          icon: People,
          to: "",
        },
        {
          label: "Projects",
          icon: Folder,
          to: "",
        },
      ],
    },
    {
      label: "",
      items: [
        {
          label: "Allocation",
          icon: Batches,
          to: "",
        },
        {
          label: "Roadmap",
          icon: Layers,
          to: "",
        },
        {
          label: "Reports",
          icon: Reports,
          to: "",
        },
      ],
    },
  ],
};

export const SidebarExample: Story = {
  render: () => {
    return (
      <div
        className="flex h-screen w-full flex-col bg-surface-white shadow"
        id="sidebar-container"
      >
        <Sidebar
          header={{
            ...crmSidebar.header,
          }}
          sections={crmSidebar.sections}
        />
      </div>
    );
  },
};
