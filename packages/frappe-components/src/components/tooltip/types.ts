import type { ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  children: ReactNode;
  body?: ReactNode;
  text?: string;
  placement?: TooltipPlacement;
  hoverDelay?: number; // In seconds
  arrowClass?: string;
  disabled?: boolean;
}