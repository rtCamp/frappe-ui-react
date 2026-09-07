import { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

import Tooltip from "./tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip/Interactions",
  component: Tooltip,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const LABEL = "John Doe";

function TruncationCases() {
  const clippedRef = useRef<HTMLSpanElement>(null);
  const fittingRef = useRef<HTMLSpanElement>(null);

  return (
    <div className="flex flex-col gap-6">
      <Tooltip
        text={LABEL}
        showWhen="truncated"
        truncationRef={fittingRef}
        hoverDelay={0}
      >
        <span data-testid="fitting-trigger" className="flex w-96 gap-2">
          <span ref={fittingRef} className="truncate">
            {LABEL}
          </span>
        </span>
      </Tooltip>

      <Tooltip
        text={LABEL}
        showWhen="truncated"
        truncationRef={clippedRef}
        hoverDelay={0}
      >
        <span data-testid="clipped-trigger" className="flex w-12 gap-2">
          <span ref={clippedRef} className="truncate">
            {LABEL}
          </span>
        </span>
      </Tooltip>
    </div>
  );
}

export const ShowWhenTruncated: Story = {
  render: () => <TruncationCases />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.hover(canvas.getByTestId("fitting-trigger"));
    expect(screen.queryByTestId("tooltip-popup")).not.toBeInTheDocument();

    await userEvent.hover(canvas.getByTestId("clipped-trigger"));
    await waitFor(() => {
      expect(screen.getByTestId("tooltip-popup")).toBeInTheDocument();
    });
    expect(screen.getByTestId("tooltip-popup")).toHaveTextContent(LABEL);

    await userEvent.unhover(canvas.getByTestId("clipped-trigger"));
    await waitFor(() => {
      expect(screen.queryByTestId("tooltip-popup")).not.toBeInTheDocument();
    });
  },
};

/**
 * Base UI's hover interaction is `mouseOnly` and its focus interaction is gated
 * on `:focus-visible`, which a tap never matches. A touch pointer is therefore
 * the only signal a tooltip can open from on a phone, and it is dispatched
 * directly here because neither `userEvent` nor a viewport resize can produce a
 * touch `pointerType`.
 */
function pressWith(element: HTMLElement, pointerType: "mouse" | "touch") {
  element.dispatchEvent(
    new PointerEvent("pointerdown", { pointerType, bubbles: true })
  );
}

export const OpensOnTouch: Story = {
  render: () => <TruncationCases />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    pressWith(canvas.getByTestId("clipped-trigger"), "touch");

    await waitFor(() => {
      expect(screen.getByTestId("tooltip-popup")).toBeInTheDocument();
    });
    expect(screen.getByTestId("tooltip-popup")).toHaveTextContent(LABEL);
  },
};

export const TouchRespectsTruncation: Story = {
  render: () => <TruncationCases />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    pressWith(canvas.getByTestId("fitting-trigger"), "touch");

    expect(screen.queryByTestId("tooltip-popup")).not.toBeInTheDocument();
  },
};

export const MousePressDoesNotOpen: Story = {
  render: () => <TruncationCases />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    pressWith(canvas.getByTestId("clipped-trigger"), "mouse");

    expect(screen.queryByTestId("tooltip-popup")).not.toBeInTheDocument();
  },
};
