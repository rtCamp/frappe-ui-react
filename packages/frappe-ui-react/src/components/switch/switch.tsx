import React, { useMemo } from "react";
import {
  Switch as HeadlessSwitch,
  Field,
  Label,
  Description,
} from "@headlessui/react";
import type { SwitchProps } from "./types";
import FeatherIcon, { type FeatherIconProps } from "../featherIcon";

enum SwitchVariant {
  DEFAULT,
  ONLY_LABEL,
  WITH_LABEL_AND_DESCRIPTION,
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onChange,
  size = "sm",
  label = "",
  description = "",
  disabled = false,
  className = "",
  labelClassName = "",
  icon,
}) => {
  // Determine switch type
  const switchType = useMemo(() => {
    if (label && description) return SwitchVariant.WITH_LABEL_AND_DESCRIPTION;
    if (label) return SwitchVariant.ONLY_LABEL;
    return SwitchVariant.DEFAULT;
  }, [label, description]);

  // Classes
  const switchClasses = [
    "relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-100 ease-in-out items-center",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline-gray-3",
    "disabled:cursor-not-allowed disabled:bg-surface-gray-3",
    value
      ? "bg-surface-gray-7 enabled:hover:bg-surface-gray-6 active:bg-surface-gray-5"
      : "bg-surface-gray-4 enabled:hover:bg-gray-400 active:bg-gray-500 dark:enabled:hover:bg-dark-gray-100 dark:active:bg-dark-gray-200",
    switchType === SwitchVariant.ONLY_LABEL &&
      (value
        ? "group-hover:enabled:bg-surface-gray-6"
        : "group-hover:enabled:bg-gray-400 dark:group-hover:enabled:bg-dark-gray-100"),
    size === "md" ? "h-5 w-8 border-[3px]" : "h-4 w-[26px] border-2",
  ].join(" ");

  const switchCircleClasses = [
    "pointer-events-none inline-block transform rounded-full bg-surface-white shadow ring-0 transition duration-100 ease-in-out",
    size === "md" ? "h-3.5 w-3.5" : "h-3 w-3",
    size === "md"
      ? value
        ? "translate-x-3 rtl:-translate-x-3"
        : "translate-x-0"
      : value
        ? "translate-x-2.5 rtl:-translate-x-2.5"
        : "translate-x-0",
  ].join(" ");

  const switchLabelClasses = [
    "font-medium leading-normal",
    disabled && switchType === SwitchVariant.ONLY_LABEL
      ? "text-ink-gray-4"
      : "text-ink-gray-8",
    size === "md" ? "text-lg" : "text-base",
    labelClassName,
  ].join(" ");

  const switchDescriptionClasses = "max-w-xs text-p-sm text-ink-gray-7";

  const iconClasses = "mr-2 h-4 w-4 flex-shrink-0 text-ink-gray-6";

  const switchGroupClasses = useMemo(() => {
    const classes = ["flex justify-between"];
    if (switchType === SwitchVariant.ONLY_LABEL) {
      classes.push(
        "group items-center space-x-3 cursor-pointer rounded focus-visible:bg-surface-gray-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline-gray-3"
      );
      classes.push(
        disabled
          ? "cursor-not-allowed"
          : "hover:bg-surface-gray-3 active:bg-surface-gray-4"
      );
      classes.push(size === "md" ? "px-3 py-1.5" : "px-2.5 py-1.5");
    } else if (switchType === SwitchVariant.WITH_LABEL_AND_DESCRIPTION) {
      classes.push("group items-start");
      classes.push(size === "md" ? " px-3 space-x-3.5" : "px-2.5 space-x-2.5");
    }
    return classes.join(" ");
  }, [switchType, size, disabled]);
  const labelContainerClasses = "flex flex-col gap-1";

  // Keyboard spacebar toggle for ONLY_LABEL
  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (
      switchType === SwitchVariant.ONLY_LABEL &&
      e.code === "Space" &&
      !disabled
    ) {
      onChange(!value);
    }
  };

  return (
    <Field
      as="div"
      tabIndex={switchType === SwitchVariant.ONLY_LABEL ? 0 : -1}
      onKeyUp={handleKeyUp}
      className={`${switchGroupClasses} ${className}`}
    >
      <div className={labelContainerClasses}>
        <div className="flex items-center">
          {icon &&
            (typeof icon === "string" ? (
              <FeatherIcon
                name={icon as FeatherIconProps["name"]}
                className={iconClasses}
                aria-hidden="true"
              />
            ) : React.isValidElement(icon) ? (
              <span className={iconClasses}>{icon}</span>
            ) : null)}
          {label && (
            <Label as="span" className={switchLabelClasses}>
              {label}
            </Label>
          )}
        </div>
        {description && (
          <Description as="span" className={switchDescriptionClasses}>
            {description}
          </Description>
        )}
      </div>
      <HeadlessSwitch
        checked={!!value}
        onChange={() => onChange(!value)}
        disabled={disabled}
        className={switchClasses}
      >
        <span aria-hidden="true" className={switchCircleClasses} />
      </HeadlessSwitch>
    </Field>
  );
};

export default Switch;
