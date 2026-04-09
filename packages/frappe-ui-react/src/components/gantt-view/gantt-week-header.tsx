import { addDays, format, isToday } from "date-fns";
import { useGanttStore } from "./gantt-store";
import { CELL_WIDTH } from "./constants";
import { cn } from "../../utils";

interface GanttWeekProps {
  weekIndex: number;
}

export function GanttWeekHeader({ weekIndex }: GanttWeekProps) {
  const { weekStart, daysPerWeek, showWeekend } = useGanttStore((s) => ({
    weekStart: s.weekStart,
    daysPerWeek: s.daysPerWeek,
    showWeekend: s.showWeekend,
  }));

  const weekStartDay = addDays(weekStart, weekIndex * 7);
  const weekEndDay = addDays(weekStartDay, daysPerWeek - 1);
  const endFormat =
    weekEndDay.getMonth() !== weekStartDay.getMonth() ? "MMM d" : "d";
  const label =
    format(weekStartDay, "MMM d") + " - " + format(weekEndDay, endFormat);

  return (
    <th
      colSpan={daysPerWeek}
      className="border-r border-b border-outline-gray-2 bg-surface-white font-normal p-0"
      style={{
        width: daysPerWeek * CELL_WIDTH,
        maxWidth: daysPerWeek * CELL_WIDTH,
      }}
    >
      {/* Week label row */}
      <div className="border-b border-outline-gray-2 p-2">
        <span className="truncate text-xs text-ink-gray-4">{label}</span>
      </div>
      {/* Day numbers row */}
      <div className="flex">
        {Array.from({ length: daysPerWeek }, (_, j) => {
          const i = weekIndex * daysPerWeek + j;
          const day = addDays(weekStart, weekIndex * 7 + j);
          const isTodayDate = isToday(day);
          const isSaturday = (i + 2) % daysPerWeek === 0 && showWeekend;
          const isSunday = (i + 1) % daysPerWeek === 0 && showWeekend;
          return (
            <div
              key={i}
              style={{
                width: CELL_WIDTH,
                height: CELL_WIDTH,
              }}
              className={cn({
                "bg-surface-gray-1 rounded-tr-md": isSunday,
                "bg-surface-gray-1 rounded-tl-md": isSaturday,
              })}
            >
              <span
                className={cn(
                  "rounded-sm text-xs text-ink-gray-4 px-1.5 py-0.5",
                  { "text-white bg-surface-gray-7": isTodayDate }
                )}
              >
                {format(day, "d")}
              </span>
              <span className="absolute bottom-0 right-0 w-1 h-1 border-r border-outline-gray-modals" />
            </div>
          );
        })}
      </div>
    </th>
  );
}
