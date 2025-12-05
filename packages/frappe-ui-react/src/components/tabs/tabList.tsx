import { useRef, useEffect } from "react";
import { TabItem } from "./tabs";

interface TabListProps {
  tabs: TabItem[];
  tabIndex: number;
  setTabIndex: (index: number) => void;
  vertical?: boolean;
}

export const TabList = ({
  tabs,
  tabIndex,
  setTabIndex,
  vertical,
}: TabListProps) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  // Move indicator on tab change
  useEffect(() => {
    const selectedTab = tabRefs.current[tabIndex];
    const indicator = indicatorRef.current;
    if (!selectedTab || !indicator) return;

    if (vertical) {
      indicator.style.height = `${selectedTab.offsetHeight}px`;
      indicator.style.top = `${selectedTab.offsetTop}px`;
      indicator.style.right = "0px";
      indicator.style.width = "2px";
      indicator.style.left = "";
    } else {
      indicator.style.width = `${selectedTab.offsetWidth}px`;
      indicator.style.left = `${selectedTab.offsetLeft}px`;
      indicator.style.bottom = "0px";
      indicator.style.height = "1px";
      indicator.style.top = "";
    }
    indicator.classList.add("transition-all", "duration-300", "ease-in-out");
  }, [tabIndex, tabs, vertical]);

  return (
    <div
      className={[
        "relative flex border-gray-200",
        vertical
          ? "gap-5 flex-col border-r overflow-y-auto py-3"
          : "gap-7.5 border-b overflow-x-auto items-center px-5",
      ].join(" ")}
    >
      {tabs.map((tab, i) => {
        const selected = tabIndex === i;
        return (
          <button
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            key={i}
            className={[
              "focus:outline-none focus:transition-none flex items-center gap-1.5 text-base text-ink-gray-5 duration-300 ease-in-out hover:text-ink-gray-9 cursor-pointer",
              selected ? "text-ink-gray-9" : "",
              vertical ? "px-4" : "py-3",
            ].join(" ")}
            onClick={() => setTabIndex(i)}
            type="button"
            tabIndex={selected ? 0 : -1}
            aria-selected={selected}
          >
            {tab.icon && <span className="size-4">{tab.icon}</span>}
            {tab.label}
          </button>
        );
      })}
      <div
        ref={indicatorRef}
        className={[
          "tab-indicator absolute bg-surface-gray-7",
          vertical ? "right-0 w-0.5" : "bottom-0 h-px",
        ].join(" ")}
      />
    </div>
  );
};
