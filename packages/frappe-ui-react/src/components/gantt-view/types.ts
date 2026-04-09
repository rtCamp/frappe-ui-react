export interface Allocation {
  /** Hours per day. */
  hours: number;
  /** First day of the allocation. */
  startDate: Date;
  /** Last day of the allocation (inclusive). */
  endDate: Date;
}

export interface Project {
  name: string;
  dateRange?: string;
  client?: string;
  badge?: string;
  allocation?: Allocation[];
}

export interface Member {
  name: string;
  role?: string;
  image?: string;
  badge?: string;
  projects?: Project[];
}

export interface GanttGridProps {
  /** Any date within the first week to display. */
  startDate: Date;
  /** Number of weeks to display. */
  weekCount?: number;
  /** Member row data. */
  members: Member[];
  /** Whether to include Saturday and Sunday columns. When false, week boundary is every 5th column. */
  showWeekend?: boolean;
}
