export interface TimelineItem {
  /**
   * Unique identifier for the timeline item
   */
  id: string;
  /**
   * Title of the timeline item
   */
  title: string;
  /**
   * Description or content of the timeline item
   */
  description?: string;
  /**
   * Timestamp of the event
   */
  timestamp: string | Date;
  /**
   * Custom icon for the item
   */
  icon?: React.ReactNode;
  /**
   * Color theme for the item
   * @default "blue"
   */
  color?: "blue" | "green" | "red" | "yellow" | "gray" | "purple";
  /**
   * Additional metadata
   */
  metadata?: Record<string, unknown>;
  /**
   * Custom content to render
   */
  content?: React.ReactNode;
}

export interface TimelineProps {
  /**
   * Array of timeline items
   */
  items: TimelineItem[];
  /**
   * Orientation of the timeline
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal";
  /**
   * Variant of the timeline
   * @default "default"
   */
  variant?: "default" | "compact" | "detailed";
  /**
   * Whether to show timestamps
   * @default true
   */
  showTimestamps?: boolean;
  /**
   * Whether to show icons
   * @default true
   */
  showIcons?: boolean;
  /**
   * Custom render function for items
   */
  renderItem?: (item: TimelineItem, index: number) => React.ReactNode;
  /**
   * Custom class name
   */
  className?: string;
}

export interface ActivityFeedProps extends TimelineProps {
  /**
   * Maximum number of items to show (0 = show all)
   * @default 0
   */
  maxItems?: number;
  /**
   * Whether to show "Load More" button
   * @default false
   */
  showLoadMore?: boolean;
  /**
   * Callback when "Load More" is clicked
   */
  onLoadMore?: () => void;
  /**
   * Custom empty state message
   */
  emptyMessage?: string;
}


