import { useMemo } from "react";
import { useDndContext } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { clsx } from "clsx";
import { LayoutRenderer } from "./layoutRenderer";
import { SlotContainer } from "./slotContainer";
import type { LayoutBoxProps } from "./types";

export const LayoutBox: React.FC<LayoutBoxProps> = ({
  layout,
  orientation,
  activeParentId,
}) => {
  const { active } = useDndContext();

  const isDragging = useMemo(() => active !== null, [active]);
  const isActiveParent = activeParentId === layout.id;

  const itemIds = useMemo(() => {
    const baseIds = layout.elements.map((item) => item.id);
    return baseIds;
  }, [layout.elements]);

  const strategy =
    orientation === "horizontal"
      ? horizontalListSortingStrategy
      : verticalListSortingStrategy;

  return (
    <SortableContext items={itemIds} strategy={strategy}>
      <div
        className={clsx(
          "flex flex-wrap gap-4 rounded min-h-[100px]",
          orientation === "horizontal" ? "flex-row" : "flex-col"
        )}
      >
        {layout.slots
          ? layout.slots.map((slot, slotIndex) => {
              const element = layout.elements[slotIndex];
              const slotId = `${layout.id}-slot-${slotIndex}`;
              return (
                <SlotContainer
                  key={slotId}
                  slotId={slotId}
                  slot={slot}
                  element={element}
                  isDragging={isDragging}
                  isActiveParent={isActiveParent}
                  activeParentId={activeParentId}
                />
              );
            })
          : layout.elements.map((item) => (
              <LayoutRenderer
                key={item.id}
                layout={item}
                activeParentId={activeParentId}
              />
            ))}
      </div>
    </SortableContext>
  );
};
