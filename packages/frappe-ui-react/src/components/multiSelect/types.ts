import type { ReactNode } from "react";

export interface MultiSelectOption {
  id?: string | number;
  label: string;
  value: string;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface MultiSelectProps {
  /** Array of selected values */
  value?: string[];
  /** Array of options to display in the dropdown */
  options: MultiSelectOption[];
  /** Placeholder text when no options are selected */
  placeholder?: string;
  /** Fixed label always shown in the trigger button, overriding the selected values summary */
  triggerLabel?: string;
  /** Additional class names for the trigger button */
  triggerClassName?: string;
  /** Hide the search input in the dropdown */
  hideSearch?: boolean;
  /** Controlled open state for the popup */
  open?: boolean;
  /** Show loading indicator */
  loading?: boolean;
  /** Called when the popup open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Custom comparison function for option equality */
  compareFn?: (
    a: NoInfer<MultiSelectOption | null>,
    b: NoInfer<MultiSelectOption | null>
  ) => boolean;
  /** Callback when selection changes */
  onChange?: (value: string[]) => void;
  /** Custom render function for each option */
  renderOption?: (option: MultiSelectOption) => ReactNode;
  /** Custom render function for the footer */
  renderFooter?: (props: {
    clearAll: () => void;
    selectAll: () => void;
  }) => ReactNode;
  /** Additional class names for the popup */
  popupClassName?: string;
}
