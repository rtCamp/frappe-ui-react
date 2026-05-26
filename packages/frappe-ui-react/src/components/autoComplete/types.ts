import type { Placement } from "@popperjs/core";
import type { ReactElement, ReactNode } from "react";

export type OptionValue = string | number | boolean;

export type Option = {
  label?: string;
  value?: OptionValue;
  description?: string;
  disabled?: boolean;
  image?: string;
};

export type AutocompleteOption = OptionValue | Option;

export type AutocompleteChangeValue = OptionValue | OptionValue[] | null;

export type AutocompleteChangeSelection = Option | Option[] | null;

export type AutocompleteTriggerChildrenProps = {
  displayValue: string;
  placeholder?: string;
  multiple: boolean;
  open: boolean;
  selectedOption: AutocompleteChangeSelection;
};

export type AutocompleteRenderFooterProps = {
  clearAll: () => void;
  selectAll: () => void;
  allOptionsSelected: boolean;
  selectedOption: AutocompleteChangeSelection;
};

export type AutocompleteOptionGroup = {
  group: string;
  items: AutocompleteOption[];
  hideLabel?: boolean;
};

export type AutocompleteOptions =
  | AutocompleteOption[]
  | AutocompleteOptionGroup[];

export interface AutocompleteProps {
  value: AutocompleteOption | AutocompleteOption[] | null | undefined;
  options: AutocompleteOptions | null | undefined;
  children?:
    | ReactElement
    | ((props: AutocompleteTriggerChildrenProps) => ReactElement);
  multiple?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prefix?: (args?: any) => ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  suffix?: (args?: any) => ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemPrefix?: (args?: any) => ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemSuffix?: (args?: any) => ReactNode;
  label?: string;
  placeholder?: string;
  loading?: boolean;
  hideSearch?: boolean;
  showFooter?: boolean;
  maxOptions?: number;
  searchValue?: string;
  open?: boolean;
  compareFn?: (
    a: NoInfer<Option | null> | object,
    b: NoInfer<Option | null> | object
  ) => boolean;
  placement?: Placement;
  bodyClasses?: string | string[] | { [key: string]: boolean };
  className?: string;
  labelClassName?: string;
  triggerClassName?: string;
  searchInputClassName?: string;
  listClassName?: string;
  emptyMessage?: string;
  renderFooter?: (props: AutocompleteRenderFooterProps) => ReactNode;
  onOpenChange?: (open: boolean) => void;
  onSearchChange?: (value: string) => void;
  onChange?: (
    value: AutocompleteChangeValue,
    selectedOption: AutocompleteChangeSelection
  ) => void;
}
