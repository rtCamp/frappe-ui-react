import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import type { LabelProps, LabelSize, LabelWeight } from "./types";

const Label: React.FC<LabelProps> = ({
  size = "md",
  weight = "medium",
  variant = "default",
  disabled = false,
  required = false,
  optional = false,
  children,
  className = "",
  ...props
}) => {
  const sizeClasses: Record<LabelSize, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const weightClasses: Record<LabelWeight, string> = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const baseClasses = "select-none";

  const colorClasses = disabled ? "text-ink-gray-4" : "text-ink-gray-8";

  const labelClasses = [
    baseClasses,
    sizeClasses[size],
    weightClasses[weight],
    colorClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const showRequired = required || variant === "required";
  const showOptional = optional || variant === "optional";

  return (
    <LabelPrimitive.Root className={labelClasses} {...props}>
      {children}
      {showRequired && (
        <span className="text-ink-red-4 ml-1" aria-label="required">
          *
        </span>
      )}
      {showOptional && (
        <span className="text-ink-gray-5 ml-1 text-sm">(optional)</span>
      )}
    </LabelPrimitive.Root>
  );
};

Label.displayName = "Label";

export default Label;
