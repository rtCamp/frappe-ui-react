import React, { useCallback, useEffect, useState } from "react";
import { LayoutContainer } from "./layoutContainer";
import type { DashboardProps, LayoutItem, SerializedLayoutItem } from "./types";

export const Dashboard: React.FC<DashboardProps> = ({ initialLayout, savedLayout, onLayoutChange }) => {
  const mergeLayouts = useCallback((saved: SerializedLayoutItem[], initial: LayoutItem[]): LayoutItem[] => {
    const componentMap = new Map<string, React.ComponentType>();
    
    const extractComponents = (items: LayoutItem[]) => {
      items.forEach(item => {
        if (item.type === 'component') {
          componentMap.set(item.id, item.component);
        } else if ('elements' in item) {
          extractComponents(item.elements);
        }
      });
    };
    
    extractComponents(initial);
    
    const reconstruct = (items: SerializedLayoutItem[]): LayoutItem[] => {
      return items.map(item => {
        if (item.type === 'component') {
          const component = componentMap.get(item.id);
          if (!component) {
            return null;
          }
          return {
            ...item,
            component,
          };
        } else {
          return {
            ...item,
            elements: reconstruct(item.elements),
          };
        }
      }).filter(Boolean) as LayoutItem[];
    };
    
    return reconstruct(saved);
  }, []);
  
  const [layout, setLayout] = useState<LayoutItem[]>(() => {
    if (savedLayout && savedLayout.length > 0) {
      return mergeLayouts(savedLayout, initialLayout);
    }
    return initialLayout;
  });

  const handleMakeSerializable = useCallback((items: LayoutItem[]): SerializedLayoutItem[] => {
    return items.map(item => {
      if (item.type === "component") {
        const { component, ...rest } = item;
        void component;
        return rest;
      } else if (item.type === "row" || item.type === "stack") {
        return {
          ...item,
          elements: handleMakeSerializable(item.elements),
        };
      }
      return item;
    });
  }, []);

  useEffect(() => {
    const strippedLayout = handleMakeSerializable(layout);
    onLayoutChange(strippedLayout);
  }, [layout, onLayoutChange, handleMakeSerializable]);

  return <LayoutContainer layout={layout} setLayout={setLayout} />;
};

Dashboard.displayName = "Dashboard";

export default Dashboard;
