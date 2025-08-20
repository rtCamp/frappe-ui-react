import type { Meta, StoryObj } from "@storybook/react-vite";

import Tooltip from "./tooltip";
import { Button } from "../button";
import { MemoryRouter } from "react-router";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    children: {
      control: false,
    },
  },
  args: {
    placement: "top",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithText: Story = {
  render: (args) => {
    return (
      <MemoryRouter>
        <Tooltip text={args.text} hoverDelay={args.hoverDelay}>
          <Button theme="red">Delete</Button>
        </Tooltip>
      </MemoryRouter>
    );
  },
  args: {
    text: "This action cannot be undone",
    hoverDelay: 1,
    placement: 'top',
    body: null
  },
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <MemoryRouter>
        <Tooltip {...args}>
          <Button theme="red">Delete</Button>
        </Tooltip>
      </MemoryRouter>
    );
  },
  args: {
    ...WithText.args,
    text: "disabled tooltip",
    disabled: true,
  },
};

export const WithCustomContent: Story = {
  render: (args) => {
    return (
      <MemoryRouter>
        <Tooltip {...args}>
          <Button theme="red">Delete</Button>
        </Tooltip>
      </MemoryRouter>
    );
  },
  args: {
    ...WithText.args,
    text: "disabled tooltip",
    arrowClass: 'fill-surface-white',
    body: (
      <div className="min-w-[6rem] rounded bg-surface-white px-2 py-1 text-xs text-ink-gray-9 shadow-xl">
       test 
    </div>
    )
  },
};
