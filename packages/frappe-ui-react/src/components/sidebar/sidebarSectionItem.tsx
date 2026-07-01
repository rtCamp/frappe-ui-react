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
  icon: React.ComponentType<{ className?: string }>;
  to?: string;
  isActive?: boolean;
  onClick?: () => void;
  /**
   * Replace the default item element, or compose it with another component.
   * Accepts a React element or a render function that receives the item's
   * merged props (`className`, `onClick`, `children`) and its `state`.
   */
  render?: useRender.RenderProp<SidebarItemState>;
};

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

  const Icon = item.icon;

  return useRender({
    state,
    render: item.render ?? <button type="button" />,
    props: {
      onClick: item.onClick,
      className: cn(
        "inline-flex h-7 w-full cursor-pointer items-center gap-2 rounded justify-start py-1 text-base text-left text-ink-gray-6 no-underline transition-all ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-outline-gray-3",
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
          <Tooltip
            text={item.label}
            placement="right"
            disabled={!sidebarCollapsed}
          >
            <Icon className="min-w-4 w-4 text-ink-gray-6" />
          </Tooltip>
          {!sidebarCollapsed && (
            <Tooltip text={item.label} placement="right" hoverDelay={1.5}>
              <span className="flex-1 flex-shrink-0 truncate text-base transition-all ease-in-out">
                {item.label}
              </span>
            </Tooltip>
          )}
        </>
      ),
    },
  });
};

export default SidebarSectionItem;
