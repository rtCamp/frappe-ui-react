import type { Meta, StoryObj } from "@storybook/react-vite";
import Breadcrumbs from "./breadcrumbs";
import { type BreadcrumbsProps } from "./types";
import { action } from "storybook/actions";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  argTypes: {
    items: {
      control: "object",
      description:
        "An array of breadcrumb items, each with a label, and optional onClick.",
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
