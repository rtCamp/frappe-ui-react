import { ChevronDown, ChevronUp } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import {
  parseDate,
  parseDateWithDay,
  twelveHoursFormat,
  twentyFourHoursFormat,
} from "./calendarUtils";
import { Button } from "../button";
import { CalendarContext } from "./calendarContext";
import { CalendarEvent } from "./calendarEvent";
import { CalendarTimeMarker } from "./calendarTimeMarker";
import { ShowMoreCalendarEvent } from "./showMoreCalendarEvent";
import { useCalendarData } from "./hooks/useCalendarData";

import "./calendarWeekly.css";

interface CalendarWeeklyProps {
  weeklyDates: Date[];
}

export const CalendarWeekly = ({ weeklyDates }: CalendarWeeklyProps) => {
  const { handleCellDblClick } = useContext(CalendarContext);
  const { events, config } = useContext(CalendarContext);
  const { timedEvents, fullDayEvents } = useCalendarData(events);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showCollapsable, setShowCollapsable] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);
  const allDayCellsRef = useRef<(HTMLDivElement | null)[]>([]);

  const hourHeight = config.hourHeight || 72;
  const timeArray =
    config.timeFormat === "24h" ? twentyFourHoursFormat : twelveHoursFormat;

  const isToday = (date: Date) =>
    new Date(date).toDateString() === new Date().toDateString();

  useEffect(() => {
    const getCellHeight = (length: number) =>
      config.redundantCellHeight + 36 * (length - 1);

    const relevantDates = weeklyDates.map((d) => parseDate(d));
    const eventsInWeek = Object.entries(fullDayEvents).filter(([date]) =>
      relevantDates.includes(date)
    );
    const maxEventsInDay = Math.max(
      0,
      ...eventsInWeek.map(([, dayEvents]) => dayEvents.length)
    );

    setShowCollapsable(maxEventsInDay > 3);
    const height = isCollapsed
      ? 56
      : getCellHeight(Math.max(1, maxEventsInDay));

    allDayCellsRef.current.forEach((cell) => {
      if (cell) cell.style.height = `${height}px`;
    });
  }, [fullDayEvents, weeklyDates, isCollapsed, config.redundantCellHeight]);

  useEffect(() => {
    if (gridRef.current) {
      const currentHour = new Date().getHours();
      gridRef.current.scrollTop = currentHour * hourHeight;
    }
  }, [hourHeight]);

  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="flex border-b">
        <div className="w-16"></div>
        <div className="grid w-full grid-cols-7">
          {weeklyDates.map((date) => (
            <div
              key={date.toISOString()}
              className={clsx(
                "relative p-2 text-center text-sm",
                isToday(date)
                  ? "font-semibold text-ink-gray-8"
                  : "font-normal text-ink-gray-6"
              )}
            >
              {isToday(date) && (
                <div className="absolute left-1/2 -translate-x-1/2 top-0 h-0.5 w-5 bg-ink-gray-7" />
              )}
              {parseDateWithDay(date)}
            </div>
          ))}
        </div>
      </div>

      <div
        className="relative flex h-full flex-col overflow-auto border-ink-gray-2"
        ref={gridRef}
      >
        <div className="flex">
          <div className="grid w-16 grid-cols-1">
            <div
              ref={(el) => {
                if (!allDayCellsRef.current) {
                  allDayCellsRef.current = [];
                }
                allDayCellsRef.current[0] = el;
              }}
              style={{ height: "56px" }}
            />
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} style={{ height: `${hourHeight}px` }} />
            ))}
          </div>
          <div className="flex w-full flex-col">
            <div className="grid w-full grid-cols-7 relative">
              {showCollapsable && (
                <Button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="absolute -left-10 bottom-1 z-10"
                  icon={ () =>
                    isCollapsed ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronUp size={16} />
                    )
                  }
                  variant="ghost"
                />
              )}
              {weeklyDates.map((date, idx) => (
                <div
                  key={date.toISOString()}
                  ref={(el) => {
                    if (!allDayCellsRef.current) {
                      allDayCellsRef.current = [];
                    }
                    allDayCellsRef.current[idx] = el;
                  }}
                  className="flex w-full flex-col gap-1 border-b border-r border-ink-gray-2 p-1 transition-all"
                >
                  {!isCollapsed
                    ? (fullDayEvents[parseDate(date)] || []).map(
                        (event, eventIdx) => (
                          <CalendarEvent
                            key={event.id}
                            event={{ ...event, idx: eventIdx }}
                            date={date}
                          />
                        )
                      )
                    : (fullDayEvents[parseDate(date)] || []).length > 0 && (
                        <ShowMoreCalendarEvent
                          event={fullDayEvents[parseDate(date)][0]}
                          date={date}
                          totalEventsCount={
                            fullDayEvents[parseDate(date)].length
                          }
                          onShowMore={() => setIsCollapsed(false)}
                        />
                      )}
                </div>
              ))}
            </div>
            <div className="grid w-full grid-cols-7">
              {weeklyDates.map((date) => (
                <div
                  key={date.toISOString()}
                  className="relative w-full border-r border-ink-gray-2"
                  data-date-attr={date.toISOString()}
                >
                  {timeArray.map((time, i) => (
                    <div
                      key={time}
                      className="cell relative flex cursor-pointer"
                      onDoubleClick={(e) =>
                        handleCellDblClick(e, date, time)
                      }
                    >
                      <div
                        className={clsx(
                          "w-full border-b border-ink-gray-2",
                          i === timeArray.length - 1 && "border-b-0"
                        )}
                        style={{ height: `${hourHeight}px` }}
                      />
                    </div>
                  ))}
                  {(timedEvents[parseDate(date)] || []).map((event) => (
                    <CalendarEvent key={event.id} event={event} date={date} />
                  ))}
                  <CalendarTimeMarker date={date} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
