import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckCheck, Trash2 } from "lucide-react";

import { MultiSelect } from "./multiSelect";
import Button from "../button/button";
import Avatar from "../avatar/avatar";

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "object",
      description: "Array of selected values",
    },
    options: {
      control: "object",
      description: "Array of options to display in the dropdown",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no options are selected",
    },
    hideSearch: {
      control: "boolean",
      description: "Hide the search input in the dropdown",
    },
    loading: {
      control: "boolean",
      description: "Show loading indicator",
    },
    onChange: {
      action: "changed",
      description: "Callback when selection changes",
    },
    renderOption: {
      control: false,
      description: "Custom render function for each option",
    },
    renderFooter: {
      control: false,
      description: "Custom render function for the footer",
    },
  },
  args: {
    placeholder: "Select option",
    hideSearch: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const img =
  "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=100&h=100&fit=crop";

const options = [
  { value: "red-apple", label: "Red Apple", img },
  { value: "blueberry-burst", label: "Blueberry Burst", img },
  { value: "orange-grove", label: "Orange Grove", img },
  { value: "banana-split", label: "Banana Split", img },
  { value: "grapes-cluster", label: "Grapes Cluster", img },
  { value: "kiwi-slice", label: "Kiwi Slice", img },
  { value: "mango-fusion", label: "Mango Fusion", img },
];

export const Default: Story = {
  args: {
    options: options,
    value: [],
    placeholder: "Select fruit",
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-[450px]">
        <MultiSelect {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const OptionSlot: Story = {
  name: "Option slot",
  args: {
    options: options,
    value: [],
    placeholder: "Select fruit",
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-[450px]">
        <MultiSelect
          {...args}
          value={value}
          onChange={setValue}
          renderOption={(item) => (
            <div className="flex items-center">
              <span className="mr-2">
                <Avatar image={(item as (typeof options)[0]).img} size="sm" />
              </span>
              {item.label}
            </div>
          )}
        />
      </div>
    );
  },
};

export const FooterSlot: Story = {
  name: "Footer slot",
  args: {
    options: options,
    value: [],
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-[450px]">
        <MultiSelect
          {...args}
          value={value}
          onChange={setValue}
          renderFooter={({ clearAll, selectAll }) => (
            <div className="flex justify-between my-2">
              <Button
                theme="red"
                onClick={clearAll}
                iconLeft={() => <Trash2 className="w-4 h-4" />}
              >
                Clear All
              </Button>
              <Button
                onClick={selectAll}
                iconLeft={() => <CheckCheck className="w-4 h-4" />}
              >
                Select All
              </Button>
            </div>
          )}
        />
      </div>
    );
  },
};
