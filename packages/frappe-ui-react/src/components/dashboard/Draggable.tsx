import { useDraggable } from "@dnd-kit/core";
import { useContext, useState } from "react";
import type { DraggableProps } from "./types";
import { LayoutContext } from "./layoutContext";
import { GripVertical } from "lucide-react";

export const Draggable: React.FC<DraggableProps> = ({
  slot,
  parentLocked = false,
}) => {
  const context = useContext(LayoutContext);
  const layoutLock = context?.layoutLock ?? false;
  const dragHandle = context?.dragHandle ?? false;
  const dragHandleOnHover = context?.dragHandleOnHover ?? false;
  const [isHovered, setIsHovered] = useState(false);
  const isDisabled = layoutLock ||  slot.locked || parentLocked;

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    isDragging,
  } = useDraggable({ id: slot.id, disabled: isDisabled });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 99 : "auto",
      }
    : {};

  const showDragHandle =
    dragHandle && !isDisabled && (!dragHandleOnHover || isHovered);

  const Component = slot.component;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(!dragHandle ? listeners : {})}
      className="w-full h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showDragHandle && (
        <button
          ref={setActivatorNodeRef}
          {...listeners}
          className="absolute top-2 right-2 z-10 cursor-grab active:cursor-grabbing p-1.5 rounded bg-surface-gray-2 hover:bg-surface-gray-3 border border-outline-gray-2 shadow-sm transition-colors"
          aria-label="Drag handle"
        >
          <GripVertical className="w-4 h-4 text-ink-gray-5" strokeWidth={2} />
        </button>
      )}
      <Component {...slot.props} />
    </div>
  );
};
