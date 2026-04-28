import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { TabItem } from "./tabs";
import { cn } from "../../utils";

interface TabListProps {
  className?: string;
  tabs: TabItem[];
}

export const TabList = ({ tabs, className }: TabListProps) => {
  return (
    <BaseTabs.List
      className={cn(
        "relative flex gap-6 border-b border-outline-gray-modals px-5",
        "data-[orientation=vertical]:flex-col data-[orientation=vertical]:gap-1 data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r data-[orientation=vertical]:px-0 data-[orientation=vertical]:py-3",
        className
      )}
    >
      {tabs.map((tab) => (
        <BaseTabs.Tab
          key={tab.label}
          className={cn(
            "flex cursor-pointer items-center justify-center border-0 py-3 text-base tracking-wide whitespace-nowrap text-ink-gray-5 outline-outline-gray-4 select-none hover:text-ink-gray-8 data-selected:text-ink-gray-8 duration-300 ease-in-out",
            "data-[orientation=vertical]:justify-start data-[orientation=vertical]:px-4 data-[orientation=vertical]:py-2"
          )}
          value={tab.label}
        >
          {tab.icon && <span className="mr-2 size-4">{tab.icon}</span>}
          {tab.label}
        </BaseTabs.Tab>
      ))}
      <BaseTabs.Indicator className="absolute bottom-0 left-0 h-px w-(--active-tab-width) translate-x-(--active-tab-left) bg-surface-gray-6 transition-all duration-200 ease-in-out data-[orientation=vertical]:top-0 data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:left-auto data-[orientation=vertical]:right-0 data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:w-px data-[orientation=vertical]:translate-x-0 data-[orientation=vertical]:translate-y-(--active-tab-top)" />
    </BaseTabs.List>
  );
};
