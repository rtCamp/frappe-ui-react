import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonGroup from "../buttonGroup";

describe("ButtonGroup Component", () => {
  const defaultButtons = [
    { label: "Button 1", onClick: jest.fn() },
    { label: "Button 2", onClick: jest.fn() },
  ];

  const renderButtonGroup = (props = {}) => {
    return render(<ButtonGroup buttons={defaultButtons} {...props} />);
  };

  it("renders multiple buttons", () => {
    renderButtonGroup();
    expect(screen.getByText("Button 1")).toBeInTheDocument();
    expect(screen.getByText("Button 2")).toBeInTheDocument();
  });

  it("applies shared props to all buttons", () => {
    renderButtonGroup({ size: "sm", variant: "outline", theme: "red" });

    const button1 = screen.getByText("Button 1").closest("button");
    const button2 = screen.getByText("Button 2").closest("button");

    expect(button1).toHaveClass("h-7");
    expect(button1).toHaveClass("text-red-700");
    expect(button1).toHaveClass("border-outline-red-1");

    expect(button2).toHaveClass("h-7");
    expect(button2).toHaveClass("text-red-700");
    expect(button2).toHaveClass("border-outline-red-1");
  });

  it("applies custom global className", () => {
    const { container } = renderButtonGroup({
      className: "custom-group-class",
    });
    // ButtonGroup wraps buttons in a div
    expect(container.firstChild).toHaveClass("custom-group-class");
    expect(container.firstChild).toHaveClass("flex");
    expect(container.firstChild).toHaveClass("gap-1");
  });

  it("handles click events on individual buttons", () => {
    const handleClick1 = jest.fn();
    const handleClick2 = jest.fn();

    const buttons = [
      { label: "Action 1", onClick: handleClick1 },
      { label: "Action 2", onClick: handleClick2 },
    ];

    render(<ButtonGroup buttons={buttons} />);

    fireEvent.click(screen.getByText("Action 1"));
    expect(handleClick1).toHaveBeenCalledTimes(1);
    expect(handleClick2).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText("Action 2"));
    expect(handleClick2).toHaveBeenCalledTimes(1);
  });
});
