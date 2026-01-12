import type { DashboardLayout } from "./types";

export const validateSerializedLayout = (layout: DashboardLayout): boolean => {
  if (!Array.isArray(layout) || layout.length === 0) return false;
  for (const row of layout) {
    if (!row || !Array.isArray(row)) return false;
    for (const layoutWidget of row) {
      if (typeof layoutWidget?.widgetId !== "string") return false;
    }
  }
  return true;
};

export const parseSlotIds = (activeId: string, overId: string) => {
  const activeMatch = activeId.match(/layout-(\d+)-slot-(\d+)/);
  const overMatch = overId.match(/layout-(\d+)-slot-(\d+)/);

  if (!activeMatch || !overMatch) return false;

  return {
    sourceLayoutIndex: parseInt(activeMatch[1]),
    sourceSlotIndex: parseInt(activeMatch[2]),
    targetLayoutIndex: parseInt(overMatch[1]),
    targetSlotIndex: parseInt(overMatch[2]),
  };
}
