import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Popover from "../popover";

describe("Popover", () => {
  it("renders target and body", () => {
    render(
      <Popover
        target={({ togglePopover }) => (
          <button onClick={togglePopover}>Open Popover</button>
        )}
        body={() => <div>Popover Content</div>}
      />
    );
    expect(screen.getByText("Open Popover")).toBeInTheDocument();
  });

  it("shows popover body on click", () => {
    render(
      <Popover
        target={({ togglePopover }) => (
          <button onClick={togglePopover}>Open Popover</button>
        )}
        body={() => <div>Popover Content</div>}
      />
    );
    fireEvent.click(screen.getByText("Open Popover"));
    expect(screen.getByText("Popover Content")).toBeInTheDocument();
  });

  it("calls onOpen and onClose callbacks", () => {
    const handleOpen = jest.fn();
    const handleClose = jest.fn();
    render(
      <Popover
        onOpen={handleOpen}
        onClose={handleClose}
        target={({ togglePopover }) => (
          <button onClick={togglePopover}>Open Popover</button>
        )}
        body={() => <div>Popover Content</div>}
      />
    );
    fireEvent.click(screen.getByText("Open Popover"));
    expect(handleOpen).toHaveBeenCalled();
    fireEvent.click(document.body);
    expect(handleClose).toHaveBeenCalled();
  });

  it("shows popover when show prop is true", () => {
    render(
      <Popover
        show={true}
        target={() => <button>Open Popover</button>}
        body={() => <div>Popover Content</div>}
      />
    );
    expect(screen.getByText("Popover Content")).toBeInTheDocument();
  });

  it("hides popover when show prop is false", () => {
    render(
      <Popover
        show={false}
        target={() => <button>Open Popover</button>}
        body={() => <div>Popover Content</div>}
      />
    );
    expect(screen.queryByText("Popover Content")).not.toBeInTheDocument();
  });
});
