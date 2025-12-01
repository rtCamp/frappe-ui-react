import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Alert from "../alert";

describe("Alert Component", () => {
  it("should render with title", () => {
    render(<Alert title="Test Title">Test content</Alert>);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should render with children content", () => {
    render(<Alert>Test content</Alert>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("should render with actions", () => {
    render(<Alert actions={<button>Action</button>}>Test content</Alert>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should apply warning styles by default", () => {
    render(<Alert>Test content</Alert>);
    const container =
      screen.getByText("Test content").parentElement?.parentElement
        ?.parentElement;
    expect(container).toHaveClass("text-ink-gray-7 bg-surface-blue-1");
  });
});
