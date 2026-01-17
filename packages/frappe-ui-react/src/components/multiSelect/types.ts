import type { ReactNode } from "react";

export interface MultiSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  value?: string[];
  options: MultiSelectOption[];
  placeholder?: string;
  hideSearch?: boolean;
  loading?: boolean;
  compareFn?: (
    a: NoInfer<MultiSelectOption | null> | object,
    b: NoInfer<MultiSelectOption | null> | object
  ) => boolean;
  onChange?: (value: string[]) => void;
  renderOption?: (option: MultiSelectOption) => ReactNode;
  renderFooter?: (props: {
    clearAll: () => void;
    selectAll: () => void;
  }) => ReactNode;
}
