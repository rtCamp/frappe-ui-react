import { useCallback, useEffect, useMemo, useState } from "react";

import type { CalendarConfig, CalendarEvent } from "../types";
import { getCalendarDates, parseDate } from "../calendarUtils";
import { dayjs } from "../../../utils/dayjs";

 
export const useCalendar = (
  initialConfig: Partial<CalendarConfig>,
  initialEvents: any[]
) => {
  const defaultConfig = useMemo(
    () => ({
      defaultMode: "Month",
      isEditMode: false,
      noBorder: false,
    }),
    []
  );
  const config = useMemo(
    () => ({ ...defaultConfig, ...initialConfig }),
    [defaultConfig, initialConfig]
  );

  const [activeView, setActiveView] = useState<string>(config.defaultMode);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEventInfo, setNewEventInfo] = useState<Partial<CalendarEvent>>({});

  const parsedEvents = useMemo(() => {
    return (initialEvents || []).map((event) => {
      const { fromDate, fromTime, toTime, ...rest } = event;
      const date = parseDate(fromDate);
      return event.isFullDay
        ? { ...rest, date }
        : { ...rest, date, from_time: fromTime, to_time: toTime };
    });
  }, [initialEvents]);

  useEffect(() => {
    setEvents(parsedEvents);
  }, [parsedEvents]);

  const createNewEvent = useCallback(
    (event: CalendarEvent) => {
      setEvents((prev) => [...prev, event]);
      if (config.createNewEvent) {
        config.createNewEvent(event);
      }
    },
    [config]
  );

  const openNewEventModal = useCallback((date: Date, time?: string) => {
    setNewEventInfo({ date, from_time: time });
    setShowEventModal(true);
  }, []);

  const handleCellDblClick = useCallback(
    (
      event: React.MouseEvent<Element, MouseEvent>,
      date: Date,
      time: string
    ) => {
      if (event.target !== event.currentTarget) {
        return;
      }
      const data = {
        event,
        date,
        time,
        view: activeView as "Month" | "Day" | "Week",
      };

      if (config.onCellDblClick) {
        config.onCellDblClick(data);
      }

      openNewEventModal(date, time);
    },
    [activeView, config, openNewEventModal]
  );

  const updateEventState = useCallback(
    (updatedEvent: CalendarEvent) => {
      setEvents((prev) =>
        prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
      );
      if (config.updateEventState) {
        config.updateEventState(updatedEvent);
      }
    },
    [config]
  );

  const deleteEvent = useCallback(
    (eventId: string | number) => {
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
      if (config.deleteEvent) {
        config.deleteEvent(eventId);
      }
    },
    [config]
  );

  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();

  const currentMonthDates = useMemo(() => {
    return getCalendarDates(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  const datesInWeeks = useMemo(() => {
    const dates = [...currentMonthDates];
    const weeks: Date[][] = [];
    while (dates.length) {
      weeks.push(dates.splice(0, 7));
    }
    return weeks;
  }, [currentMonthDates]);

  const weekIndex = useMemo(() => {
    return datesInWeeks.findIndex((week) =>
      week.some((d) => dayjs(d).isSame(currentDate, "day"))
    );
  }, [datesInWeeks, currentDate]);

  const increment = useCallback(() => {
    if (activeView === "Month") setCurrentDate((d) => d.add(1, "month"));
    if (activeView === "Week") setCurrentDate((d) => d.add(1, "week"));
    if (activeView === "Day") setCurrentDate((d) => d.add(1, "day"));
  }, [activeView]);

  const decrement = useCallback(() => {
    if (activeView === "Month") setCurrentDate((d) => d.subtract(1, "month"));
    if (activeView === "Week") setCurrentDate((d) => d.subtract(1, "week"));
    if (activeView === "Day") setCurrentDate((d) => d.subtract(1, "day"));
  }, [activeView]);

  useEffect(() => {
    if (!config.enableShortcuts) return;
    const handleShortcuts = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m") setActiveView("Month");
      if (e.key.toLowerCase() === "w") setActiveView("Week");
      if (e.key.toLowerCase() === "d") setActiveView("Day");
      if (e.key === "ArrowLeft") decrement();
      if (e.key === "ArrowRight") increment();
    };
    window.addEventListener("keydown", handleShortcuts);
    return () => window.removeEventListener("keydown", handleShortcuts);
  }, [config.enableShortcuts, decrement, increment]);

  return {
    state: {
      activeView,
      currentDate,
      events,
      config,
      currentMonthDates,
      datesInWeeks,
      weekIndex,
      showEventModal,
      newEventInfo,
    },
    actions: {
      setActiveView,
      increment,
      decrement,
      createNewEvent,
      updateEventState,
      handleCellDblClick,
      deleteEvent,
      openNewEventModal,
      setShowEventModal,
      setCurrentDate,
    },
  };
};
