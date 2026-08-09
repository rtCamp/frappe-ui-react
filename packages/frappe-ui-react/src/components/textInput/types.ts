import type { KeyboardEventHandler, MouseEventHandler, ReactNode } from "react";
import type { TextInputTypes } from "../../common/types";

// Only these input types honor min/max/step per the HTML spec.
type SteppableInputTypes = Extract<
  TextInputTypes,
  "number" | "range" | "date" | "month" | "week" | "time" | "datetime-local"
>;

export interface TextInputBaseProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "subtle" | "outline" | "ghost";
  placeholder?: string;
  disabled?: boolean;
  htmlId?: string;
  value?: string | number;
  debounce?: number;
  required?: boolean;
  readOnly?: boolean;
  tabIndex?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onMouseDown?: MouseEventHandler<HTMLInputElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prefix?: (args?: any) => ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  suffix?: (args?: any) => ReactNode;
  className?: string;
  inputClassName?: string;
  style?: Record<string, string | number | boolean>;
}

type TextInputTypeProps =
  | {
      type: SteppableInputTypes;
      min?: string | number;
      max?: string | number;
      step?: string | number;
    }
  | { type?: Exclude<TextInputTypes, SteppableInputTypes> };

export type TextInputProps = TextInputBaseProps & TextInputTypeProps;
