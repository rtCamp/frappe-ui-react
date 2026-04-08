export interface Project {
  name: string;
  dateRange?: string;
  client?: string;
  badge?: string;
}

export interface Member {
  name: string;
  role?: string;
  image?: string;
  badge?: string;
  projects?: Project[];
}

export interface GanttGridProps {
  /** ISO date string (YYYY-MM-DD) for any date within the first week displayed. */
  startDate: string;
  /** Number of weeks to display. */
  weekCount?: number;
  /** Member row data. */
  members: Member[];
  /** Whether to include Saturday and Sunday columns. When false, week boundary is every 5th column. */
  showWeekend?: boolean;
}
