import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextInput from "../textInput";

describe("TextInput", () => {
  it("renders label", () => {
    render(<TextInput label="My Label" value="" onChange={() => {}} />);
    expect(screen.getByText("My Label")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<TextInput value="" onChange={() => {}} error="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

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
    render(<TextInput value="" onChange={() => {}} prefix={<span>PREFIX</span>} />);
    expect(screen.getByText("PREFIX")).toBeInTheDocument();
  });
});