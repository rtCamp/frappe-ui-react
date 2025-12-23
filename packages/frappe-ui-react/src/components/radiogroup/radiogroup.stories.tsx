import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import RadioGroup from "./index";
import type { RadioGroupProps } from "./types";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select", options: ["sm", "md", "lg"] },
      description: "Size of the radio buttons",
    },
    theme: {
      control: { type: "select", options: ["gray", "blue", "green", "red"] },
      description: "Color theme",
    },
    variant: {
      control: { type: "select", options: ["default", "card"] },
      description: "Visual variant",
    },
    orientation: {
      control: { type: "select", options: ["vertical", "horizontal"] },
      description: "Layout orientation",
    },
    disabled: {
      control: "boolean",
      description: "Disable all options",
    },
  },
  parameters: { layout: "centered", source: { type: "dynamic" } },
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

const sampleOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const optionsWithDescriptions = [
  {
    label: "Starter",
    value: "starter",
    description: "Perfect for individuals",
  },
  { label: "Pro", value: "pro", description: "Best for small teams" },
  {
    label: "Enterprise",
    value: "enterprise",
    description: "For large organizations",
  },
];

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("option1");
    return (
      <div className="p-4 w-80">
        <RadioGroup {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    options: sampleOptions,
    size: "md",
    theme: "gray",
    variant: "default",
    orientation: "vertical",
  },
};

export const WithDescriptions: Story = {
  render: (args) => {
    const [value, setValue] = useState("pro");
    return (
      <div className="p-4 w-80">
        <RadioGroup {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    options: optionsWithDescriptions,
    size: "md",
    theme: "blue",
    variant: "default",
    orientation: "vertical",
  },
};

export const CardVariant: Story = {
  render: (args) => {
    const [value, setValue] = useState("pro");
    return (
      <div className="p-4 w-96">
        <RadioGroup {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    options: optionsWithDescriptions,
    size: "md",
    theme: "green",
    variant: "card",
    orientation: "vertical",
  },
};

export const Horizontal: Story = {
  render: (args) => {
    const [value, setValue] = useState("option2");
    return (
      <div className="p-4 w-full">
        <RadioGroup {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    options: sampleOptions,
    size: "md",
    theme: "red",
    variant: "default",
    orientation: "horizontal",
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className="p-4 space-y-8 w-80">
        <div>
          <h3 className="text-sm font-semibold mb-3">Small</h3>
          <RadioGroup
            options={sampleOptions}
            size="sm"
            theme="gray"
            defaultValue="option1"
          />
        </div>
        <div>
          <h3 className="text-base font-semibold mb-3">Medium</h3>
          <RadioGroup
            options={sampleOptions}
            size="md"
            theme="gray"
            defaultValue="option1"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Large</h3>
          <RadioGroup
            options={sampleOptions}
            size="lg"
            theme="gray"
            defaultValue="option1"
          />
        </div>
      </div>
    );
  },
};

export const Themes: Story = {
  render: () => {
    return (
      <div className="p-4 space-y-6 w-80">
        <div>
          <h3 className="text-sm font-semibold mb-3">Gray</h3>
          <RadioGroup
            options={sampleOptions}
            theme="gray"
            defaultValue="option1"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-3">Blue</h3>
          <RadioGroup
            options={sampleOptions}
            theme="blue"
            defaultValue="option1"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-3">Green</h3>
          <RadioGroup
            options={sampleOptions}
            theme="green"
            defaultValue="option1"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-3">Red</h3>
          <RadioGroup
            options={sampleOptions}
            theme="red"
            defaultValue="option1"
          />
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <div className="p-4 w-80">
        <RadioGroup {...args} />
      </div>
    );
  },
  args: {
    options: sampleOptions,
    size: "md",
    theme: "gray",
    variant: "default",
    disabled: true,
    defaultValue: "option2",
  },
};
