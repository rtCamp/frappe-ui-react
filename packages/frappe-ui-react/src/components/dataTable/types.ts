export interface DataTableColumn<T = unknown> {
  /**
   * Unique identifier for the column
   */
  id: string;
  /**
   * Header label for the column
   */
  label: string;
  /**
   * Accessor function or key to get the value from row data
   */
  accessor: keyof T | ((row: T) => React.ReactNode);
  /**
   * Whether the column is sortable
   * @default false
   */
  sortable?: boolean;
  /**
   * Whether the column is resizable
   * @default false
   */
  resizable?: boolean;
  /**
   * Minimum width of the column
   */
  minWidth?: number;
  /**
   * Maximum width of the column
   */
  maxWidth?: number;
  /**
   * Default width of the column
   */
  width?: number;
  /**
   * Custom render function for the cell
   */
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  /**
   * Custom render function for the header
   */
  renderHeader?: () => React.ReactNode;
  /**
   * Alignment of the column content
   * @default "left"
   */
  align?: "left" | "center" | "right";
}

export type SortDirection = "asc" | "desc" | null;

export interface DataTableProps<T = unknown> {
  /**
   * Array of data rows
   */
  data: T[];
  /**
   * Column definitions
   */
  columns: DataTableColumn<T>[];
  /**
   * Whether to show loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Whether rows are selectable
   * @default false
   */
  selectable?: boolean;
  /**
   * Selected row IDs
   */
  selectedRows?: string[];
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selectedRows: string[]) => void;
  /**
   * Key to use for row identification
   * @default "id"
   */
  rowKey?: keyof T | ((row: T) => string);
  /**
   * Current sort configuration
   */
  sort?: {
    columnId: string;
    direction: SortDirection;
  };
  /**
   * Callback when sort changes
   */
  onSortChange?: (columnId: string, direction: SortDirection) => void;
  /**
   * Pagination configuration
   */
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  };
  /**
   * Whether to show pagination
   * @default false
   */
  showPagination?: boolean;
  /**
   * Custom empty state message
   */
  emptyMessage?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom row class name function
   */
  getRowClassName?: (row: T, index: number) => string;
  /**
   * Callback when a row is clicked
   */
  onRowClick?: (row: T, index: number) => void;
  /**
   * Callback when a row is edited
   */
  onRowEdit?: (row: T, index: number) => void;
  /**
   * Callback when a row is deleted
   */
  onRowDelete?: (row: T, index: number) => void;
  /**
   * Whether to show edit and delete buttons
   * @default false
   */
  showActions?: boolean;
  /**
   * Custom label for edit button
   * @default "Edit"
   */
  editLabel?: string;
  /**
   * Custom label for delete button
   * @default "Delete"
   */
  deleteLabel?: string;
}


