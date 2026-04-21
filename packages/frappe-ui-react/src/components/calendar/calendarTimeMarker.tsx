import { useContext, useEffect, useMemo, useState } from "react";

import { CalendarContext } from "./calendarContext";

interface CalendarTimeMarkerProps {
  date: Date;
  redundantCellHeight?: number;
}

export const CalendarTimeMarker = ({
  date,
  redundantCellHeight = 0,
}: CalendarTimeMarkerProps) => {
  const { config } = useContext(CalendarContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timerId);
  }, []);

  const isToday = useMemo(() => {
    return new Date(date).toDateString() === currentTime.toDateString();
  }, [date, currentTime]);

  const topPositionStyle = useMemo(() => {
    const hourHeight = config.hourHeight || 72;
    const minuteHeight = hourHeight / 60;
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const top = (hours * 60 + minutes) * minuteHeight + redundantCellHeight;
    return { top: `${top}px` };
  }, [currentTime, config.hourHeight, redundantCellHeight]);

  if (!isToday) {
    return null;
  }

  return (
    <div
      className="absolute left-0 right-0 z-10 w-full pl-2"
      style={topPositionStyle}
    >
      <div className="relative h-0.5 bg-red-600">
        <span className="absolute -left-2 top-1/2 block h-3 w-3 -translate-y-1/2 rounded-full bg-red-600" />
      </div>
    </div>
  );
};
