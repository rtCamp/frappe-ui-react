import { useState, useMemo } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  pointerWithin,
  type DragStartEvent,
  type DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { Widget } from "./widget";
import { LayoutRenderer } from "./layoutRenderer";
import { LayoutContainerProps } from "./types";
import { deepClone, findContainerById, flattenLayout } from "./dashboardUtil";
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
    const activeElement = layoutFlatMap.get(activeId);
    if (!activeElement) return null;
    return `${activeElement.parentId}-slot-${activeElement.index}`;
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

    const activeElement = layoutFlatMap.get(active.id);
    if (!activeElement) return;

    const overIdStr = String(over.id);

    setLayout((currentLayout) => {
      const newLayout = deepClone(currentLayout);
      const parts = overIdStr.split("-slot-");
      const targetContainerId = parts[0];
      const targetSlotIndex = parseInt(parts[parts.length - 1]);

      const targetContainer = findContainerById(newLayout, targetContainerId);
      const sourceContainer = findContainerById(
        newLayout,
        activeElement.parentId
      );

      if (
        !targetContainer ||
        !("slots" in targetContainer) ||
        !sourceContainer ||
        !("slots" in sourceContainer)
      )
        return currentLayout;

      const sourceIndex = activeElement.index;
      const targetElement = targetContainer.slots[targetSlotIndex];
      const isTargetEmpty = targetElement.type === "empty";
      const isSameContainer = sourceContainer.id === targetContainer.id;

      if (!isTargetEmpty && !(targetElement.type === "component")) {
        return currentLayout;
      }

      if (isSameContainer && sourceIndex === targetSlotIndex) {
        return currentLayout;
      }

      const sourceItem = sourceContainer.slots[sourceIndex];

      sourceContainer.slots[sourceIndex] = isTargetEmpty
        ? {
            id: `${sourceContainer.id}-empty-${sourceIndex}`,
            type: "empty",
          }
        : targetElement;

      (isSameContainer ? sourceContainer : targetContainer).slots[
        targetSlotIndex
      ] = sourceItem;

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
        <LayoutRenderer layout={layout} />
        <DragOverlay>
          {activeId ? <Widget layout={layoutFlatMap.get(activeId)} /> : null}
        </DragOverlay>
      </DndContext>
    </LayoutContext.Provider>
  );
};
