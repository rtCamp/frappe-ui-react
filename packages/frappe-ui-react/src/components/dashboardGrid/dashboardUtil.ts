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
