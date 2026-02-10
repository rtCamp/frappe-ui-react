import type { ReactNode } from "react";

export interface MultiSelectOption {
  id?: string | number;
  label: string;
  value: string;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface MultiSelectProps {
  value?: string[];
  options: MultiSelectOption[];
  placeholder?: string;
  hideSearch?: boolean;
  loading?: boolean;
  compareFn?: (
    a: NoInfer<MultiSelectOption | null>,
    b: NoInfer<MultiSelectOption | null>
  ) => boolean;
  onChange?: (value: string[]) => void;
  renderOption?: (option: MultiSelectOption) => ReactNode;
  renderFooter?: (props: {
    clearAll: () => void;
    selectAll: () => void;
  }) => ReactNode;
}
