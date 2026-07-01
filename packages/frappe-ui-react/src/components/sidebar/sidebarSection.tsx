import React, { useState } from "react";
import { LucideChevronDown } from "lucide-react";
import { Collapsible } from "@base-ui/react/collapsible";

import { cn } from "../../utils";
import SidebarSectionItem, { type SidebarItem } from "./sidebarSectionItem";

export type { SidebarItem, SidebarItemState } from "./sidebarSectionItem";

export type SidebarSectionProps = {
  label: string;
  items: SidebarItem[];
  collapsible?: boolean;
  sidebarCollapsed: boolean;
  activeItemClassName?: string;
};

const SidebarSection: React.FC<SidebarSectionProps> = ({
  label,
  items,
  collapsible,
  sidebarCollapsed,
  activeItemClassName,
}) => {
  const [collapsed, setCollapsed] = useState(
    items.some((item) => item.isActive)
  );

  if (!collapsible) {
    return items.map((item) => (
      <SidebarSectionItem
        key={item.label}
        item={item}
        sidebarCollapsed={sidebarCollapsed}
        activeItemClassName={activeItemClassName}
        indentClassName="px-2"
      />
    ));
  }

  return (
    <Collapsible.Root
      className="flex flex-col mt-2"
      open={collapsed || sidebarCollapsed}
      onOpenChange={() => setCollapsed(!collapsed)}
    >
      <Collapsible.Trigger
        className={cn(
          "relative flex items-center gap-1 px-4 py-1.5 cursor-pointer rounded-md focus:outline-none focus-visible:ring focus-visible:ring-outline-gray-3 text-ink-gray-6",
          {
            hidden: sidebarCollapsed,
          }
        )}
      >
        {!sidebarCollapsed && (
          <span
            className={`w-4 h-4 transition-all duration-300 ease-in-out ${
              collapsed ? "" : "-rotate-90"
            }`}
          >
            <LucideChevronDown size={16} color="currentColor" />
          </span>
        )}
        {sidebarCollapsed && (
          <div
            className={`absolute top-0 left-0 flex h-full w-full items-center justify-center transition-all duration-300 ease-in-out ${
              sidebarCollapsed ? "opacity-100" : "opacity-0"
            }`}
          >
            <hr className="w-full border-t border-gray-200" />
          </div>
        )}
        <h3
          className={`h-4 text-sm transition-all duration-300 ease-in-out ${
            sidebarCollapsed
              ? "w-0 overflow-hidden opacity-0"
              : "w-auto opacity-100"
          }`}
        >
          {label}
        </h3>
      </Collapsible.Trigger>
      <Collapsible.Panel
        className={cn(
          "space-y-0.5 flex flex-col align-start justify-between transition-all duration-150"
        )}
      >
        {items.map((item) => (
          <SidebarSectionItem
            key={item.label}
            item={item}
            sidebarCollapsed={sidebarCollapsed}
            activeItemClassName={activeItemClassName}
            indentClassName="pl-6 pr-2"
          />
        ))}
      </Collapsible.Panel>
    </Collapsible.Root>
  );
};

export default SidebarSection;
