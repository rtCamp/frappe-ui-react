import type { ReactNode } from "react";
import { TextInputTypes } from "../../types";

export interface TextInputProps {
  type?: TextInputTypes;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'subtle' | 'outline';
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
};
