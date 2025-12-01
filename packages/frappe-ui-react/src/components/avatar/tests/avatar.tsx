import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Avatar from "../avatar";

describe("Avatar", () => {
  test("renders with default props", () => {
    const { container } = render(<Avatar />);
    const avatar = container.querySelector("div");
    expect(avatar).toHaveClass("rounded-full");
  });

  test("renders with square shape and correct rounding", () => {
    const { container } = render(<Avatar shape="square" size="sm" />);
    const avatar = container.querySelector("div");
    expect(avatar).toHaveClass("rounded-[5px]");
  });

  test("renders with image", () => {
    render(<Avatar image="test.jpg" alt="Test" />);
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "test.jpg");
  });

  test("renders with label", () => {
    const { container } = render(<Avatar label="Test User" />);
    const avatar = container.querySelector("div");
    expect(avatar?.textContent).toBe("T");
  });

  test("renders with custom size", () => {
    const { container } = render(<Avatar size="xl" />);
    const avatar = container.querySelector("div");
    expect(avatar).toHaveClass("w-8 h-8");
  });

  test("renders with indicator", () => {
    render(
      <Avatar indicator={<div data-testid="indicator" />}>
        <span>T</span>
      </Avatar>
    );
    expect(screen.getByTestId("indicator")).toBeInTheDocument();
  });
});
