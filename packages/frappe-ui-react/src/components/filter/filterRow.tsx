import { useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "../button";
import { DatePicker, DateRangePicker } from "../datePicker";
import { FilterSelect } from "./filterSelect";
import { cn } from "../../utils";
import type {
  FilterRowProps,
  FilterOperatorOption,
  FilterSelectOption,
} from "./types";

const DEFAULT_OPERATORS: Record<string, FilterOperatorOption[]> = {
  string: [
    { label: "Equals", value: "=" },
    { label: "Not Equals", value: "!=" },
    { label: "Like", value: "like" },
    { label: "Not Like", value: "not like" },
  ],
  number: [
    { label: "Greater Than", value: ">" },
    { label: "Less Than", value: "<" },
    { label: "Less Than or Equal To", value: "<=" },
    { label: "Greater Than or Equal To", value: ">=" },
    { label: "Equals", value: "=" },
    { label: "Not Equals", value: "!=" },
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
  daterange: [{ label: "Between", value: "between" }],
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
      fieldCategory: newField?.fieldCategory,
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

  const handleValueChange = (value: string | string[] | null) => {
    onChange({
      ...filter,
      value,
    });
  };

  return (
    <div className="flex gap-2 items-center py-1">
      {/* Where / And label */}
      <span className="w-12 text-sm text-ink-gray-7 shrink-0 px-2 py-1.5">
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

      {/* Value selector */}
      {(() => {
        if (hideValue) {
          return null;
        } else if (selectedField?.type === "date") {
          return (
            <DatePicker
              value={typeof filter.value === "string" ? filter.value : ""}
              onChange={(v) =>
                handleValueChange(
                  v === "" ? null : typeof v === "string" ? v : null
                )
              }
            >
              {({ displayValue }) => (
                <DatePickerTrigger
                  displayValue={displayValue}
                  disabled={!filter.operator}
                />
              )}
            </DatePicker>
          );
        } else if (selectedField?.type === "daterange") {
          return (
            <DateRangePicker
              value={Array.isArray(filter.value) ? filter.value : []}
              onChange={(v) => {
                if (Array.isArray(v) && v.length === 2 && !v[0] && !v[1]) {
                  handleValueChange(null);
                } else {
                  handleValueChange(v);
                }
              }}
            >
              {({ displayValue }) => (
                <DatePickerTrigger
                  displayValue={displayValue}
                  disabled={!filter.operator}
                  minWidth={180}
                />
              )}
            </DateRangePicker>
          );
        } else if (valueOptions.length > 0) {
          return (
            <FilterSelect
              value={typeof filter.value === "string" ? filter.value : null}
              options={valueOptions}
              onChange={handleValueChange}
              placeholder="Value"
              minWidth={140}
              disabled={!filter.operator}
            />
          );
        } else {
          return (
            <input
              type={selectedField?.type === "number" ? "number" : "text"}
              value={filter.value?.toString() ?? ""}
              onChange={(e) => handleValueChange(e.target.value || null)}
              placeholder="Value"
              disabled={!filter.operator}
              className={cn(
                "rounded border-none min-w-35 bg-surface-gray-2",
                "px-2 py-1 text-base min-h-7",
                "placeholder-ink-gray-4 text-ink-gray-8",
                "outline-none focus:ring-2 focus:ring-outline-gray-3",
                "transition-colors",
                "disabled:bg-surface-gray-1 disabled:text-ink-gray-5"
              )}
            />
          );
        }
      })()}

      {/* Remove button */}
      <Button
        icon="x"
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="text-ink-gray-7 hover:text-ink-gray-6 shrink-0"
        aria-label="Remove filter"
      />
    </div>
  );
};

interface DatePickerTriggerProps {
  displayValue: string;
  disabled?: boolean;
  minWidth?: number;
}

const DatePickerTrigger: React.FC<DatePickerTriggerProps> = ({
  displayValue,
  disabled,
  minWidth = 140,
}) => (
  <div className="relative" style={{ minWidth }}>
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "w-full rounded border-none bg-surface-gray-2",
        "py-1 pr-6 pl-2 text-base text-left min-h-7",
        "outline-none focus:ring-2 focus:ring-outline-gray-3",
        "transition-colors cursor-pointer",
        "truncate disabled:bg-surface-gray-1 disabled:text-ink-gray-5",
        displayValue ? "text-ink-gray-8" : "text-ink-gray-4"
      )}
    >
      {displayValue || "Value"}
    </button>
    <span className="absolute inset-y-0 right-0 flex items-center pr-1.5 text-ink-gray-4 pointer-events-none">
      <ChevronDown className="w-4 h-4" />
    </span>
  </div>
);

export default FilterRow;
