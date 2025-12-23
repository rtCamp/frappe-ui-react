import { Layout } from "./types";

export const flattenLayout = (layout: Layout) => {
  const flatMap = new Map();

  layout.forEach((row, rowIndex) => {
    row.forEach((widgetId, slotIndex) => {
      const slotId = `row-${rowIndex}-slot-${slotIndex}`;
      flatMap.set(slotId, { widgetId, rowIndex, slotIndex });
    });
  });

  return flatMap;
};

export const validateSerializedLayout = (layout: Layout): boolean => {
  if (!Array.isArray(layout) || layout.length === 0) return false;
  for (const row of layout) {
    if (!row || !Array.isArray(row)) return false;
    for (const widgetId of row) {
      if (typeof widgetId !== "string") return false;
    }
  }
  return true;
};
