import { clsx } from "clsx";
import { Droppable } from "./Droppable";
import type { RowProps } from "./types";

export const Row: React.FC<RowProps> = ({
  row,
  parentLocked = false,
}) => {
  const isRowLocked = parentLocked || row.locked;

  return (
    <div
      className={clsx(
        "flex flex-row flex-wrap rounded min-h-[100px]",
        !row.gap && "gap-4",
        row.className
      )}
      style={{
        ...(row.gap && { gap: row.gap }),
      }}
    >
      {row.slots.map((slot, slotIndex) => {
        const slotId = `${row.id}-slot-${slotIndex}`;
        return (
          <Droppable
            key={slotId}
            slotId={slotId}
            slot={slot}
            parentLocked={isRowLocked}
          />
        );
      })}
    </div>
  );
};
