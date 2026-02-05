import { useDroppable } from "@dnd-kit/core";
import { clsx } from "clsx";
import { useContext } from "react";
import { Draggable } from "./Draggable";
import type { DroppableProps } from "./types";
import { LayoutContext } from "./layoutContext";

export const Droppable: React.FC<DroppableProps> = ({
  slotId,
  slot,
  parentLocked = false,
}) => {
  const context = useContext(LayoutContext);
  const { activeSlotId, layoutLock } = context || {
    activeSlotId: null,
    layoutLock: false,
  };

  const isSlotLocked = slot.locked || parentLocked;

  const { setNodeRef, isOver, active } = useDroppable({
    id: slotId,
    disabled: slotId === activeSlotId || layoutLock || isSlotLocked,
  });

  const isDirectlyOver = isOver && active && String(active.id) !== slot.id;

  return (
    <div
      ref={setNodeRef}
      style={{ flex: slot.flex ?? "0 1 auto" }}
      className={clsx(
        "flex-shrink-0 transition-opacity",
        isDirectlyOver && "opacity-50"
      )}
    >
      <Draggable slot={slot} parentLocked={isSlotLocked} />
    </div>
  );
};
