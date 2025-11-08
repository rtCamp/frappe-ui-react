import type { MouseEvent, ReactNode } from "react";

export interface CalendarEvent {
  id: string | number;
  title: string;
  start_time?: string;
  end_time?: string;
  color?: string;
  participant?: string;
  venue?: string;
  isFullDay?: boolean;
  from_time?: string;
  to_time?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface CalendarConfig {
  activeView: "Month" | "Day" | "Week";
  disableModes: string[];
  defaultMode: "Month" | "Day" | "Week";
  isEditMode: boolean;
  eventIcons: Record<string, ReactNode>;
  redundantCellHeight: number;
  hourHeight: number;
  enableShortcuts: boolean;
  showIcon: boolean;
  allowCustomClickEvents: boolean;
  createNewEvent?: (event: CalendarEvent) => void;
  updateEventState?: (updatedEvent: CalendarEvent) => void;
  deleteEvent?: (eventId: string | number) => void;
  onClick?: (data: { event: MouseEvent; calendarEvent: CalendarEvent }) => void;
  onDblClick?: (data: {
    event: MouseEvent;
    calendarEvent: CalendarEvent;
  }) => void;
  onCellDblClick?: (data: {
    event: MouseEvent;
    date: Date;
    time: string;
    view: "Day" | "Week" | "Month";
  }) => void;
  handleCellDblClick?: (event: MouseEvent) => void;
  noBorder?: boolean;
}

export interface CalendarEventProps {
  event: CalendarEvent;
  date: Date;
  extraClassName?: string;
  draggable?: boolean;
  onDragStart?: (
    event: React.DragEvent<HTMLDivElement>,
    id: number | string
  ) => void;
  onDragEnd?: (
    event: React.DragEvent<HTMLDivElement>,
    id: number | string
  ) => void;
}

export interface ColorMap {
  [key: string]: {
    background_color: string;
    border_color: string;
  };
}
