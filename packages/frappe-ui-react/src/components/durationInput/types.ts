export type DurationInputSnapMode = "step" | "smooth";
export type DurationInputSize = "sm" | "md";
export type DurationInputVariant = "subtle" | "outline";

export interface DurationInputClassNames {
  /** Class for the root wrapper. */
  root?: string;
  /** Class for the top header row that holds the label and hours-left text. */
  header?: string;
  /** Class for the top label element. */
  label?: string;
  /** Class for the hours-left or over-state text. */
  hoursLeft?: string;
  /** Class for the slider control wrapper. */
  control?: string;
  /** Class for the slider track. */
  track?: string;
  /** Class for the filled slider indicator. */
  indicator?: string;
  /** Class for the slider thumb. */
  thumb?: string;
  /** Class for the inline label shown inside the track. */
  inlineLabel?: string;
  /** Class for the loading spinner. */
  spinner?: string;
  /** Class for the text input. */
  input?: string;
}

export interface DurationInputProps {
  label?: string | false;
  inlineLabel?: string;
  maxDuration?: string;
  hoursLeft?: string;
  snap?: DurationInputSnapMode;
  size?: DurationInputSize;
  variant?: DurationInputVariant;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  className?: string;
  classNames?: DurationInputClassNames;
  value: string;
  onChange: (value: string) => void;
}
