import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Dropdown from "../dropdown";

describe("Dropdown", () => {
  it("renders dropdown with given items", async () => {
    const user = userEvent.setup();
    const items = [
      { label: "Item 1", onClick: jest.fn() },
      { label: "Item 2", onClick: jest.fn() },
    ];

    render(<Dropdown options={items} />);

    const trigger = screen.getByTestId("dropdown-trigger");
    await user.click(trigger);

    // Wait for menu to open
    expect(await screen.findByText("Item 1")).toBeInTheDocument();

    const menuItems = screen.getAllByTestId("dropdown-item-button");
    expect(menuItems).toHaveLength(2);
    expect(menuItems[0]).toHaveTextContent("Item 1");
    expect(menuItems[1]).toHaveTextContent("Item 2");
  });

  it("calls onClick handler when an item is clicked", async () => {
    const user = userEvent.setup();
    const onClickMock = jest.fn();
    const items = [{ label: "Clickable Item", onClick: onClickMock }];

    render(<Dropdown options={items} />);

    await user.click(screen.getByTestId("dropdown-trigger"));

    expect(await screen.findByText("Clickable Item")).toBeInTheDocument();

    await user.click(screen.getByTestId("dropdown-item-button"));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("renders submenu items correctly", async () => {
    const user = userEvent.setup();
    const items = [
      {
        label: "Parent Item",
        submenu: [
          { label: "Sub Item 1", onClick: jest.fn() },
          { label: "Sub Item 2", onClick: jest.fn() },
        ],
      },
    ];

    render(<Dropdown options={items} />);

    await user.click(screen.getByTestId("dropdown-trigger"));

    expect(await screen.findByText("Parent Item")).toBeInTheDocument();

    const submenuTrigger = screen.getByTestId("dropdown-submenu-trigger");
    await user.click(submenuTrigger);

    expect(await screen.findByText("Sub Item 1")).toBeInTheDocument();
    expect(await screen.findByText("Sub Item 2")).toBeInTheDocument();
  });
});
