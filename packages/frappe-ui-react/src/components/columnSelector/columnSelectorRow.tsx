import { Button } from "../button";
import { Close } from "../../icons";
import type { ColumnSelectorLabels, SelectorColumn } from "./types";

export interface ColumnSelectorRowProps {
  column: SelectorColumn;
  labels: ColumnSelectorLabels;
  removable?: boolean;
  onRemove?: (column: SelectorColumn) => void;
}

export default function ColumnSelectorRow({
  column,
  labels,
  removable = true,
  onRemove,
}: ColumnSelectorRowProps) {
  return (
    <div className="flex items-center justify-between gap-6 rounded px-2 py-1.5 text-base text-ink-gray-8 hover:bg-surface-gray-2">
      <div className="truncate">{column.label}</div>
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
