import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Select from "../select";

describe("Select", () => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3", disabled: true },
  ];

  it("renders all options", () => {
    render(<Select options={options} value="" onChange={() => {}} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("renders with placeholder", () => {
    render(
      <Select
        options={options}
        value=""
        placeholder="Select an option"
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("renders with initial value", () => {
    render(<Select options={options} value="2" onChange={() => {}} />);
    expect(screen.getByDisplayValue("Option 2")).toBeInTheDocument();
  });

  it("calls onChange when selecting option", () => {
    const handleChange = jest.fn();
    render(<Select options={options} value="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Select options={options} value="" onChange={() => {}} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("renders with custom id", () => {
    render(
      <Select
        options={options}
        value=""
        onChange={() => {}}
        htmlId="custom-id"
      />
    );
    expect(screen.getByRole("combobox")).toHaveAttribute("id", "custom-id");
  });

  it("renders prefix", () => {
    const Prefix = () => <span>Prefix</span>;
    render(
      <Select
        options={options}
        value=""
        onChange={() => {}}
        prefix={() => <Prefix />}
      />
    );
    expect(screen.getByText("Prefix")).toBeInTheDocument();
  });

  it("disables option when disabled prop is set", () => {
    render(<Select options={options} value="" onChange={() => {}} />);
    expect(screen.getByText("Option 3")).toBeDisabled();
  });
});
