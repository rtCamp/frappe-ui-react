import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Checkbox from "../checkbox";

describe("Checkbox", () => {
  it("renders with default props", () => {
    render(<Checkbox htmlId="test" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("applies extra classes correctly", () => {
    render(<Checkbox htmlId="test" extraClasses="test-class" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("test-class");
  });

  it("handles empty extraClasses prop", () => {
    render(<Checkbox htmlId="test" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.className).not.toContain("undefined");
  });

  it("applies label text when provided", () => {
    render(<Checkbox htmlId="test" label="Test Label" />);
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("handles onChange callback", async () => {
    const onChange = jest.fn();
    render(<Checkbox htmlId="test" onChange={onChange} />);

    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("respects disabled state", () => {
    render(<Checkbox htmlId="test" disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });
});
