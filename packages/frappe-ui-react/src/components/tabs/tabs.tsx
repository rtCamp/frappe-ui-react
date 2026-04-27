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
  onTabChange?: (index: number) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  vertical,
  tabIndex,
  onTabChange,
}) => {
  const controlled = tabIndex !== undefined && onTabChange !== undefined;

  return (
    <BaseTabs.Root
      className={cn("flex rounded-md border border-outline-gray-modals", {
        "flex-row": vertical,
        "flex-col": !vertical,
      })}
      {...(controlled
        ? {
            value: tabs[tabIndex]?.label,
            onValueChange: (newValue) => {
              console.log(newValue);

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
