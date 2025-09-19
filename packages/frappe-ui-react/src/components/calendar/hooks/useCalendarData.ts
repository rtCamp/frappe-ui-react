import { useMemo } from 'react';

import { calculateMinutes, findOverlappingEventsCount, groupBy, parseDate, sortMonthlyEvents } from '../calendarUtils';
import type { CalendarEvent } from '../types';

export const useCalendarData = (events: CalendarEvent[], view = '') => {
  const timedEvents = useMemo(() => {
    const groupByDate = groupBy(events, (row) => row.date)
    const sortedArray: {[key: string]: CalendarEvent[]} = {}
    if (view === 'Month') {
      for (const [key, value] of Object.entries(groupByDate)) {
        sortedArray[key] = sortMonthlyEvents(value)
      }
    } else {
      for (const [key, value] of Object.entries(groupByDate)) {
        value.filter((event) => !event.isFullDay).
        map((task) => {
          task.startTime = calculateMinutes(task.fromTime)
          task.endTime = calculateMinutes(task.toTime)
          return task;
        })
        .sort((a, b) => a.startTime - b.startTime)
        sortedArray[key] = findOverlappingEventsCount(value)
      }
    }
    return sortedArray
  }, [events, view]);

  const fullDayEvents = useMemo(() => {
    const filtered = events.filter(event => event.isFullDay);
    return groupBy(filtered, (event: CalendarEvent) => parseDate(event.date));
  }, [events]);

  return { timedEvents, fullDayEvents };
};