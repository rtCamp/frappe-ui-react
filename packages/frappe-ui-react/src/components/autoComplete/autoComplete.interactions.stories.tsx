import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import Autocomplete from "./autoComplete";

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete/Interactions",
  component: Autocomplete,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Autocomplete>;

const simpleOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

const directoryOptions = [
  { label: "John Doe", value: "john-doe", image: "john.png" },
  { label: "Jane Doe", value: "jane-doe", image: "jane.png" },
  { label: "John Smith", value: "john-smith", image: "smith.png" },
  { label: "Bob Johnson", value: "bob-johnson", image: "bob.png" },
];

const groupedOptions = [
  {
    group: "Fruits",
    items: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana", disabled: true },
    ],
  },
  {
    group: "Vegetables",
    items: [{ label: "Carrot", value: "carrot" }],
  },
];

export const PreselectedDisplay: Story = {
  args: {
    options: directoryOptions,
    value: "john-doe",
    placeholder: "Select a person",
  },
  render: (args) => (
    <div className="w-112.5">
      <Autocomplete {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox", { name: /toggle options/i });

    await waitFor(() => {
      expect(trigger).toHaveTextContent("John Doe");
    });
  },
};

export const OptionSelection: Story = {
  args: {
    options: simpleOptions,
    value: null,
    placeholder: "Select an item",
    onChange: fn(),
  },
  render: function Render(args) {
    const [value, setValue] = React.useState<string | null>(null);

    return (
      <div className="w-112.5">
        <Autocomplete
          {...args}
          value={value}
          onChange={(nextValue, nextOption) => {
            setValue(nextValue as string | null);
            args.onChange?.(nextValue, nextOption);
          }}
        />
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const page = within(document.body);
    const trigger = canvas.getByRole("combobox", { name: /toggle options/i });

    await userEvent.click(trigger);

    const search = await page.findByPlaceholderText("Search");
    await userEvent.type(search, "Che");

    const option = await page.findByText("Cherry");
    await userEvent.click(option);

    await expect(args.onChange).toHaveBeenCalledWith(
      "cherry",
      expect.objectContaining({ label: "Cherry", value: "cherry" })
    );

    await waitFor(() => {
      expect(trigger).toHaveTextContent("Cherry");
    });
  },
};

export const GroupedAndDisabled: Story = {
  args: {
    options: groupedOptions,
    value: null,
    placeholder: "Select an item",
  },
  render: function Render(args) {
    const [value, setValue] = React.useState<string | null>(null);

    return (
      <div className="w-112.5">
        <Autocomplete
          {...args}
          value={value}
          onChange={(nextValue, _selectedOption) => {
            void _selectedOption;
            setValue(nextValue as string | null);
          }}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(document.body);
    const trigger = canvas.getByRole("combobox", { name: /toggle options/i });

    await userEvent.click(trigger);

    await expect(page.findByText("Fruits")).resolves.toBeInTheDocument();
    await expect(page.findByText("Vegetables")).resolves.toBeInTheDocument();

    const banana = await page.findByText("Banana");
    expect(banana.closest('[role="option"]')).toHaveAttribute("data-disabled");
  },
};

export const MultipleSelectionFooter: Story = {
  args: {
    options: simpleOptions,
    value: [],
    multiple: true,
    showFooter: true,
    placeholder: "Select items",
    onChange: fn(),
  },
  render: function Render(args) {
    const [value, setValue] = React.useState<string[]>([]);

    return (
      <div className="w-112.5">
        <Autocomplete
          {...args}
          value={value}
          onChange={(nextValue, nextOptions) => {
            setValue((nextValue as string[]) ?? []);
            args.onChange?.(nextValue, nextOptions);
          }}
        />
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const page = within(document.body);
    const trigger = canvas.getByRole("combobox", { name: /toggle options/i });

    await userEvent.click(trigger);
    await userEvent.click(await page.findByText("Apple"));
    await userEvent.click(await page.findByText("Cherry"));

    await waitFor(() => {
      expect(args.onChange).toHaveBeenLastCalledWith(
        ["apple", "cherry"],
        expect.arrayContaining([
          expect.objectContaining({ label: "Apple", value: "apple" }),
          expect.objectContaining({ label: "Cherry", value: "cherry" }),
        ])
      );
    });

    await userEvent.click(page.getByRole("button", { name: "Select All" }));

    await waitFor(() => {
      expect(args.onChange).toHaveBeenLastCalledWith(
        ["apple", "banana", "cherry"],
        expect.arrayContaining([
          expect.objectContaining({ label: "Apple", value: "apple" }),
          expect.objectContaining({ label: "Banana", value: "banana" }),
          expect.objectContaining({ label: "Cherry", value: "cherry" }),
        ])
      );
    });

    await userEvent.click(page.getByRole("button", { name: "Clear All" }));

    await waitFor(() => {
      expect(args.onChange).toHaveBeenLastCalledWith([], []);
    });
  },
};

export const ControlledSearchLoading: Story = {
  args: {
    options: directoryOptions,
    value: [],
    multiple: true,
    keepSelectedVisible: true,
    placeholder: "Select people",
  },
  render: function Render(args) {
    const [value, setValue] = React.useState<string[]>([]);
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
      <div className="w-112.5">
        <Autocomplete
          {...args}
          multiple
          keepSelectedVisible
          value={value}
          options={options}
          searchValue={searchValue}
          loading={loading}
          onSearchChange={setSearchValue}
          onChange={(_value) => {
            setValue(_value as string[]);
          }}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(document.body);
    const trigger = canvas.getByRole("combobox", { name: /toggle options/i });

    await userEvent.click(trigger);
    await userEvent.click(await page.findByText("John Doe"));
    await userEvent.click(await page.findByText("Jane Doe"));

    const search = await page.findByPlaceholderText("Search");
    await userEvent.clear(search);
    await userEvent.type(search, "smith");

    await waitFor(() => {
      expect(page.getByTestId("loading-indicator")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(page.getByText("John Smith")).toBeInTheDocument();
    });

    expect(page.getByText("John Doe")).toBeInTheDocument();
    expect(page.getByText("Jane Doe")).toBeInTheDocument();
    expect(page.queryByText("Bob Johnson")).not.toBeInTheDocument();

    await userEvent.clear(search);
    await userEvent.type(search, "zzz");

    await waitFor(() => {
      expect(page.queryByText("John Smith")).not.toBeInTheDocument();
    });

    expect(page.getByText("John Doe")).toBeInTheDocument();
    expect(page.getByText("Jane Doe")).toBeInTheDocument();
  },
};
