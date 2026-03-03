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
  value: string;
  disabled?: boolean;
  hideLabel?: boolean;
  onClick?: () => void;
  // Allow additional props to be passed to Button
  [key: string]: unknown;
}

interface TabButtonsProps {
  buttons: TabButtonItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TabButtons = ({
  buttons,
  value,
  onChange,
  className = "",
}: TabButtonsProps) => {
  return (
    <ToggleGroup
      value={[value]}
      onValueChange={(val) => {
        if (val[0]) {
          onChange(val[0]);
        }
      }}
      className={cn(
        "flex space-x-0.5 rounded-md bg-surface-gray-2 h-7 items-center p-px text-sm border border-outline-gray-2",
        className
      )}
    >
      {buttons.map((button) => {
        return (
          <Toggle
            className={cn(
              "rounded-md px-2 outline-black group flex-1 h-6.5 w-full data-pressed:bg-surface-white text-nowrap disabled:text-ink-gray-5"
            )}
            aria-label={button.label}
            value={button.value}
            disabled={button.disabled}
          >
            <p className="flex h-4 items-center">{button.label}</p>
          </Toggle>
        );
      })}
    </ToggleGroup>
  );
};

export default TabButtons;
