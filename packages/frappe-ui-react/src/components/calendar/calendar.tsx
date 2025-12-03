import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { Button } from "../button";
import type { CalendarConfig } from "./types";
import { CalendarContext } from "./calendarContext";
import { CalendarDaily } from "./calendarDaily";
import { CalendarMonthly } from "./calendarMonthly";
import { CalendarWeekly } from "./calendarWeekly";
import NewEventModal from "./newEventModalContent";
import { useCalendar } from "./hooks/useCalendar";
import TabButtons from "../tabButtons";
import { dayjs } from "../../utils/dayjs";

interface CalendarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events?: any[];
  config?: Partial<CalendarConfig>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  header?: React.FC<any>;
}

export const Calendar = ({
  events: initialEvents = [],
  config: initialConfig = {},
  header: CustomHeader,
}: CalendarProps) => {
  const { state, actions } = useCalendar(initialConfig, initialEvents);
  const {
    activeView,
    currentDate,
    config,
    showEventModal,
    newEventInfo,
    weekIndex,
    datesInWeeks,
  } = state;
  const {
    setActiveView,
    increment,
    decrement,
    setShowEventModal,
    setCurrentDate,
  } = actions;
  const enabledModes = [
    { id: "Day", label: "Day" },
    { id: "Week", label: "Week" },
    { id: "Month", label: "Month" },
  ].filter((mode) => !config.disableModes?.includes(mode.label));

  const renderView = () => {
    switch (activeView) {
      case "Month":
        return <CalendarMonthly />;
      case "Week":
        return <CalendarWeekly weeklyDates={datesInWeeks[weekIndex]} />;
      case "Day":
        return <CalendarDaily />;
      default:
        return null;
    }
  };

  const headerProps = {
    currentMonthYear: currentDate.format("MMMM, YYYY"),
    enabledModes,
    activeView,
    decrement,
    increment,
    updateActiveView: setActiveView,
    setCalendarDate: (date: Date) => setCurrentDate(dayjs(date)),
  };

  return (
    <CalendarContext.Provider value={{ ...state, ...actions }}>
      <div className="flex h-full flex-col overflow-hidden">
        {CustomHeader ? (
          <CustomHeader {...headerProps} />
        ) : (
          <div className="flex w-full items-center justify-between gap-4 py-2">
            <h1 className="text-xl font-bold text-ink-gray-8">
              {headerProps.currentMonthYear}
            </h1>
            <div className="flex gap-x-1">
              <Button
                onClick={decrement}
                variant="ghost"
                icon={() => <ChevronLeft size={16} />}
              />
              <Button
                onClick={() => headerProps.setCalendarDate(new Date())}
                variant="ghost"
              >
                Today
              </Button>
              <Button
                onClick={increment}
                variant="ghost"
                icon={() => <ChevronRight size={16} />}
              />
              <TabButtons
                buttons={enabledModes.map(
                  (mode: { id: string; label: string }) => ({
                    value: mode.id,
                    label: mode.label,
                  })
                )}
                value={activeView}
                onChange={(value) => setActiveView(String(value))}
              />
            </div>
          </div>
        )}

        {renderView()}

        {showEventModal && (
          <NewEventModal
            isOpen={showEventModal}
            onClose={() => setShowEventModal(false)}
            event={newEventInfo}
          />
        )}
      </div>
    </CalendarContext.Provider>
  );
};
