import type { ReactNode } from "react";

export type SelectSize = "sm" | "md" | "lg" | "xl";
export type SelectVariant = "subtle" | "outline" | "ghost";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  [key: string]: any; // Allow extra props
}

export interface SelectProps {
  size?: SelectSize;
  variant?: SelectVariant;
  disabled?: boolean;
  value?: SelectOption; // Changed from string to object for Headless UI
  placeholder?: string;
  options: SelectOption[];
  prefix?: ReactNode; // Simplified prefix type
  label?: string; // Added label prop
  error?: string; // Added error prop
  onChange?: (value: SelectOption) => void;
  className?: string;
}