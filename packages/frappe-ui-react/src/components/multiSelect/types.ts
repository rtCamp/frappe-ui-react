import type { ReactNode } from "react";

export interface MultiSelectOption {
  id?: string | number;
  label: string;
  value: string;
  disabled?: boolean;
  [key: string]: string | number | boolean | object | undefined;
}

export interface MultiSelectProps {
  value?: string[];
  options: MultiSelectOption[];
  placeholder?: string;
  hideSearch?: boolean;
  loading?: boolean;
  /**
   * Custom comparison function to determine if an option is selected.
   * By default, it compares the `value` property of the options.
   */
  compareFn?: (
    a: NoInfer<MultiSelectOption | null>,
    b: NoInfer<MultiSelectOption | null>
  ) => boolean;
  onChange?: (value: string[]) => void;
  /**
   * Custom render function for each option in the dropdown.
   * Receives the option object as a parameter and should return a ReactNode.
   * If not provided, the component will render the option's label by default.
   *
   * This can be used to customize the appearance of options.
   * Example usage:
   * ```
   * renderOption={(option) => (
   *   <div className="flex items-center gap-2">
   *     <Avatar name={option.label} size="xs" />
   *     <span>{option.label}</span>
   *   </div>
   * )}
   * ```
   */
  renderOption?: (option: MultiSelectOption) => ReactNode;
  /**
   * Custom render function for the dropdown footer.
   * Receives an object with `clearAll` and `selectAll` functions as parameters.
   * Should return a ReactNode to be rendered in the footer of the dropdown.
   *
   * This can be used to add additional actions or information at the bottom of the options list.
   * Example usage:
   * ```
   * renderFooter={({ clearAll, selectAll }) => (
   *   <div className="flex justify-end gap-2">
   *     <Button variant="text" onClick={clearAll}>Clear All</Button>
   *     <Button variant="text" onClick={selectAll}>Select All</Button>
   *   </div>
   * )}
   * ```
   */
  renderFooter?: (props: {
    clearAll: () => void;
    selectAll: () => void;
  }) => ReactNode;
}
