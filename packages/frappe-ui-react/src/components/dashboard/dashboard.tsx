import React, { useCallback, useEffect, useState } from "react";
import { LayoutContainer } from "./layoutContainer";
import type { DashboardProps, LayoutItem, SerializedLayoutItem } from "./types";

export const Dashboard: React.FC<DashboardProps> = ({ initialLayout, savedLayout, onLayoutChange }) => {
  const handleMakeSerializable = useCallback((item: LayoutItem): SerializedLayoutItem => {
    if (item.type === "component") {
      const { component, props, ...rest } = item;
      void component;
      void props;
      return rest;
    } else if (item.type === "row" || item.type === "stack") {
      return {
        ...item,
        elements: item.elements.map(handleMakeSerializable),
      };
    }
    return item;
  }, []);

  const mergeLayouts = useCallback((saved: SerializedLayoutItem, initial: LayoutItem): LayoutItem => {
    const componentMap = new Map<string, React.ComponentType>();
    const propsMap = new Map<string, Record<string, unknown>>();
    
    const extractComponents = (item: LayoutItem) => {
      if (item.type === 'component') {
        componentMap.set(item.id, item.component);
        propsMap.set(item.id, item.props);
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
          props: propsMap.get(item.id) ?? {},
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

  return <LayoutContainer layout={layout} setLayout={setLayout} />;
};

Dashboard.displayName = "Dashboard";

export default Dashboard;
