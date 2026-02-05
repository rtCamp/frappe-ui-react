/**
 * External dependencies.
 */
import { useState, useMemo, useCallback } from "react";
import clsx from "clsx";
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

/**
 * Internal dependencies.
 */
import { Layout } from "./layout";
import { LayoutContext } from "./layoutContext";
import { LayoutContainerProps } from "./types";
import { parseSlotIds } from "./dashboardUtil";

export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  widgets,
  layout,
  layoutFlow = "row",
  setLayout,
  layoutLock = false,
  dragHandle = false,
  dragHandleOnHover = false,
  widgetSizes,
  autoAdjustWidth = false,
  className = "",
}) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

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

  const checkSizeCompatibility = useCallback(
    (activeId: string, overId: string) => {
      const parsedSlotIds = parseSlotIds(activeId, overId);
      if (!parsedSlotIds) return false;

      const {
        sourceLayoutIndex,
        sourceSlotIndex,
        targetLayoutIndex,
        targetSlotIndex,
      } = parsedSlotIds;

      const sourceItem = layout[sourceLayoutIndex][sourceSlotIndex];
      const targetItem = layout[targetLayoutIndex][targetSlotIndex];

      const sourceWidget = widgets.find((w) => w.id === sourceItem.widgetId);
      const targetWidget = widgets.find((w) => w.id === targetItem.widgetId);

      if (!sourceWidget && !targetWidget) return true;

      if (
        (sourceWidget &&
          !sourceWidget.supportedSizes.includes(targetItem.size)) ||
        (targetWidget && !targetWidget.supportedSizes.includes(sourceItem.size))
      ) {
        return false;
      }

      return true;
    },
    [layout, widgets]
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

    const parsedSlotIds = parseSlotIds(activeIdStr, overIdStr);
    if (!parsedSlotIds) return false;

    const {
      sourceLayoutIndex,
      sourceSlotIndex,
      targetLayoutIndex,
      targetSlotIndex,
    } = parsedSlotIds;

    if (!checkSizeCompatibility(activeIdStr, overIdStr)) return;

    // Swap the widgets in the layout
    const newLayout = layout.map((items, layoutIdx) =>
      items.map((layoutItem, slotIndex) => {
        const isSource =
          layoutIdx === sourceLayoutIndex && slotIndex === sourceSlotIndex;
        const isTarget =
          layoutIdx === targetLayoutIndex && slotIndex === targetSlotIndex;

        if (!isSource && !isTarget) return layoutItem;

        const sourceWidgetId =
          layout[sourceLayoutIndex][sourceSlotIndex].widgetId;
        const targetWidgetId =
          layout[targetLayoutIndex][targetSlotIndex].widgetId;

        return {
          widgetId: isSource ? targetWidgetId : sourceWidgetId,
          size: layoutItem.size,
        };
      })
    );
    setLayout(newLayout);
  };

  const handleAddWidget = useCallback(
    (layoutIndex: number, slotIndex: number, widgetId: string) => {
      const newLayout = layout.map((items) => [...items]);
      const slot = newLayout[layoutIndex][slotIndex];
      const supportedSizes = widgets.find(
        (w) => w.id === widgetId
      )?.supportedSizes;
      if (!supportedSizes) return;
      if (!supportedSizes.includes(slot.size)) return;

      newLayout[layoutIndex][slotIndex] = {
        widgetId,
        size: layout[layoutIndex][slotIndex].size,
      };
      setLayout(newLayout);
    },
    [layout, setLayout, widgets]
  );

  const handleRemoveWidget = useCallback(
    (layoutIndex: number, slotIndex: number) => {
      const newLayout = layout.map((items) => [...items]);
      newLayout[layoutIndex][slotIndex] = {
        widgetId: "",
        size: newLayout[layoutIndex][slotIndex].size,
      };
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
        layout,
        checkSizeCompatibility,
        widgetSizes,
        autoAdjustWidth,
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div
          className={clsx(
            "flex gap-4",
            layoutFlow === "row" ? "flex-col" : "flex-row",
            className
          )}
        >
          {layout.map((items, layoutIndex) => (
            <Layout
              key={layoutIndex}
              widgets={widgets}
              layoutFlow={layoutFlow}
              items={items}
              layoutIndex={layoutIndex}
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
