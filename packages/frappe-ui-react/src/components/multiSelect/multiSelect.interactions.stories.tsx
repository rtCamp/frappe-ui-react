import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { screen, userEvent, expect, within, waitFor, fn } from "storybook/test";

import { MultiSelect } from "./multiSelect";
import { Button } from "../button";

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect/Interactions",
  component: MultiSelect,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
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
    compareFn: {
      control: false,
      description: "Custom comparison function for options",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
];

const optionsWithDisabled = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana", disabled: true },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date", disabled: true },
  { value: "elderberry", label: "Elderberry" },
];

export const Options: Story = {
  args: {
    options,
    value: [],
    placeholder: "Select fruits",
    onChange: fn(),
  },
  render: function Render(args) {
    const [value, setValue] = useState<string[]>(args.value as string[]);
    const handleChange = (newValue: string[]) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };
    return (
      <div className="w-112.5">
        <MultiSelect {...args} value={value} onChange={handleChange} />
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Open dropdown
    const trigger = canvas.getByRole("combobox");
    await userEvent.click(trigger);

    // Select an option
    const cherryOption = await screen.findByText("Cherry");
    await userEvent.click(cherryOption);
    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(args.onChange).toHaveBeenCalledWith(["cherry"]);

    // Verify selected option appears in trigger
    await waitFor(() => {
      expect(trigger).toHaveTextContent("Cherry");
    });

    // Select another option
    const appleOption = screen.getByText("Apple");
    await userEvent.click(appleOption);
    await expect(args.onChange).toHaveBeenCalledTimes(2);
    await expect(args.onChange).toHaveBeenCalledWith(["cherry", "apple"]);

    await waitFor(() => {
      expect(trigger).toHaveTextContent("Cherry, Apple");
    });

    // Deselect an option
    await userEvent.click(cherryOption);
    await expect(args.onChange).toHaveBeenCalledTimes(3);
    await expect(args.onChange).toHaveBeenCalledWith(["apple"]);

    await waitFor(() => {
      expect(trigger).toHaveTextContent("Apple");
    });
  },
};

