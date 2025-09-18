import type { Placement } from "@popperjs/core";
import type { ReactNode } from "react";

export type OptionValue = string | number | boolean;

export type Option = {
  label: string;
  value: OptionValue;
  description?: string;
  disabled?: boolean;
  image?: string;
};

export type AutocompleteOption = OptionValue | Option;

export type AutocompleteOptionGroup = {
  group: string;
  items: AutocompleteOption[];
  hideLabel?: boolean;
};

export type AutocompleteOptions = AutocompleteOption[] | AutocompleteOptionGroup[];

export interface AutocompleteProps {
  value: AutocompleteOption | AutocompleteOption[] | null | undefined;
  options: AutocompleteOptions;
  multiple?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prefix?: ((args?: any) => ReactNode);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  suffix?: ((args?: any) => ReactNode);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemPrefix?: ((args?: any) => ReactNode);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemSuffix?: ((args?: any) => ReactNode);
  label?: string;
  placeholder?: string;
  loading?: boolean;
  hideSearch?: boolean;
  showFooter?: boolean;
  maxOptions?: number;
  compareFn?: (a: Option, b: Option) => boolean;
  placement?: Placement;
  bodyClasses?: string | string[] | { [key: string]: boolean };
  onChange?: (
    value: AutocompleteOption | AutocompleteOption[] | null | undefined
  ) => void;
}