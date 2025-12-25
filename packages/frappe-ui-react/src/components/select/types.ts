import type { ReactNode } from "react";

export type SelectSize = "sm" | "md" | "lg" | "xl";
export type SelectVariant = "subtle" | "outline" | "ghost";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  size?: SelectSize;
  variant?: SelectVariant;
  disabled?: boolean;
  value?: SelectOption;
  placeholder?: string;
  options: SelectOption[];
  prefix?: ReactNode;
  label?: string;
  error?: string;
  onChange?: (value: SelectOption) => void;
  className?: string;
}

