import { Radio, RadioGroup } from "@headlessui/react";
import { Button } from "../button";

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
}

const TabButtons = ({
  buttons,
  value,
  onChange,
  className = "",
}: TabButtonsProps) => {
  return (
    <RadioGroup value={value} onChange={onChange} className={className}>
      <div className="flex space-x-0.5 rounded-md bg-surface-gray-2 h-7 items-center px-[1px] text-sm">
        {buttons.map((button) => (
          <Radio
            key={button.value || button.label}
            value={button.value || button.label}
            disabled={button.disabled}
            className="focus:outline-none group"
          >
            {({ checked, focus }) => (
              <Button
                onClick={button.onClick}
                disabled={button.disabled}
                {...Object.fromEntries(
                  Object.entries(button).filter(
                    ([key]) =>
                      ![
                        "value",
                        "disabled",
                        "label",
                        "hideLabel",
                        "onClick",
                      ].includes(key)
                  )
                )}
                className={`!h-6.5 ${
                  focus ? "ring-outline-gray-2 focus-visible:ring" : ""
                } ${checked ? "!bg-surface-white" : ""} ${
                  button.disabled
                    ? ""
                    : checked
                    ? "text-ink-gray-9 shadow"
                    : "text-ink-gray-7"
                } cursor-pointer`}
              >
                {!button.hideLabel && button.label && (
                  <span className="flex h-4 items-center">{button.label}</span>
                )}
              </Button>
            )}
          </Radio>
        ))}
      </div>
    </RadioGroup>
  );
};

export default TabButtons;
