import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { userEvent, expect, within } from "storybook/test";
import Select from "./select";
import type { SelectOption } from "./types";

const meta: Meta<typeof Select> = {
  title: "Components/Select/Interactions",
  component: Select,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const options: SelectOption[] = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3", disabled: true },
];

export const ControlledSelect: Story = {
  render: () => {
    const [selected, setSelected] = useState<SelectOption | undefined>();
    return (
      <div className="w-72">
        <Select
          options={options}
          value={selected}
          onChange={setSelected}
          placeholder="Select option"
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);
    const listbox = canvas.getByRole("listbox");
    expect(listbox).toBeInTheDocument();

    const allOptions = canvas.getAllByRole("option");
    expect(allOptions).toHaveLength(3);

    const disabledOption = canvas.getByRole("option", { name: "Option 3" });
    expect(disabledOption).toHaveAttribute("aria-disabled", "true");
    await userEvent.click(disabledOption);
    expect(button).not.toHaveTextContent("Option 3");

    const option2 = canvas.getByText("Option 2");
    await userEvent.click(option2);
    expect(button).toHaveTextContent("Option 2");
    expect(canvas.queryByRole("listbox")).not.toBeInTheDocument();
  },
};

export const DisabledState: Story = {
  args: {
    options,
    disabled: true,
    placeholder: "Disabled select",
  },
  render: (args) => (
    <div className="w-72">
      <Select {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    expect(button).toBeDisabled();
  },
};

export const LoadingState: Story = {
  args: {
    options,
    loading: true,
    placeholder: "Loading select",
  },
  render: (args) => (
    <div className="w-72">
      <Select {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    expect(button).toBeDisabled();
    const spinner = canvas.getByLabelText("loading");
    expect(spinner).toBeInTheDocument();
  },
};
export const VariantStyling: Story = {
  args: {
    options,
    variant: "outline",
    placeholder: "Outline select",
  },
  render: (args) => (
    <div className="w-72">
      <Select {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    expect(button).toHaveClass("border-outline-gray-2");
  },
};

export const WithPrefixSuffix: Story = {
  args: {
    options,
    prefix: <span>Prefix</span>,
    suffix: <span>Suffix</span>,
    placeholder: "Select option",
  },
  render: (args) => {
    const [selected, setSelected] = useState<SelectOption | undefined>();
    return (
      <div className="w-72">
        <Select {...args} value={selected} onChange={setSelected} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Prefix")).toBeInTheDocument();
    expect(canvas.getByText("Suffix")).toBeInTheDocument();
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    const option1 = canvas.getByText("Option 1");
    await userEvent.click(option1);
    expect(button).toHaveTextContent("Option 1");
  },
};

export const Placeholder: Story = {
  args: {
    options,
    placeholder: "Pick one...",
  },
  render: (args) => (
    <div className="w-72">
      <Select {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    expect(button).toHaveTextContent("Pick one...");
  },
};
