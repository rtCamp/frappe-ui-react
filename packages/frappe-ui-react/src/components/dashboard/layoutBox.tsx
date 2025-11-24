import { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { clsx } from "clsx";
import { Widget } from "./widget";
import type { LayoutBoxProps } from "./types";
import { DashboardRow } from "./dashboardRow";
import { DashboardStack } from "./dashboardStack";

export const LayoutBox: React.FC<LayoutBoxProps> = ({
  layout,
  orientation,
}) => {
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
          "outline-dashed outline-2 outline-offset-2",
          orientation === "horizontal" && "outline-gray-400",
          orientation === "vertical" && "outline-gray-300"
        )}
      >
        {layout.elements.map((item) => {
          if (item.type === "row") {
            return <DashboardRow key={item.id} layout={item} />;
          } else if (item.type === "stack") {
            return <DashboardStack key={item.id} layout={item} />;
          } else if (item.type === "component") {
            return <Widget key={item.id} layout={item} />;
          }
        })}
      </div>
    </SortableContext>
  );
};
