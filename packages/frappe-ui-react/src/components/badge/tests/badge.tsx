import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Badge from "../badge";

describe("Badge", () => {
  test("renders with default props", () => {
    render(<Badge>Default Badge</Badge>);
    expect(screen.getByText("Default Badge")).toBeInTheDocument();
  });

  test("renders with label prop", () => {
    render(<Badge label="Test Label" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  test("renders with different themes", () => {
    const { rerender } = render(<Badge theme="red">Red Badge</Badge>);
    expect(screen.getByText("Red Badge")).toHaveClass("text-ink-red-4");
    expect(screen.getByText("Red Badge")).toHaveClass("bg-surface-red-1");

    rerender(<Badge theme="blue">Blue Badge</Badge>);
    expect(screen.getByText("Blue Badge")).toHaveClass("text-ink-blue-2");

    rerender(<Badge theme="green">Green Badge</Badge>);
    expect(screen.getByText("Green Badge")).toHaveClass("text-ink-green-3");
  });

  test("renders with different sizes", () => {
    const { rerender } = render(<Badge size="sm">Small Badge</Badge>);
    expect(screen.getByText("Small Badge")).toHaveClass("h-4");

    rerender(<Badge size="md">Medium Badge</Badge>);
    expect(screen.getByText("Medium Badge")).toHaveClass("h-5");

    rerender(<Badge size="lg">Large Badge</Badge>);
    expect(screen.getByText("Large Badge")).toHaveClass("h-6");
  });

  test("renders with different variants", () => {
    const { rerender } = render(<Badge variant="solid">Solid Badge</Badge>);
    expect(screen.getByText("Solid Badge")).toBeInTheDocument();

    rerender(<Badge variant="subtle">Subtle Badge</Badge>);
    expect(screen.getByText("Subtle Badge")).toBeInTheDocument();

    rerender(<Badge variant="outline">Outline Badge</Badge>);
    expect(screen.getByText("Outline Badge")).toHaveClass("border");

    rerender(<Badge variant="ghost">Ghost Badge</Badge>);
    expect(screen.getByText("Ghost Badge")).toHaveClass("bg-transparent");
  });

  test("renders with prefix and suffix", () => {
    render(
      <Badge prefix={<span>Pre</span>} suffix={<span>Post</span>}>
        Content
      </Badge>
    );
    expect(screen.getByText("Pre")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Post")).toBeInTheDocument();
  });
});
