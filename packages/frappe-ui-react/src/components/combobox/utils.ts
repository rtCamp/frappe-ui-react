/**
 * Internal dependencies.
 */
import type {
  ComboboxOption as ComboboxItem,
  GroupedOption,
  SimpleOption,
} from "./types";

/**
 * Gets the display label for a simple option.
 */
export const getLabel = (option: SimpleOption) =>
  typeof option === "string" ? option : option.label;

/**
 * Gets the value key for a simple option.
 */
export const getValue = (option: SimpleOption) =>
  typeof option === "string" ? option : option.value;

/**
 * Returns whether a simple option is disabled.
 */
export const isDisabled = (option: SimpleOption) =>
  typeof option === "object" && !!option.disabled;

/**
 * Gets the icon node for a simple option if present.
 */
export const getIcon = (option: SimpleOption) =>
  typeof option === "object" ? option.icon : undefined;

/**
 * Gets the description text for a simple option if present.
 */
export const getDescription = (option: SimpleOption) =>
  typeof option === "object" ? option.description : undefined;

/**
 * Returns whether a combobox option is a grouped option.
 */
export const isGroupedOption = (
  option: ComboboxItem
): option is GroupedOption => typeof option === "object" && "group" in option;

/**
 * Flattens grouped and ungrouped options into a single simple-options array.
 */
export const flattenOptions = (options: ComboboxItem[]) => {
  const flat: SimpleOption[] = [];

  options.forEach((option) => {
    if (isGroupedOption(option)) {
      flat.push(...option.options);
      return;
    }

    flat.push(option);
  });

  return flat;
};

/**
 * Filters options by query text and removes empty groups after filtering.
 */
export const filterOptions = (options: ComboboxItem[], query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return options;
  }

  return options
    .map((option) => {
      if (!isGroupedOption(option)) {
        return option;
      }

      return {
        ...option,
        options: option.options.filter((groupedOption) =>
          getLabel(groupedOption).toLowerCase().includes(normalizedQuery)
        ),
      };
    })
    .filter((option) =>
      isGroupedOption(option)
        ? option.options.length > 0
        : getLabel(option).toLowerCase().includes(normalizedQuery)
    );
};
