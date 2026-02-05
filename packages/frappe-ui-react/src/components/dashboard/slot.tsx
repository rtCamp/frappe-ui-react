/**
 * External dependencies.
 */
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { clsx } from "clsx";
import { useContext, useState, useMemo } from "react";
import { GripVertical, X, Plus } from "lucide-react";

/**
 * Internal dependencies.
 */
import { Autocomplete } from "../autoComplete";
import { Popover } from "../popover";
import { LayoutContext } from "./layoutContext";
import { Button } from "../button";
import type { SlotProps } from "./types";

export const Slot: React.FC<SlotProps> = ({
  widgets,
  widgetId,
  slotId,
  size,
  parentLocked = false,
  onAddWidget,
  onRemoveWidget,
}) => {
  const context = useContext(LayoutContext);
  const {
    activeSlotId,
    layoutLock,
    dragHandle,
    dragHandleOnHover,
    checkSizeCompatibility,
    widgetSizes = {
      small: { w: "auto", h: "auto" },
      medium: { w: "auto", h: "auto" },
      large: { w: "auto", h: "auto" },
    },
    autoAdjustWidth,
  } = context || {
    activeSlotId: null,
    layoutLock: false,
    dragHandle: false,
    dragHandleOnHover: false,
    autoAdjustWidth: false,
  };

  const [isHovered, setIsHovered] = useState(false);
  const isEmpty = widgetId === "";
  const isDisabled = layoutLock || parentLocked;

  const widget = useMemo(() => {
    return widgets.find((w) => w.id === widgetId);
  }, [widgets, widgetId]);

  const validSize = useMemo(() => {
    return widget?.supportedSizes.includes(size);
  }, [widget, size]);

  const availableWidgets = useMemo(() => {
    return widgets
      .filter((w) => w.supportedSizes.includes(size))
      .map((w) => ({
        label: w.name,
        value: w.id,
      }));
  }, [widgets, size]);

  const {
    setNodeRef: setDroppableRef,
    isOver,
    over,
    active,
  } = useDroppable({
    id: slotId,
    disabled: slotId === activeSlotId || isDisabled,
  });

  const overValidSize = useMemo(() => {
    if (!over || !active || !checkSizeCompatibility) return false;
    return checkSizeCompatibility(String(active.id), String(over.id));
  }, [over, active, checkSizeCompatibility]);

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    setActivatorNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: slotId,
    disabled: isEmpty || isDisabled,
  });

  const dragStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 99 : "auto",
      }
    : {};

  const showDragHandle =
    dragHandle && !isDisabled && !isEmpty && (!dragHandleOnHover || isHovered);
  const showRemoveButton = !isDisabled && !isEmpty && isHovered;

  const Component = widget?.component;

  if (isEmpty || !validSize || !Component) {
    return (
      <div
        ref={setDroppableRef}
        className={clsx(
          "shrink-1 rounded-lg border-2 border-dashed flex items-center justify-center p-2",
          isOver && overValidSize
            ? "border-outline-blue-1 bg-surface-blue-1"
            : isOver && !overValidSize
            ? "border-outline-red-1 bg-surface-red-1"
            : "border-outline-gray-2 bg-surface-gray-1",
          autoAdjustWidth && "flex-1"
        )}
        style={{
          width: widgetSizes[size]?.w,
          height: widgetSizes[size]?.h,
          minWidth: 0,
          minHeight: widgetSizes[size]?.h,
          maxWidth: autoAdjustWidth ? "none" : widgetSizes[size]?.w,
          maxHeight: widgetSizes[size]?.h,
          flexBasis: widgetSizes[size]?.w,
        }}
      >
        {!isDisabled && (
          <Popover
            placement="bottom"
            target={({ togglePopover }) => (
              <Button
                onClick={togglePopover}
                className="flex items-center gap-2 px-3 py-2 text-sm text-ink-gray-5 hover:text-ink-gray-7 hover:bg-surface-gray-2 rounded-md transition-colors"
                iconLeft={() => <Plus className="w-4 h-4" />}
              >
                Add Widget
              </Button>
            )}
            body={({ close }) => (
              <div className="p-2 min-w-[200px]">
                <Autocomplete
                  value={null}
                  placeholder="Search widgets..."
                  options={availableWidgets}
                  onChange={(selected) => {
                    if (selected && !Array.isArray(selected)) {
                      const widgetId =
                        typeof selected === "object" &&
                        selected !== null &&
                        "value" in selected
                          ? selected.value
                          : selected;
                      if (typeof widgetId === "string") {
                        onAddWidget(widgetId);
                        close();
                      }
                    }
                  }}
                />
              </div>
            )}
          />
        )}
      </div>
    );
  }

  return (
    <div
      ref={setDroppableRef}
      className={clsx(
        "w-full shrink-1 flex transition-opacity relative",
        autoAdjustWidth && "flex-1"
      )}
      style={{
        minWidth: 0,
        minHeight: widgetSizes[size]?.h,
        maxWidth: autoAdjustWidth ? "none" : widgetSizes[size]?.w,
        maxHeight: widgetSizes[size]?.h,
        flexBasis: widgetSizes[size]?.w,
      }}
    >
      <div
        ref={setDraggableRef}
        style={dragStyle}
        {...attributes}
        {...(!dragHandle ? listeners : {})}
        className={clsx(
          "w-full h-full relative shrink-0",
          isOver &&
            "relative after:absolute after:w-full after:h-full after:inset-0 after:border-2 after:border-dashed after:rounded-lg after:pointer-events-none after:z-20",
          isOver && overValidSize
            ? "after:bg-surface-blue-1/25 after:border-outline-blue-1"
            : "after:bg-surface-red-1/25 after:border-outline-red-1",
          autoAdjustWidth && "flex-1"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {(showRemoveButton || showDragHandle) && (
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
            {showRemoveButton && (
              <button
                onClick={onRemoveWidget}
                className="p-1.5 rounded bg-surface-gray-2 hover:bg-red-100 border border-outline-gray-2 shadow-sm transition-colors group"
                aria-label="Remove widget"
              >
                <X
                  className="w-4 h-4 text-ink-gray-5 group-hover:text-red-500"
                  strokeWidth={2}
                />
              </button>
            )}
            {showDragHandle && (
              <button
                ref={setActivatorNodeRef}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1.5 rounded bg-surface-gray-2 hover:bg-surface-gray-3 border border-outline-gray-2 shadow-sm transition-colors"
                aria-label="Drag handle"
              >
                <GripVertical
                  className="w-4 h-4 text-ink-gray-5"
                  strokeWidth={2}
                />
              </button>
            )}
          </div>
        )}
        <Component {...(widget?.props || {})} />
      </div>
    </div>
  );
};
