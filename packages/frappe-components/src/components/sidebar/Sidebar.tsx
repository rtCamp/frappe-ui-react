import React, { useState, useCallback, createContext } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarSection from "./SidebarSection";
import SidebarItem from "./SidebarItem";
import { LucidePanelRightOpen } from "lucide-react";

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

const SidebarCollapsedContext = createContext<{
  isCollapsed: boolean;
  setCollapsed: (v: boolean) => void;
}>({ isCollapsed: false, setCollapsed: () => {} });

// export const useSidebarCollapsed = () => useContext(SidebarCollapsedContext);

const Sidebar: React.FC<SidebarProps> = ({
  header,
  sections,
  collapsed: collapsedProp,
  onCollapseChange,
  children,
  className = "",
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isControlled = typeof collapsedProp === "boolean";
  const isCollapsed = isControlled ? collapsedProp : internalCollapsed;
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

  // TODO: Responsive collapse (mobile) logic can be added here

  return (
    <SidebarCollapsedContext.Provider value={{ isCollapsed, setCollapsed }}>
      <div
        className={`flex h-full flex-col flex-shrink-0 overflow-y-auto overflow-x-hidden border-r border-outline-gray-1 bg-surface-menu-bar transition-all duration-300 ease-in-out p-2 ${
          isCollapsed ? "w-12" : "w-60"
        } ${className}`}
      >
        {header && (
          <SidebarHeader
            isCollapsed={isCollapsed}
            title={header.title}
            subtitle={header.subtitle}
            logo={header.logo}
            menuItems={header.menuItems}
          >
            {/* header-logo slot */}
            {children &&
              React.Children.map(children, (child: any) =>
                child?.props?.slot === "header-logo" ? child : null
              )}
          </SidebarHeader>
        )}
        {sections.map((section) => (
          <SidebarSection key={section.label} {...section} />
        ))}
        <div className="mt-auto flex flex-col gap-2">
          {/* footer-items slot */}
          {children &&
            React.Children.map(children, (child: any) =>
              child?.props?.slot === "footer-items" ? child : null
            )}
          <SidebarItem
            label={isCollapsed ? "Expand" : "Collapse"}
            isCollapsed={isCollapsed}
            onClick={() => setCollapsed(!isCollapsed)}
            icon={
              <span
                className={`transition-transform duration-300 ease-in-out ${
                  isCollapsed ? "rotate-180" : ""
                }`}
              >
                <LucidePanelRightOpen size={16} className="text-ink-gray-6" />
              </span>
            }
          />
        </div>
      </div>
    </SidebarCollapsedContext.Provider>
  );
};

export default Sidebar;
