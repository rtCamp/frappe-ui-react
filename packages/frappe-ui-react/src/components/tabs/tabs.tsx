import React, { useState, useCallback } from "react";
import { TabList } from "./tabList";
import { TabPanel } from "./tabPanel";

export interface TabItem {
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  vertical?: boolean;
  className?: string;
  tabIndex?: number;
  onTabChange?: (index: number) => void;
  children?: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  vertical = false,
  className = "",
  tabIndex: controlledIndex,
  onTabChange,
  children,
}) => {
  const [tabIndex, setTabIndex] = useState(controlledIndex || 0);

  const handleTabChange = useCallback(
    (index: number) => {
      setTabIndex(index);

      if (onTabChange) {
        onTabChange(index);
      }
    },
    [onTabChange]
  );

  return (
    <div
      className={[
        "flex flex-1 overflow-hidden",
        vertical ? "" : "flex-col",
        className,
      ].join(" ")}
    >
      {children ? (
        children
      ) : (
        <>
          <TabList
            tabs={tabs}
            tabIndex={tabIndex}
            setTabIndex={handleTabChange}
            vertical={vertical}
          />
          <TabPanel tabs={tabs} tabIndex={tabIndex} />
        </>
      )}
    </div>
  );
};
