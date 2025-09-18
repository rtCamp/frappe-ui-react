import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

import { Button } from '../button';
import type { CalendarConfig } from './types';
import { CalendarContext } from './calendarContext';
import { CalendarDaily } from './calendarDaily';
import { CalendarMonthly } from './calendarMonthly';
import { CalendarWeekly } from './calendarWeekly';
import NewEventModal from './newEventModalContent';
import { useCalendar } from './hooks/useCalendar';

interface CalendarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events?: any[];
  config?: Partial<CalendarConfig>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  header?: React.FC<any>;
}

export const Calendar = ({ events: initialEvents = [], config: initialConfig = {}, header: CustomHeader }: CalendarProps) => {
  const { state, actions } = useCalendar(initialConfig, initialEvents);
  const { activeView, currentDate, config, showEventModal, newEventInfo, weekIndex, datesInWeeks } = state;
  const { setActiveView, increment, decrement, setShowEventModal } = actions;
  const enabledModes = [
      { id: 'Month', label: 'Month' },
      { id: 'Week', label: 'Week' },
      { id: 'Day', label: 'Day' }
  ].filter(mode => !config.disableModes?.includes(mode.label));

  const renderView = () => {
    switch (activeView) {
      case 'Month':
        return <CalendarMonthly />;
      case 'Week':
        return <CalendarWeekly weeklyDates={datesInWeeks[weekIndex]} />;
      case 'Day':
        return <CalendarDaily />;
      default:
        return null;
    }
  };

  const headerProps = {
      currentMonthYear: currentDate.format('MMMM, YYYY'),
      enabledModes,
      activeView,
      decrement,
      increment,
      updateActiveView: setActiveView
  };

  return (
    <CalendarContext.Provider value={{ ...state, ...actions }}>
      <div className="flex h-full flex-col overflow-hidden">
        {CustomHeader ? (
          <CustomHeader {...headerProps} />
        ) : (
          <div className="mb-2 flex justify-between">
            <span className="text-lg font-medium text-ink-gray-8">
              {headerProps.currentMonthYear}
            </span>
            <div className="flex gap-x-1">
              <Button onClick={decrement} variant="ghost" icon={() => <ChevronLeft size={16} />} />
              <Button onClick={increment} variant="ghost" icon={() => <ChevronRight size={16} />} />
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