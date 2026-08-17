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
  /** Label displayed above the input. */
  label?: string | false;
  /** If true, appends a required-field asterisk to the label. */
  required?: boolean;
  /** Label displayed inside the input. */
  inlineLabel?: string;
  /** Maximum allowed duration in hours. */
  maxDuration?: number;
  /** Remaining time used to calculate left or over state, in hours. */
  hoursLeft?: number;
  /** Controls whether the slider snaps continuously or moves smoothly. */
  snap?: DurationInputSnapMode;
  /** Height of the duration input. */
  size?: DurationInputSize;
  /** Visual style of the duration input. */
  variant?: DurationInputVariant;
  /** If true, disables the slider and text input. */
  disabled?: boolean;
  /** If true, shows a spinner before the input value. */
  loading?: boolean;
  /** If true, applies error styling. */
  error?: boolean;
  /** Allows manual text input to exceed maxDuration while keeping the slider capped. */
  allowOverflow?: boolean;
  /** Class applied to the root wrapper. */
  className?: string;
  /** Per-slot class overrides for the duration input internals. */
  classNames?: DurationInputClassNames;
  /** Current duration value in hours. */
  value: number;
  /** Callback fired with the new duration value in hours. */
  onChange: (value: number) => void;
}
