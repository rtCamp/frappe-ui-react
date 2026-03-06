import { useMemo } from "react";
import { Button } from "../button";
import { FilterSelect } from "./filterSelect";
import type {
  FilterRowProps,
  FilterOperatorOption,
  FilterSelectOption,
} from "./types";

const DEFAULT_OPERATORS: Record<string, FilterOperatorOption[]> = {
  string: [
    { label: "is", value: "is" },
    { label: "is not", value: "is_not" },
    { label: "contains", value: "contains" },
    { label: "does not contain", value: "not_contains" },
    { label: "starts with", value: "starts_with" },
    { label: "ends with", value: "ends_with" },
    { label: "is empty", value: "is_empty", hideValue: true },
    { label: "is not empty", value: "is_not_empty", hideValue: true },
  ],
  number: [
    { label: "=", value: "is" },
    { label: "≠", value: "is_not" },
    { label: ">", value: "greater_than" },
    { label: "<", value: "less_than" },
    { label: "is empty", value: "is_empty", hideValue: true },
    { label: "is not empty", value: "is_not_empty", hideValue: true },
  ],
  select: [
    { label: "is", value: "is" },
    { label: "is not", value: "is_not" },
    { label: "is empty", value: "is_empty", hideValue: true },
    { label: "is not empty", value: "is_not_empty", hideValue: true },
  ],
  date: [
    { label: "is", value: "is" },
    { label: "is before", value: "less_than" },
    { label: "is after", value: "greater_than" },
    { label: "is empty", value: "is_empty", hideValue: true },
    { label: "is not empty", value: "is_not_empty", hideValue: true },
  ],
  default: [
    { label: "is", value: "is" },
    { label: "is not", value: "is_not" },
  ],
};

export const FilterRow: React.FC<FilterRowProps> = ({
  filter,
  fields,
  onChange,
  onRemove,
  isFirst = false,
}) => {
  // Get the selected field
  const selectedField = useMemo(() => {
    return fields.find((f) => f.name === filter.field) || null;
  }, [fields, filter.field]);

  // Get operators for the selected field
  const operators = useMemo((): FilterOperatorOption[] => {
    if (selectedField?.operators) {
      return selectedField.operators;
    }
    const fieldType = selectedField?.type || "string";
    return DEFAULT_OPERATORS[fieldType] || DEFAULT_OPERATORS.default;
  }, [selectedField]);

  // Get the selected operator
  const selectedOperator = useMemo(() => {
    return operators.find((op) => op.value === filter.operator) || null;
  }, [operators, filter.operator]);

  // Check if value should be hidden (e.g., for "is_empty" operator)
  const hideValue = selectedOperator?.hideValue ?? false;

  // Field options for the dropdown
  const fieldOptions: FilterSelectOption[] = useMemo(() => {
    return fields.map((f) => ({
      label: f.label,
      value: f.name,
      icon: f.icon,
    }));
  }, [fields]);

  // Operator options for the dropdown
  const operatorOptions: FilterSelectOption[] = useMemo(() => {
    return operators.map((op) => ({
      label: op.label,
      value: op.value,
    }));
  }, [operators]);

  // Value options for select-type fields
  const valueOptions = useMemo(() => {
    if (selectedField?.options) {
      return selectedField.options;
    }
    return [];
  }, [selectedField]);

  const handleFieldChange = (value: string | null) => {
    if (!value) return;

    const newField = fields.find((f) => f.name === value);
    const newFieldType = newField?.type || "string";
    const newOperators =
      newField?.operators ||
      DEFAULT_OPERATORS[newFieldType] ||
      DEFAULT_OPERATORS.default;
    const firstOperator = newOperators[0]?.value || "is";

    onChange({
      ...filter,
      field: value,
      operator: firstOperator,
      value: null,
    });
  };

  const handleOperatorChange = (value: string | null) => {
    if (!value) return;

    const newOperator = operators.find((op) => op.value === value);
    onChange({
      ...filter,
      operator: value,
      // Clear value if new operator hides it
      value: newOperator?.hideValue ? null : filter.value,
    });
  };

  const handleValueChange = (value: string | null) => {
    onChange({
      ...filter,
      value,
    });
  };

  return (
    <div className="flex items-center gap-2 py-1">
      {/* Where / And label */}
      <span className="text-ink-gray-5 text-sm w-12 shrink-0">
        {isFirst ? "Where" : "And"}
      </span>

      {/* Field selector */}
      <FilterSelect
        value={filter.field}
        options={fieldOptions}
        onChange={handleFieldChange}
        placeholder="Field"
        minWidth={120}
      />

      {/* Operator selector */}
      <FilterSelect
        value={filter.operator}
        options={operatorOptions}
        onChange={handleOperatorChange}
        placeholder="Operator"
        minWidth={80}
        disabled={!filter.field}
      />

      {/* Value selector (only if not hidden) */}
      {!hideValue &&
        (valueOptions.length > 0 ? (
          <FilterSelect
            value={typeof filter.value === "string" ? filter.value : null}
            options={valueOptions}
            onChange={handleValueChange}
            placeholder="Value"
            minWidth={140}
            disabled={!filter.operator}
          />
        ) : (
          <input
            type={selectedField?.type === "number" ? "number" : "text"}
            value={filter.value?.toString() ?? ""}
            onChange={(e) => handleValueChange(e.target.value || null)}
            placeholder="Value"
            disabled={!filter.operator}
            className={`
              min-w-35 bg-surface-gray-2 border-none rounded
              px-2 py-1 min-h-7 text-base
              placeholder-ink-gray-4 text-ink-gray-8
              outline-none focus:ring-2 focus:ring-outline-gray-3
              transition-colors
              disabled:bg-surface-gray-1 disabled:text-ink-gray-5
            `}
          />
        ))}

      {/* Remove button */}
      <Button
        icon="x"
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="text-ink-gray-4 hover:text-ink-gray-6 shrink-0"
        aria-label="Remove filter"
      />
    </div>
  );
};

export default FilterRow;
