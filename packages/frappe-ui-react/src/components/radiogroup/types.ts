export type RadioGroupSize = "sm" | "md" | "lg";
export type RadioGroupTheme = "gray" | "blue" | "green" | "red";
export type RadioGroupVariant = "default" | "card";

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
  description?: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: RadioGroupSize;
  theme?: RadioGroupTheme;
  variant?: RadioGroupVariant;
  disabled?: boolean;
  className?: string;
  name?: string;
  orientation?: "horizontal" | "vertical";
}
