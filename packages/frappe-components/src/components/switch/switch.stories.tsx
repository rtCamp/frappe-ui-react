import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Story, Variant } from "../Story";
import Switch from "./switch";

const sizes = ["sm", "md"] as const;

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  tags: ["autodocs"],
  component: Switch,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type StoryType = StoryObj<typeof Switch>;

export const Label: StoryType = {
  args: {
    size: "sm",
    label: "Enable Notifications",
    description: "",
    disabled: false,
    value: false,
    className: "",
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.value ?? false);
    return (
      <Story layout={{ type: "grid", width: 300 }}>
        <Variant title="Label">
          <Switch {...args} value={checked} onChange={setChecked} />
        </Variant>
      </Story>
    );
  },
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
  },
};

export const LabelAndDescription: StoryType = {
  args: {
    size: "sm",
    label: "Enable Notifications",
    description: "Get notified when something happens.",
    disabled: false,
    value: false,
    className: "",
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.value ?? false);
    return (
      <Story layout={{ type: "grid", width: 300 }}>
        <Variant title="Label and Description">
          <Switch {...args} value={checked} onChange={setChecked} />
        </Variant>
      </Story>
    );
  },
  argTypes: Label.argTypes,
};
