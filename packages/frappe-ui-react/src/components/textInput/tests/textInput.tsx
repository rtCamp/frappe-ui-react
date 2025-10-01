import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextInput from "../textInput";

describe("TextInput", () => {
  describe("Rendering", () => {
    it("renders with placeholder", () => {
      render(
        <TextInput placeholder="Type here..." value="" onChange={() => {}} />
      );
      expect(screen.getByPlaceholderText("Type here...")).toBeInTheDocument();
    });

    it("renders with initial value", () => {
      render(<TextInput value="Initial" onChange={() => {}} />);
      expect(screen.getByDisplayValue("Initial")).toBeInTheDocument();
    });

    it("is disabled when disabled prop is true", () => {
      render(<TextInput value="" onChange={() => {}} disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("renders with custom id", () => {
      render(<TextInput value="" onChange={() => {}} htmlId="custom-id" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "custom-id");
    });
  });

  describe("User Interaction", () => {
    it("calls onChange when typing", () => {
      const handleChange = jest.fn();
      render(<TextInput value="" onChange={handleChange} />);
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "Hello" } });
      expect(handleChange).toHaveBeenCalled();
      expect(handleChange.mock.calls[0][0].target.value).toBe("Hello");
    });
  });

  describe("Prefix & Suffix", () => {
    it("renders prefix and suffix", () => {
      const Prefix = () => <span>Prefix</span>;
      const Suffix = () => <span>Suffix</span>;
      render(
        <TextInput
          value=""
          onChange={() => {}}
          prefix={() => <Prefix />}
          suffix={() => <Suffix />}
        />
      );
      expect(screen.getByText("Prefix")).toBeInTheDocument();
      expect(screen.getByText("Suffix")).toBeInTheDocument();
    });
  });
});
