import type { ReactNode } from "react";
import { TextInputTypes } from "../../common/types";

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'onChange'> {
  type?: TextInputTypes;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "subtle" | "outline" | "ghost";
  placeholder?: string;
  disabled?: boolean;
  htmlId?: string;
  value?: string | number;
  debounce?: number;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prefix?: (args?: any) => ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  suffix?: (args?: any) => ReactNode;
  className?: string;
  style?: Record<string, string | number | boolean>;
}
