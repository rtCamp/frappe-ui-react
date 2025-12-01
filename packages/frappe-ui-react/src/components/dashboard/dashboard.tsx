import React, { useCallback, useEffect, useState } from "react";
import { LayoutContainer } from "./layoutContainer";
import type { DashboardProps, Layout, SerializedLayout } from "./types";
import { validateSerializedLayout } from "./dashboardUtil";

export const Dashboard: React.FC<DashboardProps> = ({
  initialLayout,
  layoutLock = false,
  dragHandle = false,
  dragHandleOnHover = false,
  savedLayout,
  onLayoutChange,
}) => {
  const handleMakeSerializable = useCallback(
    (layout: Layout): SerializedLayout => {
      return layout.map((row) => ({
        ...row,
        slots: row.slots.map(({ component, props, ...rest }) => {
          void component;
          void props;
          return rest;
        }),
      }));
    },
    []
  );

  const mergeLayouts = useCallback(
    (saved: SerializedLayout, initial: Layout): Layout => {
      if (!validateSerializedLayout(saved)) {
        return initial;
      }

      const componentMap = new Map();

      initial.forEach((row) => {
        row.slots.forEach((slot) => {
          componentMap.set(slot.id, {
            component: slot.component,
            props: slot.props,
          });
        });
      });

      return saved.map((savedRow) => {
        return {
          ...savedRow,
          slots: savedRow.slots.map((savedSlot) => {
            const comp = componentMap.get(savedSlot.id);
            return {
              ...savedSlot,
              component:
                comp?.component ??
                (() => (
                  <span className="text-sm text-ink-gray-5">
                    Component Not Found
                  </span>
                )),
              props: comp?.props ?? {},
            };
          }),
        };
      });
    },
    []
  );

  const [layout, setLayout] = useState<Layout>(() => {
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
    const serialized = handleMakeSerializable(layout);
    onLayoutChange(serialized);
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
