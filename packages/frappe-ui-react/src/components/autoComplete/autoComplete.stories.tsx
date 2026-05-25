import { useEffect, useState } from "react";
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
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
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
    searchValue: {
      control: "text",
      description: "Controlled search text shown in the popup input.",
    },
    open: {
      control: "boolean",
      description: "Controlled open state for the popup.",
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
    className: {
      control: "text",
      description: "Additional CSS classes for the outer wrapper.",
    },
    labelClassName: {
      control: "text",
      description: "Additional CSS classes for the label.",
    },
    triggerClassName: {
      control: "text",
      description: "Additional CSS classes for the trigger button.",
    },
    searchInputClassName: {
      control: "text",
      description: "Additional CSS classes for the popup search input.",
    },
    listClassName: {
      control: "text",
      description: "Additional CSS classes for the options list.",
    },
    emptyMessage: {
      control: "text",
      description: "Custom empty-state message.",
    },
    children: {
      control: false,
      description: "Optional custom trigger content rendered as the trigger.",
    },
    renderFooter: {
      control: false,
      description: "Custom render function for the footer.",
    },
    onChange: {
      action: "update:value",
      description: "Event when selection changes.",
    },
    onOpenChange: {
      action: "openChanged",
      description: "Event when the popup opens or closes.",
    },
    onSearchChange: {
      action: "searchChanged",
      description: "Event when the popup search text changes.",
    },
    prefix: {
      control: false,
      description: "Function to render a prefix element inside the input",
    },
    suffix: {
      control: false,
      description: "Function to render a suffix element inside the input",
    },
    itemPrefix: {
      control: false,
      description: "Function to render a prefix element inside each option",
    },
    itemSuffix: {
      control: false,
      description: "Function to render a suffix element inside each option",
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
          prefix={(value) =>
            value?.image && (
              <img
                src={value?.image ?? ""}
                className="w-4 h-4 mr-2 rounded-full"
              />
            )
          }
          itemPrefix={(value) =>
            value?.image && (
              <img src={value?.image ?? ""} className="w-4 h-4 rounded-full" />
            )
          }
          onChange={(_value) => {
            setValue(_value as string);
          }}
          options={options}
          //@ts-expect-error -- this is fine since we have specified object type in docuementation
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
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ width: "450px" }}>
        <Autocomplete
          {...args}
          hideSearch
          value={value}
          onChange={(_value) => {
            setValue(_value as string | null);
          }}
          options={options}
          //@ts-expect-error -- this is fine since we have specified object type in docuementation
          compareFn={(a, b) => a?.value === b?.value}
        />
      </div>
    );
  },
  args: {
    options: options,
    label: "Select Person",
    showFooter: true,
  },
};

export const MultipleOptions: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div style={{ width: "450px" }}>
        <Autocomplete
          {...args}
          multiple
          value={value}
          onChange={(_value) => {
            setValue(_value as string[]);
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
    const [value, setValue] = useState<string[]>([]);
    return (
      <div style={{ width: "450px" }}>
        <Autocomplete
          {...args}
          hideSearch
          multiple
          value={value}
          onChange={(_value) => {
            setValue(_value as string[]);
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

export const ControlledSearchLoading: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<
      (typeof options)[number] | null
    >(null);
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);

    useEffect(() => {
      let cancelled = false;

      setLoading(true);

      const timeoutId = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        setFilteredOptions(
          searchValue.trim()
            ? options.filter((option) =>
                option.label.toLowerCase().includes(searchValue.toLowerCase())
              )
            : options
        );
        setLoading(false);
      }, 250);

      return () => {
        cancelled = true;
        window.clearTimeout(timeoutId);
      };
    }, [searchValue]);

    return (
      <div style={{ width: "450px" }}>
        <Autocomplete
          {...args}
          value={selectedOption ?? value}
          options={filteredOptions}
          searchValue={searchValue}
          loading={loading}
          onSearchChange={setSearchValue}
          onChange={(_value, nextOption) => {
            setValue(_value as string | null);
            setSelectedOption(
              (nextOption as (typeof options)[number] | null) ?? null
            );
          }}
        />
      </div>
    );
  },
  args: {
    label: "Select Person",
    placeholder: "Start typing to search...",
    options,
  },
};
