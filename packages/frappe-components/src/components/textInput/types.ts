export type TextInputTypes =
  | "text"
  | "number"
  | "email"
  | "date"
  | "datetime-local"
  | "password"
  | "search"
  | "tel"
  | "time"
  | "url";

export interface TextInputProps {
  type?: TextInputTypes;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "subtle" | "outline";
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  value?: string | number;
  debounce?: number;
  required?: boolean;
  className?: string;
  style?: React.CSSProperties;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange?: (value: string | number) => void;
}
