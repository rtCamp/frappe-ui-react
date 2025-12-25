import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Textarea from "../textarea";

describe("Textarea", () => {
  it("renders label", () => {
    render(<Textarea label="My Label" value="" onChange={() => {}} />);
    expect(screen.getByText("My Label")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<Textarea value="" onChange={() => {}} error="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<Textarea value="" onChange={() => {}} description="Helper text" />);
    expect(screen.getByText("Helper text")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = jest.fn();
    render(<Textarea value="" onChange={handleChange} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Hello" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Textarea value="" onChange={() => {}} disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});