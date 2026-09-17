import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "../button";
import { Close, DragVertical } from "../../icons";
import { cn } from "../../utils";
import type { ColumnSelectorLabels, SelectorColumn } from "./types";

export interface ColumnSelectorRowProps {
  column: SelectorColumn;
  labels: ColumnSelectorLabels;
  reorderable?: boolean;
  removable?: boolean;
  onRemove?: (column: SelectorColumn) => void;
}

export default function ColumnSelectorRow({
  column,
  labels,
  reorderable = false,
  removable = true,
  onRemove,
}: ColumnSelectorRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.value, disabled: !reorderable });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "flex items-center justify-between gap-6 rounded px-2 py-1.5 text-base text-ink-gray-8 hover:bg-surface-gray-2",
        isDragging && "relative z-10 bg-surface-gray-2 shadow-sm"
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        {reorderable && (
          <button
            type="button"
            ref={setActivatorNodeRef}
            aria-label={`${labels.reorder}: ${column.label}`}
            className="flex shrink-0 cursor-grab touch-none items-center rounded text-ink-gray-5 outline-none focus-visible:ring-2 focus-visible:ring-outline-gray-3 active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <DragVertical aria-hidden className="h-3.5 w-3.5" />
          </button>
        )}
        <div className="truncate">{column.label}</div>
      </div>
      {removable && (
        <Button
          variant="ghost"
          className="h-5! w-5 p-1!"
          aria-label={`${labels.remove}: ${column.label}`}
          onClick={() => onRemove?.(column)}
        >
          <Close aria-hidden className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}
