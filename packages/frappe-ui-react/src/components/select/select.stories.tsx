import type { Meta } from "@storybook/react-vite";
import { useState } from "react";
import Select from "./select";
import { Users, Calendar, Filter, ArrowUpDown, Circle } from "lucide-react";
import type { SelectOption, SelectProps } from "./types";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "select" },
      description: "Size of the select input",
      table: { defaultValue: { summary: "md" } },
    },
    variant: {
      options: ["subtle", "outline", "ghost"],
      control: { type: "select" },
      description: "Visual variant",
      table: { defaultValue: { summary: "subtle" } },
    },
    state: {
      options: ["success", "warning", "error", null],
      control: { type: "select" },
      description: "Visual state (colors)",
    },
    className: { control: "text", description: "Custom CSS class" },
    
    label: { control: "text", description: "Label for the select input" },
    placeholder: { control: "text", description: "Placeholder text" },
    disabled: { control: "boolean", description: "Disables interaction" },
    loading: { control: "boolean", description: "Shows loading spinner and disables input" },
    value: { control: "object", description: "Current selected option" },
    options: { control: "object", description: "Array of options" },
    error: { control: "text", description: "Error message" },
    prefix: { control: "text", description: "Element before value" },
    onChange: { action: "changed", description: "Change callback" },
  },
};

export default meta;

const options: SelectOption[] = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

export const Default = (args: SelectProps) => {
  const [selected, setSelected] = useState<SelectOption | undefined>(undefined);
  return (
    <div className="w-72">
      <Select
        {...args}
        value={selected}
        onChange={setSelected}
      />
    </div>
  );
};

Default.args = {
  label: "Label",
  placeholder: "Select...",
  options: options,
  disabled: false,
  loading: false,
  size: "md",
  variant: "subtle"
};


export const AllOutline = () => {
    return (
        <div className="space-y-4 w-72 p-4 border rounded bg-white dark:bg-gray-900 dark:border-gray-700">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Outline Variants</h3>
            <Select variant="outline" placeholder="Default" options={options} />
            <Select variant="outline" state="success" placeholder="Success" options={options} />
            <Select variant="outline" state="warning" placeholder="Warning" options={options} />
            <Select variant="outline" state="error" placeholder="Error" options={options} />
        </div>
    )
}

export const AllSubtle = () => {
    return (
        <div className="space-y-4 w-72 p-4 border rounded bg-white dark:bg-gray-900 dark:border-gray-700">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Subtle Variants</h3>
            <Select variant="subtle" placeholder="Default" options={options} />
            <Select variant="subtle" state="success" placeholder="Success" options={options} />
            <Select variant="subtle" state="warning" placeholder="Warning" options={options} />
            <Select variant="subtle" state="error" placeholder="Error" options={options} />
        </div>
    )
}

export const AllGhost = () => {
    return (
        <div className="space-y-4 w-72 p-4 border rounded bg-white dark:bg-gray-900 dark:border-gray-700">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Ghost Variants</h3>
            <Select variant="ghost" placeholder="Default" options={options} />
            <Select variant="ghost" state="success" placeholder="Success" options={options} />
            <Select variant="ghost" state="warning" placeholder="Warning" options={options} />
            <Select variant="ghost" state="error" placeholder="Error" options={options} />
        </div>
    )
}

export const EspressoExamples = () => {
    return (
        <div className="p-10 space-y-10 bg-white dark:bg-gray-900 w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Real-world Examples</h3>
            
            <div className="flex flex-wrap gap-4 items-center justify-center">
                <div className="w-32">
                    <Select variant="outline" size="sm" prefix={<Users size={14} />} placeholder="Teams" options={options} />
                </div>
                <div className="w-32">
                    <Select variant="outline" size="sm" prefix={<Calendar size={14} />} placeholder="Date" options={options} />
                </div>
                <div className="w-32">
                    <Select variant="subtle" size="sm" prefix={<Filter size={14} />} placeholder="Filter" options={options} />
                </div>
                 <div className="w-32">
                    <Select variant="subtle" size="sm" prefix={<ArrowUpDown size={14} />} placeholder="Sort by" options={options} />
                </div>
                 <div className="w-28">
                    <Select variant="outline" size="sm" placeholder="Dark" options={options} />
                </div>
                <div className="w-32">
                    <Select variant="ghost" size="sm" prefix={<Users size={14} />} placeholder="People" options={options} />
                </div>
                 <div className="w-48">
                    <Select variant="subtle" size="md" placeholder="Select a plan" options={options} />
                </div>
                <div className="w-40">
                    <Select variant="ghost" state="warning" size="sm" prefix={<Circle size={10} fill="currentColor" />} placeholder="In progress" options={options} />
                </div>
                 <div className="w-36">
                    <Select variant="subtle" size="sm" placeholder="Send invite" options={options} />
                </div>
                <div className="w-40">
                    <Select variant="outline" size="sm" prefix={<Circle size={10} fill="currentColor" />} placeholder="Qualification" options={options} />
                </div>
            </div>
        </div>
    )
};

