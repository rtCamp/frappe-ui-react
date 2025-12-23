export type SeparatorSize = "sm" | "md" | "lg";
export type SeparatorVariant = "default" | "dashed" | "dotted" | "gradient";
export type SeparatorColor =
  | "default"
  | "gray"
  | "brand"
  | "success"
  | "warning"
  | "danger";

export interface SeparatorProps {
  size?: SeparatorSize;
  variant?: SeparatorVariant;
  color?: SeparatorColor;
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  className?: string;
  [key: string]: unknown;
}
