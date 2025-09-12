import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox } from "./index";

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  tags: ["autodocs"],
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    options: {
      control: "object",
      description:
        "Array of options (strings or objects) to display in the combobox",
    },
    value: {
      control: "text",
      description: "Currently selected value",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no value is selected",
    },
    disabled: {
      control: "boolean",
      description: "Whether the combobox is disabled",
    },
    onChange: {
      action: "changed",
      description: "Event handler called when the selected value changes",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the combobox container",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Combobox>;

const simpleOptions = [
  "John Doe",
  "Jane Doe",
  "John Smith",
  "Jane Smith",
  "John Wayne",
  "Jane Wayne",
  "Alice Johnson",
  "Bob Wilson",
  "Charlie Brown",
  "Diana Prince",
];

const objectOptions = [
  { label: "John Doe", value: "john-doe" },
  { label: "Jane Doe", value: "jane-doe" },
  { label: "John Smith", value: "john-smith" },
  { label: "Jane Smith", value: "jane-smith", disabled: true },
  { label: "John Wayne", value: "john-wayne" },
  { label: "Jane Wayne", value: "jane-wayne" },
  { label: "Alice Johnson", value: "alice-johnson" },
  { label: "Bob Wilson", value: "bob-wilson" },
];

const optionsWithIcons = [
  { label: "Dashboard", value: "dashboard", icon: <span>📊</span> },
  { label: "Projects", value: "projects", icon: <span>📁</span> },
  { label: "Tasks", value: "tasks", icon: <span>✅</span> },
  { label: "Calendar", value: "calendar", icon: <span>📅</span> },
  { label: "Reports", value: "reports", icon: <span>📈</span> },
  { label: "Settings", value: "settings", icon: <span>⚙️</span> },
];

const groupedOptions = [
  {
    group: "Fruits",
    options: [
      { label: "Apple", value: "apple", icon: <span>🍎</span> },
      { label: "Banana", value: "banana", icon: <span>🍌</span> },
      { label: "Orange", value: "orange", icon: <span>🍊</span> },
      { label: "Grape", value: "grape", icon: <span>🍇</span> },
    ],
  },
  {
    group: "Vegetables",
    options: [
      { label: "Carrot", value: "carrot", icon: <span>🥕</span> },
      { label: "Broccoli", value: "broccoli", icon: <span>🥦</span> },
    ],
  },
];

const complexObjects = [
  {
    label: "John Doe (Admin)",
    value: "john-doe",
    email: "john@example.com",
    role: "Admin",
  },
  {
    label: "Jane Smith (User)",
    value: "jane-smith",
    email: "jane@example.com",
    role: "User",
  },
  {
    label: "Bob Johnson (Manager)",
    value: "bob-johnson",
    email: "bob@example.com",
    role: "Manager",
  },
  {
    label: "Alice Brown (User)",
    value: "alice-brown",
    email: "alice@example.com",
    role: "User",
  },
];

export const SimpleStringOptions: Story = {
  args: {
    options: simpleOptions,
    value: "",
    placeholder: "Select a person",
    onChange: () => {},
  },
  render: (args) => {
    const [val, setVal] = React.useState("");
    return (
          <div className="flex flex-col w-80">
            <label className="block text-sm font-medium mb-2">
              Simple Options
            </label>
            <Combobox {...args} value={val} onChange={setVal} />
            <div className="mt-2 text-sm text-gray-600">
              Selected: {val || "None"}
            </div>
          </div>
    );
  },
};

export const ObjectOptions: Story = {
  args: {
    options: objectOptions,
    value: "",
    placeholder: "Select a person",
    onChange: () => {},
  },
  render: (args) => {
    const [val, setVal] = React.useState("");
    return (
          <div className="flex flex-col w-80">
            <label className="block text-sm font-medium mb-2">
              Object Options
            </label>
            <Combobox {...args} value={val} onChange={setVal} />
            <div className="mt-2 text-sm text-gray-600">
              Selected: {val || "None"}
            </div>
          </div>
    );
  },
};

export const WithIcons: Story = {
  name: "Options with Icons",
  args: {
    options: optionsWithIcons,
    value: "",
    placeholder: "Select an item",
    onChange: () => {},
  },
  render: (args) => {
    const [val, setVal] = React.useState("");
    return (
          <div className="flex flex-col w-80">
            <label className="block text-sm font-medium mb-2">
              Options with Icons
            </label>
            <Combobox {...args} value={val} onChange={setVal} />
            <div className="mt-2 text-sm text-gray-600">
              Selected: {val || "None"}
            </div>
          </div>
    );
  },
};

export const Grouped: Story = {
  name: "Grouped Options",
  args: {
    options: groupedOptions,
    value: "",
    placeholder: "Select a food",
    onChange: () => {},
  },
  render: (args) => {
    const [val, setVal] = React.useState("");
    return (
          <div className="flex flex-col w-80">
            <label className="block text-sm font-medium mb-2">
              Grouped Options
            </label>
            <Combobox {...args} value={val} onChange={setVal} />
            <div className="mt-2 text-sm text-gray-600">
              Selected: {val || "None"}
            </div>
          </div>

    );
  },
};

export const DisabledState: Story = {
  args: {
    options: simpleOptions,
    value: "",
    placeholder: "This is disabled",
    disabled: true,
    onChange: () => {},
  },
  render: (args) => (
        <div className="flex flex-col w-80">
          <label className="block text-sm font-medium mb-2">
            Disabled Combobox
          </label>
          <Combobox {...args} />
        </div>
  ),
};

export const PreselectedValue: Story = {
  name: "Pre-selected Value",
  args: {
    options: objectOptions,
    value: "john-doe",
    placeholder: "Select a person",
    onChange: () => {},
  },
  render: (args) => {
    const [val, setVal] = React.useState("john-doe");
    return (
          <div className="flex flex-col w-80">
            <label className="block text-sm font-medium mb-2">
              Pre-selected Value
            </label>
            <Combobox {...args} value={val} onChange={setVal} />
            <div className="mt-2 text-sm text-gray-600">
              Selected: {val || "None"}
            </div>
          </div>
    );
  },
};

// Placeholder for multiple selection and complex objects (not implemented in Combobox logic above)
// But for parity, you can add informative variants:
export const MultipleSelection: Story = {
  name: "Multiple Selection (Not Implemented)",
  render: () => (
        <div className="p-4">
          <label className="block text-sm font-medium mb-2 text-ink-gray-9">
            Multiple Simple Options
          </label>
          <div className="text-sm text-gray-600">
            Not implemented in this Combobox
          </div>
        </div>
  ),
};

export const ComplexObject: Story = {
  name: "Complex Objects (Display Value Demo)",
  args: {
    options: complexObjects,
    value: "",
    placeholder: "Select a user",
    onChange: () => {},
  },
  render: (args) => {
    const [val, setVal] = React.useState("");
    const selected = complexObjects.find((o) => o.value === val);
    return (
          <div className="flex flex-col w-80">
            <label className="block text-sm font-medium mb-2">
              Complex Objects
            </label>
            <Combobox {...args} value={val} onChange={setVal} />
            <div className="mt-2 text-sm text-gray-600">
              Selected: {val || "None"}
              {selected && (
                <div className="text-xs mt-1">
                  <div>Email: {selected.email}</div>
                  <div>Role: {selected.role}</div>
                </div>
              )}
            </div>
          </div>
    );
  },
};
