import type {
  WidgetLayout,
  WidgetSizePresets,
  WidgetDefinition,
  DashboardLayout,
  DashboardLayouts,
  WidgetLayouts,
  Breakpoint,
} from "./types";

/**
 * Convert DashboardLayout to flat WidgetLayout array with positions
 */
export const normalizeLayout = (
  layout: DashboardLayout,
  widgets: WidgetDefinition[],
  sizePresets?: WidgetSizePresets
): WidgetLayout[] => {
  if (!layout || layout.length === 0) return [];

  const result: WidgetLayout[] = [];
  let currentY = 0;

  for (const row of layout) {
    if (!Array.isArray(row)) continue;

    let currentX = 0;
    let maxRowHeight = 1;

    for (const item of row) {
      const widgetLayout: WidgetLayout =
        typeof item === "string" ? { id: item } : { ...item };

      const widgetDef = widgets.find((w) => w.id === widgetLayout.id);
      const resolved = resolveWidgetSize(widgetLayout, sizePresets, widgetDef);

      widgetLayout.x = currentX;
      widgetLayout.y = currentY;

      result.push(widgetLayout);

      currentX += resolved.w;
      maxRowHeight = Math.max(maxRowHeight, resolved.h);
    }

    currentY += maxRowHeight;
  }

  return ensureLayoutKeys(result);
};

/**
 * Resolve widget dimensions from size preset or explicit values
 */
export const resolveWidgetSize = (
  layout: WidgetLayout,
  sizePresets?: WidgetSizePresets,
  widgetDef?: WidgetDefinition
): Required<Pick<WidgetLayout, "w" | "h">> &
  Pick<WidgetLayout, "minW" | "maxW" | "minH" | "maxH" | "isResizable"> => {
  const sizeName = layout.size ?? widgetDef?.size;
  const preset =
    sizeName && sizePresets?.[sizeName] ? sizePresets[sizeName] : null;

  return {
    w: layout.w ?? preset?.w ?? 4,
    h: layout.h ?? preset?.h ?? 4,
    minW: layout.minW ?? preset?.minW,
    maxW: layout.maxW ?? preset?.maxW,
    minH: layout.minH ?? preset?.minH,
    maxH: layout.maxH ?? preset?.maxH,
    isResizable:
      layout.isResizable ?? preset?.isResizable ?? widgetDef?.isResizable,
  };
};

/**
 * Validate dashboard layout array
 */
export const validateLayout = (layout: WidgetLayout[]): boolean => {
  if (!Array.isArray(layout)) return false;
  if (layout.length === 0) return false;

  for (const widget of layout) {
    if (!widget || typeof widget.id !== "string") return false;
    if (typeof widget.x !== "number" || widget.x < 0) return false;
    if (typeof widget.y !== "number" || widget.y < 0) return false;
    if (widget.w !== undefined && widget.w <= 0) return false;
    if (widget.h !== undefined && widget.h <= 0) return false;
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
 * Normalize DashboardLayouts to WidgetLayout per breakpoint
 */
export const normalizeLayouts = (
  layouts: WidgetLayouts,
  widgets: WidgetDefinition[],
  sizes?: WidgetSizePresets
): DashboardLayouts => {
  const normalized: DashboardLayouts = {};

  for (const breakpoint in layouts) {
    const layout = layouts[breakpoint as Breakpoint];
    if (layout) {
      normalized[breakpoint as Breakpoint] = ensureLayoutKeys(
        normalizeLayout(layout, widgets, sizes)
      );
    }
  }

  // Fill missing breakpoints by copying nearest defined layout
  const breakpointOrder: Breakpoint[] = ["lg", "md", "sm", "xs", "xxs"];

  breakpointOrder.forEach((bp, i) => {
    if (normalized[bp]) return;
    const nearestLayout =
      breakpointOrder
        .slice(0, i)
        .reverse()
        .find((b) => normalized[b]) ||
      breakpointOrder.slice(i + 1).find((b) => normalized[b]);

    if (nearestLayout) {
      normalized[bp] = normalized[nearestLayout]!.map((item) => ({ ...item }));
    }
  });

  return normalized;
};

/**
 * Serialize layouts for saving by removing internal tracking keys.
 */
export const serializeLayouts = (
  layouts: DashboardLayouts
): DashboardLayouts => {
  const serialized: DashboardLayouts = {};

  for (const breakpoint in layouts) {
    const layout = layouts[breakpoint as Breakpoint];
    if (layout) {
      serialized[breakpoint as Breakpoint] = layout.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ key, ...item }) => item
      );
    }
  }

  return serialized;
};

/**
 * Deserialize saved layouts and restore with proper keys.
 */
export const deserializeLayouts = (
  layouts: DashboardLayouts
): DashboardLayouts => {
  const deserialized: DashboardLayouts = {};

  for (const breakpoint in layouts) {
    const layout = layouts[breakpoint as Breakpoint];
    if (layout && validateLayout(layout)) {
      deserialized[breakpoint as Breakpoint] = ensureLayoutKeys(layout);
    }
  }

  return deserialized;
};
