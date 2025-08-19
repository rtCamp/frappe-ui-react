import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tree } from "./index";
import { Story, Variant } from "../Story";

const meta: Meta<typeof Tree> = {
  title: "Components/Tree",
  tags: ["autodocs"],
  component: Tree,
  parameters: {
    layout: "centered",
  },
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
  render: (args) => (
    <Story layout={{ type: "grid", width: 700 }}>
      <Variant title="default" flexJustify="start" minHeight={0}>
        <Tree {...args} />
      </Variant>
    </Story>
  ),
  argTypes: {
    node: { control: false, description: "Root tree node object" },
    nodeKey: {
      control: "text",
      description: "Key used for node identification",
    },
    options: { control: "object", description: "Tree options" },
  },
};
