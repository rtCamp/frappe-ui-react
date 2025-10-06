import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dialog from "../dialog";
import { MemoryRouter } from "react-router";

describe("Dialog", () => {
  it("renders dialog with title and message", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Dialog
          open
          options={{ title: "Test Title", message: "Test Message" }}
          onOpenChange={() => {}}
        />
      </MemoryRouter>
    );
    expect(getByTestId("dialog-title")).toHaveTextContent("Test Title");
    expect(getByTestId("dialog-description")).toHaveTextContent("Test Message");
  });

  it("renders children instead of message", () => {
    const { getByText, queryByTestId } = render(
      <MemoryRouter>
        <Dialog open options={{ title: "Title" }} onOpenChange={() => {}}>
          <div>Custom Content</div>
        </Dialog>
      </MemoryRouter>
    );
    expect(getByText("Custom Content")).toBeInTheDocument();
    expect(queryByTestId("dialog-description")).toBeNull();
  });

  it("renders action buttons", () => {
    const actions = [{ label: "OK" }, { label: "Cancel" }];
    const { getAllByTestId } = render(
      <MemoryRouter>
        <Dialog open options={{ actions }} onOpenChange={() => {}} />
      </MemoryRouter>
    );
    expect(getAllByTestId("dialog-action")).toHaveLength(2);
    expect(getAllByTestId("dialog-action")[0]).toHaveTextContent("OK");
    expect(getAllByTestId("dialog-action")[1]).toHaveTextContent("Cancel");
  });

  it("calls onOpenChange when close button is clicked", () => {
    const onOpenChange = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
				<Dialog open options={{ title: "Title" }} onOpenChange={onOpenChange} />
			</MemoryRouter>
    );
    fireEvent.click(getByTestId("dialog-close"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
