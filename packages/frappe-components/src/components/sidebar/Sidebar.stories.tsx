import React from "react";
import Sidebar from "./Sidebar";
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

export default {
  title: "Components/Sidebar/CRM",
  component: Sidebar,
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
};

const crmSidebar = {
  header: {
    title: "Frappe CRM",
    subtitle: "Jane Doe",
    logo: "https://raw.githubusercontent.com/frappe/crm/develop/.github/logo.svg",
    menuItems: [
      {
        label: "Toggle Theme",
        icon: <LucideMoon size={16} className="text-ink-gray-6 mr-2" />,
        onClick: toggleTheme,
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
          to: "/leads",
        },
        {
          label: "Deals",
          icon: <LucideBriefcase size={16} className="text-ink-gray-6" />,
          to: "/deals",
        },
        {
          label: "Contacts",
          icon: <LucideUserCheck size={16} className="text-ink-gray-6" />,
          to: "/contacts",
        },
        {
          label: "Organizations",
          icon: <LucideBuilding size={16} className="text-ink-gray-6" />,
          to: "/organizations",
        },
        {
          label: "Notes",
          icon: <LucideClipboard size={16} className="text-ink-gray-6" />,
          to: "/notes",
        },
        {
          label: "Tasks",
          icon: <LucideCheckSquare size={16} className="text-ink-gray-6" />,
          to: "/tasks",
        },
        {
          label: "Call Logs",
          icon: <LucidePhone size={16} className="text-ink-gray-6" />,
          to: "/call-logs",
        },
        {
          label: "Email Templates",
          icon: <LucideMail size={16} className="text-ink-gray-6" />,
          to: "/email-templates",
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
          to: "/my-open-deals",
        },
        {
          label: "Partnership Deals",
          icon: <LucideLink size={16} className="text-ink-gray-6" />,
          to: "/partnership-deals",
        },
        {
          label: "Unassigned Deals",
          icon: <LucideLink size={16} className="text-ink-gray-6" />,
          to: "/unassigned-deals",
        },
        {
          label: "Enterprise Pipeline",
          icon: <LucideLink size={16} className="text-ink-gray-6" />,
          to: "/enterprise-pipeline",
        },
      ],
    },
  ],
};

export const CRM = () => (
  <div className="flex h-screen w-full flex-col bg-surface-white shadow">
    <MemoryRouter>
      <Sidebar header={crmSidebar.header} sections={crmSidebar.sections} />
    </MemoryRouter>
  </div>
);
CRM.storyName = "Sidebar";
