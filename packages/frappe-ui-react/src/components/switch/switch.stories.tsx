import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Switch from "./switch";

const sizes = ["sm", "md"] as const;

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  tags: ["autodocs"],
  component: Switch,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  argTypes: {
    size: {
      control: "select",
      options: sizes,
      description: "Switch size",
    },
    label: {
      control: "text",
      description: "Switch label",
    },
    description: {
      control: "text",
      description: "Switch description",
    },
    disabled: {
      control: "boolean",
      description: "Disable switch",
    },
    value: {
      control: "boolean",
      description: "Checked state",
    },
    onChange: {
      action: "onChange",
      description: "Callback when value changes",
    },
    className: {
      control: "text",
      description: "CSS classes for the Switch container",
    },
    labelClassName: {
      control: "text",
      description: "CSS classes for the Switch label",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Plain: Story = {
  args: {
    size: "sm",
    disabled: false,
    value: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.value ?? false);
    return <Switch {...args} value={checked} onChange={setChecked} />;
  },
};

export const Label: Story = {
  args: {
    size: "sm",
    label: "Enable Notifications",
    disabled: false,
    value: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.value ?? false);
    return (
      <div className="w-[266px]">
        <Switch {...args} value={checked} onChange={setChecked} />
      </div>
    );
  },
};

export const DescriptionAndIcon: Story = {
  args: {
    size: "sm",
    label: "Enable Notifications",
    description: "Get notified when something happens.",
    disabled: false,
    value: false,
  },
  render: (args) => {
    const [checked1, setChecked1] = useState(args.value ?? false);
    const [checked2, setChecked2] = useState(args.value ?? false);
    return (
      <div className="flex flex-col gap-2 w-[266px]">
        <Switch {...args} value={checked1} onChange={setChecked1} />
        <Switch
          {...args}
          icon="inbox"
          value={checked2}
          onChange={setChecked2}
          description="This has an icon."
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  args: {
    label: "Enable Notifications",
    disabled: false,
    value: false,
  },
  render: (args) => {
    const [checkedSm, setCheckedSm] = useState(args.value ?? false);
    const [checkedMd, setCheckedMd] = useState(args.value ?? false);
    return (
      <div className="flex flex-col gap-2 w-[266px]">
        <Switch {...args} size="sm" value={checkedSm} onChange={setCheckedSm} />
        <Switch {...args} size="md" value={checkedMd} onChange={setCheckedMd} />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    size: "sm",
    label: "Enable Notifications",
    disabled: true,
    value: false,
  },
  render: (args) => {
    const [checked1, setChecked1] = useState(args.value ?? false);
    const [checked2, setChecked2] = useState(args.value ?? false);
    return (
      <div className="flex flex-col gap-2 w-[266px]">
        <Switch {...args} value={checked1} onChange={setChecked1} />
        <Switch
          {...args}
          value={checked2}
          onChange={setChecked2}
          description="This is a description."
        />
      </div>
    );
  },
};

export const Classes: Story = {
  args: {
    size: "sm",
    label: "Enable Notifications",
    description: "This switch has a normal font.",
    labelClassName: "font-normal",
    disabled: false,
    value: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.value ?? false);
    return (
      <div className="w-[266px]">
        <Switch {...args} value={checked} onChange={setChecked} />
      </div>
    );
  },
};
