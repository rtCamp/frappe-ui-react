import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextInput from "../textInput";

describe("TextInput", () => {
  it("renders with placeholder", () => {
    render(<TextInput placeholder="Type here..." value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("Type here...")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = jest.fn();
    render(<TextInput value="" onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders prefix element", () => {
    render(
      <TextInput
        value=""
        onChange={() => {}}
        prefix={() => <span>PREFIX</span>}
      />
    );
    expect(screen.getByText("PREFIX")).toBeInTheDocument();
  });


  it("is disabled when disabled prop is true", () => {
    render(<TextInput value="" onChange={() => {}} disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
