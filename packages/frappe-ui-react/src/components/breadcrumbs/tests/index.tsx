import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Breadcrumbs from "../breadcrumbs";

describe("Breadcrumbs", () => {
  it("renders breadcrumb items correctly", () => {
    const items = [
      { label: "Home" },
      { label: "Products" },
      { label: "Details" },
    ];

    render(<Breadcrumbs items={items} />);

    items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("calls onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    const items = [{ label: "Home", onClick: onClickMock }];

    render(<Breadcrumbs items={items} />);

    fireEvent.click(screen.getByText("Home"));
    expect(onClickMock).toHaveBeenCalled();
  });

  it("renders prefix and suffix icons", () => {
    const items = [
      {
        label: "Home",
        prefixIcon: <span data-testid="prefix">prefix</span>,
        suffixIcon: <span data-testid="suffix">suffix</span>,
      },
    ];

    render(<Breadcrumbs items={items} />);

    expect(screen.getByTestId("prefix")).toBeInTheDocument();
    expect(screen.getByTestId("suffix")).toBeInTheDocument();
  });
});
