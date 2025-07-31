import type { Meta, StoryObj } from "@storybook/react-vite";
import Breadcrumbs from "./breadcrumbs";
import { BreadcrumbsProps } from "./types";
import { action } from "storybook/actions";
import { MemoryRouter } from "react-router";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  argTypes: {
    items: {
      control: "object",
      description:
        "An array of breadcrumb items, each with a label, optional route, and optional onClick.",
    },
  },
  parameters: {
    layout: "padded",
  },
} as Meta<typeof Breadcrumbs>;

const BreadcrumbsTemplate: StoryObj<BreadcrumbsProps> = {
  render: (args) => (
    <MemoryRouter>
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <Breadcrumbs {...args} />
      </div>
    </MemoryRouter>
  ),
};

export const WithRouteOption: StoryObj<BreadcrumbsProps> = {
  ...BreadcrumbsTemplate,
  args: {
    items: [
      {
        label: "Home",
        route: "/",
      },
      {
        label: "Views",
        route: "/components",
      },
      {
        label: "List",
        route: "/components/breadcrumbs",
      },
    ],
  },
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
        suffixIcon: "🏡",
        route: "/",
      },
      {
        label: "Views",
        suffixIcon: "🏞️",
        route: "/components",
      },
      {
        label: "List",
        suffixIcon: "📃",
        route: "/components/breadcrumbs",
      },
    ],
  },
};
