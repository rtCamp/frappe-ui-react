import React, { useMemo } from "react";

import type { BadgeProps } from "./types";

const Badge: React.FC<BadgeProps> = ({
  theme = "gray",
  size = "md",
  variant = "subtle",
  label,
  children,
  prefix,
  suffix,
}) => {
  const classes = useMemo(() => {
    const solidClasses = {
      gray: "text-ink-white bg-surface-gray-7",
      blue: "text-ink-blue-1 bg-surface-blue-2",
      green: "text-ink-green-1 bg-surface-green-3",
      orange: "text-ink-amber-1 bg-surface-amber-2",
      red: "text-ink-red-1 bg-surface-red-4",
    };

    const subtleClasses = {
      gray: "text-ink-gray-6 bg-surface-gray-2",
      blue: "text-ink-blue-2 bg-surface-blue-1",
      green: "text-ink-green-3 bg-surface-green-2",
      orange: "text-ink-amber-3 bg-surface-amber-1",
      red: "text-ink-red-4 bg-surface-red-1",
    };

    const outlineClasses = {
      gray: "text-ink-gray-6 bg-transparent border border-outline-gray-1",
      blue: "text-ink-blue-2 bg-transparent border border-outline-blue-1",
      green: "text-ink-green-3 bg-transparent border border-outline-green-2",
      orange: "text-ink-amber-3 bg-transparent border border-outline-amber-2",
      red: "text-ink-red-4 bg-transparent border border-outline-red-2",
    };

    const ghostClasses = {
      gray: "text-ink-gray-6 bg-transparent",
      blue: "text-ink-blue-2 bg-transparent",
      green: "text-ink-green-3 bg-transparent",
      orange: "text-ink-amber-3 bg-transparent",
      red: "text-ink-red-4 bg-transparent",
    };

    const variantClasses = {
      subtle: subtleClasses[theme],
      solid: solidClasses[theme],
      outline: outlineClasses[theme],
      ghost: ghostClasses[theme],
    };

    const sizeClasses = {
      sm: "h-4 text-xs px-1.5",
      md: "h-5 text-xs px-1.5",
      lg: "h-6 text-sm px-2",
    };

    return [variantClasses[variant], sizeClasses[size]].join(" ");
  }, [theme, size, variant]);

  return (
    <div
      className={`inline-flex select-none items-center gap-1 rounded-full ${classes}`}
    >
      {prefix && (
        <div className={size === "lg" ? "max-h-6" : "max-h-4"}>{prefix}</div>
      )}
      {children || label?.toString()}
      {suffix && (
        <div className={size === "lg" ? "max-h-6" : "max-h-4"}>{suffix}</div>
      )}
    </div>
  );
};

export default Badge;
