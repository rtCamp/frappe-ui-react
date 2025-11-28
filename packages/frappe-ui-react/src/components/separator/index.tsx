/**
 * External dependencies.
 */
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import type {
  SeparatorProps,
  SeparatorSize,
  SeparatorVariant,
  SeparatorColor,
} from "./types";

const Separator: React.FC<SeparatorProps> = ({
  size = "md",
  variant = "default",
  color = "default",
  orientation = "horizontal",
  decorative = true,
  className = "",
  ...props
}) => {
  const sizeClasses: Record<
    SeparatorSize,
    { horizontal: string; vertical: string }
  > = {
    sm: { horizontal: "h-px", vertical: "w-px" },
    md: { horizontal: "h-0.5", vertical: "w-0.5" },
    lg: { horizontal: "h-1", vertical: "w-1" },
  };

  const variantClasses: Record<SeparatorVariant, string> = {
    default: "",
    dashed: "border-dashed",
    dotted: "border-dotted",
    gradient: "bg-gradient-to-r",
  };

  const colorClasses: Record<SeparatorColor, string> = {
    default: "bg-surface-gray-3",
    gray: "bg-surface-gray-4",
    brand: "bg-surface-blue-3",
    success: "bg-surface-green-3",
    warning: "bg-surface-amber-3",
    danger: "bg-surface-red-5",
  };

  const borderColorClasses: Record<SeparatorColor, string> = {
    default: "border-outline-gray-2",
    gray: "border-outline-gray-3",
    brand: "border-outline-blue-1",
    success: "border-outline-green-1",
    warning: "border-outline-amber-1",
    danger: "border-outline-red-2",
  };

  const gradientColors: Record<SeparatorColor, string> = {
    default: "from-surface-gray-3 via-surface-gray-3 to-transparent",
    gray: "from-surface-gray-4 via-surface-gray-4 to-transparent",
    brand: "from-surface-blue-3 via-surface-blue-3 to-transparent",
    success: "from-surface-green-3 via-surface-green-3 to-transparent",
    warning: "from-surface-amber-3 via-surface-amber-3 to-transparent",
    danger: "from-surface-red-5 via-surface-red-5 to-transparent",
  };

  const baseClasses = "shrink-0";

  const dimensionClasses =
    orientation === "horizontal"
      ? `${sizeClasses[size].horizontal} w-full`
      : `${sizeClasses[size].vertical} h-full`;

  const isDashedOrDotted = variant === "dashed" || variant === "dotted";
  const isGradient = variant === "gradient";

  let backgroundClasses = "";
  let borderClasses = "";

  if (isDashedOrDotted) {
    borderClasses =
      orientation === "horizontal"
        ? `border-t ${variantClasses[variant]} ${borderColorClasses[color]}`
        : `border-l ${variantClasses[variant]} ${borderColorClasses[color]}`;
  } else if (isGradient) {
    backgroundClasses = `${variantClasses[variant]} ${gradientColors[color]}`;
  } else {
    backgroundClasses = colorClasses[color];
  }

  const separatorClasses = [
    baseClasses,
    dimensionClasses,
    backgroundClasses,
    borderClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={separatorClasses}
      {...props}
    />
  );
};

Separator.displayName = "Separator";

export default Separator;
