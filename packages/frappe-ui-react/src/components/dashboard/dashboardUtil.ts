import { Layout, SerializedLayout } from "./types";

export const flattenLayout = (layout: Layout)  => {
  const flatMap = new Map();

  layout.forEach((row, rowIndex) => {
    row.slots.forEach((slot, slotIndex) => {
      flatMap.set(slot.id, {
        ...slot,
        rowIndex,
        slotIndex,
        rowId: row.id,
      });
    });
  });

  return flatMap;
};

export const validateSerializedLayout = (layout: SerializedLayout) => {
  if (!Array.isArray(layout)) return false;

  for (const row of layout) {
    if ( !row || typeof row.id !== "string" || !Array.isArray(row.slots)) {
      return false;
    }
    for (const slot of row.slots) {
      if (typeof slot?.id !== "string") {
        return false;
      }
    }
  }

  return true;
};

export const deepClone = (layout: Layout): Layout => {
  return layout.map((row) => ({
    ...row,
    slots: row.slots.map((slot) => ({ ...slot })),
  }));
};