import { CalendarEvent as EventComponent } from "./calendarEvent";

import type { CalendarEvent } from "./types";

interface ShowMoreCalendarEventProps {
  event: CalendarEvent;
  date: Date;
  totalEventsCount: number;
  onShowMore: () => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  draggable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const ShowMoreCalendarEvent = ({
  event,
  date,
  totalEventsCount,
  onShowMore,
  ...rest
}: ShowMoreCalendarEventProps) => {
  return (
    <>
      <EventComponent
        event={event}
        date={date}
        extraClassName="mb-1 cursor-pointer"
        {...rest}
      />
      {totalEventsCount > 1 && (
        <span
          className="mx-1 w-fit cursor-pointer rounded-sm p-px px-1.5 text-base font-medium text-gray-600 hover:bg-gray-100"
          onClick={onShowMore}
        >
          +{totalEventsCount - 1} more
        </span>
      )}
    </>
  );
};
