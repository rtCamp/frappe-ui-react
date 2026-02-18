import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RadioButton from "../radioButton";
import userEvent from "@testing-library/user-event";

describe("RadioButton Component", () => {
  const options = [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
    { label: "Option 3", value: "opt3", disabled: true },
  ];

  it("renders all options", () => {
    render(<RadioButton options={options} />);
    options.forEach((option) =>
      expect(screen.getByText(option.label)).toBeInTheDocument()
    );
  });

  it("handles selection change", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(<RadioButton options={options} onChange={handleChange} />);

    await user.click(screen.getByText("Option 2"));
    expect(handleChange).toHaveBeenCalledWith("opt2");
  });

  it("renders correctly controlled value", async () => {
    const user = userEvent.setup();

    const Wrapper = () => {
      const [value, setValue] = React.useState("opt1");
      return (
        <RadioButton
          options={options}
          value={value}
          onChange={(val) => setValue(val || "")}
        />
      );
    };

    render(<Wrapper />);

    const radio1 = screen.getByRole("radio", { name: "Option 1" });
    const radio2 = screen.getByRole("radio", { name: "Option 2" });

    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();

    // Click another option
    await user.click(screen.getByText("Option 2"));

    expect(radio1).not.toBeChecked();
    expect(radio2).toBeChecked();
  });

  it("respects global disabled state", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(<RadioButton options={options} disabled onChange={handleChange} />);

    const radio1 = screen.getByRole("radio", { name: "Option 1" });
    expect(radio1).toHaveAttribute("aria-disabled", "true");

    await user.click(screen.getByText("Option 1"));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("respects individual option disabled state", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(<RadioButton options={options} onChange={handleChange} />);

    const radio3 = screen.getByRole("radio", { name: "Option 3" });
    expect(radio3).toHaveAttribute("aria-disabled", "true");

    // Try clicking disabled option
    await user.click(screen.getByText("Option 3"));
    expect(handleChange).not.toHaveBeenCalled();

    // Valid option still works
    await user.click(screen.getByText("Option 1"));
    expect(handleChange).toHaveBeenCalledWith("opt1");
  });
});
