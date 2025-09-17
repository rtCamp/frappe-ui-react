import React, { useCallback } from "react";
import Sidebar from "./sidebar";
import {
  LucideBell,
  LucideBriefcase,
  LucideBuilding,
  LucideCheckSquare,
  LucideClipboard,
  LucideLink,
  LucideMail,
  LucideMoon,
  LucidePhone,
  LucideSettings,
  LucideUser,
  LucideUserCheck,
  LucideUsers,
} from "lucide-react";
import { MemoryRouter } from "react-router";
import { Meta, StoryObj } from "@storybook/react-vite/*";
import { useDarkMode } from "storybook-dark-mode";
import { noop } from "../../utils";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
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
        label: "Toggle Theme",
        icon: <LucideMoon size={16} className="text-ink-gray-6 mr-2" />,
        onClick: noop,
      },
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
          icon: <LucideBell size={16} className="text-ink-gray-6" />,
          to: "",
        },
      ],
    },
    {
      label: "",
      items: [
        {
          label: "Leads",
          icon: <LucideUsers size={16} className="text-ink-gray-6" />,
          to: "",
        },
        {
          label: "Deals",
          icon: <LucideBriefcase size={16} className="text-ink-gray-6" />,
          to: "",
        },
        {
          label: "Contacts",
          icon: <LucideUserCheck size={16} className="text-ink-gray-6" />,
          to: "",
        },
        {
          label: "Organizations",
          icon: <LucideBuilding size={16} className="text-ink-gray-6" />,
          to: "",
        },
        {
          label: "Notes",
          icon: <LucideClipboard size={16} className="text-ink-gray-6" />,
          to: "",
        },
        {
          label: "Tasks",
          icon: <LucideCheckSquare size={16} className="text-ink-gray-6" />,
          to: "",
        },
        {
          label: "Call Logs",
          icon: <LucidePhone size={16} className="text-ink-gray-6" />,
          to: "",
        },
        {
          label: "Email Templates",
          icon: <LucideMail size={16} className="text-ink-gray-6" />,
          to: "",
        },
      ],
    },
    {
      label: "Views",
      collapsible: true,
      items: [
        {
          label: "My Open Deals",
          icon: <LucideLink size={16} className="text-ink-gray-6" />,
          to: "",
        },
        {
          label: "Partnership Deals",
          icon: <LucideLink size={16} className="text-ink-gray-6" />,
          to: "",
        },
        {
          label: "Unassigned Deals",
          icon: <LucideLink size={16} className="text-ink-gray-6" />,
          to: "",
        },
        {
          label: "Enterprise Pipeline",
          icon: <LucideLink size={16} className="text-ink-gray-6" />,
          to: "",
        },
      ],
    },
  ],
};

export const SidebarExample: Story = {
  render: () => {
    const mode = useDarkMode() ? "dark" : "light";

    const toggleTheme = useCallback(() => {
      const container = document.getElementById("sidebar-container");
      if (!container) return;

      const bodyHasDark = mode === "dark";
      const containerHasDark = container.classList.contains("dark");

      // Sync container's dark class with body
      if (bodyHasDark !== containerHasDark) {
        if (bodyHasDark) {
          container.classList.add("dark");
        } else {
          container.classList.remove("dark");
        }
      }

      // Toggle theme
      if (bodyHasDark) {
        const button = parent.document.querySelector(
          '[title="Change theme to light mode"]'
        ) as HTMLButtonElement;
        if (button) button.click();

        container.classList.remove("dark");
      } else {
        const button = parent.document.querySelector(
          '[title="Change theme to dark mode"]'
        ) as HTMLButtonElement;
        if (button) button.click();

        container.classList.add("dark");
      }
    }, [mode]);

    return (
      <div
        className="flex h-screen w-full flex-col bg-surface-white shadow"
        id="sidebar-container"
      >
        <MemoryRouter>
          <Sidebar
            header={{
              ...crmSidebar.header,
              menuItems: crmSidebar.header.menuItems.map((item) =>
                item.label === "Toggle Theme"
                  ? { ...item, onClick: toggleTheme }
                  : item
              ),
            }}
            sections={crmSidebar.sections}
          />
        </MemoryRouter>
      </div>
    );
  },
};
