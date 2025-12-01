import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Textarea from "../textarea";

describe("Textarea", () => {
  it("renders with label and placeholder", () => {
    render(
      <Textarea
        label="Description"
        placeholder="Type here..."
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type here...")).toBeInTheDocument();
  });

  it("renders with initial value", () => {
    render(<Textarea value="Initial text" onChange={() => {}} />);
    expect(screen.getByDisplayValue("Initial text")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = jest.fn();
    render(<Textarea value="" onChange={handleChange} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Hello" } });
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][0].target.value).toBe("Hello");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Textarea value="" onChange={() => {}} disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("renders with custom rows", () => {
    render(<Textarea value="" onChange={() => {}} rows={5} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "5");
  });

  it("renders with custom id", () => {
    render(<Textarea value="" onChange={() => {}} htmlId="custom-id" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "custom-id");
  });
});
