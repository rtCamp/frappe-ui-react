import React, { useMemo } from "react";
import {
  Switch as HeadlessSwitch,
  Field,
  Label,
  Description,
} from "@headlessui/react";
import { SwitchProps } from "./types";

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
      ? "bg-surface-gray-7 enabled:hover:bg-surface-gray-6 active:bg-surface-gray-5 group-hover:enabled:bg-surface-gray-6"
      : "bg-surface-gray-4 enabled:hover:bg-gray-800 active:bg-gray-500 group-hover:enabled:bg-gray-800",
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
  ].join(" ");

  const switchDescriptionClasses = "max-w-xs text-p-base text-ink-gray-7";

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
      classes.push(size === "md" ? "space-x-3.5" : "space-x-2.5");
    }
    return classes.join(" ");
  }, [switchType, size, disabled]);

  const labelContainerClasses = "flex flex-col space-y-0.5";

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
      <span className={labelContainerClasses}>
        {label && (
          <Label as="span" className={switchLabelClasses}>
            {label}
          </Label>
        )}
        {description && (
          <Description as="span" className={switchDescriptionClasses}>
            {description}
          </Description>
        )}
      </span>
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
