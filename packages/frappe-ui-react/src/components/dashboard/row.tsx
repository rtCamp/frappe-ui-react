import { clsx } from "clsx";
import { Slot } from "./slot";
import type { RowProps } from "./types";

export const Row: React.FC<RowProps> = ({
  widgets,
  row,
  rowIndex,
  layoutFlow = "row",
  parentLocked = false,
  onAddWidget,
  onRemoveWidget,
}) => {
  return (
    <div
      className={clsx(
        "flex flex-wrap gap-4 min-h-[100px]",
        layoutFlow === "row" ? "flex-row" : "flex-col"
      )}
    >
      {row.map((widgetId, slotIndex) => {
        const slotId = `row-${rowIndex}-slot-${slotIndex}`;
        return (
          <Slot
            key={slotId}
            widgets={widgets}
            widgetId={widgetId}
            slotId={slotId}
            parentLocked={parentLocked}
            onAddWidget={(wId) => onAddWidget(rowIndex, slotIndex, wId)}
            onRemoveWidget={() => onRemoveWidget(rowIndex, slotIndex)}
          />
        );
      })}
    </div>
  );
};
