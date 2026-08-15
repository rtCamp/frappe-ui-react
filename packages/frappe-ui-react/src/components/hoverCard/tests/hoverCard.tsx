import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import HoverCard from "../hoverCard";

describe("HoverCard", () => {
  it("renders trigger element initially without popup", () => {
    render(
      <HoverCard trigger={<button>Hover trigger</button>}>
        <div>Popup content</div>
      </HoverCard>
    );

    expect(screen.getByText("Hover trigger")).toBeInTheDocument();
    expect(screen.queryByText("Popup content")).not.toBeInTheDocument();
  });

  it("shows popup content on hover", async () => {
    const user = userEvent.setup();

    render(
      <HoverCard hoverDelay={0} trigger={<button>Hover trigger</button>}>
        <div>Popup content</div>
      </HoverCard>
    );

    const trigger = screen.getByText("Hover trigger");
    await user.hover(trigger);

    expect(await screen.findByText("Popup content")).toBeInTheDocument();
  });

  it("hides popup on mouse leave", async () => {
    const user = userEvent.setup();

    render(
      <HoverCard
        hoverDelay={0}
        leaveDelay={0}
        trigger={<button>Hover trigger</button>}
      >
        <div>Popup content</div>
      </HoverCard>
    );

    const trigger = screen.getByText("Hover trigger");
    await user.hover(trigger);
    expect(await screen.findByText("Popup content")).toBeInTheDocument();

    await user.unhover(trigger);

    await waitFor(() => {
      expect(screen.queryByText("Popup content")).not.toBeInTheDocument();
    });
  });

  it("supports controlled mode via open and onOpenChange", async () => {
    const onOpenChange = jest.fn();

    const { rerender } = render(
      <HoverCard
        open={false}
        onOpenChange={onOpenChange}
        trigger={<button>Hover trigger</button>}
      >
        <div>Popup content</div>
      </HoverCard>
    );

    expect(screen.queryByText("Popup content")).not.toBeInTheDocument();

    // Rerender with open={true}
    rerender(
      <HoverCard
        open={true}
        onOpenChange={onOpenChange}
        trigger={<button>Hover trigger</button>}
      >
        <div>Popup content</div>
      </HoverCard>
    );

    expect(await screen.findByText("Popup content")).toBeInTheDocument();
  });
});
