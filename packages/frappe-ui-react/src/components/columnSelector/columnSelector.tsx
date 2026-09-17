import { useCallback, useMemo } from "react";

import { Button } from "../button";
import Popover from "../popover/popover";
import { HeaderColumn, Reset } from "../../icons";
import ColumnSelectorRow from "./columnSelectorRow";
import type { ColumnSelectorProps, SelectorColumn } from "./types";
import {
  DEFAULT_MIN_COLUMNS,
  DEFAULT_PINNED_ROW_KEYS,
  canRemoveColumn,
  removeColumn,
  removeRow,
  resolveLabels,
} from "./utils";

export default function ColumnSelector({
  columns,
  onColumnsChange,
  rows,
  onRowsChange,
  pinnedRowKeys = DEFAULT_PINNED_ROW_KEYS,
  minColumns = DEFAULT_MIN_COLUMNS,
  onReset,
  hideLabel = false,
  disabled = false,
  labels: labelOverrides,
}: ColumnSelectorProps) {
  const labels = useMemo(() => resolveLabels(labelOverrides), [labelOverrides]);
  const removable = canRemoveColumn(columns, minColumns);

  const handleRemove = useCallback(
    (column: SelectorColumn) => {
      const next = removeColumn(columns, column.value, minColumns);
      if (next === columns) return;
      onColumnsChange(next);
      if (rows && onRowsChange) {
        onRowsChange(removeRow(rows, column.value, pinnedRowKeys));
      }
    },
    [columns, minColumns, onColumnsChange, rows, onRowsChange, pinnedRowKeys]
  );

  return (
    <Popover
      placement="bottom-end"
      target={({ togglePopover, isOpen }) => (
        <Button
          variant="subtle"
          label={hideLabel ? undefined : labels.trigger}
          aria-label={labels.trigger}
          aria-expanded={isOpen}
          disabled={disabled}
          onClick={togglePopover}
          iconLeft={
            hideLabel
              ? undefined
              : () => <HeaderColumn aria-hidden className="h-4 w-4" />
          }
          icon={
            hideLabel
              ? () => <HeaderColumn aria-hidden className="h-4 w-4" />
              : undefined
          }
        />
      )}
      body={() => (
        <div className="my-2 min-w-40 rounded-lg bg-surface-modal p-1.5 shadow-2xl ring-1 ring-black/5">
          <div role="list">
            {columns.map((column) => (
              <div role="listitem" key={column.value}>
                <ColumnSelectorRow
                  column={column}
                  labels={labels}
                  removable={removable}
                  onRemove={handleRemove}
                />
              </div>
            ))}
          </div>
          {onReset && (
            <div className="mt-1.5 flex flex-col gap-1 border-t border-outline-gray-1 pt-1.5">
              <Button
                variant="ghost"
                className="w-full justify-start! text-ink-gray-5!"
                label={labels.resetToDefault}
                iconLeft={() => <Reset aria-hidden className="h-4 w-4" />}
                onClick={onReset}
              />
            </div>
          )}
        </div>
      )}
    />
  );
}
