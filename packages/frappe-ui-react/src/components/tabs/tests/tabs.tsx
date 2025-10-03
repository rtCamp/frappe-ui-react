import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tabs, TabItem } from "../tabs";

describe("Tabs", () => {
  const tabs: TabItem[] = [
    { label: "Tab 1", content: <div>Content 1</div> },
    { label: "Tab 2", content: <div>Content 2</div> },
    { label: "Tab 3", content: <div>Content 3</div> },
  ];

  it("renders all tab labels", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Tab 3")).toBeInTheDocument();
  });

  it("shows content for the first tab by default", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(
      screen.queryByText("Content 2")?.parentElement?.parentElement
    ).toHaveClass("hidden");
    expect(
      screen.queryByText("Content 3")?.parentElement?.parentElement
    ).toHaveClass("hidden");
  });

  it("changes tab and displays correct content on click", () => {
    render(<Tabs tabs={tabs} />);
    fireEvent.click(screen.getByText("Tab 2"));
    expect(screen.getByText("Content 2")).toBeInTheDocument();
    expect(
      screen.queryByText("Content 1")?.parentElement?.parentElement
    ).toHaveClass("hidden");
    fireEvent.click(screen.getByText("Tab 3"));
    expect(screen.getByText("Content 3")).toBeInTheDocument();
  });

  it("calls onTabChange when tab is changed", () => {
    const handleTabChange = jest.fn();
    render(<Tabs tabs={tabs} onTabChange={handleTabChange} />);
    fireEvent.click(screen.getByText("Tab 2"));
    expect(handleTabChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByText("Tab 3"));
    expect(handleTabChange).toHaveBeenCalledWith(2);
  });

  it("renders vertical layout when vertical prop is true", () => {
    const { container } = render(<Tabs tabs={tabs} vertical />);
    expect(container.firstChild).toHaveClass("flex");
  });
});
