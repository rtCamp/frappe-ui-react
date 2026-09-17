import type { ColumnSelectorLabels, SelectorColumn } from "./types";

export const DEFAULT_MIN_COLUMNS = 1;

export const DEFAULT_PINNED_ROW_KEYS = ["name"];

export const DEFAULT_LABELS: ColumnSelectorLabels = {
  trigger: "Columns",
  resetToDefault: "Reset to Default",
  remove: "Remove column",
};

export function resolveLabels(
  labels?: Partial<ColumnSelectorLabels>
): ColumnSelectorLabels {
  return labels ? { ...DEFAULT_LABELS, ...labels } : DEFAULT_LABELS;
}

export function canRemoveColumn(
  columns: SelectorColumn[],
  minColumns: number = DEFAULT_MIN_COLUMNS
): boolean {
  return columns.length > minColumns;
}

export function removeColumn<T extends SelectorColumn>(
  columns: T[],
  value: string,
  minColumns: number = DEFAULT_MIN_COLUMNS
): T[] {
  if (!canRemoveColumn(columns, minColumns)) {
    return columns;
  }
  return columns.filter((column) => column.value !== value);
}

export function removeRow(
  rows: string[],
  value: string,
  pinnedRowKeys: string[] = DEFAULT_PINNED_ROW_KEYS
): string[] {
  if (pinnedRowKeys.includes(value)) {
    return rows;
  }
  return rows.filter((row) => row !== value);
}
