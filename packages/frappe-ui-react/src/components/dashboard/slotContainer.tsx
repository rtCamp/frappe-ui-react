import { useDroppable } from "@dnd-kit/core";
import { clsx } from "clsx";
import { useContext } from "react";
import { LayoutRenderer } from "./layoutRenderer";
import type { SlotContainerProps } from "./types";
import { LayoutContext } from "./layoutContext";

export const SlotContainer: React.FC<SlotContainerProps> = ({
  slotId,
  slotItem,
  isDragging,
}) => {
  const context = useContext(LayoutContext);
  const { activeSlotId, layoutLock } = context || {
    activeSlotId: null,
    layoutLock: false,
  };

  const { setNodeRef, isOver, active } = useDroppable({
    id: slotId,
    disabled: slotId === activeSlotId || layoutLock,
  });

  const isEmpty = slotItem.type === "empty";
  const isDirectlyOver = isOver && active && String(active.id) !== slotItem.id;

  return (
    <div
      ref={setNodeRef}
      style={
        slotItem.flex
          ? { flex: slotItem.flex }
          : {
              width: slotItem.width,
              height: slotItem.height,
              minWidth: slotItem.width,
              minHeight: slotItem.height,
            }
      }
      className={clsx(
        "flex-shrink-0 transition-colors border-gray-300",
        isEmpty &&
          "border-2 border-dashed border-gray-300 rounded flex items-center justify-center",
        isEmpty && isDragging && slotId !== activeSlotId && "bg-surface-gray-1",
        isEmpty && isOver && "border-gray-400 bg-surface-gray-2"
      )}
    >
      {!isEmpty ? (
        <div
          className={clsx(
            "w-full h-full transition-opacity",
            isDirectlyOver && slotItem.type === "component" && "opacity-50"
          )}
        >
          <LayoutRenderer layout={slotItem} />
        </div>
      ) : (
        <div className="w-full min-w-24 h-full min-h-24 text-gray-400 text-sm"></div>
      )}
    </div>
  );
};
