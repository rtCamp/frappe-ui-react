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
  placeholder?: string;
  disabled?: boolean;
  htmlId?: string;
  value?: string;
  options: (string | SelectOption)[];
  className?: string;
  placeholderClassName?: string;
  matchTriggerWidth?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prefix?: (args?: any) => ReactNode;
  suffix?: () => ReactNode;
  option?: ({ option }: { option: SelectOption }) => ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
