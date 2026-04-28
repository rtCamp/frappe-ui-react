import { Tabs as BaseUITabs } from "@base-ui/react/tabs";
import type { TabItem } from "./tabs";

export interface TabPanelProps {
  tabs: TabItem[];
}

export const TabPanel = ({ tabs }: TabPanelProps) => {
  return (
    <div className="px-5 py-4">
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
