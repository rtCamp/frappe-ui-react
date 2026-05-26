/**
 * Internal dependencies.
 */
import type { Placement } from "@popperjs/core";
import type {
  AutocompleteChangeValue,
  AutocompleteOption,
  AutocompleteOptionGroup,
  AutocompleteOptions,
  Option,
} from "./types";

export type InternalOption = Required<Pick<Option, "label" | "value">> &
  Omit<Option, "label" | "value">;

export type InternalOptionGroup = {
  group: string;
  hideLabel?: boolean;
  items: InternalOption[];
};

export type InternalSelection = InternalOption | InternalOption[] | null;

type PositionerSide = "top" | "right" | "bottom" | "left";
type PositionerAlign = "start" | "center" | "end";

const isPositionerSide = (value?: string): value is PositionerSide => {
  return (
    value === "top" ||
    value === "right" ||
    value === "bottom" ||
    value === "left"
  );
};

const isPositionerAlign = (value?: string): value is PositionerAlign => {
  return value === "start" || value === "center" || value === "end";
};

/**
 * Compares two option-like objects by their value key.
 */
export const defaultCompareFn = (
  a: NoInfer<Option | null> | object,
  b: NoInfer<Option | null> | object
) => {
  // @ts-expect-error Existing autocomplete consumers can pass objects with a value property.
  return a?.value === b?.value;
};

/**
 * Returns whether an autocomplete entry is an option object.
 */
export const isOption = (option: AutocompleteOption): option is Option => {
  return typeof option === "object" && option !== null && "value" in option;
};

/**
 * Returns whether an autocomplete entry is a grouped option.
 */
export const isOptionGroup = (
  option: AutocompleteOptionGroup | AutocompleteOption
): option is AutocompleteOptionGroup => {
  return (
    typeof option === "object" &&
    option !== null &&
    "items" in option &&
    "group" in option
  );
};

/**
 * Gets the display label for an autocomplete option.
 */
export const getOptionLabel = (option: AutocompleteOption | InternalOption) => {
  if (isOption(option)) {
    return option.label || String(option.value ?? "");
  }

  return String(option);
};

/**
 * Gets the raw value used to match an autocomplete option.
 */
export const getOptionValue = (option: AutocompleteOption) => {
  return isOption(option) ? option.value : option;
};

/**
 * Normalizes any option shape into the internal option model.
 */
export const sanitizeOption = (option: AutocompleteOption): InternalOption => {
  if (isOption(option)) {
    const normalizedLabel = getOptionLabel(option);

    return {
      ...option,
      label: normalizedLabel,
      value: option.value ?? normalizedLabel,
    };
  }

  return { label: String(option), value: option };
};

/**
 * Normalizes grouped and ungrouped options into grouped internal data.
 */
export const processOptions = (
  options: AutocompleteOptions | null | undefined
): InternalOptionGroup[] => {
  if (!options?.length) {
    return [];
  }

  if (isOptionGroup(options[0])) {
    return (options as AutocompleteOptionGroup[]).map((group) => ({
      group: group.group,
      hideLabel: group.hideLabel,
      items: (group.items ?? []).map(sanitizeOption),
    }));
  }

  return [
    {
      group: "",
      hideLabel: false,
      items: (options as AutocompleteOption[]).map(sanitizeOption),
    },
  ];
};

/**
 * Filters groups by query text and caps each group to maxOptions.
 */
export const filterGroups = (
  groups: InternalOptionGroup[],
  query: string,
  maxOptions: number
) => {
  const normalizedQuery = query.trim().toLowerCase();

  return groups
    .map((group) => {
      const filteredItems = normalizedQuery
        ? group.items.filter((option) => {
            return (
              option.label.toLowerCase().includes(normalizedQuery) ||
              String(option.value).toLowerCase().includes(normalizedQuery)
            );
          })
        : group.items;

      return {
        ...group,
        items: filteredItems.slice(0, maxOptions),
      };
    })
    .filter((group) => group.items.length > 0);
};

/**
 * Flattens grouped options into a single internal-options list.
 */
