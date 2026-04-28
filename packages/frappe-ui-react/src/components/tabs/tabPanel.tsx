import { Tabs as BaseUITabs } from "@base-ui/react/tabs";
import type { TabItem } from "./tabs";
import { cn } from "../../utils";

export interface TabPanelProps {
  className?: string;
  tabs: TabItem[];
}

export const TabPanel = ({ tabs, className }: TabPanelProps) => {
  return (
    <div className={cn("px-5 py-4", className)}>
      {tabs.map((tab) => (
        <BaseUITabs.Panel
          key={tab.label}
          value={tab.label}
          className="flex flex-1 flex-col overflow-y-auto focus:outline-none"
        >
          {tab.content}
        </BaseUITabs.Panel>
      ))}
    </div>
  );
};
