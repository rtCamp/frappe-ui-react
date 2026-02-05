import { useDroppable, useDraggable } from "@dnd-kit/core";
import { clsx } from "clsx";
import { useContext, useState, useMemo } from "react";
import { GripVertical, X, Plus } from "lucide-react";
import { Autocomplete } from "../autoComplete";
import { Popover } from "../popover";
import type { SlotProps } from "./types";
import { LayoutContext } from "./layoutContext";
import { Button } from "../button";

export const Slot: React.FC<SlotProps> = ({
  widgets,
  widgetId,
  slotId,
  parentLocked = false,
  onAddWidget,
  onRemoveWidget,
}) => {
  const context = useContext(LayoutContext);
  const { activeSlotId, layoutLock, dragHandle, dragHandleOnHover } =
    context || {
      activeSlotId: null,
      layoutLock: false,
      dragHandle: false,
      dragHandleOnHover: false,
    };

  const [isHovered, setIsHovered] = useState(false);
  const isEmpty = !widgetId;
  const isDisabled = layoutLock || parentLocked;

  const widget = useMemo(() => {
    return widgets.find((w) => w.id === widgetId);
  }, [widgets, widgetId]);

  const availableWidgets = useMemo(() => {
    return widgets.map((w) => ({
      label: w.name,
      value: w.id,
    }));
  }, [widgets]);

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: slotId,
    disabled: slotId === activeSlotId || isDisabled,
  });

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

  if (isEmpty || !Component) {
    return (
      <div
        ref={setDroppableRef}
        className={clsx(
          "flex-1 min-w-[200px] min-h-[100px] rounded-lg border-2 border-dashed flex items-center justify-center",
          isOver
            ? "border-outline-gray-3 bg-surface-gray-2"
            : "border-outline-gray-2 bg-surface-gray-1"
        )}
      >
        {!isDisabled && (
          <Popover
            placement="bottom-start"
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
        "flex-1 min-w-[200px] transition-opacity",
        isOver && "opacity-50"
      )}
    >
      <div
        ref={setDraggableRef}
        style={dragStyle}
        {...attributes}
        {...(!dragHandle ? listeners : {})}
        className="w-full h-full relative"
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
