export interface GanttProjectData {
  name: string;
  dateRange?: string;
  client?: string;
  badge?: string;
}

export interface GanttRowData {
  name: string;
  role?: string;
  image?: string;
  badge?: string;
  projects?: GanttProjectData[];
}

export interface GanttGridProps {
  /** ISO date string (YYYY-MM-DD) for any date within the first week displayed. */
  startDate: string;
  /** Number of weeks to display. */
  weekCount?: number;
  /** Row data. If omitted, falls back to rowCount placeholder rows. */
  rows: GanttRowData[];
  /** Whether to include Saturday and Sunday columns. When false, week boundary is every 5th column. */
  showWeekend?: boolean;
}
