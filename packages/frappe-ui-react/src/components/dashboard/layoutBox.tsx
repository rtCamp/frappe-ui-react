import { useMemo } from "react";
import { useDndContext, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { clsx } from "clsx";
import { LayoutRenderer } from "./layoutRenderer";
import type { LayoutBoxProps } from "./types";

export const LayoutBox: React.FC<LayoutBoxProps> = ({
  layout,
  orientation,
}) => {
  const { active } = useDndContext();
  
  const isDragging = useMemo(() => active !== null, [active]);

  const { setNodeRef } = useDroppable({
    id: layout.id,
  });

  const itemIds = useMemo(() => {
    const baseIds = layout.elements.map((item) => item.id);
    return baseIds;
  }, [layout.elements]);

  const strategy =
    orientation === "horizontal"
      ? horizontalListSortingStrategy
      : verticalListSortingStrategy;

  return (
    <SortableContext items={itemIds} strategy={strategy}>
      <div
        ref={(node) => {
          setNodeRef(node);
        }}
        className={clsx(
          "flex gap-4 rounded min-h-[100px]",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          isDragging && "outline-dashed outline-2 outline-offset-2",
          isDragging && orientation === "horizontal" && "outline-gray-400",
          isDragging && orientation === "vertical" && "outline-gray-300"
        )}
      >
        {layout.elements.map((item) => (
          <LayoutRenderer key={item.id} layout={item} />
        ))}
      </div>
    </SortableContext>
  );
};
