import React, { useCallback, useEffect, useState } from "react";
import { LayoutContainer } from "./layoutContainer";
import type { DashboardProps, LayoutItem, SerializedLayoutItem } from "./types";

export const Dashboard: React.FC<DashboardProps> = ({
  initialLayout,
  layoutLock = false,
  dragHandle = false,
  dragHandleOnHover = false,
  savedLayout,
  onLayoutChange,
}) => {
  const handleMakeSerializable = useCallback(
    (item: LayoutItem): SerializedLayoutItem => {
      if (item.type === "empty") {
        return item;
      } else if (item.type === "component") {
        const { component, ...rest } = item;
        void component;
        return rest;
      } else if (item.type === "row" || item.type === "stack") {
        return {
          ...item,
          slots: item.slots.map((slotItem) =>
            slotItem.type === "empty"
              ? slotItem
              : handleMakeSerializable(slotItem)
          ),
        };
      }
      return item;
    },
    []
  );

  const mergeLayouts = useCallback(
    (saved: SerializedLayoutItem, initial: LayoutItem): LayoutItem => {
      const componentMap = new Map<string, React.ReactNode>();

      const extractComponents = (item: LayoutItem) => {
        if (item.type === "component") {
          componentMap.set(item.id, item.component);
        } else if (item.type !== "empty" && "slots" in item) {
          item.slots.forEach((slotItem) => extractComponents(slotItem));
        }
      };

      extractComponents(initial);
      const reconstruct = (item: SerializedLayoutItem): LayoutItem => {
        if (item.type === "empty") {
          return item;
        } else if (item.type === "component") {
          return {
            ...item,
            component: componentMap.get(item.id) ?? (
              <span className="text-sm text-ink-gray-5">
                Component Not Found
              </span>
            ),
          };
        } else {
          return {
            ...item,
            slots: item.slots.map((slotItem) =>
              slotItem.type === "empty" ? slotItem : reconstruct(slotItem)
            ),
          };
        }
      };

      return reconstruct(saved);
    },
    []
  );

  const [layout, setLayout] = useState<LayoutItem>(() => {
    if (savedLayout) {
      return mergeLayouts(savedLayout, initialLayout);
    }
    return initialLayout;
  });

  useEffect(() => {
    setLayout((currentLayout) => {
      const currentSerialized = handleMakeSerializable(currentLayout);
      return mergeLayouts(currentSerialized, initialLayout);
    });
  }, [initialLayout, mergeLayouts, handleMakeSerializable]);

  useEffect(() => {
    const strippedLayout = handleMakeSerializable(layout);
    onLayoutChange(strippedLayout);
  }, [layout, onLayoutChange, handleMakeSerializable]);

  return (
    <LayoutContainer
      layout={layout}
      setLayout={setLayout}
      layoutLock={layoutLock}
      dragHandle={dragHandle}
      dragHandleOnHover={dragHandleOnHover}
    />
  );
};

Dashboard.displayName = "Dashboard";

export default Dashboard;
