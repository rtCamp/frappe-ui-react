import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "../button";

describe("Button Component", () => {
  const renderButton = (props = {}) => {
    return render(<Button {...props} />);
  };

  it("renders a basic button with label", () => {
    renderButton({ label: "Click me" });
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders with different themes and variants", () => {
    const { rerender } = renderButton({
      label: "Button",
      theme: "blue",
      variant: "solid",
    });
    expect(screen.getByText("Button").parentElement).toHaveClass("bg-blue-500");

    rerender(<Button label="Button" theme="red" variant="subtle" />);
    expect(screen.getByText("Button").parentElement).toHaveClass(
      "bg-surface-red-2"
    );
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    renderButton({ label: "Click me", onClick: handleClick });
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders loading state correctly", () => {
    renderButton({ label: "Submit", loading: true, loadingText: "Loading..." });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders with icons", () => {
    renderButton({
      label: "Button",
      iconLeft: "user",
      iconRight: "arrow-right",
    });
    expect(screen.getAllByRole("svg", { hidden: true })).toHaveLength(2);
  });

  it("renders as disabled", () => {
    renderButton({ label: "Disabled", disabled: true });
    expect(screen.getByText("Disabled").parentElement).toHaveAttribute(
      "disabled"
    );
  });

  it("opens link in new tab when link prop is provided", () => {
    const windowSpy = jest.spyOn(window, "open").mockImplementation(() => null);
    renderButton({ label: "External Link", link: "https://example.com" });
    fireEvent.click(screen.getByText("External Link"));
    expect(windowSpy).toHaveBeenCalledWith("https://example.com", "_blank");
    windowSpy.mockRestore();
  });

  it("renders with custom className", () => {
    renderButton({ label: "Custom", className: "test-class" });
    expect(screen.getByText("Custom").parentElement).toHaveClass("test-class");
  });
});
