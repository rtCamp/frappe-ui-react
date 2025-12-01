import React, { useState, useCallback, useEffect } from "react";
import { LucidePanelRightOpen } from "lucide-react";

import SidebarHeader from "./sidebarHeader";
import SidebarSection from "./sidebarSection";
import SidebarItem from "./sidebarItem";
import { useMediaQuery } from "./useMediaQuery";

export type SidebarHeaderProps = {
  title: string;
  subtitle?: string;
  logo?: React.ReactNode | string;
  menuItems?: any[];
};

export type SidebarSectionType = {
  label: string;
  items: any[];
  collapsible?: boolean;
};

export type SidebarProps = {
  header?: SidebarHeaderProps;
  sections: SidebarSectionType[];
  collapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  children?: React.ReactNode;
  className?: string;
};
const Sidebar: React.FC<SidebarProps> = ({
  header,
  sections,
  collapsed: collapsedProp,
  onCollapseChange,
  children,
  className = "",
}) => {
  // Internal collapse state
  const [internalCollapsed, setInternalCollapsed] = useState(false);
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

  // Responsive behavior - auto-collapse on small screens
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Auto collapse sidebar on mobile
  useEffect(() => {
    if (isMobile && !isCollapsed) {
      setCollapsed(true);
    }
  }, [isMobile, isCollapsed, setCollapsed]);

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
      {sections.map((section) => (
        <SidebarSection
          key={section.label}
          sidebarCollapsed={shouldCollapse}
          {...section}
        />
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
        <SidebarItem
          label={shouldCollapse ? "Expand" : "Collapse"}
          onClick={() => !isMobile && setCollapsed(!isCollapsed)} // Prevent toggling on mobile
          sidebarCollapsed={isCollapsed}
          icon={
            <span
              className={`transition-transform duration-300 ease-in-out ${
                shouldCollapse ? "rotate-180" : ""
              }`}
            >
              <LucidePanelRightOpen size={16} className="text-ink-gray-6" />
            </span>
          }
        />
      </div>
    </div>
  );
};

export default Sidebar;
