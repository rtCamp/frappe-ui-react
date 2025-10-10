import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TabButtons from "../index";

describe("TabButtons", () => {
  const buttons = [
    { label: "Tab 1", value: "1" },
    { label: "Tab 2", value: "2" },
    { label: "Tab 3", value: "3", disabled: true },
  ];

  it("renders all tab buttons", () => {
    render(<TabButtons buttons={buttons} value="1" onChange={() => {}} />);
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Tab 3")).toBeInTheDocument();
  });

  it("calls onChange when a tab is clicked", () => {
    const handleChange = jest.fn();
    render(<TabButtons buttons={buttons} value="1" onChange={handleChange} />);
    fireEvent.click(screen.getByText("Tab 2"));
    expect(handleChange).toHaveBeenCalledWith("2");
  });

  it("does not call onChange when a disabled tab is clicked", () => {
    const handleChange = jest.fn();
    render(<TabButtons buttons={buttons} value="1" onChange={handleChange} />);
    fireEvent.click(screen.getByText("Tab 3"));
    expect(handleChange).not.toHaveBeenCalledWith("3");
  });

  it("hides label when hideLabel is true", () => {
    const customButtons = [
      { label: "Tab 1", value: "1", hideLabel: true },
      { label: "Tab 2", value: "2" },
    ];
    render(
      <TabButtons buttons={customButtons} value="2" onChange={() => {}} />
    );
    expect(screen.queryByText("Tab 1")).not.toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
  });
});
