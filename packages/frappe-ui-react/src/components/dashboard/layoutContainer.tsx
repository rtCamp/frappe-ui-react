import { useState, useMemo, useCallback } from "react";
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
import { LayoutContext } from "./layoutContext";
import clsx from "clsx";

export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  widgets,
  layout,
  layoutFlow = "row",
  setLayout,
  layoutLock = false,
  dragHandle = false,
  dragHandleOnHover = false,
}) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
console.log( "layoutFlow:", layoutFlow );
  const activeSlotId = useMemo(() => {
    if (!activeId) return null;
    return activeId as string;
  }, [activeId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: dragHandle
        ? { distance: 0 }
        : {
            distance: 10,
            delay: 100,
            tolerance: 5,
          },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    const activeMatch = activeIdStr.match(/row-(\d+)-slot-(\d+)/);
    const overMatch = overIdStr.match(/row-(\d+)-slot-(\d+)/);

    if (!activeMatch || !overMatch) return;

    const sourceRowIndex = parseInt(activeMatch[1]);
    const sourceSlotIndex = parseInt(activeMatch[2]);
    const targetRowIndex = parseInt(overMatch[1]);
    const targetSlotIndex = parseInt(overMatch[2]);

    const newLayout = layout.map((row, rowIndex) =>
      row.map((widgetId, slotIndex) => {
        if (rowIndex === sourceRowIndex && slotIndex === sourceSlotIndex)
          return layout[targetRowIndex][targetSlotIndex];
        if (rowIndex === targetRowIndex && slotIndex === targetSlotIndex)
          return layout[sourceRowIndex][sourceSlotIndex];
        return widgetId;
      })
    );
    setLayout(newLayout);
  };

  const handleAddWidget = useCallback(
    (rowIndex: number, slotIndex: number, widgetId: string) => {
      const newLayout = layout.map((row) => [...row]);
      newLayout[rowIndex][slotIndex] = widgetId;
      setLayout(newLayout);
    },
    [layout, setLayout]
  );

  const handleRemoveWidget = useCallback(
    (rowIndex: number, slotIndex: number) => {
      const newLayout = layout.map((row) => [...row]);
      newLayout[rowIndex][slotIndex] = "";
      setLayout(newLayout);
    },
    [layout, setLayout]
  );

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
        <div className={clsx(
          "flex gap-6",
          layoutFlow === "row" ? "flex-col" : "flex-row"
        )}>
          {layout.map((row, rowIndex) => (
            <Row
              key={rowIndex}
              widgets={widgets}
              layoutFlow={layoutFlow}
              row={row}
              rowIndex={rowIndex}
              parentLocked={layoutLock}
              onAddWidget={handleAddWidget}
              onRemoveWidget={handleRemoveWidget}
            />
          ))}
        </div>
      </DndContext>
    </LayoutContext.Provider>
  );
};
