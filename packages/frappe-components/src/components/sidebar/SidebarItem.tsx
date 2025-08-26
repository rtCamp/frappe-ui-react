import React from "react";
import Button from "../button/Button";
import { Tooltip } from "../tooltip";
import { useSidebarCollapsed } from "./Sidebar";

export type SidebarItemProps = {
  label: string;
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
  to?: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon,
  suffix,
  to,
  isActive,
  isCollapsed: isCollapsedProp,
  onClick,
}) => {
  const { isCollapsed } = useSidebarCollapsed();
  const collapsed = isCollapsedProp ?? isCollapsed;

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
      <div className="flex w-full items-center justify-between transition-all ease-in-out px-2 py-1">
        <div className="flex items-center truncate">
          <Tooltip text={label} placement="right" disabled={!collapsed}>
            <span className="grid flex-shrink-0 place-items-center w-4 h-4">
              {icon &&
                (typeof icon === "string" ? (
                  <span className="size-4 text-ink-gray-6">{icon}</span>
                ) : React.isValidElement(icon) ? (
                  icon
                ) : null)}
            </span>
          </Tooltip>
          <Tooltip
            text={label}
            placement="right"
            disabled={collapsed}
            hoverDelay={1.5}
          >
            <span
              className={`flex-1 flex-shrink-0 truncate text-sm transition-all ease-in-out ${
                collapsed
                  ? "ml-0 w-0 overflow-hidden opacity-0"
                  : "ml-2 w-auto opacity-100"
              }`}
            >
              {label}
            </span>
          </Tooltip>
        </div>
        <div
          className={`transition-all ease-in-out ${
            collapsed
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
