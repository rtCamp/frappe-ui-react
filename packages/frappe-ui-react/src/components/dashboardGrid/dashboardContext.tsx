/**
 * External dependencies.
 */
import { createContext, useState, useCallback } from "react";
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
  handleAddWidget?: (widgetId: string) => void;
  setHandleAddWidget: (
    handler: ((widgetId: string) => void) | undefined
  ) => void;
  widgets: WidgetDefinition[];
  setWidgets: (widgets: WidgetDefinition[]) => void;
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
  const [handleAddWidget, setHandleAddWidget] = useState<
    ((widgetId: string) => void) | undefined
  >();
  const [widgets, setWidgets] = useState<WidgetDefinition[]>([]);

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
        handleAddWidget,
        setHandleAddWidget,
        widgets,
        setWidgets,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext };
