import React from "react";

import FeatherIcon, { FeatherIconProps } from "../featherIcon";
import LoadingIndicator from "../loadingIndicator";
import { ButtonProps, ButtonThemeVariant } from "./types";

const Button = ({
  theme = "gray",
  size = "sm",
  variant = "subtle",
  label,
  icon,
  iconLeft,
  iconRight,
  loading = false,
  loadingText,
  disabled = false,
  link,
  children,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  const isIconButton = Boolean(icon);
  const isDisabled = disabled || loading;

  // Theme-based classes
  const solidClasses = {
    gray: "text-ink-white bg-surface-gray-7 hover:bg-surface-gray-6 active:bg-surface-gray-5",
    blue: "text-ink-white bg-blue-500 hover:bg-surface-blue-3 active:bg-blue-700",
    green:
      "text-ink-white bg-surface-green-3 hover:bg-green-700 active:bg-green-800",
    red: "text-ink-white bg-surface-red-5 hover:bg-surface-red-6 active:bg-surface-red-7",
  }[theme];

  const subtleClasses = {
    gray: "text-ink-gray-8 bg-surface-gray-2 hover:bg-surface-gray-3 active:bg-surface-gray-4",
    blue: "text-ink-blue-3 bg-surface-blue-2 hover:bg-blue-200 active:bg-blue-300",
    green:
      "text-green-800 bg-surface-green-2 hover:bg-green-200 active:bg-green-300",
    red: "text-red-700 bg-surface-red-2 hover:bg-surface-red-3 active:bg-surface-red-4",
  }[theme];

  const outlineClasses = {
    gray: "text-ink-gray-8 bg-surface-white border border-outline-gray-2 hover:border-outline-gray-3 active:border-outline-gray-3 active:bg-surface-gray-4",
    blue: "text-ink-blue-3 bg-surface-white border border-outline-blue-1 hover:border-blue-400 active:border-blue-400 active:bg-blue-300",
    green:
      "text-green-800 bg-surface-white border border-outline-green-2 hover:border-green-500 active:border-green-500 active:bg-green-300",
    red: "text-red-700 bg-surface-white border border-outline-red-1 hover:border-outline-red-2 active:border-outline-red-2 active:bg-surface-red-3",
  }[theme];

  const ghostClasses = {
    gray: "text-ink-gray-8 bg-transparent hover:bg-surface-gray-3 active:bg-surface-gray-4",
    blue: "text-ink-blue-3 bg-transparent hover:bg-blue-200 active:bg-blue-300",
    green:
      "text-green-800 bg-transparent hover:bg-green-200 active:bg-green-300",
    red: "text-red-700 bg-transparent hover:bg-surface-red-3 active:bg-surface-red-4",
  }[theme];

  const focusClasses = {
    gray: "focus-visible:ring focus-visible:ring-outline-gray-3",
    blue: "focus-visible:ring focus-visible:ring-blue-400",
    green: "focus-visible:ring focus-visible:ring-outline-green-2",
    red: "focus-visible:ring focus-visible:ring-outline-red-2",
  }[theme];

  const variantClasses = {
    subtle: subtleClasses,
    solid: solidClasses,
    outline: outlineClasses,
    ghost: ghostClasses,
  }[variant];

  const themeVariant: ButtonThemeVariant = `${theme}-${variant}`;

  const disabledClassesMap: Record<ButtonThemeVariant, string> = {
    "gray-solid": "bg-surface-gray-2 text-ink-gray-4",
    "gray-subtle": "bg-surface-gray-2 text-ink-gray-4",
    "gray-outline":
      "bg-surface-gray-2 text-ink-gray-4 border border-outline-gray-2",
    "gray-ghost": "text-ink-gray-4",
    "blue-solid": "bg-blue-300 text-ink-white",
    "blue-subtle": "bg-surface-blue-2 text-ink-blue-link",
    "blue-outline":
      "bg-surface-blue-2 text-ink-blue-link border border-outline-blue-1",
    "blue-ghost": "text-ink-blue-link",
    "green-solid": "bg-surface-green-2 text-ink-green-2",
    "green-subtle": "bg-surface-green-2 text-ink-green-2",
    "green-outline":
      "bg-surface-green-2 text-ink-green-2 border border-outline-green-2",
    "green-ghost": "text-ink-green-2",
    "red-solid": "bg-surface-red-2 text-ink-red-2",
    "red-subtle": "bg-surface-red-2 text-ink-red-2",
    "red-outline":
      "bg-surface-red-2 text-ink-red-2 border border-outline-red-1",
    "red-ghost": "text-ink-red-2",
  };

  const disabledClasses = disabledClassesMap[themeVariant];

  let sizeClasses = {
    sm: "h-7 text-base px-2 rounded",
    md: "h-8 text-base font-medium px-2.5 rounded",
    lg: "h-10 text-lg font-medium px-3 rounded-md",
    xl: "h-11.5 text-xl font-medium px-3.5 rounded-lg",
    "2xl": "h-13 text-2xl font-medium px-3.5 rounded-xl",
  }[size];

  if (isIconButton) {
    sizeClasses = {
      sm: "h-7 w-7 rounded",
      md: "h-8 w-8 rounded",
      lg: "h-10 w-10 rounded-md",
      xl: "h-11.5 w-11.5 rounded-lg",
      "2xl": "h-13 w-13 rounded-xl",
    }[size];
  }

  const slotClasses = {
    sm: "h-4",
    md: "h-4.5",
    lg: "h-5",
    xl: "h-6",
    "2xl": "h-6",
  }[size];

  const loadingIndicatorSize = {
    sm: "h-3 w-3",
    md: "h-[13.5px] w-[13.5px]",
    lg: "h-[15px] w-[15px]",
    xl: "h-4.5 w-4.5",
    "2xl": "h-4.5 w-4.5",
  }[size];

  const buttonClasses = [
    "inline-flex items-center justify-center gap-2 transition-colors focus:outline-none",
    isDisabled ? disabledClasses : variantClasses,
    focusClasses,
    sizeClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (link) {
      window.open(link, "_blank");
      return;
    }

    onClick?.(e);
  };

  const renderIcon = (
    iconProp: string | React.ComponentType<unknown> | undefined,
    ariaLabel?: string
  ) => {
    if (!iconProp) return null;

    if (typeof iconProp === "string") {
      return (
        <FeatherIcon
          name={iconProp as FeatherIconProps["name"]}
          className={slotClasses}
          aria-label={ariaLabel}
          aria-hidden={!ariaLabel}
          role="svg"
        />
      );
    }

    const IconComponent = iconProp;
    //@ts-expect-error - React component
    return <IconComponent className={slotClasses} />;
  };

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={isIconButton ? label : undefined}
      {...props}
    >
      {loading && <LoadingIndicator className={loadingIndicatorSize} />}

      {!loading && iconLeft && renderIcon(iconLeft)}

      {loading && loadingText ? (
        loadingText
      ) : isIconButton && !loading ? (
        renderIcon(icon, label)
      ) : (
        <span className={isIconButton ? "sr-only" : "truncate"}>
          {children || label}
        </span>
      )}

      {iconRight && renderIcon(iconRight)}
    </button>
  );
};

export default Button;