export const DisabledOptions: Story = {
  args: {
    options: optionsWithDisabled,
    value: [],
    placeholder: "Select fruits",
  },
  render: function Render(args) {
    const [value, setValue] = useState<string[]>(args.value as string[]);
    return (
      <div className="w-112.5">
        <MultiSelect {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open dropdown
    const trigger = canvas.getByRole("combobox");
    await userEvent.click(trigger);

    // Find disabled option and verify it's disabled
    const bananaOption = await screen.findByText("Banana");
    const bananaItem = bananaOption.closest('[role="option"]');
    expect(bananaItem).toHaveAttribute("data-disabled");

    // Click an enabled option
    const appleOption = screen.getByText("Apple");
    await userEvent.click(appleOption);

    // Verify enabled option was selected
    await waitFor(() => {
      expect(trigger).toHaveTextContent("Apple");
    });

    // Click "Select All" button
    const selectAllButton = await screen.findByRole("button", {
      name: /select all/i,
    });
    await userEvent.click(selectAllButton);

    // Verify only enabled options are selected
    expect(trigger).toHaveTextContent("Apple, Cherry, Elderberry");
  },
};

export const SearchOptions: Story = {
  args: {
    options,
    value: [],
    placeholder: "Select fruits",
    hideSearch: false,
  },
  render: function Render(args) {
    const [value, setValue] = useState<string[]>(args.value as string[]);
    return (
      <div className="w-112.5">
        <MultiSelect {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open dropdown
    const trigger = canvas.getByRole("combobox");
    await userEvent.click(trigger);

    // Find search input
    const searchInput = await screen.findByPlaceholderText("Search for...");
    expect(searchInput).toBeInTheDocument();

    // Type in search
    await userEvent.type(searchInput, "ber");

    // Elderberry should be visible
    const elderberryOption = screen.getByText("Elderberry");
    expect(elderberryOption).toBeInTheDocument();

    // Apple should not be visible
    const appleOption = screen.queryByText("Apple");
    expect(appleOption).not.toBeInTheDocument();

    // Type search that has no results
    await userEvent.type(searchInput, "xyz123");

    // Verify "No results found" message appears
    const noResultsMessage = await screen.findByText("No results found");
    expect(noResultsMessage).toBeInTheDocument();

    // Find and click the clear button
    const clearButton = await screen.findByRole("button", {
      name: /clear search/i,
    });
    expect(clearButton).toBeInTheDocument();

    await userEvent.click(clearButton as HTMLElement);

    // Verify search input is cleared
    expect(searchInput).toHaveValue("");
  },
};

export const FooterButtons: Story = {
  args: {
    options,
    value: [],
    placeholder: "Select fruits",
  },
  render: function Render(args) {
    const [value, setValue] = useState<string[]>(args.value as string[]);
    return (
      <div className="w-112.5">
        <MultiSelect {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open dropdown
    const trigger = canvas.getByRole("combobox");
    await userEvent.click(trigger);

    // Find and click "Select All" button
    const selectAllButton = await screen.findByRole("button", {
      name: /select all/i,
    });
    await userEvent.click(selectAllButton);

    // Verify all options are selected
    expect(trigger).toHaveTextContent(
      "Apple, Banana, Cherry, Date, Elderberry"
    );

    // Find and click "Clear All" button
    const clearAllButton = await screen.findByRole("button", {
      name: /clear all/i,
    });
    await userEvent.click(clearAllButton);

    // Verify all options are cleared
    expect(trigger).toHaveTextContent("Select fruits");
  },
};

export const LoadingState: Story = {
  args: {
    options,
    value: [],
    placeholder: "Select fruits",
    loading: true,
  },
  render: function Render(args) {
    const [value, setValue] = useState<string[]>(args.value as string[]);
    return (
      <div className="w-112.5">
        <MultiSelect {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open dropdown
    const trigger = canvas.getByRole("combobox");
    await userEvent.click(trigger);

    // Verify loading indicator is present
    const loadingIndicator = await screen.findByRole("status");
    expect(loadingIndicator).toBeInTheDocument();
    expect(loadingIndicator).toHaveAttribute("aria-label", "Loading");
  },
};

export const HideSearchInput: Story = {
  args: {
    options,
    value: [],
    placeholder: "Select fruits",
    hideSearch: true,
  },
  render: function Render(args) {
    const [value, setValue] = useState<string[]>(args.value as string[]);
    return (
      <div className="w-112.5">
        <MultiSelect {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open dropdown
    const trigger = canvas.getByRole("combobox");
    await userEvent.click(trigger);

    // Verify search input is not present
    const searchInput = screen.queryByPlaceholderText("Search for...");
    expect(searchInput).not.toBeInTheDocument();

    // Verify options are still visible
    const appleOption = await screen.findByText("Apple");
    expect(appleOption).toBeInTheDocument();
  },
};

export const RenderOption: Story = {
  args: {
    options,
    value: [],
    placeholder: "Select fruits",
  },
  render: function Render(args) {
    const [value, setValue] = useState<string[]>(args.value as string[]);
    return (
      <div className="w-112.5">
        <MultiSelect
          {...args}
          value={value}
          onChange={setValue}
          renderOption={(option) => (
            <div className="flex items-center gap-2">
              <span className="text-lg">🍎</span>
              <strong>Custom: {option.label}</strong>
            </div>
          )}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open dropdown
    const trigger = canvas.getByRole("combobox");
    await userEvent.click(trigger);

    // Verify custom rendered options are present
    const customApple = await screen.findByText("Custom: Apple");
    expect(customApple).toBeInTheDocument();

    const customBanana = screen.getByText("Custom: Banana");
    expect(customBanana).toBeInTheDocument();

    // Select the custom rendered option
    await userEvent.click(customApple);

    // Verify it was selected
    expect(trigger).toHaveTextContent("Apple");
  },
};

export const RenderFooter: Story = {
  args: {
    options,
    value: [],
    placeholder: "Select fruits",
  },
  render: function Render(args) {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-112.5">
        <MultiSelect
          {...args}
          value={value}
          onChange={setValue}
          renderFooter={({ clearAll, selectAll }) => (
            <div className="flex flex-col gap-2" data-testid="custom-footer">
              <Button onClick={selectAll} className="w-full">
                Pick All
              </Button>
              <Button onClick={clearAll} className="w-full" theme="red">
                Remove All
              </Button>
            </div>
          )}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open dropdown
    const trigger = canvas.getByRole("combobox");
    await userEvent.click(trigger);

    // Verify custom footer is rendered
    const customFooter = await screen.findByTestId("custom-footer");
    expect(customFooter).toBeInTheDocument();

    const pickAllButton = screen.getByText("Pick All");
    expect(pickAllButton).toBeInTheDocument();

    // Click the custom "Pick All" button
    await userEvent.click(pickAllButton);

    // Verify all options were selected
    await waitFor(() => {
      expect(trigger).toHaveTextContent(
        "Apple, Banana, Cherry, Date, Elderberry"
      );
    });

    // Test "Remove All" button
    const removeAllButton = screen.getByText("Remove All");
    await userEvent.click(removeAllButton);

    // Verify all options were cleared
    await waitFor(() => {
      expect(trigger).toHaveTextContent("Select fruits");
    });
  },
};

export const CompareFn: Story = {
  args: {
    options,
    value: [],
    placeholder: "Select fruits",
  },
  render: function Render(args) {
    const [value, setValue] = useState<string[]>(args.value as string[]);

    const compareFnByLabel = (a: unknown, b: unknown) => {
      const optionA = a as { value: string; label: string };
      const optionB = b as { value: string; label: string };
      return optionA?.label === optionB?.label;
    };

    return (
      <div className="w-112.5">
        <MultiSelect
          {...args}
          value={value}
          onChange={setValue}
          compareFn={compareFnByLabel}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open dropdown
    const trigger = canvas.getByRole("combobox");
    await userEvent.click(trigger);

    // Select Banana
    const bananaOption = screen.getByText("Banana");
    await userEvent.click(bananaOption);

    await waitFor(() => {
      expect(trigger).toHaveTextContent("Banana");
    });

    // Select Date
    const dateOption = screen.getByText("Date");
    await userEvent.click(dateOption);

    await waitFor(() => {
      expect(trigger).toHaveTextContent("Banana, Date");
    });
  },
};
