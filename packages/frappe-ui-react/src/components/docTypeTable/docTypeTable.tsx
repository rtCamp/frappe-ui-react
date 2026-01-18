import React, { HTMLAttributes, ReactNode } from "react";
import ListView from "../listview/listView";
import ListHeader from "../listview/listHeader";
import ListRows from "../listview/listRows";
import ListSelectBanner from "../listview/listSelectBanner";
import LoadingIndicator from "../loadingIndicator";
import { useFrappeGetDocList, type FrappeGetDocListParams } from "../hooks/useFrappeGetDocList";
import { type ListOptionsProps } from "../listview/listContext";

export interface DocTypeTableProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onError'> {
  /**
   * The DocType name (e.g., 'User', 'Employee', 'Customer')
   */
  doctype: string;

  /**
   * Columns configuration for the table
   */
  columns: Array<Record<string, unknown>>;

  /**
   * The key field to use for row identification (e.g., 'name')
   */
  rowKey?: string;

  /**
   * Parameters to pass to useFrappeGetDocList
   * This includes fields, filters, ordering, pagination, etc.
   */
  params?: Omit<FrappeGetDocListParams, "doctype">;

  /**
   * ListView options for customization
   */
  options?: ListOptionsProps;

  /**
   * Whether to automatically fetch data on mount
   */
  auto?: boolean;

  /**
   * Custom loading component
   */
  loadingComponent?: ReactNode;

  /**
   * Custom empty state component
   */
  emptyComponent?: ReactNode;

  /**
   * Custom error component or message
   */
  errorComponent?: ReactNode | ((error: Error) => ReactNode);

  /**
   * Callback when data is loaded
   */
  onDataLoad?: (data: Array<Record<string, unknown>>) => void;

  /**
   * Callback when error occurs
   */
  onError?: (error: Error) => void;
}

const DocTypeTable: React.FC<DocTypeTableProps> = ({
  doctype,
  columns,
  rowKey = "name",
  params = {},
  options,
  auto = true,
  loadingComponent,
  emptyComponent,
  errorComponent,
  onDataLoad,
  onError,
  ...attrs
}) => {
  // Combine params with doctype
  const fullParams: FrappeGetDocListParams = {
    doctype,
    ...params,
  };

  // Use the useFrappeGetDocList hook
  const { data, loading, error, fetch } = useFrappeGetDocList(fullParams, auto);

  // Call callbacks when data or error changes
  React.useEffect(() => {
    if (data?.data) {
      onDataLoad?.(data.data);
    }
  }, [data?.data, onDataLoad]);

  React.useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8" {...attrs}>
        {loadingComponent || <LoadingIndicator />}
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-8 text-red-600" {...attrs}>
        {typeof errorComponent === "function"
          ? errorComponent(error)
          : errorComponent || (
              <div className="text-center">
                <p className="font-medium">Error loading {doctype}</p>
                <p className="text-sm text-gray-500 mt-1">{error?.message}</p>
                <button
                  onClick={() => fetch()}
                  className="mt-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Retry
                </button>
              </div>
            )}
      </div>
    );
  }

  const rows = data?.data || [];

  // Default table options
  const defaultOptions: ListOptionsProps = {
    options: {
      selectable: true,
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  // Handle empty state
  if (rows.length === 0) {
    // If custom empty component provided, render it
    if (emptyComponent) {
      return (
        <div className="w-full" {...attrs}>
          {emptyComponent}
        </div>
      );
    }
    
    // Otherwise render default empty state outside ListView
    return (
      <div className="w-full flex items-center justify-center py-12" {...attrs}>
        <div className="text-center">
          <p className="text-gray-500">No {doctype} records found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" {...attrs}>
      <ListView
        columns={columns}
        rows={rows}
        rowKey={rowKey}
        options={mergedOptions}
      >
        <ListHeader />
        <ListRows />
        {mergedOptions?.options?.selectable && <ListSelectBanner />}
      </ListView>
    </div>
  );
};

export default DocTypeTable;
