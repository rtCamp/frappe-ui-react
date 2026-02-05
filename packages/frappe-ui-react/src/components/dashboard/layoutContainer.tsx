import { useState, useMemo } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  pointerWithin,
  type DragStartEvent,
  type DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { Row } from "./row";
import { LayoutContainerProps } from "./types";
import { deepClone, flattenLayout } from "./dashboardUtil";
import { LayoutContext } from "./layoutContext";

export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  layout,
  setLayout,
  layoutLock = false,
  dragHandle = false,
  dragHandleOnHover = false,
}) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const layoutFlatMap = useMemo(() => flattenLayout(layout), [layout]);

  const activeSlotId = useMemo(() => {
    if (!activeId) return null;
    const activeSlot = layoutFlatMap.get(activeId);
    if (!activeSlot) return null;
    return `${activeSlot.rowId}-slot-${activeSlot.slotIndex}`;
  }, [activeId, layoutFlatMap]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: dragHandle
        ? undefined
        : {
            distance: 10,
            delay: 100,
            tolerance: 5,
          },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over || active.id === over.id) return;

    const activeSlot = layoutFlatMap.get(active.id as string);
    if (!activeSlot) return;

    const overIdStr = String(over.id);
    const parts = overIdStr.split("-slot-");
    const targetRowId = parts[0];
    const targetSlotIndex = parseInt(parts[parts.length - 1]);

    setLayout((currentLayout) => {
      const newLayout = deepClone(currentLayout);

      const sourceRowIndex = activeSlot.rowIndex;
      const sourceSlotIndex = activeSlot.slotIndex;
      const targetRowIndex = newLayout.findIndex((r) => r.id === targetRowId);

      if (targetRowIndex === -1) return currentLayout;

      const sourceSlot = newLayout[sourceRowIndex].slots[sourceSlotIndex];
      const targetSlot = newLayout[targetRowIndex].slots[targetSlotIndex];

      if (!targetSlot) return currentLayout;

      // Swap slots
      newLayout[sourceRowIndex].slots[sourceSlotIndex] = targetSlot;
      newLayout[targetRowIndex].slots[targetSlotIndex] = sourceSlot;

      return newLayout;
    });
  };

  return (
    <LayoutContext.Provider
      value={{
        activeSlotId,
        layoutLock,
        dragHandle,
        dragHandleOnHover,
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col gap-4">
          {layout.map((row) => (
            <Row key={row.id} row={row} parentLocked={layoutLock} />
          ))}
        </div>
      </DndContext>
    </LayoutContext.Provider>
  );
};
