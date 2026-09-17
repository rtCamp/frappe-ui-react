export type SelectorColumn = {
  label: string;
  value: string;
};

export type ColumnSelectorLabels = {
  trigger: string;
  resetToDefault: string;
  remove: string;
};

export interface ColumnSelectorProps {
  columns: SelectorColumn[];
  onColumnsChange: (columns: SelectorColumn[]) => void;

  rows?: string[];
  onRowsChange?: (rows: string[]) => void;
  pinnedRowKeys?: string[];

  minColumns?: number;
  onReset?: () => void;

  hideLabel?: boolean;
  disabled?: boolean;
  labels?: Partial<ColumnSelectorLabels>;
}
