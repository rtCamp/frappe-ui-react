import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { Combobox } from "./index";

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox/Interactions",
  component: Combobox,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const simpleOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

const directoryOptions = [
  { label: "John Doe", value: "john-doe" },
  { label: "Jane Doe", value: "jane-doe" },
  { label: "John Smith", value: "john-smith" },
  { label: "Bob Johnson", value: "bob-johnson" },
  { label: "Alice Brown", value: "alice-brown" },
];

const groupedOptions = [
  {
    group: "Fruits",
    options: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana", disabled: true },
    ],
  },
  {
    group: "Vegetables",
    options: [{ label: "Carrot", value: "carrot" }],
  },
];

export const OptionSelection: Story = {
  args: {
    options: simpleOptions,
    value: "",
    placeholder: "Select an item",
    onChange: fn(),
  },
  render: function Render(args) {
    const [value, setValue] = React.useState<string | null>("");

    return (
      <div className="w-80">
        <Combobox
          {...args}
          value={value}
          onChange={(nextValue, selectedOption) => {
            setValue(nextValue);
            args.onChange?.(nextValue, selectedOption);
          }}
        />
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const page = within(document.body);
    const input = canvas.getByRole("combobox");

    await userEvent.click(input);
    await userEvent.type(input, "Che");

    const option = await page.findByText("Cherry");
    await userEvent.click(option);

    await expect(args.onChange).toHaveBeenCalledWith(
      "cherry",
      expect.objectContaining({ label: "Cherry", value: "cherry" })
    );

    await waitFor(() => {
      expect(input).toHaveValue("Cherry");
    });
  },
};

export const GroupedAndDisabled: Story = {
  args: {
    options: groupedOptions,
    value: "",
    placeholder: "Select an item",
    openOnFocus: true,
  },
  render: function Render(args) {
    const [value, setValue] = React.useState<string | null>("");

    return (
      <div className="w-80">
        <Combobox {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(document.body);
    const input = canvas.getByRole("combobox");

    await userEvent.click(input);

    await expect(page.findByText("Fruits")).resolves.toBeInTheDocument();
    await expect(page.findByText("Vegetables")).resolves.toBeInTheDocument();

    const banana = await page.findByText("Banana");
    expect(banana.closest('[role="option"]')).toHaveAttribute("data-disabled");
  },
};

export const ControlledSearchLoading: Story = {
  args: {
    options: directoryOptions,
    value: "",
    placeholder: "Search people...",
    openOnFocus: true,
  },
  render: function Render(args) {
    const [value, setValue] = React.useState<string | null>("");
    const [searchValue, setSearchValue] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [options, setOptions] = React.useState(directoryOptions);

    React.useEffect(() => {
      let cancelled = false;

      setLoading(true);

      const timeoutId = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        setOptions(
          searchValue.trim()
            ? directoryOptions.filter((option) =>
                option.label.toLowerCase().includes(searchValue.toLowerCase())
              )
            : directoryOptions
        );
        setLoading(false);
      }, 250);

      return () => {
        cancelled = true;
        window.clearTimeout(timeoutId);
      };
    }, [searchValue]);

    return (
      <div className="w-80">
        <Combobox
          {...args}
          options={options}
          value={value}
          searchValue={searchValue}
          loading={loading}
          onSearchChange={setSearchValue}
          onChange={setValue}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(document.body);
    const input = canvas.getByRole("combobox");

    await userEvent.click(input);
    await waitFor(() => {
      expect(page.getByText("John Doe")).toBeInTheDocument();
    });

    await userEvent.clear(input);
    await userEvent.type(input, "smith");

    await waitFor(() => {
      expect(page.getByText("John Smith")).toBeInTheDocument();
    });

    expect(page.queryByText("John Doe")).not.toBeInTheDocument();
  },
};
