import React, { useMemo } from "react";
import { PreviewCard } from "@base-ui/react/preview-card";
import clsx from "clsx";
import type { HoverCardProps } from "./types";
import "./hoverCard.css";

const HoverCard: React.FC<HoverCardProps> = ({
  children,
  trigger,
  side = "bottom",
  align = "start",
  offset = 4,
  portalTo = "body",
  collisionPadding = 10,
  hoverDelay = 0.3,
  leaveDelay = 0.3,
  arrow = false,
  open,
  defaultOpen,
  onOpenChange,
}) => {
  const container = useMemo(() => {
    if (typeof portalTo === "string") {
      if (portalTo === "body") return document.body;
      return document.querySelector(portalTo) as HTMLElement;
    }
    return portalTo;
  }, [portalTo]);

  const delayMs = useMemo(() => hoverDelay * 1000, [hoverDelay]);
  const closeDelayMs = useMemo(() => leaveDelay * 1000, [leaveDelay]);

  return (
    <PreviewCard.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={
        onOpenChange ? (nextOpen: boolean) => onOpenChange(nextOpen) : undefined
      }
    >
      <PreviewCard.Trigger
        render={trigger as React.ReactElement}
        delay={delayMs}
        closeDelay={closeDelayMs}
      />
      <PreviewCard.Portal container={container}>
        <PreviewCard.Positioner
          side={side}
          align={align}
          sideOffset={offset}
          collisionPadding={collisionPadding}
          className="z-[100]"
        >
          <PreviewCard.Popup className="hovercard-popup select-none rounded-lg border border-outline-gray-1 bg-surface-modal shadow-2xl outline-none">
            <div>{children}</div>
            {arrow && (
              <PreviewCard.Arrow
                className={clsx(
                  "data-[side=top]:rotate-180",
                  "data-[side=left]:rotate-90",
                  "data-[side=right]:-rotate-90"
                )}
              >
                <svg
                  width={10}
                  height={5}
                  viewBox="0 0 10 5"
                  style={{ display: "block" }}
                >
                  <path
                    d="M0 5L5 0L10 5"
                    fill="var(--color-surface-modal)"
                    stroke="var(--color-outline-gray-1)"
                    strokeWidth="1"
                  />
                </svg>
              </PreviewCard.Arrow>
            )}
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
};

HoverCard.displayName = "HoverCard";

export default HoverCard;
