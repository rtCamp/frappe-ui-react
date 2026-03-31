import type { ReactNode } from "react";

/** Individual filter option for field/operator/value selection */
export interface FilterSelectOption {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

/** Grouped options for dropdowns */
export interface FilterGroupedOption {
  group: string;
  options: FilterSelectOption[];
}

export type FilterOptionType = FilterSelectOption | FilterGroupedOption;

/** Operator types commonly used in filters */
export type FilterOperator =
  | "is"
  | "is_not"
  | "contains"
  | "not_contains"
  | "starts_with"
  | "ends_with"
  | "greater_than"
  | "less_than"
  | "between"
  | "is_empty"
  | "is_not_empty";

/** Operator definition with label for display */
export interface FilterOperatorOption {
  label: string;
  value: FilterOperator | string;
  /** Some operators don't need a value (e.g., is_empty) */
  hideValue?: boolean;
}

/** Field definition for what can be filtered */
export interface FilterField {
  /** The category of the field being filtered */
  fieldCategory?: string;
  /** Unique identifier for the field */
  name: string;
  /** Display label */
  label: string;
  /** Field type determines available operators and value input */
  type?: "string" | "number" | "date" | "daterange" | "select" | "multiselect";
  /** Available operators for this field (defaults based on type) */
  operators?: FilterOperatorOption[];
  /** Options for select/multiselect type fields */
  options?: FilterOptionType[];
  /** Custom icon for the field */
  icon?: ReactNode;
}

/** A single filter condition */
export interface FilterCondition {
  /** Unique ID for this filter condition */
  id: string;
  /** The field being filtered */
  field: string;
  /** The category of the field being filtered */
  fieldCategory?: string;
  /** The operator being applied */
  operator: string;
  /** The value(s) to filter by */
  value?: string | string[] | number | null;
}

/** Props for Filter component */
export interface FilterProps {
  /** Available fields that can be filtered */
  fields: FilterField[];
  /** Current filter conditions */
  value?: FilterCondition[];
  /** Callback when filters change */
  onChange?: (filters: FilterCondition[]) => void;
  /** Custom class for the container */
  className?: string;
  /** Maximum number of filters allowed */
  maxFilters?: number;
  /** Whether to show the filter count badge */
  showCount?: boolean;
  /** Whether the filter panel is open by default */
  defaultOpen?: boolean;
  /** Popover alignment relative to the trigger */
  align?: "start" | "center" | "end";
}

/** Props for FilterRow component (internal) */
export interface FilterRowProps {
  /** The filter condition to display */
  filter: FilterCondition;
  /** Available fields */
  fields: FilterField[];
  /** Callback when filter changes */
  onChange: (filter: FilterCondition) => void;
  /** Callback when filter is removed */
  onRemove: () => void;
  /** Whether this is the first row */
  isFirst?: boolean;
}

/** Props for FilterSelect component (internal) */
export interface FilterSelectProps {
  /** Current value */
  value?: string | null;
  /** Available options */
  options: FilterOptionType[];
  /** Callback when value changes */
  onChange: (value: string | null) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Minimum width */
  minWidth?: number | string;
  /** Custom className */
  className?: string;
}
