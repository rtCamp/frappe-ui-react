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
    expect(screen.getByText("Sub Item 2")).toBeInTheDocument();
  });

  it("renders default button label when no button prop provided", () => {
    render(<Dropdown options={[]} />);

    expect(screen.getByTestId("dropdown-trigger")).toHaveTextContent("Options");
  });

  it("renders custom button label when button prop provided", () => {
    render(<Dropdown options={[]} button={{ label: "Custom Label" }} />);

    expect(screen.getByTestId("dropdown-trigger")).toHaveTextContent(
      "Custom Label"
    );
  });

  it("renders custom children as trigger", async () => {
    const user = userEvent.setup();
    const items = [{ label: "Item 1", onClick: jest.fn() }];

    render(
      <Dropdown options={items}>
        <button data-testid="custom-trigger">Custom Trigger</button>
      </Dropdown>
    );

    const customTrigger = screen.getByTestId("custom-trigger");
    expect(customTrigger).toHaveTextContent("Custom Trigger");

    await user.click(customTrigger);
    expect(await screen.findByText("Item 1")).toBeInTheDocument();
  });

  it("renders grouped items with group labels", async () => {
    const user = userEvent.setup();
    const items = [
      {
        group: "Group 1",
        key: "group-1",
        items: [
          { label: "Group 1 Item 1", onClick: jest.fn() },
          { label: "Group 1 Item 2", onClick: jest.fn() },
        ],
      },
      {
        group: "Group 2",
        key: "group-2",
        items: [{ label: "Group 2 Item 1", onClick: jest.fn() }],
      },
    ];

    render(<Dropdown options={items} />);

    await user.click(screen.getByTestId("dropdown-trigger"));

    expect(await screen.findByText("Group 1")).toBeInTheDocument();
    expect(screen.getByText("Group 2")).toBeInTheDocument();
    expect(screen.getByText("Group 1 Item 1")).toBeInTheDocument();
    expect(screen.getByText("Group 1 Item 2")).toBeInTheDocument();
    expect(screen.getByText("Group 2 Item 1")).toBeInTheDocument();
  });

  it("hides group label when hideLabel is true", async () => {
    const user = userEvent.setup();
    const items = [
      {
        group: "Hidden Group",
        key: "hidden-group",
        hideLabel: true,
        items: [{ label: "Hidden Group Item", onClick: jest.fn() }],
      },
    ];

    render(<Dropdown options={items} />);

    await user.click(screen.getByTestId("dropdown-trigger"));

    expect(await screen.findByText("Hidden Group Item")).toBeInTheDocument();
    expect(screen.queryByText("Hidden Group")).not.toBeInTheDocument();
  });

  it("filters items based on condition function", async () => {
    const user = userEvent.setup();
    const items = [
      { label: "Visible Item", onClick: jest.fn(), condition: () => true },
      { label: "Hidden Item", onClick: jest.fn(), condition: () => false },
    ];

    render(<Dropdown options={items} />);

    await user.click(screen.getByTestId("dropdown-trigger"));

    expect(await screen.findByText("Visible Item")).toBeInTheDocument();
    expect(screen.queryByText("Hidden Item")).not.toBeInTheDocument();
  });

  it("renders items with red theme styling", async () => {
    const user = userEvent.setup();
    const items = [
      { label: "Delete", onClick: jest.fn(), theme: "red" as const },
    ];

    render(<Dropdown options={items} />);

    await user.click(screen.getByTestId("dropdown-trigger"));

    const deleteButton = await screen.findByTestId("dropdown-item-button");
    expect(deleteButton).toHaveTextContent("Delete");
    expect(deleteButton).toHaveClass("text-ink-red-3");
  });

  it("renders items with icon as string", async () => {
    const user = userEvent.setup();
    const items = [{ label: "Edit", onClick: jest.fn(), icon: "edit" }];

    render(<Dropdown options={items} />);

    await user.click(screen.getByTestId("dropdown-trigger"));

    expect(await screen.findByText("Edit")).toBeInTheDocument();
    // Icon should be rendered as FeatherIcon
    const itemButton = screen.getByTestId("dropdown-item-button");
    expect(itemButton.querySelector("svg")).toBeInTheDocument();
  });

  it("renders items with icon as React element", async () => {
    const user = userEvent.setup();
    const CustomIcon = () => (
      <span data-testid="custom-icon">CustomIcon placeholder</span>
    );
    const items = [
      { label: "CustomIcon", onClick: jest.fn(), icon: <CustomIcon /> },
    ];

    render(<Dropdown options={items} />);

    await user.click(screen.getByTestId("dropdown-trigger"));

    expect(await screen.findByText("CustomIcon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders switch item and toggles value", async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();
    const items = [
      {
        label: "Enable Feature",
        onClick: onToggle,
        switch: true,
        switchValue: false,
      },
    ];

    render(<Dropdown options={items} />);

    await user.click(screen.getByTestId("dropdown-trigger"));

    expect(await screen.findByText("Enable Feature")).toBeInTheDocument();

    // Find and click the switch
    const switchElement = screen.getByRole("switch");
    await user.click(switchElement);

    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it("handles mixed items and groups", async () => {
    const user = userEvent.setup();
    const items = [
      { label: "Standalone Item 1", onClick: jest.fn() },
      {
        group: "Actions",
        key: "actions-group",
        items: [
          { label: "Action 1", onClick: jest.fn() },
          { label: "Action 2", onClick: jest.fn() },
        ],
      },
      { label: "Standalone Item 2", onClick: jest.fn() },
    ];

    render(<Dropdown options={items} />);

    await user.click(screen.getByTestId("dropdown-trigger"));

    expect(await screen.findByText("Standalone Item 1")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByText("Action 1")).toBeInTheDocument();
    expect(screen.getByText("Action 2")).toBeInTheDocument();
    expect(screen.getByText("Standalone Item 2")).toBeInTheDocument();
  });

  it("filters out null and undefined items", async () => {
    const user = userEvent.setup();
    const items = [
      { label: "Valid Item", onClick: jest.fn() },
      null,
      undefined,
      { label: "Another Valid Item", onClick: jest.fn() },
    ];

    // @ts-expect-error - testing null/undefined handling
    render(<Dropdown options={items} />);

    await user.click(screen.getByTestId("dropdown-trigger"));

    expect(await screen.findByText("Valid Item")).toBeInTheDocument();
    expect(screen.getByText("Another Valid Item")).toBeInTheDocument();

    const menuItems = screen.getAllByTestId("dropdown-item-button");
    expect(menuItems).toHaveLength(2);
  });

  it("renders with different placements", () => {
    const { rerender } = render(
      <Dropdown
        options={[{ label: "Item", onClick: jest.fn() }]}
        placement="left"
      />
    );
    expect(screen.getByTestId("dropdown-trigger")).toBeInTheDocument();

    rerender(
      <Dropdown
        options={[{ label: "Item", onClick: jest.fn() }]}
        placement="right"
      />
    );
    expect(screen.getByTestId("dropdown-trigger")).toBeInTheDocument();

    rerender(
      <Dropdown
        options={[{ label: "Item", onClick: jest.fn() }]}
        placement="center"
      />
    );
    expect(screen.getByTestId("dropdown-trigger")).toBeInTheDocument();
  });

  it("renders custom component in dropdown item", async () => {
    const user = userEvent.setup();
    const CustomComponent = ({ active }: { active: boolean }) => (
      <div data-testid="custom-component" data-active={active}>
        Custom Content
      </div>
    );
    const items = [{ label: "Custom", component: CustomComponent }];

    render(<Dropdown options={items} />);

    await user.click(screen.getByTestId("dropdown-trigger"));

    expect(await screen.findByTestId("custom-component")).toBeInTheDocument();
    expect(screen.getByText("Custom Content")).toBeInTheDocument();
  });

  it("renders empty dropdown when no options provided", async () => {
    const user = userEvent.setup();

    render(<Dropdown options={[]} />);

    const trigger = screen.getByTestId("dropdown-trigger");
    await user.click(trigger);

    // Dropdown should open but have no items
    expect(
      screen.queryByTestId("dropdown-item-button")
    ).not.toBeInTheDocument();
  });

  it("renders items in groups filtered by condition", async () => {
    const user = userEvent.setup();
    const items = [
      {
        group: "Filtered Group",
        key: "filtered-group",
        items: [
          {
            label: "Visible in Group",
            onClick: jest.fn(),
            condition: () => true,
          },
          {
            label: "Hidden in Group",
            onClick: jest.fn(),
            condition: () => false,
          },
        ],
      },
    ];

    render(<Dropdown options={items} />);

    await user.click(screen.getByTestId("dropdown-trigger"));

    expect(await screen.findByText("Visible in Group")).toBeInTheDocument();
    expect(screen.queryByText("Hidden in Group")).not.toBeInTheDocument();
  });
});
