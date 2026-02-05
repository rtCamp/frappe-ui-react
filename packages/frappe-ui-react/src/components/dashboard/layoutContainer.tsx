import { useState, useMemo, useRef } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  rectIntersection,
  type DragStartEvent,
  type DragOverEvent,
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
  const isDraggingOverRef = useRef(false);

  const layoutFlatMap = useMemo(() => {
    const flatListMap = new Map();

    const flatten = (item: LayoutItem, path: number[] = []) => {
      flatListMap.set(item.id, {
        ...item,
        path: path,
        parentPath: path.slice(0, -1),
        depth: path.length,
        index: path[path.length - 1] ?? 0,
      });

      if ("elements" in item && item.elements && item.elements.length > 0) {
        item.elements.forEach((child, index) => {
          flatten(child, [...path, index]);
        });
      }
    };

    flatten(layout, [0]);
    return flatListMap;
  }, [layout]);

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

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || isDraggingOverRef.current) return;

    const activeElement = layoutFlatMap.get(active.id);
    const overElement = layoutFlatMap.get(over.id);

    if (!activeElement) return;

    let targetParentPath: number[] = overElement ? overElement.path : [];
    let insertIndex: number = 0;

    if (overElement && overElement?.type === "component") {
      targetParentPath = overElement.parentPath;
      insertIndex = overElement.index;
    }

    if (
      activeElement.parentPath.length === targetParentPath.length &&
      activeElement.parentPath.every(
        (val: number, index: number) => val === targetParentPath[index]
      )
    )
      return;

    // Cross-container drag temporarily update layout for preview
    isDraggingOverRef.current = true;

    setLayout((currentLayout) => {
      const deepClone = (item: LayoutItem): LayoutItem => {
        if ("elements" in item && item.elements) {
          return { ...item, elements: item.elements.map(deepClone) };
        }
        return { ...item };
      };

      const newLayout = deepClone(currentLayout);

      const activeParent = handleGetParent(newLayout, activeElement.path);
      const targetParent = handleGetParent(newLayout, [...targetParentPath, 0]);

      if (!("elements" in activeParent) || !("elements" in targetParent))
        return currentLayout;

      const [movingItem] = activeParent.elements.splice(activeElement.index, 1);
      targetParent.elements.splice(insertIndex, 0, movingItem);

      setTimeout(() => {
        isDraggingOverRef.current = false;
      }, 50);

      return newLayout;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    isDraggingOverRef.current = false;

    if (!over) return;

    if (active.id !== over.id) {
      const activeElement = layoutFlatMap.get(active.id);
      const overElement = layoutFlatMap.get(over.id);

      if (!activeElement || !overElement) return;

      let targetParentPath: number[] = overElement ? overElement.path : [];
      let insertIndex: number = 0;

      if (overElement && overElement?.type === "component") {
        targetParentPath = overElement.parentPath;
        insertIndex = overElement.index + 1;
      }

      setLayout((currentLayout) => {
        const deepClone = (item: LayoutItem): LayoutItem => {
          if ("elements" in item && item.elements) {
            return { ...item, elements: item.elements.map(deepClone) };
          }
          return { ...item };
        };

        const newLayout = deepClone(currentLayout);

        if (
          activeElement.parentPath.length === targetParentPath.length &&
          activeElement.parentPath.every(
            (val: number, index: number) => val === targetParentPath[index]
          )
        ) {
          const parent = handleGetParent(newLayout, activeElement.path);
          if (!("elements" in parent)) return currentLayout;

          const oldIndex = activeElement.index;
          const newIndex =
            overElement.type === "component" ? overElement.index : insertIndex;

          parent.elements = arrayMove(parent.elements, oldIndex, newIndex);

          return newLayout;
        } else {
          const activeParent = handleGetParent(newLayout, activeElement.path);
          const targetParent = handleGetParent(newLayout, [...targetParentPath, 0]);

          if (!("elements" in activeParent) || !("elements" in targetParent))
            return currentLayout;

          const movingItem = activeParent.elements.splice(
            activeElement.index,
            1
          )[0];
          targetParent.elements.splice(insertIndex, 0, movingItem);

          return newLayout;
        }
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <LayoutRenderer layout={layout} />
      <DragOverlay>
        {activeId ? <Widget layout={layoutFlatMap.get(activeId)} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
