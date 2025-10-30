import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tree } from "./index";

const meta: Meta<typeof Tree> = {
  title: "Components/Tree",
  tags: ["autodocs"],
  component: Tree,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof Tree>;

const treeNode = {
  name: "guest",
  label: "Guest",
  children: [
    {
      name: "downloads",
      label: "Downloads",
      children: [
        {
          name: "download.zip",
          label: "download.zip",
          children: [
            {
              name: "image.png",
              label: "image.png",
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: "documents",
      label: "Documents",
      children: [
        {
          name: "somefile.txt",
          label: "somefile.txt",
          children: [],
        },
        {
          name: "somefile.pdf",
          label: "somefile.pdf",
          children: [],
        },
      ],
    },
  ],
};

export const Default: Story = {
  args: {
    node: treeNode,
    nodeKey: "name",
    options: {
      rowHeight: "25px",
      indentWidth: "15px",
      showIndentationGuides: true,
      defaultCollapsed: true,
    },
  },
  render: (args) => <Tree {...args} />,
  argTypes: {
    node: { control: false, description: "Root tree node object" },
    nodeKey: {
      control: "text",
      description: "Key used for node identification",
    },
    options: { control: "object", description: "Tree options" },
    renderNode: {
      control: false,
      description: "Custom node renderer function",
    },
    renderIcon: {
      control: false,
      description: "Custom icon renderer function",
    },
    renderLabel: {
      control: false,
      description: "Custom label renderer function",
    },
  },
};
