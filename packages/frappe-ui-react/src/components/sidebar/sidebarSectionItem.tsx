import React from "react";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "../../utils";
import { Tooltip } from "../tooltip";

export type SidebarItemState = {
  active: boolean;
  collapsed: boolean;
};

export type SidebarItem = {
  label: string;
  icon?: React.ComponentType<{ className?: string }> | React.ReactNode;
  suffix?: React.ReactNode;
  to?: string;
  isActive?: boolean;
  onClick?: () => void;
  /**
   * Replace the default item element, or compose it with another component.
   * Accepts a React element or a render function that receives the item's
   * merged props (`className`, `onClick`, `children`) and its `state`.
   */
  render?: useRender.RenderProp<SidebarItemState>;
  [key: string]: unknown;
};

// forwardRef and memo components are objects rather than functions, so a
// typeof check alone would let them fall through and React would be handed the
// component object as a child.
const isComponentType = (
  icon: SidebarItem["icon"]
): icon is React.ComponentType<{ className?: string }> =>
  typeof icon === "function" ||
  (typeof icon === "object" &&
    icon !== null &&
    "$$typeof" in icon &&
    !React.isValidElement(icon));

export type SidebarSectionItemProps = {
  item: SidebarItem;
  sidebarCollapsed: boolean;
  activeItemClassName?: string;
  indentClassName: string;
};

const SidebarSectionItem: React.FC<SidebarSectionItemProps> = ({
  item,
  sidebarCollapsed,
  activeItemClassName,
  indentClassName,
}) => {
  const state: SidebarItemState = {
    active: Boolean(item.isActive),
    collapsed: sidebarCollapsed,
  };

  const icon = isComponentType(item.icon)
    ? React.createElement(item.icon, {
        className: "min-w-4 w-4 text-ink-gray-6",
      })
    : item.icon;

  return useRender({
    state,
    render: item.render ?? <button type="button" />,
    props: {
      onClick: item.onClick,
      className: cn(
        "inline-flex h-7 w-full cursor-pointer items-center gap-2 rounded justify-start py-1 text-base text-left text-ink-gray-6 no-underline transition-all ease-in-out focus-visible:outline-2 focus-visible:outline-default",
        indentClassName,
        {
          "!bg-surface-selected shadow-sm": item.isActive,
          "hover:bg-surface-gray-2 active:bg-surface-gray-4": !item.isActive,
          "px-2": sidebarCollapsed,
        },
        item.isActive && activeItemClassName
      ),
      children: (
        <>
          {icon && (
            <Tooltip
              text={item.label}
              placement="right"
              disabled={!sidebarCollapsed}
            >
              {icon}
            </Tooltip>
          )}
          {!sidebarCollapsed && (
            <Tooltip text={item.label} placement="right" hoverDelay={1.5}>
              <span className="flex-1 flex-shrink-0 truncate text-base transition-all ease-in-out">
                {item.label}
              </span>
            </Tooltip>
          )}
          {item.suffix}
        </>
      ),
    },
  });
};

export default SidebarSectionItem;
