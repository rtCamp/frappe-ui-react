import { ChevronDown, ChevronUp } from "lucide-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
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
  const { timedEvents, fullDayEvents } = useCalendarData(events, "Week");

  const [isCollapsed, setIsCollapsed] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const allDayCellsRef = useRef<(HTMLDivElement | null)[]>([]);

  const hourHeight = config.hourHeight || 72;
  const timeArray =
    config.timeFormat === "24h" ? twentyFourHoursFormat : twelveHoursFormat;

  const isToday = (date: Date) =>
    new Date(date).toDateString() === new Date().toDateString();
  const showCollapsable = useMemo(() => {
    const relevantDates = weeklyDates.map((d) => parseDate(d));
    const eventsInWeek = Object.entries(fullDayEvents).filter(([date]) =>
      relevantDates.includes(date)
    );
    const maxEventsInDay = Math.max(
      0,
      ...eventsInWeek.map(([, dayEvents]) => dayEvents.length)
    );
    return maxEventsInDay > 3;
  }, [weeklyDates, fullDayEvents]);

  useEffect(() => {
    if (gridRef.current) {
      const currentHour = new Date().getHours();
      gridRef.current.scrollTop = currentHour * hourHeight;
    }
  }, [hourHeight]);

  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="flex border-b border-gray-200">
        <div className="w-20"></div>
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
                <div className="absolute left-1/2 -translate-x-1/2 top-0 h-0.5 w-5 bg-gray-200" />
              )}
              {parseDateWithDay(date)}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`flex shrink-0 h-fit border-outline-gray-1 ${
          config.noBorder ? "border-b-[1px]" : "border-[1px] border-t-0"
        }`}
      >
        <div className="flex justify-center items-start py-0.5 w-20 text-base text-ink-gray-6 text-center">
          {showCollapsable && (
            <Button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -left-10 bottom-1 z-10"
              icon={() =>
                isCollapsed ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronUp size={16} />
                )
              }
              variant="ghost"
            />
          )}
          <div className="text-sm text-ink-gray-6 h-[29px] inline-flex items-center">
            All day
          </div>
        </div>
        <div className="grid w-full grid-cols-7 relative">
          {weeklyDates.map((date, idx) => (
            <div
              key={date.toISOString()}
              ref={(el) => {
                if (!allDayCellsRef.current) {
                  allDayCellsRef.current = [];
                }
                allDayCellsRef.current[idx] = el;
              }}
              className="flex w-full flex-col gap-1 border-b border-gray-200 p-1 transition-all"
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
                      totalEventsCount={fullDayEvents[parseDate(date)].length}
                      onShowMore={() => setIsCollapsed(false)}
                    />
                  )}
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex h-full flex-col overflow-auto border-gray-200 border-outline-gray-1 border-b-[1px] border-l-[1px]"
        ref={gridRef}
      >
        <div className="flex">
          <div className="grid w-20 grid-cols-1">
            <div
              ref={(el) => {
                if (!allDayCellsRef.current) {
                  allDayCellsRef.current = [];
                }
                allDayCellsRef.current[0] = el;
              }}
              style={{ height: "56px" }}
            />
            {Array.from({ length: 23 }).map((_, i) => (
              <div key={i} style={{ height: `${hourHeight}px` }} />
            ))}
          </div>
          <div className="flex w-full flex-col">
            <div className="grid w-full grid-cols-7">
              {weeklyDates.map((date, index) => (
                <div
                  key={date.toISOString()}
                  className="relative w-full border-r border-gray-200"
                  data-date-attr={date.toISOString()}
                >
                  {timeArray.map((time, i) => (
                    <div
                      key={time}
                      className="cell relative flex flex-col cursor-pointer calendar-column"
                    >
                      <div
                        className={clsx(
                          "w-full border-b border-gray-200 text-ink-gray-8",
                          i === timeArray.length - 1 && "border-b-0"
                        )}
                        style={{ height: `${hourHeight}px` }}
                        data-time-attr={
                          index === 0 && i >= 1 ? timeArray[i] : undefined
                        }
                        onDoubleClick={(e) =>
                          handleCellDblClick(
                            e,
                            date.toLocaleDateString("en-CA"),
                            time
                          )
                        }
                        onClick={(e) =>
                          handleCellDblClick(
                            e,
                            date.toLocaleDateString("en-CA"),
                            time
                          )
                        }
                      />
                    </div>
                  ))}
                  {(timedEvents[parseDate(date)] || []).map((event, idx) => (
                    <CalendarEvent
                      key={event.id}
                      event={{ ...event, idx }}
                      date={date}
                    />
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
