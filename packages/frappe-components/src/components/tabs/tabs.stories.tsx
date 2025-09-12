import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./index";
import FeatherIcon from "../featherIcon";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  tags: ["autodocs"],
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    tabs: {
      control: false,
      description: "Array of tab objects to display",
    },
    tabIndex: {
      control: "number",
      name: "Tab Index",
      description: "Currently selected tab index",
    },
    onTabChange: {
      action: "onTabChange",
      description: "Callback when tab changes",
    },
    className: {
      control: "text",
      description: "CSS classes for the Tabs container",
    },
    vertical: {
      control: "boolean",
      name: "Vertical",
      description: "Display tabs vertically",
    },
    children: {
      control: false,
      description: "Content inside the Tabs component",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tabs>;

const tabsWithoutIcon = [
  {
    label: "Github",
    content:
      "Github is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.",
  },
  {
    label: "Twitter",
    content:
      'Twitter is an American microblogging and social networking service on which users post and interact with messages known as "tweets".',
  },
  {
    label: "Linkedin",
    content:
      "LinkedIn is an American business and employment-oriented online service that operates via websites and mobile apps.",
  },
];

const tabsWithIcon = [
  {
    label: "Github",
    content:
      "Github is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.",
    icon: <FeatherIcon name="github" className="w-4 h-4" />,
  },
  {
    label: "Twitter",
    content:
      'Twitter is an American microblogging and social networking service on which users post and interact with messages known as "tweets".',
    icon: <FeatherIcon name="twitter" className="w-4 h-4" />,
  },
  {
    label: "Linkedin",
    content:
      "LinkedIn is an American business and employment-oriented online service that operates via websites and mobile apps.",
    icon: <FeatherIcon name="linkedin" className="w-4 h-4" />,
  },
];

export const WithoutIcon: Story = {
  args: {
    tabs: tabsWithoutIcon,
    tabIndex: 0,
    onTabChange: () => {},
    className: "border border-outline-gray-1 rounded",
  },
  render: (args) => <Tabs {...args} />,
  argTypes: {
    tabs: { control: false, description: "Array of tab objects to display." },
    tabIndex: {
      control: "number",
      name: "Tab Index",
      description: "Currently selected tab index.",
    },
    onTabChange: {
      action: "onTabChange",
      description: "Callback when tab changes.",
    },
    className: {
      control: "text",
      description: "CSS classes for the Tabs container.",
    },
  },
};

export const WithIcon: Story = {
  args: {
    tabs: tabsWithIcon,
    tabIndex: 0,
    onTabChange: () => {},
    className: "border border-outline-gray-1 rounded",
  },
  render: (args) => <Tabs {...args} />,
  argTypes: {
    tabs: {
      control: false,
      description: "Array of tab objects to display (with icon property).",
    },
    tabIndex: {
      control: "number",
      name: "Tab Index",
      description: "Currently selected tab index.",
    },
    onTabChange: {
      action: "onTabChange",
      description: "Callback when tab changes.",
    },
    className: {
      control: "text",
      description: "CSS classes for the Tabs container.",
    },
  },
};

export const VerticalWithIcon: Story = {
  args: {
    tabs: tabsWithIcon,
    tabIndex: 0,
    onTabChange: () => {},
    vertical: true,
    className: "border border-outline-gray-1 rounded",
  },
  render: (args) => <Tabs {...args} />,
  argTypes: {
    tabs: {
      control: false,
      description: "Array of tab objects to display (with icon property).",
    },
    tabIndex: {
      control: "number",
      name: "Tab Index",
      description: "Currently selected tab index.",
    },
    onTabChange: {
      action: "onTabChange",
      description: "Callback when tab changes.",
    },
    vertical: {
      control: "boolean",
      name: "Vertical",
      description: "Display tabs vertically.",
    },
    className: {
      control: "text",
      description: "CSS classes for the Tabs container.",
    },
  },
};
