export type LabelSize = "sm" | "md" | "lg";
export type LabelWeight = "normal" | "medium" | "semibold" | "bold";
export type LabelVariant = "default" | "required" | "optional";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: LabelSize;
  weight?: LabelWeight;
  variant?: LabelVariant;
  disabled?: boolean;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
}
