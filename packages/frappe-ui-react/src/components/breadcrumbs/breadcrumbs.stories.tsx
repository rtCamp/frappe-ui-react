import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, Clock } from "lucide-react";
import { action } from "storybook/actions";

import Breadcrumbs from "./breadcrumbs";
import { type BreadcrumbsProps } from "./types";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  argTypes: {
    items: {
      control: "object",
      description:
        "An array of breadcrumb items, each with a label, and optional onClick.",
    },
    size: {
      control: { type: "select", options: ["sm", "md"] },
      description: "Size of the breadcrumb items.",
    },
    highlightLastItem: {
      control: "boolean",
      description: "Whether to highlight the last breadcrumb item.",
    },
    renderPrefix: {
      description:
        "Function to render a prefix element for each breadcrumb item.",
    },
    renderSuffix: {
      description:
        "Function to render a suffix element for each breadcrumb item.",
    },
  },
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  tags: ["autodocs"],
} as Meta<typeof Breadcrumbs>;

const BreadcrumbsTemplate: StoryObj<BreadcrumbsProps> = {
  render: (args) => <Breadcrumbs {...args} />,
};

export const WithOnClickOption: StoryObj<BreadcrumbsProps> = {
  ...BreadcrumbsTemplate,
  args: {
    items: [
      {
        label: "Home",
        onClick: action("Home clicked"),
      },
      {
        label: "Views",
        onClick: action("Views clicked"),
      },
      {
        label: "Kanban",
        onClick: action("Kanban clicked"),
      },
    ],
  },
};

export const WithPrefixSlot: StoryObj<BreadcrumbsProps> = {
  ...BreadcrumbsTemplate,
  args: {
    items: [
      {
        label: "Home",
        prefixIcon: "🏡",
      },
      {
        label: "Views",
        prefixIcon: "🏞️",
      },
      {
        label: "List",
        prefixIcon: "📃",
      },
    ],
  },
};

export const WithDropdown: StoryObj<BreadcrumbsProps> = {
  ...BreadcrumbsTemplate,
  args: {
    items: [
      {
        label: "Timesheets",
      },
      {
        label: "Personal",
        prefixIcon: <Clock className="w-4 h-4" />,
        suffixIcon: <ChevronDown className="w-4 h-4" />,
        dropdown: {
          dropdownClassName: "w-[220px] px-1",
          groupClassName: "px-0 py-1",
          itemClassName: "text-ink-gray-8 hover:text-ink-gray-7",
          options: [
            {
              group: "",
              key: "views-group",
              items: [
                {
                  label: "Personal",
                  icon: "clock",
                },
                {
                  label: "Team",
                  icon: "copy",
                },
                {
                  label: "Project",
                  icon: "briefcase",
                },
              ],
            },
            {
              group: "",
              key: "create-group",
              items: [
                {
                  label: "Create View",
                  icon: "plus",
                },
              ],
            },
          ],
        },
      },
    ],
  },
};
