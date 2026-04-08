import React from "react";
import { addDays, format, isToday, startOfWeek } from "date-fns";
import { cn, getUTCDateTime } from "../../utils";
import { CELL_HEIGHT, CELL_WIDTH } from "./constants";

export interface GanttGridProps {
  /** ISO date string (YYYY-MM-DD) for any date within the first week displayed. */
  startDate: string;
  /** Number of weeks to display. */
  weekCount?: number;
  /** Total number of rows (tasks / members). */
  rowCount?: number;
  /** Whether to include Saturday and Sunday columns. When false, week boundary is every 5th column. */
  showWeekend?: boolean;
}

export const GanttGrid: React.FC<GanttGridProps> = ({
  startDate,
  weekCount = 3,
  rowCount = 50,
  showWeekend = true,
}) => {
  const daysPerWeek = showWeekend ? 7 : 5;
  const columnCount = weekCount * daysPerWeek;

  const weekStart = startOfWeek(getUTCDateTime(startDate), { weekStartsOn: 1 });

  const weeks = Array.from({ length: weekCount }, (_, i) => i);
  const columns = Array.from({ length: columnCount }, (_, i) => i);
  const rows = Array.from({ length: rowCount }, (_, i) => i);

  return (
    <table
      className="relative w-screen h-screen overflow-scroll"
      style={{ width: columnCount * CELL_WIDTH }}
    >
      <thead className="sticky top-0" data-testid="gantt-header">
        {/* Row 1: week range labels */}
        <tr>
          {weeks.map((weekIndex) => {
            const weekStartDay = addDays(weekStart, weekIndex * daysPerWeek);
            const weekEndDay = addDays(weekStartDay, daysPerWeek - 1);
            const label =
              format(weekStartDay, "MMM d") + " - " + format(weekEndDay, "d");
            return (
              <th
                key={weekIndex}
                colSpan={daysPerWeek}
                className="border-b border-r border-outline-gray-2 bg-surface-white px-2 py-1.5 font-normal"
                style={{
                  height: CELL_HEIGHT,
                  width: daysPerWeek * CELL_WIDTH,
                }}
              >
                <span className="truncate text-xs text-ink-gray-4">
                  {label}
                </span>
              </th>
            );
          })}
        </tr>

        {/* Row 2: individual day numbers */}
        <tr>
          {columns.map((i) => {
            const day = addDays(weekStart, i);
            const isTodayDate = isToday(day);
            const isSaturday = (i + 2) % daysPerWeek === 0;
            const isSunday = (i + 1) % daysPerWeek === 0;
            return (
              <th
                key={i}
                className={cn(
                  "font-normal relative border-b border-outline-gray-2",
                  {
                    "border-r border-outline-gray-2 bg-surface-gray-1 rounded-tr-md":
                      isSunday,
                    "bg-surface-gray-1 rounded-tl-md": isSaturday,
                  }
                )}
                style={{ height: CELL_HEIGHT, width: CELL_WIDTH }}
              >
                <span
                  className={cn(
                    "px-1 py-0.5 rounded-sm text-xs text-ink-gray-4 last:border-2",
                    {
                      "text-white bg-surface-gray-6": isTodayDate,
                    }
                  )}
                >
                  {format(day, "d")}
                </span>
                <span className="absolute bottom-0 right-0 w-1 h-1 border-r border-outline-gray-modals"></span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {rows.map((rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((i) => {
              const isSaturday = (i + 2) % daysPerWeek === 0;
              const isSunday = (i + 1) % daysPerWeek === 0;
              return (
                <td
                  key={i}
                  className={cn({
                    "border-r border-outline-gray-2": isSunday,
                    "bg-surface-gray-1": isSaturday || isSunday,
                  })}
                  style={{ height: CELL_HEIGHT, width: CELL_WIDTH }}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

GanttGrid.displayName = "GanttGrid";
