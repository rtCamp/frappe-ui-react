import React from "react";
import SidebarItem from "./SidebarItem";
import { LucideChevronDown } from "lucide-react";

export type SidebarSectionProps = {
  label?: string;
  items: any[];
  collapsible?: boolean;
  isCollapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

const SidebarSection: React.FC<SidebarSectionProps> = ({
  label,
  items,
  collapsible,
  isCollapsed,
  setCollapsed,
}) => {
  return (
    <div className="flex flex-col mt-2">
      {label && (
        <div
          className={`relative flex items-center gap-1 px-2 py-1.5 ${
            collapsible ? "cursor-pointer" : ""
          }`}
          onClick={() =>
            collapsible ? setCollapsed?.(!isCollapsed) : undefined
          }
        >
          <h3
            className={`h-4 text-sm text-ink-gray-5 transition-all duration-300 ease-in-out ${
              isCollapsed
                ? "w-0 overflow-hidden opacity-0"
                : "w-auto opacity-100"
            }`}
          >
            {label}
          </h3>
          {collapsible && !isCollapsed && (
            <span
              className={`w-4 h-4 text-ink-gray-5 transition-all duration-300 ease-in-out ${
                !isCollapsed ? "" : "-rotate-90"
              }`}
            >
              <LucideChevronDown size={16} className="text-ink-gray-6" />
            </span>
          )}
          {isCollapsed && (
            <div
              className={`absolute top-0 left-0 flex h-full w-full items-center justify-center transition-all duration-300 ease-in-out ${
                isCollapsed ? "opacity-100" : "opacity-0"
              }`}
            >
              <hr className="w-full border-t border-ink-gray-3" />
            </div>
          )}
        </div>
      )}
      {/* Collapsible nav */}
      <nav className="space-y-0.5 flex flex-col align-start justify-between">
        {items.map((item: any) => (
          <SidebarItem key={item.label} {...item} isCollapsed={isCollapsed} />
        ))}
      </nav>
    </div>
  );
};

export default SidebarSection;
