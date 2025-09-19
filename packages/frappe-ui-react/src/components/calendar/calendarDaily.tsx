import { useContext, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { parseDate, parseDateWithDay, twelveHoursFormat, twentyFourHoursFormat } from './calendarUtils';
import { CalendarContext } from './calendarContext';
import { CalendarEvent } from './calendarEvent';
import { CalendarTimeMarker } from './calendarTimeMarker';
import { useCalendarData } from './hooks/useCalendarData';


export const CalendarDaily = () => {
  const { handleCellDblClick } = useContext(CalendarContext);
  const { events, config, currentDate } = useContext(CalendarContext);
  const { timedEvents, fullDayEvents } = useCalendarData(events, 'Day');
  const gridRef = useRef<HTMLDivElement>(null);

  const hourHeight = config.hourHeight || 72;

  const timeArray = config.timeFormat === '24h' ? twentyFourHoursFormat : twelveHoursFormat;

  useEffect(() => {
    if (gridRef.current) {
      const currentHour = new Date().getHours();
      gridRef.current.scrollTop = currentHour * hourHeight;
    }
  }, [hourHeight]);

  const parsedCurrentDate = parseDate(currentDate);
  console.log(timeArray, timedEvents[parsedCurrentDate])

  return (
    <div className="h-[90%] min-h-[500px] min-w-[600px]">
      <p className="pb-2 text-base font-semibold text-ink-gray-8">
        {parseDateWithDay(currentDate.toDate(), true)}
      </p>
      <div
        className={clsx(
          "flex h-full w-full overflow-y-scroll border-ink-gray-2",
          config.noBorder ? 'border-t' : 'border border-r-0'
        )}
        ref={gridRef}
      >
        <div className="grid h-full w-16 grid-cols-1">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} style={{ height: `${hourHeight}px` }} />
          ))}
        </div>

        <div className="grid h-full w-full grid-cols-1 pb-2">
          <div className="calendar-column relative border-r border-l border-ink-gray-2">
            <div
              className="flex w-full flex-wrap gap-2 overflow-y-auto border-b border-ink-gray-2 p-1 transition-all"
              style={{ minHeight: `${config.redundantCellHeight}px` }}
            >
              {(fullDayEvents[parsedCurrentDate] || []).map((event, idx) => (
                <CalendarEvent
                  key={event.id}
                  event={{ ...event, idx }}
                  date={currentDate.toDate()}
                  extraClassName="mb-1 w-[20%] cursor-pointer"
                />
              ))}
            </div>
              {timeArray.map(time => (
                <div
                  key={time}
                  className="relative flex text-ink-gray-8"
                  data-time-attr={time}
                  onDoubleClick={(e) => handleCellDblClick(e, currentDate.toDate(), time)}
                >
                  <div
                    className="w-full border-b border-ink-gray-2"
                    style={{ height: `${hourHeight}px` }}
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