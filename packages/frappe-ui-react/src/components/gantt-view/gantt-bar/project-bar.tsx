import { CELL_WIDTH } from "../constants";
import { useGanttStore } from "../gantt-store";
import type { Allocation } from "../types";
import { getNumDays } from "./utilities/getNumDays";
import { GanttBar } from "./gantt-bar";

interface GanttProjectBarProps {
  allocation: Allocation;
}

export function GanttProjectBar({ allocation }: GanttProjectBarProps) {
  const { weekStart, showWeekend } = useGanttStore((s) => ({
    weekStart: s.weekStart,
    showWeekend: s.showWeekend,
    columnCount: s.columnCount,
  }));

  const numDays =
    getNumDays(allocation.endDate, allocation.startDate, showWeekend) + 1;
  const left =
    getNumDays(allocation.startDate, weekStart, showWeekend) * CELL_WIDTH;
  const label = `${allocation.hours}h/day for ${numDays} day${numDays !== 1 ? "s" : ""}`;

  return (
    <GanttBar
      variant="project"
      label={label}
      left={left}
      width={numDays * CELL_WIDTH}
    />
  );
}

GanttProjectBar.displayName = "GanttProjectBar";
