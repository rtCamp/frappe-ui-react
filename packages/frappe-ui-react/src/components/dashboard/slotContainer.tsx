import { useDroppable } from "@dnd-kit/core";
import { clsx } from "clsx";
import { LayoutRenderer } from "./layoutRenderer";
import type { SlotContainerProps } from "./types";

export const SlotContainer: React.FC<SlotContainerProps> = ({
  slotId,
  slot,
  element,
  isDragging,
  isActiveParent,
  activeParentId,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: slotId,
    disabled: !!element || isActiveParent,
  });

  return (
    <div
      ref={setNodeRef}
      style={
        slot.flex
          ? { flex: slot.flex }
          : {
              width: slot.width,
              height: slot.height,
              minWidth: slot.width,
              minHeight: slot.height,
            }
      }
      className={clsx(
        "flex-shrink-0 transition-colors",
        !element &&
          "border-2 border-dashed border-gray-300 rounded flex items-center justify-center",
        !element && isDragging && !isActiveParent && "bg-surface-gray-1",
        !element && isOver && "border-gray-400 bg-surface-gray-2"
      )}
    >      {element ? (
        <LayoutRenderer layout={element} activeParentId={activeParentId} />
      ) : (
        <div className="w-full min-w-24 h-full min-h-24 text-gray-400 text-sm"></div>
      )}
    </div>
  );
};
