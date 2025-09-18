export type SimpleOption =
  | string
  | {
      label: string;
      value: string;
      icon?: React.ReactNode;
      disabled?: boolean;
    };

export type GroupedOption = { group: string; options: SimpleOption[] };
export type ComboboxOption = SimpleOption | GroupedOption;

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string | null;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (
    value: string | null,
    selectedOption?: SimpleOption | null
  ) => void;
  className?: string;
}
