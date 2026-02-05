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
