import type { WidgetLayout } from "./types";

/**
 * Validate dashboard layout array
 */
export const validateLayout = (layout: WidgetLayout[]): boolean => {
  if (!Array.isArray(layout)) return false;

  for (const widget of layout) {
    if (!widget || typeof widget.id !== "string") return false;
    if (typeof widget.x !== "number" || typeof widget.y !== "number") return false;
    if (typeof widget.w !== "number" || typeof widget.h !== "number") return false;
    if (widget.x < 0 || widget.y < 0 || widget.w <= 0 || widget.h <= 0) return false;
  }

  return true;
};

/**
 * Ensure all layout items have unique keys for internal tracking.
 */
export const ensureLayoutKeys = (layouts: WidgetLayout[]): WidgetLayout[] => {
  const keyCount = new Map<string, number>();
  
  return layouts.map((item) => {
    if (item.key) return item;
    
    const count = keyCount.get(item.id) || 0;
    keyCount.set(item.id, count + 1);
    
    return {
      ...item,
      key: count === 0 ? item.id : `${item.id}-${count}`,
    };
  });
};

/**
 * Serialize layout for saving by removing internal tracking keys.
 */
export const serializeLayout = (layout: WidgetLayout[]): WidgetLayout[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return layout.map(({ key, ...item }) => item);
};
