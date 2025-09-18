export type ProgressProps = {
  value: number;
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  hint?: React.ReactNode;
  intervals?: boolean;
  intervalCount?: number;
  className?: string;
};
