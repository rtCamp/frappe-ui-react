/**
 * External dependencies.
 */
import React from "react";

/**
 * Internal dependencies.
 */
import type { BadgeProps } from "./types";
import { badgeVariants } from "./variants";
import { cn } from "../../utils";

const Badge: React.FC<BadgeProps> = ({
  theme = "gray",
  size = "md",
  variant = "subtle",
  label,
  children,
  prefix,
  suffix,
  className,
}) => {
  return (
    <div className={cn(badgeVariants({ theme, size, variant }), className)}>
      {prefix && (
        <div className={cn(size === "lg" ? "max-h-6" : "max-h-4")}>
          {prefix}
        </div>
      )}
      {children || label?.toString()}
      {suffix && (
        <div className={cn(size === "lg" ? "max-h-6" : "max-h-4")}>
          {suffix}
        </div>
      )}
    </div>
  );
};

export default Badge;
