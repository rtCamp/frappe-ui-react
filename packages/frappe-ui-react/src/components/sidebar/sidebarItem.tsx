import React from "react";
import Button from "../button/Button";
import { Tooltip } from "../tooltip";

export type SidebarItemProps = {
  label: string;
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
  to?: string;
  isActive?: boolean;
  onClick?: () => void;
  isCollapsed?: boolean;
  sidebarCollapsed: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon,
  suffix,
  to,
  isActive,
  onClick,
  isCollapsed = false,
  sidebarCollapsed = false,
}) => {
  function handleClick() {
    if (onClick) {
      onClick();
    } else if (to) {
      // Use react-router for navigation if needed
      window.location.href = to;
    }
  }

  return (
    <Button
      label={label}
      onClick={handleClick}
      className={`w-fit ${
        isActive ? "!bg-surface-selected shadow-sm" : "hover:bg-surface-gray-2"
      }`}
      variant="ghost"
    >
      <div
        className={`flex w-full items-center justify-between transition-all ease-in-out py-1 ${
          !sidebarCollapsed ? "px-2" : "px-0"
        }`}
      >
        {!isCollapsed && (
          <div className="flex items-center truncate">
            <Tooltip text={label} placement="right" disabled={!isCollapsed}>
              <span className="grid flex-shrink-0 place-items-center w-4 h-4">
                {icon &&
                  (typeof icon === "string" ? (
                    <span className="size-4 text-ink-gray-6">{icon}</span>
                  ) : React.isValidElement(icon) ? (
                    icon
                  ) : null)}
              </span>
            </Tooltip>
            {!sidebarCollapsed && (
              <Tooltip
                text={label}
                placement="right"
                disabled={isCollapsed}
                hoverDelay={1.5}
              >
                <span
                  className={`flex-1 flex-shrink-0 truncate text-sm transition-all ease-in-out ${
                    isCollapsed
                      ? "ml-0 w-0 overflow-hidden opacity-0"
                      : "ml-2 w-auto opacity-100"
                  }`}
                >
                  {label}
                </span>
              </Tooltip>
            )}
          </div>
        )}
        <div
          className={`transition-all ease-in-out ${
            isCollapsed
              ? "ml-0 w-0 overflow-hidden opacity-0"
              : "ml-auto w-auto opacity-100"
          }`}
        >
          {suffix && <span className="text-sm text-ink-gray-4">{suffix}</span>}
        </div>
      </div>
    </Button>
  );
};

export default SidebarItem;
