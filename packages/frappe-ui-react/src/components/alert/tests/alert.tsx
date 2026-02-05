import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Alert from "../alert";

describe("Alert Component", () => {
  it("should render with title", () => {
    render(<Alert title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should render with description", () => {
    render(<Alert title="Test Title" description="Test description" />);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("should render with footer", () => {
    render(
      <Alert title="Test Title" footer={() => <button>Footer Action</button>} />
    );
    expect(screen.getByText("Footer Action")).toBeInTheDocument();
  });

  it("should apply correct theme classes", () => {
    const { container } = render(<Alert title="Test" theme="green" />);
    const alertElement = container.querySelector('[role="alert"]');
    expect(alertElement).toHaveClass("bg-surface-green-2");
  });

  it("should apply outline variant classes", () => {
    const { container } = render(<Alert title="Test" variant="outline" />);
    const alertElement = container.querySelector('[role="alert"]');
    expect(alertElement).toHaveClass("border border-outline-gray-3");
  });

  it("should render dismiss button when dismissable is true", () => {
    render(<Alert title="Test" dismissable={true} />);
    const dismissButton = screen.getByLabelText("Dismiss alert");
    expect(dismissButton).toBeInTheDocument();
  });

  it("should not render dismiss button when dismissable is false", () => {
    render(<Alert title="Test" dismissable={false} />);
    const dismissButton = screen.queryByLabelText("Dismiss alert");
    expect(dismissButton).not.toBeInTheDocument();
  });

  it("should hide alert when dismiss button is clicked (uncontrolled)", () => {
    const { container } = render(<Alert title="Test" dismissable={true} />);
    const dismissButton = screen.getByLabelText("Dismiss alert");

    fireEvent.click(dismissButton);

    const alertElement = container.querySelector('[role="alert"]');
    expect(alertElement).not.toBeInTheDocument();
  });

  it("should call onVisibleChange when dismiss button is clicked (controlled)", () => {
    const onVisibleChange = jest.fn();
    render(
      <Alert
        title="Test"
        visible={true}
        onVisibleChange={onVisibleChange}
        dismissable={true}
      />
    );
    const dismissButton = screen.getByLabelText("Dismiss alert");

    fireEvent.click(dismissButton);

    expect(onVisibleChange).toHaveBeenCalledWith(false);
  });

  it("should not render when visible is false", () => {
    const { container } = render(<Alert title="Test" visible={false} />);
    const alertElement = container.querySelector('[role="alert"]');
    expect(alertElement).not.toBeInTheDocument();
  });

  it("should render custom icon", () => {
    const CustomIcon = () => <div data-testid="custom-icon">Icon</div>;
    render(<Alert title="Test" icon={() => <CustomIcon />} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("should render theme-based icon for each theme", () => {
    const themes = ["yellow", "blue", "red", "green"] as const;

    themes.forEach((theme) => {
      const { container } = render(<Alert title="Test" theme={theme} />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  it("should not render icon when no theme and no custom icon provided", () => {
    const { container } = render(<Alert title="Test" />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(1); // Only dismiss button icon
  });
});
