import { useMemo } from "react";
import { useDndContext } from "@dnd-kit/core";
import { clsx } from "clsx";
import { SlotContainer } from "./slotContainer";
import type { LayoutBoxProps } from "./types";

export const LayoutBox: React.FC<LayoutBoxProps> = ({
  layout,
  orientation,
  parentLocked = false,
}) => {
  const { active } = useDndContext();
  const isDragging = useMemo(() => active !== null, [active]);

  const isContainerLocked = parentLocked || layout.locked === true;

  return (
    <div
      className={clsx(
        "flex flex-wrap rounded min-h-[100px]",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        !layout.gap && "gap-4",
        layout.className
      )}
      style={{
        ...(layout.gap && { gap: layout.gap }),
      }}
    >
      {layout.slots.map((slotItem, slotIndex) => {
        const slotId = `${layout.id}-slot-${slotIndex}`;
        return (
          <SlotContainer
            key={slotId}
            slotId={slotId}
            slotItem={slotItem}
            isDragging={isDragging}
            parentLocked={isContainerLocked}
          />
        );
      })}
    </div>
  );
};
