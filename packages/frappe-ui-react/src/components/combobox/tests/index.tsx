import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import { Combobox } from "../combobox";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("Combobox", () => {
  const simpleOptions = ["Option 1", "Option 2", "Option 3"];
  const complexOptions = [
    { label: "Option 1", value: "1", icon: <span>🌟</span> },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3", disabled: true },
  ];
  const groupedOptions = [
    {
      group: "Group 1",
      options: [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
      ],
    },
    {
      group: "Group 2",
      options: [{ label: "Option 3", value: "3" }],
    },
  ];

  it("renders with simple string options", () => {
    render(<Combobox options={simpleOptions} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("handles complex options with icons", () => {
    render(<Combobox options={complexOptions} value="1" />);
    expect(screen.getByText("🌟")).toBeInTheDocument();
  });

  it("filters options based on search query", async () => {
    render(<Combobox options={simpleOptions} />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "Option 1" } });
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });

  it("handles disabled options", () => {
    render(<Combobox options={complexOptions} />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "Option 3" } });
    const disabled = screen.getByText("Option 3");
    expect(disabled.parentElement).toHaveClass("opacity-50");
  });

  it("renders grouped options correctly", () => {
    render(<Combobox options={groupedOptions} />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "Option" } });
    expect(screen.getByText("Group 1")).toBeInTheDocument();
    expect(screen.getByText("Group 2")).toBeInTheDocument();
  });

  it("calls onChange when option is selected", async () => {
    const handleChange = jest.fn();
    render(<Combobox options={simpleOptions} onChange={handleChange} />);
    const input = screen.getByRole("combobox");
    await userEvent.type(input, "Option 1");
    await userEvent.click(screen.getByText("Option 1"));
    expect(handleChange).toHaveBeenCalledWith("Option 1", "Option 1");
  });

  it("displays placeholder when no value is selected", () => {
    render(<Combobox options={simpleOptions} placeholder="Select an option" />);
    expect(screen.getByPlaceholderText("Select an option")).toBeInTheDocument();
  });
});
