export type RatingProps = {
  value?: number;
  ratingFrom?: number;
  size?: "sm" | "md" | "lg" | "xl";
  readonly?: boolean;
  label?: string;
  className?: string;
  onChange?: (value: number) => void;
};