export const flattenGroups = (groups: InternalOptionGroup[]) => {
  return groups.flatMap((group) => group.items);
};

/**
 * Maps Popper-style placement strings onto Base UI side/align values.
 */
export const parsePlacement = (
  placement?: Placement
): {
  side: PositionerSide;
  align: PositionerAlign;
} => {
  if (!placement) {
    return { side: "bottom", align: "start" };
  }

  const [rawSide, rawAlign] = placement.split("-");
  const side = isPositionerSide(rawSide) ? rawSide : "bottom";
  const align = isPositionerAlign(rawAlign)
    ? rawAlign
    : isPositionerSide(rawSide)
      ? "center"
      : "start";

  return { side, align };
};

/**
 * Finds the matching internal option for a consumer-provided value.
 */
export const findOption = (
  options: InternalOption[],
  value: AutocompleteOption | null | undefined
) => {
  if (value === null || value === undefined) {
    return undefined;
  }

  const optionValue = getOptionValue(value);
  return options.find((option) => option.value === optionValue);
};

/**
 * Finds the matching internal option for a consumer-provided value from the selection cache.
 */
const findCachedOption = (
  selectedOptionCache: InternalSelection,
  value: AutocompleteOption
) => {
  if (Array.isArray(selectedOptionCache) || !selectedOptionCache) {
    return undefined;
  }

  return selectedOptionCache.value === getOptionValue(value)
    ? selectedOptionCache
    : undefined;
};

/**
 * Finds the matching internal option for a consumer-provided value from the selection cache when the cache is an array.
 */
const findCachedOptions = (
  selectedOptionCache: InternalSelection,
  value: AutocompleteOption
) => {
  if (!Array.isArray(selectedOptionCache)) {
    return undefined;
  }

  return selectedOptionCache.find(
    (cachedOption) => cachedOption.value === getOptionValue(value)
  );
};

/**
 * Resolves the selected internal option shape from the consumer value.
 */
export const resolveSelectedOptions = ({
  value,
  multiple,
  currentOptions,
  selectedOptionCache,
}: {
  value: AutocompleteOption | AutocompleteOption[] | null | undefined;
  multiple: boolean;
  currentOptions: InternalOption[];
  selectedOptionCache: InternalSelection;
}): InternalSelection => {
  if (value === null || value === undefined) {
    return multiple ? [] : null;
  }

  if (!multiple) {
    const nextValue = value as AutocompleteOption;

    return (
      findOption(currentOptions, nextValue) ||
      findCachedOption(selectedOptionCache, nextValue) ||
      sanitizeOption(nextValue)
    );
  }

  const values = Array.isArray(value) ? value : [];

  return values.map((nextValue) => {
    return (
      findOption(currentOptions, nextValue) ||
      findCachedOptions(selectedOptionCache, nextValue) ||
      sanitizeOption(nextValue)
    );
  });
};

/**
 * Returns the selection cache update for the next combobox selection.
 */
export const getNextSelectedOptionCache = (
  selection: InternalSelection,
  multiple: boolean
) => {
  if (multiple) {
    return Array.isArray(selection) && selection.length > 0
      ? selection
      : undefined;
  }

  return selection && !Array.isArray(selection) ? selection : undefined;
};

/**
 * Converts the selected internal option shape into the public change value.
 */
export const getEmittedValue = (
  selection: InternalSelection,
  multiple: boolean
): AutocompleteChangeValue => {
  if (multiple) {
    return Array.isArray(selection)
      ? selection.map((option) => option.value)
      : [];
  }

  return Array.isArray(selection) ? null : (selection?.value ?? null);
};

/**
 * Returns whether every current option is already selected.
 */
export const hasAllSelectedOptions = (
  currentOptions: InternalOption[],
  selectedOptions: InternalSelection,
  compareFn: (
    a: NoInfer<Option | null> | object,
    b: NoInfer<Option | null> | object
  ) => boolean
) => {
  if (!currentOptions.length || !Array.isArray(selectedOptions)) {
    return false;
  }

  return currentOptions.every((option) => {
    return selectedOptions.some((selectedOption) =>
      compareFn(selectedOption, option)
    );
  });
};
