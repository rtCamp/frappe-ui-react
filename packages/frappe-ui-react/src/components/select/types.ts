import type { ReactNode } from "react";

export type SelectSize = "sm" | "md" | "lg";
export type SelectVariant = "subtle" | "outline" | "ghost";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  size?: SelectSize;
  variant?: SelectVariant;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  value?: string;
  options: SelectOption[];
  className?: string;
  prefix?: () => ReactNode;
  suffix?: () => ReactNode;
  option?: ({ option }: { option: SelectOption }) => ReactNode;
  onChange?: (value: string | undefined) => void;
}
