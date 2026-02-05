import React, { useCallback, useEffect, useState } from "react";
import { LayoutContainer } from "./layoutContainer";
import type { DashboardProps, LayoutItem, SerializedLayoutItem } from "./types";

export const Dashboard: React.FC<DashboardProps> = ({ initialLayout, savedLayout, onLayoutChange }) => {
  const mergeLayouts = useCallback((saved: SerializedLayoutItem, initial: LayoutItem): LayoutItem => {
    const componentMap = new Map<string, React.ComponentType>();
    
    const extractComponents = (item: LayoutItem) => {
      if (item.type === 'component') {
        componentMap.set(item.id, item.component);
      } else if ('elements' in item) {
        item.elements.forEach(extractComponents);
      }
    };
    
    extractComponents(initial);
    
    const reconstruct = (item: SerializedLayoutItem): LayoutItem => {
      if (item.type === 'component') {
        return {
          ...item,
          component: componentMap.get(item.id) ?? (() => <div>Component Not Found</div>),
        };
      } else {
        return {
          ...item,
          elements: item.elements.map(reconstruct),
        };
      }
    };
    
    return reconstruct(saved);
  }, []);
  
  const [layout, setLayout] = useState<LayoutItem>(() => {
    if (savedLayout) {
      return mergeLayouts(savedLayout, initialLayout);
    }
    return initialLayout;
  });

  const handleMakeSerializable = useCallback((item: LayoutItem): SerializedLayoutItem => {
    if (item.type === "component") {
      const { component, ...rest } = item;
      void component;
      return rest;
    } else if (item.type === "row" || item.type === "stack") {
      return {
        ...item,
        elements: item.elements.map(handleMakeSerializable),
      };
    }
    return item;
  }, []);

  useEffect(() => {
    const strippedLayout = handleMakeSerializable(layout);
    onLayoutChange(strippedLayout);
  }, [layout, onLayoutChange, handleMakeSerializable]);

  return <LayoutContainer layout={layout} setLayout={setLayout} />;
};

Dashboard.displayName = "Dashboard";

export default Dashboard;
