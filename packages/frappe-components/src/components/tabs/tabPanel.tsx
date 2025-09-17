import { TabItem } from "./tabs";

export interface TabPanelProps {
  tabs: TabItem[];
  tabIndex: number;
}

export const TabPanel = ({ tabs, tabIndex }: TabPanelProps) => {
  return (
    <div className="flex flex-1 overflow-hidden">
      {tabs.map((tab, i) => (
        <div
          key={i}
          className={[
            "flex flex-1 flex-col overflow-y-auto focus:outline-none",
            tabIndex === i ? "" : "hidden",
          ].join(" ")}
        >
          <div className="p-5 text-ink-gray-8">{tab.content}</div>
        </div>
      ))}
    </div>
  );
};
