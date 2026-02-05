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
        const { component, props, ...rest } = item;
        void component;
        void props;
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
      const componentMap = new Map();

      const extractComponents = (item: LayoutItem) => {
        if (item.type === "component") {
          componentMap.set(item.id, { 'component': item.component, 'props': item.props  });
        } else if (item.type !== "empty" && "slots" in item) {
          item.slots.forEach((slotItem) => extractComponents(slotItem));
        }
      };

      extractComponents(initial);
      const reconstruct = (item: SerializedLayoutItem): LayoutItem => {
        if (item.type === "empty") {
          return item;
        } else if (item.type === "component") {
          const component = componentMap.get(item.id);
          return {
            ...item,
            component: component?.component ?? (() => (
              <span className="text-sm text-ink-gray-5">
                Component Not Found
              </span>
            )),
            props: component?.props ?? {},
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
