import { useMemo } from "react";

import {
  calculateMinutes,
  findOverlappingEventsCount,
  groupBy,
  parseDate,
  sortMonthlyEvents,
} from "../calendarUtils";
import type { CalendarEvent } from "../types";

export const useCalendarData = (events: CalendarEvent[], view = "") => {
  const timedEvents = useMemo(() => {
    const groupByDate = groupBy(events, (row) => row.date);
    const sortedArray: { [key: string]: CalendarEvent[] } = {};
    if (view === "Month") {
      for (const [key, value] of Object.entries(groupByDate)) {
        sortedArray[key] = sortMonthlyEvents(value);
      }
    } else {
      for (const [key, value] of Object.entries(groupByDate)) {
        let _value = value;
        _value = value
          .filter((event) => !event.isFullDay)
          .map((task) => {
            task.startTime = calculateMinutes(task.from_time || "00:00");
            task.endTime = calculateMinutes(task.to_time || "00:00");
            return task;
          });
        _value.sort((a, b) => a.startTime - b.startTime);
        sortedArray[key] = findOverlappingEventsCount(_value);
      }
    }
    return sortedArray;
  }, [events, view]);

  const fullDayEvents = useMemo(() => {
    const filtered = events.filter((event) => event.isFullDay);
    return groupBy(filtered, (event: CalendarEvent) => parseDate(event.date));
  }, [events]);

  return { timedEvents, fullDayEvents };
};
