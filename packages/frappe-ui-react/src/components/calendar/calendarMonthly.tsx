import React, { useContext, useMemo } from "react";
import clsx from "clsx";

import { daysList, parseDate } from "./calendarUtils";
import { CalendarContext } from "./calendarContext";
import { CalendarEvent } from "./calendarEvent";
import type { CalendarEvent as CalendarEventType } from "./types";
import { ShowMoreCalendarEvent } from "./showMoreCalendarEvent";
import { useCalendarData } from "./hooks/useCalendarData";
import { dayjs } from "../../utils/dayjs";

export const CalendarMonthly = () => {
  const { events, currentMonthDates, currentDate, config, handleCellDblClick } =
    useContext(CalendarContext);
  const { updateEventState, setActiveView, setCurrentDate } =
    useContext(CalendarContext);

  const { timedEvents } = useCalendarData(events, "Month");

  const maxEventsInCell = useMemo(
    () => (currentMonthDates.length > 35 ? 1 : 2),
    [currentMonthDates]
  );

  const isCurrentMonthDate = (date: Date) => {
    return date.getMonth() === currentDate.month();
  };

  const isToday = (date: Date) => {
    return new Date().toDateString() === date.toDateString();
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    eventId: string | number
  ) => {
    if (!eventId || !config.isEditMode) {
      return;
    }
    const target = e.target as HTMLDivElement;
    target.style.opacity = "0.5";
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("calendarEventID", String(eventId));
  };

  const handleDragEnd = (
    e: React.DragEvent<HTMLDivElement>,
    eventId: string | number
  ) => {
    if (!eventId || !config.isEditMode) {
      return;
    }
    const target = e.target as HTMLDivElement;
    target.style.opacity = "1";
    e.dataTransfer.clearData();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, date: Date) => {
    e.preventDefault();
    const eventId = e.dataTransfer.getData("calendarEventID");
    if (!eventId) return;

    const droppedEvent = events.find(
      (event: CalendarEventType) => String(event.id) === eventId
    );
    if (!droppedEvent || parseDate(date) === droppedEvent.date) return;

    updateEventState({ ...droppedEvent, date: parseDate(date) });
  };

  const handleShowMore = (date: Date) => {
    setCurrentDate(dayjs(date));
    setActiveView("Day");
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="grid w-full grid-cols-7 py-2">
        {daysList.map((day) => (
          <span key={day} className="text-center text-base text-ink-gray-5">
            {day}
          </span>
        ))}
      </div>
      <div
        className={clsx(
          "grid w-full flex-1 grid-cols-7 border-gray-200",
          currentMonthDates.length > 35 ? "grid-rows-6" : "grid-rows-5",
          config.noBorder ? "border-t" : "border"
        )}
      >
        {currentMonthDates.map((date: Date) => {
          const dayEvents = timedEvents[parseDate(date)] || [];
          return (
            <div
              key={date.toISOString()}
              className="overflow-y-auto border-t border-l border-gray-200 p-1"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, date)}
            >
              <div
                className={clsx(
                  "flex h-full w-full flex-col items-center gap-1 font-normal",
                  isCurrentMonthDate(date)
                    ? "text-ink-gray-7"
                    : "text-ink-gray-3"
                )}
                onDoubleClick={(e) => handleCellDblClick(e, date.toLocaleDateString("en-CA"))}
              >
                <span
                  className={clsx(
                    "text-xs",
                    isToday(date) &&
                      "flex items-center justify-center h-6 w-6 rounded-full bg-surface-blue-3 text-surface-white font-semibold"
                  )}
                >
                  {date.getDate()}
                </span>
                <div className="w-full">
                  {dayEvents.length <= maxEventsInCell ? (
                    dayEvents.map((event) => (
                      <CalendarEvent
                        key={event.id}
                        event={event}
                        date={date}
                        draggable={config.isEditMode}
                        onDragStart={(e) => {
                          handleDragStart(e, event.id);
                        }}
                        onDragEnd={(e) => {
                          handleDragEnd(e, event.id);
                        }}
                      />
                    ))
                  ) : (
                    <ShowMoreCalendarEvent
                      event={dayEvents[0]}
                      date={date}
                      totalEventsCount={dayEvents.length}
                      onShowMore={() => handleShowMore(date)}
                      draggable={config.isEditMode}
                      onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
                        handleDragStart(e, dayEvents[0].id)
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
