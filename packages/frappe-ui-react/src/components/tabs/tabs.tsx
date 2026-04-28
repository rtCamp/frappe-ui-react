/**
 * External dependencies.
 */
import { Tabs as BaseTabs } from "@base-ui/react/tabs";

/**
 * Internal dependencies.
 */
import { TabList } from "./tabList";
import { TabPanel } from "./tabPanel";
import { cn } from "../../utils";

export interface TabItem {
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  vertical?: boolean;
  tabIndex?: number;
  className?: string;
  onTabChange?: (index: number) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  vertical,
  tabIndex,
  className,
  onTabChange,
}) => {
  if (tabs.length === 0) {
    throw new Error("Tabs has 0 elements");
  }
  if (
    (tabIndex !== undefined && onTabChange === undefined) ||
    (tabIndex === undefined && onTabChange !== undefined)
  ) {
    throw new Error(
      "Define both tabIndex and onTabChange to be in controlled mode"
    );
  }
  const controlled = tabIndex !== undefined && onTabChange !== undefined;

  return (
    <BaseTabs.Root
      className={cn(
        "flex rounded-md border border-outline-gray-modals",
        {
          "flex-row": vertical,
          "flex-col": !vertical,
        },
        className
      )}
      {...(controlled
        ? {
            value: tabs[tabIndex || 0]?.label,
            onValueChange: (newValue) => {
              const index = tabs.findIndex((t) => t.label === newValue);
              if (index !== -1) onTabChange(index);
            },
          }
        : { defaultValue: tabs[0].label })}
      orientation={vertical ? "vertical" : "horizontal"}
    >
      <TabList tabs={tabs} />
      <TabPanel tabs={tabs} />
    </BaseTabs.Root>
  );
};
