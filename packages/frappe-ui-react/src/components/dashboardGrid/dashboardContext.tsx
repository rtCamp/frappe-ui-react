/**
 * External dependencies.
 */
import { createContext, useContext, useState, useCallback } from "react";
import React from "react";

/**
 * Internal dependencies.
 */
import type { WidgetDefinition } from "./types";

export interface DraggingWidgetData {
  widgetId: string;
  w: number;
  h: number;
  widget?: WidgetDefinition;
}

export interface DashboardContextValue {
  draggingWidget: DraggingWidgetData | null;
  setDraggingWidget: (widget: DraggingWidgetData | null) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export interface DashboardProviderProps {
  children: React.ReactNode;
}

/**
 * Optional provider for sharing drag state between Dashboard and WidgetGallery.
 */
export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const [draggingWidget, setDraggingWidget] =
    useState<DraggingWidgetData | null>(null);

  const handleSetDraggingWidget = useCallback(
    (widget: DraggingWidgetData | null) => {
      setDraggingWidget(widget);
    },
    []
  );

  return (
    <DashboardContext.Provider
      value={{
        draggingWidget,
        setDraggingWidget: handleSetDraggingWidget,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = (): DashboardContextValue | null => {
  return useContext(DashboardContext);
};
