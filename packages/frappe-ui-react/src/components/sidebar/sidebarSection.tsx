import React, { useState } from "react";
import { LucideChevronDown } from "lucide-react";
import { Collapsible } from "@base-ui/react/collapsible";

import { cn } from "../../utils";
import { Button } from "../button";
import { Tooltip } from "../tooltip";

export type SidebarSectionProps = {
  label: string;
  items: {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    to: string;
    isActive: boolean;
    onClick?: () => void;
  }[];
  collapsible?: boolean;
  sidebarCollapsed: boolean;
};

const SidebarSection: React.FC<SidebarSectionProps> = ({
  label,
  items,
  collapsible,
  sidebarCollapsed,
}) => {
  const [collapsed, setCollapsed] = useState(
    items.some((item) => item.isActive)
  );

  if (!collapsible) {
    return items.map((item) => (
      <Button
        onClick={item.onClick}
        className={cn(
          "w-full transition-all ease-in-out justify-start py-1 px-4 text-ink-gray-6",
          {
            "!bg-surface-selected shadow-sm": item.isActive,
            "hover:bg-surface-gray-2": !item.isActive,
            "px-2": sidebarCollapsed,
          }
        )}
        variant="ghost"
        iconLeft={() => (
          <Tooltip
            text={item.label}
            placement="right"
            disabled={!sidebarCollapsed}
          >
            <item.icon className="min-w-4 w-4 text-ink-gray-6" />
          </Tooltip>
        )}
      >
        {!sidebarCollapsed && (
          <Tooltip text={item.label} placement="right" hoverDelay={1.5}>
            <span
              className={`flex-1 flex-shrink-0 truncate text-sm transition-all ease-in-out`}
            >
              {item.label}
            </span>
          </Tooltip>
        )}
      </Button>
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
        {items.map((item: any) => (
          <Button
            onClick={item.onClick}
            className={cn(
              "w-full transition-all ease-in-out justify-start py-1 pl-6 text-ink-gray-6",
              {
                "!bg-surface-selected shadow-sm": item.isActive,
                "hover:bg-surface-gray-2": !item.isActive,
                "px-2": sidebarCollapsed,
              }
            )}
            variant="ghost"
            iconLeft={() => (
              <Tooltip
                text={item.label}
                placement="right"
                disabled={!sidebarCollapsed}
              >
                <item.icon className="min-w-4 w-4 text-ink-gray-6" />
              </Tooltip>
            )}
          >
            {!sidebarCollapsed && (
              <Tooltip text={item.label} placement="right" hoverDelay={1.5}>
                <span
                  className={`flex-1 flex-shrink-0 truncate text-sm transition-all ease-in-out`}
                >
                  {item.label}
                </span>
              </Tooltip>
            )}
          </Button>
        ))}
      </Collapsible.Panel>
    </Collapsible.Root>
  );
};

export default SidebarSection;
