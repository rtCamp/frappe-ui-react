import { Meta, StoryObj } from "@storybook/react-vite";
import Checkbox from "./checkbox";
import { CheckboxProps } from "./types";
import { action } from "storybook/actions";
import { useState } from "react";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
      description: "The text label for the checkbox.",
    },
    size: {
      control: { type: "select", options: ["sm", "md"] },
      description: "The size of the checkbox.",
    },
    padding: {
      control: "boolean",
      description:
        "Whether to apply padding and hover/focus styles to the wrapper.",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled.",
    },
    value: {
      control: "boolean",
      description: "The checked state of the checkbox.",
    },
    onChange: {
      action: "checked",
      description: "Event handler for when the checkbox state changes.",
    },
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
		htmlId: {
			control: "text",
			description: "The HTML id attribute for the checkbox input",
		}
  },
  tags: ["autodocs"],
} as Meta<typeof Checkbox>;

export const Default: StoryObj<CheckboxProps> = {
  render: (args) => {
    const [value, setValue] = useState(false);
    return (
      <div className="p-2">
        <Checkbox
          {...args}
          htmlId="abc"
          value={value}
          onChange={(_value) => {
            action("checked")(_value);
            setValue(_value);
          }}
          label={args.label ?? "Enable feature"}
        />
      </div>
    );
  },
};
