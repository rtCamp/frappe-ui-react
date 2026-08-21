/**
 * External dependencies.
 */
import type { ReactNode, RefObject } from "react";

export type TooltipPlacement = "top" | "right" | "bottom" | "left";

export type TooltipShowWhen = "always" | "truncated";

export interface TooltipProps {
  children: ReactNode;
  body?: ReactNode;
  text?: string;
  placement?: TooltipPlacement;
  hoverDelay?: number; // In seconds
  arrowClass?: string;
  disabled?: boolean;
  /** Determines when the tooltip should be shown. */
  showWhen?: TooltipShowWhen;
  /** A ref to the element that should be checked for truncation. */
  truncationRef?: RefObject<HTMLElement | null>;
}
