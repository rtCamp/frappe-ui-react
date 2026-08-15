import type { ReactNode } from "react";

export type HoverCardSide = "top" | "right" | "bottom" | "left";
export type HoverCardAlign = "start" | "center" | "end";

export interface HoverCardProps {
  /**
   * The content to show inside the HoverCard popup.
   */
  children?: ReactNode;
  /**
   * The trigger element that activates the HoverCard when hovered or focused.
   */
  trigger: ReactNode;
  /**
   * Side of the trigger the card is placed on.
   * @default "bottom"
   */
  side?: HoverCardSide;
  /**
   * Alignment of the card relative to the trigger.
   * @default "start"
   */
  align?: HoverCardAlign;
  /**
   * Distance in pixels between the card and the trigger.
   * @default 4
   */
  offset?: number;
  /**
   * Where the card is teleported to in the DOM. Accepts selector string, element, or null.
   * @default "body"
   */
  portalTo?: string | HTMLElement | null;
  /**
   * Padding (in pixels) kept between the card and the viewport edges when
   * repositioning to avoid collisions.
   * @default 10
   */
  collisionPadding?: number;
  /**
   * Delay (in seconds) from when the pointer enters the trigger until the card opens.
   * @default 0.3
   */
  hoverDelay?: number;
  /**
   * Delay (in seconds) from when the pointer leaves the trigger or card until the card closes.
   * @default 0.3
   */
  leaveDelay?: number;
  /**
   * Render a small arrow pointing at the trigger. Styled to match the panel surface.
   * @default false
   */
  arrow?: boolean;
  /**
   * Whether the preview card is currently open (controlled mode).
   */
  open?: boolean;
  /**
   * Whether the preview card is initially open (uncontrolled mode).
   */
  defaultOpen?: boolean;
  /**
   * Event handler called when the preview card is opened or closed.
   */
  onOpenChange?: (open: boolean) => void;
}
