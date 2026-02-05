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
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { Widget } from "./widget";
import { LayoutRenderer } from "./layoutRenderer";
import { LayoutContainerProps, LayoutItem } from "./types";

export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  layout,
  setLayout,
}) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const layoutFlatMap = useMemo(() => {
    const flatListMap = new Map();

    const flatten = (
      item: LayoutItem,
      path: number[] = [],
      parentId: string | null = null
    ) => {
      flatListMap.set(item.id, {
        ...item,
        path: path,
        parentPath: path.slice(0, -1),
        parentId: parentId,
        depth: path.length,
        index: path[path.length - 1] ?? 0,
      });

      if ("elements" in item && item.elements && item.elements.length > 0) {
        item.elements.forEach((child, index) => {
          flatten(child, [...path, index], item.id);
        });
      }
    };

    flatten(layout, [0], null);
    return flatListMap;
  }, [layout]);

  const activeParentId = useMemo(() => {
    if (!activeId) return null;
    return layoutFlatMap.get(activeId)?.parentId ?? null;
  }, [activeId, layoutFlatMap]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleGetParent = (layout: LayoutItem, path: number[]) => {
    if (path.length === 1) return layout;
    let current: LayoutItem = layout;
    for (let i = 1; i < path.length - 1; i++) {
      if ("elements" in current) {
        current = current.elements[path[i]];
      }
    }
    return current;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over || active.id === over.id) return;

    const activeElement = layoutFlatMap.get(active.id);
    const overElement = layoutFlatMap.get(over.id);

    if (!activeElement) return;

    const overIdStr = String(over.id);

    const deepClone = (item: LayoutItem): LayoutItem => {
      if ("elements" in item && item.elements) {
        return { ...item, elements: item.elements.map(deepClone) };
      }
      return { ...item };
    };

    if (overElement && overElement.type === "component") {
      const isSameParent =
        activeElement.parentPath.length === overElement.parentPath.length &&
        activeElement.parentPath.every(
          (val: number, index: number) => val === overElement.parentPath[index]
        );

      if (!isSameParent) return;

      // Reorder within the same container
      setLayout((currentLayout) => {
        const newLayout = deepClone(currentLayout);
        const parent = handleGetParent(newLayout, activeElement.path);

        if (!("elements" in parent)) return currentLayout;

        parent.elements = arrayMove(
          parent.elements,
          activeElement.index,
          overElement.index
        );

        return newLayout;
      });
      return;
    }

    // Check if dropping on a slot
    if (overIdStr.includes("-slot-")) {
      setLayout((currentLayout) => {
        const newLayout = deepClone(currentLayout);

        const parts = overIdStr.split("-slot-");
        const containerId = parts[0];
        const slotIndex = parseInt(parts[parts.length - 1]);

        const findContainer = (item: LayoutItem): LayoutItem | null => {
          if (item.id === containerId) return item;
          if ("elements" in item) {
            for (const child of item.elements) {
              const found = findContainer(child);
              if (found) return found;
            }
          }
          return null;
        };

        const targetContainer = findContainer(newLayout);
        if (!targetContainer || !("elements" in targetContainer))
          return currentLayout;

        const activeParent = handleGetParent(newLayout, activeElement.path);
        if (!("elements" in activeParent)) return currentLayout;

        const [movingItem] = activeParent.elements.splice(
          activeElement.index,
          1
        );

        targetContainer.elements.splice(slotIndex, 0, movingItem);

        return newLayout;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <LayoutRenderer layout={layout} activeParentId={activeParentId} />
      <DragOverlay>
        {activeId ? <Widget layout={layoutFlatMap.get(activeId)} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
