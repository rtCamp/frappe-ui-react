import { Slot } from "./slot";
import type { RowProps } from "./types";

export const Row: React.FC<RowProps> = ({
  widgets,
  row,
  rowIndex,
  parentLocked = false,
  onAddWidget,
  onRemoveWidget,
}) => {
  return (
    <div className="flex flex-row flex-wrap gap-4 min-h-[100px]">
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
