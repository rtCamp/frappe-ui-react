import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Tooltip from "../tooltip";
import { Button } from "../../button";

describe("Tooltip", () => {
  describe("Basic Rendering", () => {
    it("renders children without tooltip initially", () => {
      render(
        <Tooltip text="Tooltip text">
          <Button>Hover me</Button>
        </Tooltip>
      );

      expect(screen.getByText("Hover me")).toBeInTheDocument();
      expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
    });

    it("shows tooltip on hover", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip text="Tooltip text" hoverDelay={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      const trigger = screen.getByText("Hover me");
      await user.hover(trigger);

      expect(await screen.findByText("Tooltip text")).toBeInTheDocument();
    });

    it("hides tooltip on mouse leave", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip text="Tooltip text" hoverDelay={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      const trigger = screen.getByText("Hover me");
      await user.hover(trigger);

      expect(await screen.findByText("Tooltip text")).toBeInTheDocument();

      await user.unhover(trigger);

      await waitFor(() => {
        expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
      });
    });
  });

  describe("Text Prop", () => {
    it("renders tooltip with text content", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip text="This is tooltip text" hoverDelay={0}>
          <Button>Trigger</Button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Trigger"));

      expect(
        await screen.findByText("This is tooltip text")
      ).toBeInTheDocument();
    });

    it("renders empty tooltip when text is empty string", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip text="" hoverDelay={0}>
          <Button>Trigger</Button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Trigger"));

      await waitFor(() => {
        expect(screen.queryByTestId("tooltip-popup")).not.toBeInTheDocument();
      });
    });
  });

  describe("Body Prop", () => {
    it("renders custom body content", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip
          body={<div data-testid="custom-body">Custom content</div>}
          hoverDelay={0}
        >
          <Button>Trigger</Button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Trigger"));

      expect(await screen.findByTestId("custom-body")).toBeInTheDocument();
      expect(screen.getByText("Custom content")).toBeInTheDocument();
    });

    it("body takes precedence over text", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip
          text="Text content"
          body={<div>Body content</div>}
          hoverDelay={0}
        >
          <Button>Trigger</Button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Trigger"));

      expect(await screen.findByText("Body content")).toBeInTheDocument();
      expect(screen.queryByText("Text content")).not.toBeInTheDocument();
    });

    it("renders complex custom body content", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip
          body={
            <div className="custom-tooltip">
              <strong>Title</strong>
              <p>Description text</p>
            </div>
          }
          hoverDelay={0}
        >
          <Button>Trigger</Button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Trigger"));

      expect(await screen.findByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description text")).toBeInTheDocument();
    });
  });

  describe("Different Trigger Elements", () => {
    it("works with button trigger", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip text="Button tooltip" hoverDelay={0}>
          <Button>Button Trigger</Button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Button Trigger"));

      expect(await screen.findByText("Button tooltip")).toBeInTheDocument();
    });

    it("works with span trigger", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip text="Span tooltip" hoverDelay={0}>
          <span>Span Trigger</span>
        </Tooltip>
      );

      await user.hover(screen.getByText("Span Trigger"));

      expect(await screen.findByText("Span tooltip")).toBeInTheDocument();
    });

    it("works with div trigger", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip text="Div tooltip" hoverDelay={0}>
          <div>Div Trigger</div>
        </Tooltip>
      );

      await user.hover(screen.getByText("Div Trigger"));

      expect(await screen.findByText("Div tooltip")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles no text and no body gracefully", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip hoverDelay={0}>
          <Button>Trigger</Button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Trigger"));

      // Should not crash, trigger should still be rendered
      expect(screen.getByText("Trigger")).toBeInTheDocument();

      waitFor(() => {
        expect(screen.queryByTestId("tooltip-popup")).not.toBeInTheDocument();
      });
    });

    it("renders multiple tooltips independently", async () => {
      const user = userEvent.setup();

      render(
        <>
          <Tooltip text="First tooltip" hoverDelay={0}>
            <Button>First</Button>
          </Tooltip>
          <Tooltip text="Second tooltip" hoverDelay={0}>
            <Button>Second</Button>
          </Tooltip>
        </>
      );

      await user.hover(screen.getByText("First"));
      expect(await screen.findByText("First tooltip")).toBeInTheDocument();

      await user.unhover(screen.getByText("First"));
      await user.hover(screen.getByText("Second"));

      expect(await screen.findByText("Second tooltip")).toBeInTheDocument();
    });
  });
});
