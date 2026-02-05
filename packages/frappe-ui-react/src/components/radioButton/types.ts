export interface RadioButtonOption {
  label?: string;
  value: string;
  disabled?: boolean;
}

export interface RadioButtonProps {
  options: RadioButtonOption[];
  size?: "sm" | "md";
  flow?: "column" | "row";
  disabled?: boolean;
  className?: string;
  value?: string | null;
  onChange?: (value: string | null) => void;
}
