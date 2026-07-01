/**
 * External dependencies.
 */
import React, { useState, useCallback } from "react";

/**
 * Internal dependencies.
 */
import SidebarHeader from "./sidebarHeader";
import SidebarSection, { type SidebarItem } from "./sidebarSection";
import { useMediaQuery } from "./useMediaQuery";
import { Divider } from "../divider";
import { Button } from "../button";
import { cn } from "../../utils";
import Tooltip from "../tooltip/tooltip";
import { MenuCollapse } from "../../icons";
import type { DropdownOptions } from "../dropdown";

export type SidebarHeaderProps = {
  title: string;
  subtitle?: string;
  logo?: React.ReactNode | string;
  menuItems?: DropdownOptions;
};

export type SidebarSectionType = {
  label: string;
  items: SidebarItem[];
  collapsible?: boolean;
};

export type SidebarProps = {
  header?: SidebarHeaderProps;
  sections: SidebarSectionType[];
  collapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  children?: React.ReactNode;
  className?: string;
  activeItemClassName?: string;
};
const Sidebar: React.FC<SidebarProps> = ({
  header,
  sections,
  collapsed: collapsedProp,
  onCollapseChange,
  children,
  className = "",
  activeItemClassName,
}) => {
  // Responsive behavior - auto-collapse on small screens
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Internal collapse state
  const [internalCollapsed, setInternalCollapsed] = useState(isMobile);
  const isControlled = typeof collapsedProp === "boolean";
  const isCollapsed = isControlled ? collapsedProp : internalCollapsed;

  // Handle collapse state changes
  const setCollapsed = useCallback(
    (v: boolean) => {
      if (isControlled) {
        onCollapseChange?.(v);
      } else {
        setInternalCollapsed(v);
      }
    },
    [isControlled, onCollapseChange]
  );

  // Compute whether sidebar should be collapsed (either manually or due to mobile)
  const shouldCollapse = isCollapsed || isMobile;

  return (
    <div
      className={`flex h-full flex-col flex-shrink-0 overflow-y-auto overflow-x-hidden border-r border-outline-gray-1 bg-surface-menu-bar transition-all duration-300 ease-in-out p-2 ${
        shouldCollapse ? "w-12" : "w-60"
      } ${className}`}
    >
      {header && (
        <SidebarHeader
          isCollapsed={shouldCollapse}
          title={header.title}
          subtitle={header.subtitle}
          logo={header.logo}
          menuItems={header.menuItems}
        >
          {/* header-logo slot */}
          {children &&
            React.Children.toArray(children).filter((child) => {
              if (React.isValidElement(child)) {
                const props = child.props as Record<string, unknown>;
                return props && props.slot === "header-logo";
              }
              return false;
            })}
        </SidebarHeader>
      )}
      {sections.map((section, index) => (
        <React.Fragment key={`section-${index}`}>
          <SidebarSection
            sidebarCollapsed={shouldCollapse}
            activeItemClassName={activeItemClassName}
            {...section}
          />
          {index !== sections.length - 1 && <Divider className="h-1 mt-2" />}
        </React.Fragment>
      ))}
      <div className="mt-auto flex flex-col gap-2">
        {/* footer-items slot */}
        {children &&
          React.Children.toArray(children).filter((child) => {
            if (React.isValidElement(child)) {
              const props = child.props as Record<string, unknown>;
              return props && props.slot === "footer-items";
            }
            return false;
          })}
        <Button
          className={cn("w-full justify-start py-1 px-4 text-ink-gray-6", {
            "px-2": isCollapsed,
          })}
          onClick={() => setCollapsed(!isCollapsed)}
          variant="ghost"
          iconLeft={() => (
            <Tooltip text="Collapse" placement="right" disabled={!isCollapsed}>
              <MenuCollapse
                className={cn(
                  "min-w-4 w-4 text-ink-gray-6 transition-all ease-in-out duration-150",
                  {
                    "-rotate-180": isCollapsed,
                  }
                )}
              />
            </Tooltip>
          )}
        >
          {!isCollapsed && (
            <Tooltip text="Collapse" placement="right" hoverDelay={1.5}>
              <span
                className={`flex-1 flex-shrink-0 truncate text-sm transition-all ease-in-out`}
              >
                Collapse
              </span>
            </Tooltip>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
