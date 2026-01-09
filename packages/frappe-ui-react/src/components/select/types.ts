import type { ReactNode } from "react";

export type SelectSize = "sm" | "md" | "lg";
export type SelectVariant = "subtle" | "outline" | "ghost";
export type SelectState = "success" | "warning" | "error";

export interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  size?: SelectSize;
  variant?: SelectVariant;
  state?: SelectState;
  loading?: boolean;
  disabled?: boolean;
  value?: SelectOption;
  placeholder?: string;
  options: SelectOption[];
  prefix?: ReactNode;
  suffix?: ReactNode;
  onChange?: (value: SelectOption) => void;
  className?: string;
}
