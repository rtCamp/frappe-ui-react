import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tag from "../tag";

describe("Tag Component", () => {
  it("renders with label", () => {
    render(<Tag label="Test Tag" />);
    expect(screen.getByText("Test Tag")).toBeInTheDocument();
  });

  it("renders prefix icon", () => {
    const PrefixIcon = () => <span data-testid="prefix-icon" />;
    render(<Tag label="Tag with Icon" prefixIcon={PrefixIcon} />);
    expect(screen.getByTestId("prefix-icon")).toBeInTheDocument();
  });

  it("handles uncontrolled removal", () => {
    render(<Tag label="Removable Tag" />);
    // Expect the label to be present
    expect(screen.getByText("Removable Tag")).toBeInTheDocument();

    const removeButton = screen.getByLabelText("Remove tag");
    fireEvent.click(removeButton);

    // After click, component should return null
    expect(screen.queryByText("Removable Tag")).not.toBeInTheDocument();
  });

  it("handles controlled removal", () => {
    const handleVisibleChange = jest.fn();
    const handleRemove = jest.fn();

    const { rerender } = render(
      <Tag
        label="Controlled Tag"
        visible={true}
        onVisibleChange={handleVisibleChange}
        onRemove={handleRemove}
      />
    );

    const removeButton = screen.getByLabelText("Remove tag");
    fireEvent.click(removeButton);

    expect(handleVisibleChange).toHaveBeenCalledWith(false);
    expect(handleRemove).toHaveBeenCalled();

    rerender(
      <Tag
        label="Controlled Tag"
        visible={false}
        onVisibleChange={handleVisibleChange}
        onRemove={handleRemove}
      />
    );
    expect(screen.queryByText("Controlled Tag")).not.toBeInTheDocument();
  });

  it("respects disabled state", () => {
    const handleRemove = jest.fn();
    render(<Tag label="Disabled Tag" disabled onRemove={handleRemove} />);

    const removeButton = screen.getByLabelText("Remove tag");
    expect(removeButton).toBeDisabled();

    fireEvent.click(removeButton);
    expect(handleRemove).not.toHaveBeenCalled();
  });

  it("renders with custom class name", () => {
    render(<Tag label="Custom Class" className="my-custom-class" />);
    const tagText = screen.getByText("Custom Class");
    // The button that contains the text
    const button = tagText.closest("button");
    expect(button).toHaveClass("my-custom-class");
  });
});
