export interface RadioButtonOption {
  label?: string;
  value: string;
  disabled?: boolean;
}

export interface RadioButtonProps {
  options: RadioButtonOption[];
  size?: "sm" | "md";
  flow?: "row" | "column";
  className?: string;
  value?: string | null;
  onChange?: (
    value: string | null,
    selectedOption?: RadioButtonOption | null
  ) => void;
}
