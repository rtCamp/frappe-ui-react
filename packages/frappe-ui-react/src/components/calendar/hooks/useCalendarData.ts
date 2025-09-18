import { useMemo } from 'react';

import { groupBy, parseDate } from '../calendarUtils';
import type { CalendarEvent } from '../types';

export const useCalendarData = (events: CalendarEvent[]) => {
  const timedEvents = useMemo(() => {
    const filtered = events.filter(event => !event.isFullDay);
    return groupBy(filtered, (event: CalendarEvent) => parseDate(event.date));
  }, [events]);

  const fullDayEvents = useMemo(() => {
    const filtered = events.filter(event => event.isFullDay);
    return groupBy(filtered, (event: CalendarEvent) => parseDate(event.date));
  }, [events]);

  return { timedEvents, fullDayEvents };
};