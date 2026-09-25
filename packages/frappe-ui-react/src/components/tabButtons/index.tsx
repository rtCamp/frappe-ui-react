/**
 * External dependencies.
 */
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";

/**
 * Internal dependencies.
 */
import { cn } from "../../utils";

interface TabButtonItem {
  label: string;
  value: string | number;
  disabled?: boolean;
  hideLabel?: boolean;
  onClick?: () => void;
  // Allow additional props to be passed to Button
  [key: string]: unknown;
}

interface TabButtonsProps {
  buttons: TabButtonItem[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
  buttonClassName?: string;
}

const TabButtons = ({
  buttons,
  value,
  onChange,
  className = "",
  buttonClassName = "",
}: TabButtonsProps) => {
  return (
    <ToggleGroup
      value={[String(value)]}
      onValueChange={(val) => {
        const next = val[0];
        if (next === undefined) {
          return;
        }
        // Toggle values are strings, so map back to the caller's original type.
        const matched = buttons.find((button) => String(button.value) === next);
        onChange(matched ? matched.value : next);
      }}
      className={cn(
        "flex space-x-0.5 rounded-md bg-surface-gray-2 h-7 items-center text-base border border-outline-gray-2",
        className
      )}
    >
      {buttons.map(
        ({
          label,
          value: buttonValue,
          disabled,
          hideLabel,
          onClick,
          ...props
        }) => {
          const toggleValue = String(buttonValue);

          return (
            <Toggle
              key={toggleValue}
              className={cn(
                "rounded-md px-2 outline-black group flex-1 h-6.5 w-full border border-transparent text-nowrap text-center",
                "hover:bg-surface-gray-3",
                "data-pressed:bg-surface-white data-pressed:border-outline-gray-2 data-pressed:hover:bg-surface-gray-4",
                "disabled:text-ink-gray-5 disabled:hover:bg-surface-gray-2",
                buttonClassName
              )}
              aria-label={label}
              value={toggleValue}
              disabled={disabled}
              onClick={onClick}
              {...props}
            >
              {!hideLabel && <p className="h-4 text-center">{label}</p>}
            </Toggle>
          );
        }
      )}
    </ToggleGroup>
  );
};

export default TabButtons;
