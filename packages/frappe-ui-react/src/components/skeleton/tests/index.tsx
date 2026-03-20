import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Skeleton from "../skeleton";

describe("Skeleton Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders a div element", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("has the data-slot attribute set to skeleton", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("data-slot", "skeleton");
  });

  it("applies default classes for animation and background", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
    expect(container.firstChild).toHaveClass("bg-gray-200");
    expect(container.firstChild).toHaveClass("rounded-md");
  });

  it("merges custom className with default classes", () => {
    const { container } = render(<Skeleton className="h-4 w-32" />);
    expect(container.firstChild).toHaveClass("animate-pulse");
    expect(container.firstChild).toHaveClass("h-4");
    expect(container.firstChild).toHaveClass("w-32");
  });

  it("forwards additional HTML div props", () => {
    const { container } = render(
      <Skeleton aria-label="loading" data-testid="skeleton-el" />
    );
    expect(container.firstChild).toHaveAttribute("aria-label", "loading");
    expect(container.firstChild).toHaveAttribute("data-testid", "skeleton-el");
  });

  it("renders children when provided", () => {
    const { getByText } = render(<Skeleton>Loading...</Skeleton>);
    expect(getByText("Loading...")).toBeInTheDocument();
  });
});
