import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormControl from "../formControl";

describe("FormControl", () => {
  it("renders without crashing", () => {
    const { container } = render(<FormControl htmlId="test-id" />);
    expect(container).toBeInTheDocument();
  });

  it("renders label and description", () => {
    render(<FormControl label="Test Label" description="Test Description" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders as a textarea when type is textarea", () => {
    render(<FormControl type="textarea" htmlId="test-textarea" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders as a checkbox when type is checkbox", () => {
    render(
      <FormControl type="checkbox" label="Check me" htmlId="test-checkbox" />
    );
    expect(screen.getByLabelText("Check me")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders as a select when type is select", () => {
    render(
      <FormControl
        type="select"
        options={[
          { label: "Option 1", value: "1" },
          { label: "Option 2", value: "2" },
        ]}
        htmlId="test-select"
      />
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders as a text input by default", () => {
    render(<FormControl htmlId="test-input" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("applies required prop to input", () => {
    render(<FormControl required htmlId="test-required" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("required");
  });

  it("renders autocomplete with options", () => {
    render(
      <FormControl
        type="autocomplete"
        options={[
          { label: "One", value: "1" },
          { label: "Two", value: "2" },
        ]}
        modelValue="1"
        htmlId="test-autocomplete"
      />
    );
    expect(screen.getByTestId("autocomplete-component")).toBeInTheDocument();
  });

  it("renders prefix and suffix", () => {
    render(
      <FormControl
        label="With Prefix"
        prefix={() => <span data-testid="prefix">P</span>}
        suffix={() => <span data-testid="suffix">S</span>}
        htmlId="test-prefix-suffix"
      />
    );
    expect(screen.getByTestId("prefix")).toBeInTheDocument();
    expect(screen.getByTestId("suffix")).toBeInTheDocument();
  });


  it("calls onChange for select", () => {
    const handleChange = jest.fn();
    render(
      <FormControl
        type="select"
        options={[
          { label: "Option 1", value: "1" },
          { label: "Option 2", value: "2" },
        ]}
        onChange={handleChange}
        htmlId="test-select-change"
      />
    );
    screen.getByRole("combobox").focus();
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "2" } });
    expect(handleChange).toHaveBeenCalledWith("2");
  });

  it("calls onChange for checkbox", () => {
    const handleChange = jest.fn();
    render(
      <FormControl
        type="checkbox"
        label="Check me"
        onChange={handleChange}
        htmlId="test-checkbox-change"
      />
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalled();
  });

  it("applies disabled prop", () => {
    render(<FormControl disabled htmlId="test-disabled" />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("applies placeholder prop", () => {
    render(<FormControl placeholder="Enter text" htmlId="test-placeholder" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<FormControl className="custom-class" htmlId="test-classname" />);
    expect(screen.getByTestId("form-control")).toHaveClass(
      "custom-class"
    );
  });
});
