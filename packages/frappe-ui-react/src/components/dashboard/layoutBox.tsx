import { useMemo } from "react";
import { useDndContext } from "@dnd-kit/core";
import { clsx } from "clsx";
import { SlotContainer } from "./slotContainer";
import type { LayoutBoxProps } from "./types";

export const LayoutBox: React.FC<LayoutBoxProps> = ({
  layout,
  orientation,
}) => {
  const { active } = useDndContext();
  const isDragging = useMemo(() => active !== null, [active]);

  return (
    <div
      className={clsx(
        "flex gap-4 rounded min-h-[100px]",
        orientation === "horizontal" ? "flex-row" : "flex-col"
      )}
    >
      {layout.slots.map((slotItem, slotIndex) => {
        const slotId = `${layout.id}-slot-${slotIndex}`;
        return (
          <SlotContainer
            key={slotId}
            slotId={slotId}
            slotItem={slotItem}
            isDragging={isDragging}
          />
        );
      })}
    </div>
  );
};
