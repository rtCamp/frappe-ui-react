import type { ColumnSelectorLabels, SelectorColumn } from "./types";

export const DEFAULT_MIN_COLUMNS = 1;

export const DEFAULT_LABELS: ColumnSelectorLabels = {
  trigger: "Columns",
  addColumn: "Add Column",
  noColumnsAvailable: "All columns added",
  resetToDefault: "Reset to Default",
  remove: "Remove column",
  reorder: "Reorder column",
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

export function unusedColumns(
  availableColumns: SelectorColumn[],
  columns: SelectorColumn[]
): SelectorColumn[] {
  const used = new Set(columns.map((column) => column.value));
  return availableColumns.filter((column) => !used.has(column.value));
}

export function addColumn<T extends SelectorColumn>(
  columns: T[],
  column: T
): T[] {
  if (columns.some((existing) => existing.value === column.value)) {
    return columns;
  }
  return [...columns, column];
}
