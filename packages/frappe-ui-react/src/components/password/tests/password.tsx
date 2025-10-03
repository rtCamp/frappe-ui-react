import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Password from "../password";

describe("Password", () => {
  it("renders password input", () => {
    render(<Password value="secret" onChange={() => {}} />);
    const input = screen.getByDisplayValue("secret");
    expect(input).toHaveAttribute("type", "password");
  });

  it("shows password when eye icon is clicked", () => {
    render(<Password value="secret" onChange={() => {}} />);
    const eyeIcon = screen.getByTestId("eye-icon");
    fireEvent.click(eyeIcon);
    const input = screen.getByDisplayValue("secret");
    expect(input).toHaveAttribute("type", "text");
  });

  it("toggles password visibility with keyboard shortcut", () => {
    render(<Password value="secret" onChange={() => {}} />);
    const input = screen.getByDisplayValue("secret");
    fireEvent.keyDown(input, { key: "i", ctrlKey: true });
    expect(input).toHaveAttribute("type", "text");
    fireEvent.keyDown(input, { key: "i", ctrlKey: true });
    expect(input).toHaveAttribute("type", "password");
  });

  it("does not show eye icon if value contains '*'", () => {
    render(<Password value="****" onChange={() => {}} />);
    expect(screen.queryByTestId("eye-icon")).not.toBeInTheDocument();
  });
});
