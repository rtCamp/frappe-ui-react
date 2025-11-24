import { useState, useMemo } from "react";
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
import { DashboardRow } from "./dashboardRow";
import { DashboardStack } from "./dashboardStack";
import { Widget } from "./widget";
import { LayoutContainerProps, LayoutItem } from "./types";

export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  layout,
  setLayout,
}) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const layoutFlatMap = useMemo(() => {
    const flatListMap = new Map();

    const flatten = (items: LayoutItem[], path: number[] = []) => {
      items.forEach((item, index) => {
        const currentPath = [...path, index];

        flatListMap.set(item.id, {
          ...item,
          path: currentPath,
          parentPath: path,
          depth: currentPath.length,
          index: index,
        });

        if ('elements' in item && item.elements && item.elements.length > 0) {
          flatten(item.elements, currentPath);
        }
      });
    };

    flatten(layout);
    return flatListMap;
  }, [layout]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
        delay: 0,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {};

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const activeElement = layoutFlatMap.get(active.id);
      const overElement = layoutFlatMap.get(over?.id);

      // For same parent reordering
      if (
        activeElement.path.length === overElement.path.length &&
        activeElement.parentPath.every(
          (val: number, index: number) => val === overElement.parentPath[index]
        )
      ) {
        setLayout((currentLayout) => {
          const newLayout = [...currentLayout];
          let parent: { elements: LayoutItem[] } = { elements: newLayout };

          for (let i = 0; i < activeElement.parentPath.length; i++) {
            parent = parent.elements[activeElement.parentPath[i]] as { elements: LayoutItem[] };
          }

          const oldIndex = activeElement.index;
          const newIndex = overElement.index;

          parent.elements = arrayMove(parent.elements, oldIndex, newIndex);

          return newLayout;
        });
        return;
      }

      // For different parent move
      setLayout((currentLayout) => {
        const newLayout = [...currentLayout];

        let activeParent: { elements: LayoutItem[] } = { elements: newLayout };
        for (let i = 0; i < activeElement.parentPath.length; i++) {
          activeParent = activeParent.elements[activeElement.parentPath[i]] as { elements: LayoutItem[] };
        }

        let overParent: { elements: LayoutItem[] } = { elements: newLayout };
        for (let i = 0; i < overElement.parentPath.length; i++) {
          overParent = overParent.elements[overElement.parentPath[i]] as { elements: LayoutItem[] };
        }

        const movingItem = activeParent.elements.splice(
          activeElement.index,
          1
        )[0];
        overParent.elements.splice(overElement.index, 0, movingItem);

        return newLayout;
      });

      console.log("Reordering", active.id, over?.id);
    }

    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {layout.map((item) => {
        if (item.type === "row") {
          return <DashboardRow key={item.id} layout={item} />;
        } else if (item.type === "stack") {
          return <DashboardStack key={item.id} layout={item} />;
        } else if (item.type === "component") {
          return <Widget key={item.id} layout={item} />;
        }
      })}
      <DragOverlay>
        {activeId ? <Widget layout={layoutFlatMap.get(activeId)} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

LayoutContainer.displayName = "LayoutContainer";
