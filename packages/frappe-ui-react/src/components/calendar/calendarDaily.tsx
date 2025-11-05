import { useContext, useEffect, useRef } from "react";
import clsx from "clsx";

import {
  parseDate,
  parseDateWithDay,
  twelveHoursFormat,
  twentyFourHoursFormat,
} from "./calendarUtils";
import { CalendarContext } from "./calendarContext";
import { CalendarEvent } from "./calendarEvent";
import { CalendarTimeMarker } from "./calendarTimeMarker";
import { useCalendarData } from "./hooks/useCalendarData";

export const CalendarDaily = () => {
  const { handleCellDblClick } = useContext(CalendarContext);
  const { events, config, currentDate } = useContext(CalendarContext);
  const { timedEvents, fullDayEvents } = useCalendarData(events, "Day");
  const gridRef = useRef<HTMLDivElement>(null);

  const hourHeight = config.hourHeight || 72;

  const timeArray =
    config.timeFormat === "24h" ? twentyFourHoursFormat : twelveHoursFormat;

  useEffect(() => {
    if (gridRef.current) {
      const currentHour = new Date().getHours();
      gridRef.current.scrollTop = currentHour * hourHeight;
    }
  }, [hourHeight]);

  const parsedCurrentDate = parseDate(currentDate);

  return (
    <div className="h-[90%] min-h-[500px] min-w-[600px]">
      <p className="pb-2 text-base font-semibold text-ink-gray-8">
        {parseDateWithDay(currentDate.toDate(), true)}
      </p>
      <div
        className={`flex shrink-0 h-fit border-outline-gray-1 ${
          config.noBorder ? 'border-t-[1px]' : 'border-[1px] border-b-0'
        }`}
      >
        <div className="flex justify-center items-start py-0.5 w-20 text-base text-ink-gray-6 text-center">
          <div className="text-sm text-ink-gray-6 h-[29px] inline-flex items-center">
            All day
          </div>
        </div>
        <div className="grid w-full grid-cols-7 relative">
          {(fullDayEvents[parsedCurrentDate] || []).map((event, idx) => (
            <CalendarEvent
              key={event.id}
              event={{ ...event, idx }}
              date={currentDate.toDate()}
              extraClassName="mb-1 w-[20%] cursor-pointer"
            />
          ))}
        </div>
      </div>
      <div
        className={clsx(
          "flex h-full w-full overflow-y-scroll border-gray-200",
          config.noBorder ? "border-t" : "border border-r-0"
        )}
        ref={gridRef}
      >
        <div className="grid h-full w-16 grid-cols-1">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} style={{ height: `${hourHeight}px` }} />
          ))}
        </div>

        <div className="grid h-full w-full grid-cols-1 pb-2">
          <div className="calendar-column relative border-r border-l border-gray-200">
            {timeArray.map((time, timeIndex) => (
              <div
                key={time}
                className="relative flex text-ink-gray-8 cursor-pointer"
                data-time-attr={timeIndex !== 0 ? time : undefined}
              >
                <div
                  className="w-full border-b border-gray-200"
                  style={{ height: `${hourHeight}px` }}
                  onClick={(e) =>
                    handleCellDblClick(e, currentDate.toDate().toLocaleDateString("en-CA"), twentyFourHoursFormat[timeIndex])
                  }
                  onDoubleClick={(e) =>
                    handleCellDblClick(e, currentDate.toDate().toLocaleDateString("en-CA"), twentyFourHoursFormat[timeIndex])
                  }
                />
              </div>
            ))}
            {(timedEvents[parsedCurrentDate] || []).map((event) => (
              <CalendarEvent
                key={event.id}
                event={event}
                date={currentDate.toDate()}
                extraClassName="absolute mb-2 cursor-pointer"
              />
            ))}
            <CalendarTimeMarker date={currentDate.toDate()} />
          </div>
        </div>
      </div>
    </div>
  );
};
