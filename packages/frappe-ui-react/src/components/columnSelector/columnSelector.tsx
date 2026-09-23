import { useCallback, useMemo } from "react";
import { Popover } from "@base-ui/react/popover";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Autocomplete } from "../autoComplete";
import type { AutocompleteChangeSelection } from "../autoComplete";
import { Button } from "../button";
import { AddSm, Reset, VerticalColumn } from "../../icons";
import ColumnSelectorRow from "./columnSelectorRow";
import type { ColumnSelectorProps, SelectorColumn } from "./types";
import {
  DEFAULT_MIN_COLUMNS,
  addColumn,
  canRemoveColumn,
  groupPinned,
  removeColumn,
  resolveLabels,
  togglePinned,
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
  columns: unorderedColumns,
  onColumnsChange,
  availableColumns,
  minColumns = DEFAULT_MIN_COLUMNS,
  reorderable = true,
  pinnable = false,
  maxPinned,
  onReset,
  hideLabel = false,
  disabled = false,
  labels: labelOverrides,
}: ColumnSelectorProps) {
  const labels = useMemo(() => resolveLabels(labelOverrides), [labelOverrides]);
  const columns = useMemo(
    () => (pinnable ? groupPinned(unorderedColumns) : unorderedColumns),
    [pinnable, unorderedColumns]
  );
  const pinnedCount = pinnable
    ? columns.filter((column) => column.pinned).length
    : 0;
  const canPin = maxPinned === undefined || pinnedCount < maxPinned;
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

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const columnIds = useMemo(() => columns.map((c) => c.value), [columns]);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!over || active.id === over.id) return;
      const from = columnIds.indexOf(String(active.id));
      const to = columnIds.indexOf(String(over.id));
      if (from < 0 || to < 0) return;
      if (pinnable && !!columns[from].pinned !== !!columns[to].pinned) return;
      onColumnsChange(arrayMove(columns, from, to));
    },
    [columnIds, columns, onColumnsChange, pinnable]
  );

  const handleTogglePinned = useCallback(
    (column: SelectorColumn) =>
      onColumnsChange(togglePinned(columns, column.value)),
    [columns, onColumnsChange]
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
                : () => <VerticalColumn aria-hidden className="h-4 w-4" />
            }
            icon={
              hideLabel
                ? () => <VerticalColumn aria-hidden className="h-4 w-4" />
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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={columnIds}
                strategy={verticalListSortingStrategy}
              >
                <div role="list">
                  {columns.map((column, index) => (
                    <div role="listitem" key={column.value}>
                      {pinnedCount > 0 && index === pinnedCount && (
                        <div
                          aria-hidden
                          className="my-1.5 border-t border-outline-gray-1"
                        />
                      )}
                      <ColumnSelectorRow
                        column={column}
                        labels={labels}
                        reorderable={reorderable}
                        removable={removable}
                        pinnable={pinnable}
                        pinDisabled={!column.pinned && !canPin}
                        onRemove={handleRemove}
                        onTogglePinned={handleTogglePinned}
                      />
                    </div>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
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
