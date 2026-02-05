import type { WidgetLayout, WidgetSizePresets, WidgetDefinition } from "./types";

/**
 * Resolve widget dimensions from size preset or explicit values
 */
export const resolveWidgetSize = (
  layout: WidgetLayout,
  sizePresets?: WidgetSizePresets,
  widgetDef?: WidgetDefinition
): Required<Pick<WidgetLayout, 'w' | 'h'>> & Pick<WidgetLayout, 'minW' | 'maxW' | 'minH' | 'maxH' | 'isResizable'> => {
  const sizeName = layout.size ?? widgetDef?.size;
  const preset = sizeName && sizePresets?.[sizeName] ? sizePresets[sizeName] : null;

  return {
    w: layout.w ?? preset?.w ?? 4,
    h: layout.h ?? preset?.h ?? 4,
    minW: layout.minW ?? preset?.minW,
    maxW: layout.maxW ?? preset?.maxW,
    minH: layout.minH ?? preset?.minH,
    maxH: layout.maxH ?? preset?.maxH,
    isResizable: layout.isResizable ?? preset?.isResizable ?? widgetDef?.isResizable,
  };
};

/**
 * Validate dashboard layout array
 */
export const validateLayout = (layout: WidgetLayout[]): boolean => {
  if (!Array.isArray(layout)) return false;

  for (const widget of layout) {
    if (!widget || typeof widget.id !== "string") return false;
    if (typeof widget.x !== "number" || typeof widget.y !== "number") return false;
    if (widget.x < 0 || widget.y < 0) return false;
    
    const hasSize = widget.size || (typeof widget.w === "number" && typeof widget.h === "number");
    if (!hasSize) return false;
    
    if (widget.w !== undefined && (widget.w <= 0)) return false;
    if (widget.h !== undefined && (widget.h <= 0)) return false;
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
