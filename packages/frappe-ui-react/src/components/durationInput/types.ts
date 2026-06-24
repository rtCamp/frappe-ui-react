export type DurationInputSnapMode = "step" | "smooth";
export type DurationInputSize = "sm" | "md";
export type DurationInputVariant = "subtle" | "outline";

export interface DurationInputProps {
  label?: string;
  inlineLabel?: string;
  maxDuration?: string;
  hoursLeft?: string;
  snap?: DurationInputSnapMode;
  size?: DurationInputSize;
  variant?: DurationInputVariant;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  value: string;
  onChange: (value: string) => void;
}
