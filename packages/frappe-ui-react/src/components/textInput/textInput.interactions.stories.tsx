import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { userEvent, expect, within } from "storybook/test";
import TextInput from "./textInput";

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput/Interactions",
  component: TextInput,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
  argTypes: {
    value: { control: "text", description: "Input value (controlled)" },
    onChange: { action: "changed", description: "Change handler" },
    size: {
      control: { type: "select", options: ["sm", "md", "lg", "xl"] },
      description: "Input size variant",
    },
    variant: {
      control: { type: "select", options: ["subtle", "outline"] },
      description: "Visual variant",
    },
    state: {
      control: {
        type: "select",
        options: ["default", "error", "success", "warning"],
      },
      description: "Input state",
    },
    disabled: { control: "boolean", description: "Disabled state" },
    loading: { control: "boolean", description: "Loading state" },
    prefix: { control: false, description: "Prefix render function" },
    suffix: { control: false, description: "Suffix render function" },
    className: { control: "text", description: "Additional CSS classes" },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const BasicInput: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="w-80">
        <TextInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type here..."
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    expect(input).toBeInTheDocument();
    await userEvent.type(input, "Hello World");
    expect(input).toHaveValue("Hello World");
  },
};

export const ControlledInput: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="w-80">
        <TextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Controlled input"
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await userEvent.type(input, "Hello");
    expect(input).toHaveValue("Hello");
  },
};

export const InputLoadingState: Story = {
  args: {
    loading: true,
    value: "Loading...",
  },
  render: (args) => (
    <div className="w-80">
      <TextInput {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-busy", "true");

    const spinner = canvasElement.querySelector("svg.animate-spin");
    expect(spinner).toBeInTheDocument();
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    value: "Disabled",
  },
  render: (args) => (
    <div className="w-80">
      <TextInput {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    expect(input).toBeDisabled();
  },
};

export const WithPrefixSuffix: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="w-80">
        <TextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          prefix={() => <span className="text-ink-gray-6">$</span>}
          suffix={() => <span className="text-ink-gray-6">.00</span>}
          placeholder="Amount"
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("$")).toBeInTheDocument();
    expect(canvas.getByText(".00")).toBeInTheDocument();

    const input = canvas.getByRole("textbox");
    await userEvent.type(input, "100");
    expect(input).toHaveValue("100");
  },
};

export const VariantStyling: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextInput variant="subtle" state="error" value="Error state" />
      <TextInput variant="outline" state="success" value="Success state" />
      <TextInput variant="subtle" state="warning" value="Warning state" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole("textbox");

    expect(inputs).toHaveLength(3);

    expect(inputs[0]).toHaveClass("bg-surface-red-1");
    expect(inputs[0]).toHaveAttribute("aria-invalid", "true");

    expect(inputs[1]).toHaveClass("border-outline-green-2");

    expect(inputs[2]).toHaveClass("bg-surface-amber-1");
  },
};
