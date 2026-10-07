import type { ColumnSelectorLabels, SelectorColumn } from "./types";

export const DEFAULT_MIN_COLUMNS = 1;

export const DEFAULT_LABELS: ColumnSelectorLabels = {
  trigger: "Columns",
  addColumn: "Add Column",
  resetToDefault: "Reset to Default",
  remove: "Remove column",
  reorder: "Reorder column",
  pin: "Pin column",
  unpin: "Unpin column",
  pinLimit: "Pin limit reached",
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

export function groupPinned<T extends SelectorColumn>(columns: T[]): T[] {
  return [
    ...columns.filter((column) => column.pinned),
    ...columns.filter((column) => !column.pinned),
  ];
}

export function togglePinned<T extends SelectorColumn>(
  columns: T[],
  value: string
): T[] {
  const column = columns.find((existing) => existing.value === value);
  if (!column) {
    return columns;
  }
  const rest = columns.filter((existing) => existing.value !== value);
  const toggled = { ...column, pinned: !column.pinned };
  return [
    ...rest.filter((existing) => existing.pinned),
    toggled,
    ...rest.filter((existing) => !existing.pinned),
  ];
}
