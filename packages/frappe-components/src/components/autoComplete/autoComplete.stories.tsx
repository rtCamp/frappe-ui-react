import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import Autocomplete from "./autoComplete";

const options = [
  {
    label: "John Doe",
    value: "john-doe",
    image: "https://randomuser.me/api/portraits/men/59.jpg",
  },
  {
    label: "Jane Doe",
    value: "jane-doe",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
  },
  {
    label: "John Smith",
    value: "john-smith",
    image: "https://randomuser.me/api/portraits/men/59.jpg",
  },
  {
    label: "Jane Smith",
    value: "jane-smith",
    image: "https://randomuser.me/api/portraits/women/59.jpg",
  },
  {
    label: "John Wayne",
    value: "john-wayne",
    image: "https://randomuser.me/api/portraits/men/57.jpg",
  },
  {
    label: "Jane Wayne",
    value: "jane-wayne",
    image: "https://randomuser.me/api/portraits/women/51.jpg",
  },
];

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "object",
      description: "The currently selected value(s).",
    },
    options: { control: "object", description: "Array of options to display." },
    multiple: { control: "boolean", description: "Allow multiple selections." },
    label: {
      control: "text",
      description: "Label for the autocomplete input.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input.",
    },
    loading: { control: "boolean", description: "Show loading indicator." },
    hideSearch: {
      control: "boolean",
      description: "Hide the search input in the dropdown.",
    },
    showFooter: {
      control: "boolean",
      description: "Show the default footer (Clear/Select All).",
    },
    maxOptions: {
      control: "number",
      description: "Maximum number of options to display.",
    },
    compareFn: {
      control: false,
      description: "Function to compare option values (for objects).",
    },
    placement: {
      control: "select",
      options: ["bottom-start", "bottom", "top-end"],
      description: "Placement of the dropdown.",
    },
    bodyClasses: {
      control: "text",
      description: "CSS classes for the popover body.",
    },
    onChange: {
      action: "update:value",
      description: "Event when selection changes.",
    },
  },
  args: {
    multiple: false,
    label: "Select an Option",
    placeholder: "Start typing to search...",
    loading: false,
    hideSearch: false,
    showFooter: false,
    maxOptions: 50,
    placement: "bottom-start",
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const SingleOption: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ width: "450px" }}>
        <Autocomplete
          {...args}
          value={value}
          onChange={(_value) => {
            setValue(_value as string);
          }}
          options={options}
        />
      </div>
    );
  },
  args: {
    options: options,
  },
};

export const SingleOptionWithPrefixSlots: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ width: "450px" }}>
        <Autocomplete
          {...args}
          value={value}
          prefix={(value) =>  <img src={value?.image ?? ''} className="mr-2 h-4 w-4 rounded-full" />}
          itemPrefix={(value) =>  <img src={value?.image ?? ''} className="ml-2 h-4 w-4 rounded-full" />}
          onChange={(_value) => {
            setValue(_value as string);
          }}
          options={options}
          compareFn={(a, b) => a?.value === b?.value}
        />
      </div>
    );
  },
  args: {
    options: options,
    label: "Select Person",
  },
};

export const SingleOptionWithoutSearch: Story = {
  render: (args) => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div style={{ width: "450px" }}>
        <Autocomplete
          {...args}
          hideSearch
          value={values}
          onChange={(_value) => {
            setValues(_value as string[]);
          }}
          options={options}
          compareFn={(a, b) => a?.value === b?.value}
        />
      </div>
    );
  },
  args: {
    options: options,
    label: "Select Persons",
    showFooter: true,
  },
};

export const MultipleOptions: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ width: "450px" }}>
        <Autocomplete
          {...args}
          multiple
          value={value}
          onChange={(_value) => {
            setValue(_value as string);
          }}
          options={options}
        />
      </div>
    );
  },
  args: {
    options: options,
    label: "Select Person",
  },
};

export const MultipleOptionsWithoutSearch: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ width: "450px" }}>
        <Autocomplete
          {...args}
          hideSearch
          multiple
          value={value}
          onChange={(_value) => {
            setValue(_value as string);
          }}
          options={options}
        />
      </div>
    );
  },
  args: {
    options: options,
    label: "Select Person",
  },
};
