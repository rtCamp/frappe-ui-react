import { CELL_WIDTH, FULL_DAY_HOURS } from "../constants";
import { useGanttStore } from "../gantt-store";
import type { Allocation } from "../types";
import { getNumDays } from "./utilities/getNumDays";
import { GanttBar } from "./gantt-bar";

interface GanttMemberBarProps {
  allocation: Allocation;
}

export function GanttMemberBar({ allocation }: GanttMemberBarProps) {
  const { weekStart, showWeekend } = useGanttStore((s) => ({
    weekStart: s.weekStart,
    showWeekend: s.showWeekend,
    columnCount: s.columnCount,
  }));

  const numDays =
    getNumDays(allocation.endDate, allocation.startDate, showWeekend) + 1;
  const left =
    getNumDays(allocation.startDate, weekStart, showWeekend) * CELL_WIDTH;

  const { hours } = allocation;
  const diff = hours - FULL_DAY_HOURS;
  const isFull = diff === 0;
  const isOver = diff > 0;

  const variant = isFull ? "full" : isOver ? "over" : "under";
  const label = isFull
    ? "Full"
    : isOver
      ? `${diff}h over`
      : `${Math.abs(diff)}h free`;

  return (
    <GanttBar
      variant={variant}
      label={label}
      left={left}
      width={numDays * CELL_WIDTH}
    />
  );
}

GanttMemberBar.displayName = "GanttMemberBar";
