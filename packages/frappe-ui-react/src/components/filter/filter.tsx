import { useState, useCallback } from "react";
import { ListFilter, Plus } from "lucide-react";
import { Popover } from "@base-ui/react/popover";
import { Button } from "../button";
import { FilterRow } from "./filterRow";
import type { FilterProps, FilterCondition } from "./types";
import { cn } from "../../utils";

let filterIdCounter = 0;
const generateFilterId = () => `filter-${++filterIdCounter}-${Date.now()}`;

export const Filter: React.FC<FilterProps> = ({
  fields,
  value = [],
  onChange,
  className,
  maxFilters = 10,
  showCount = true,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Get the active filter count
  const filterCount = value.length;
  const hasFilters = filterCount > 0;

  // Create a new empty filter
  const createEmptyFilter = useCallback((): FilterCondition => {
    const firstField = fields[0];
    return {
      id: generateFilterId(),
      field: firstField?.name || "",
      operator: "is",
      value: null,
    };
  }, [fields]);

  // Add a new filter
  const handleAddFilter = useCallback(() => {
    if (value.length >= maxFilters) return;

    const newFilter = createEmptyFilter();
    onChange?.([...value, newFilter]);
  }, [value, maxFilters, createEmptyFilter, onChange]);

  // Update a filter
  const handleFilterChange = useCallback(
    (index: number, updatedFilter: FilterCondition) => {
      const newFilters = [...value];
      newFilters[index] = updatedFilter;
      onChange?.(newFilters);
    },
    [value, onChange]
  );

  // Remove a filter
  const handleRemoveFilter = useCallback(
    (index: number) => {
      const newFilters = value.filter((_, i) => i !== index);
      onChange?.(newFilters);
    },
    [value, onChange]
  );

  // Clear all filters
  const handleClearAll = useCallback(() => {
    onChange?.([]);
  }, [onChange]);

  // Handle popover open - add initial filter if empty
  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (open && value.length === 0) {
        handleAddFilter();
      }
    },
    [value.length, handleAddFilter]
  );

  return (
    <div className={cn("inline-flex items-center ", className)}>
      <Popover.Root open={isOpen} onOpenChange={handleOpenChange}>
        <Popover.Trigger
          render={
            <Button
              size="sm"
              iconLeft={() => (
                <ListFilter size={16} className="text-ink-gray-7" />
              )}
              className={cn(" bg-red-200", {
                "rounded-r-none": hasFilters,
              })}
            >
              Filter
              {showCount && hasFilters && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-white rounded-sm shadow-xl">
                  {filterCount}
                </span>
              )}
            </Button>
          }
        />

        <Popover.Portal>
          <Popover.Positioner sideOffset={4}>
            <Popover.Popup
              className={`
                bg-surface-modal border border-outline-gray-1 rounded-lg shadow-xl
                p-3 min-w-100 max-w-150 animate-fade-in z-100
              `}
            >
              <div className="space-y-1">
                {value.map((filter, index) => (
                  <FilterRow
                    key={filter.id}
                    filter={filter}
                    fields={fields}
                    onChange={(updated) => handleFilterChange(index, updated)}
                    onRemove={() => handleRemoveFilter(index)}
                    isFirst={index === 0}
                  />
                ))}
              </div>

              {/* Add filter button */}
              {value.length < maxFilters && (
                <button
                  onClick={handleAddFilter}
                  className={`
                    flex items-center gap-1.5 text-sm text-ink-gray-5 
                    hover:text-ink-gray-7 mt-2 py-1 transition-colors
                  `}
                >
                  <Plus className="h-4 w-4" />
                  Add filter
                </button>
              )}
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>

      {/* Clear all button (shown when filters exist) */}
      {hasFilters && (
        <Button
          icon="x"
          size="sm"
          onClick={handleClearAll}
          className="rounded-l-none border-l-0"
          aria-label="Clear all filters"
        />
      )}
    </div>
  );
};

export default Filter;
