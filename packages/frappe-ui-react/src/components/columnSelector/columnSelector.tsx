import { useCallback, useMemo } from "react";
import { Popover } from "@base-ui/react/popover";

import { Autocomplete } from "../autoComplete";
import type { AutocompleteChangeSelection } from "../autoComplete";
import { Button } from "../button";
import { AddSm, HeaderColumn, Reset } from "../../icons";
import ColumnSelectorRow from "./columnSelectorRow";
import type { ColumnSelectorProps, SelectorColumn } from "./types";
import {
  DEFAULT_MIN_COLUMNS,
  addColumn,
  canRemoveColumn,
  removeColumn,
  resolveLabels,
  unusedColumns,
} from "./utils";

/**
 * Popover for choosing which columns a list view shows.
 *
 * Fully controlled: the component never owns column state. It renders
 * `columns`, and every add / remove emits the next value through
 * `onColumnsChange` for the consumer to store and persist.
 */
export default function ColumnSelector({
  columns,
  onColumnsChange,
  availableColumns,
  minColumns = DEFAULT_MIN_COLUMNS,
  onReset,
  hideLabel = false,
  disabled = false,
  labels: labelOverrides,
}: ColumnSelectorProps) {
  const labels = useMemo(() => resolveLabels(labelOverrides), [labelOverrides]);
  const removable = canRemoveColumn(columns, minColumns);
  const addable = useMemo(
    () => unusedColumns(availableColumns, columns),
    [availableColumns, columns]
  );

  const handleRemove = useCallback(
    (column: SelectorColumn) => {
      const next = removeColumn(columns, column.value, minColumns);
      if (next === columns) return;
      onColumnsChange(next);
    },
    [columns, minColumns, onColumnsChange]
  );

  const handleAdd = useCallback(
    (selection: AutocompleteChangeSelection) => {
      if (!selection || Array.isArray(selection)) return;
      const column = addable.find((c) => c.value === selection.value);
      if (!column) return;
      onColumnsChange(addColumn(columns, column));
    },
    [addable, columns, onColumnsChange]
  );

  return (
    <Popover.Root>
      <Popover.Trigger
        nativeButton
        render={
          <Button
            variant="subtle"
            label={hideLabel ? undefined : labels.trigger}
            aria-label={labels.trigger}
            disabled={disabled}
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
        }
      />
      <Popover.Portal>
        <Popover.Positioner sideOffset={4} align="end">
          <Popover.Popup
            initialFocus={false}
            className="z-100 min-w-40 rounded-lg bg-surface-modal p-1.5 shadow-2xl ring-1 ring-black/5"
          >
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
            <div className="mt-1.5 flex flex-col gap-1 border-t border-outline-gray-1 pt-1.5">
              <Autocomplete
                value={null}
                options={addable}
                placement="bottom-start"
                emptyMessage={labels.noColumnsAvailable}
                onChange={(_, selection) => handleAdd(selection)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start! text-ink-gray-5!"
                  label={labels.addColumn}
                  iconLeft={() => <AddSm aria-hidden className="h-4 w-4" />}
                />
              </Autocomplete>
              {onReset && (
                <Button
                  variant="ghost"
                  className="w-full justify-start! text-ink-gray-5!"
                  label={labels.resetToDefault}
                  iconLeft={() => <Reset aria-hidden className="h-4 w-4" />}
                  onClick={onReset}
                />
              )}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
