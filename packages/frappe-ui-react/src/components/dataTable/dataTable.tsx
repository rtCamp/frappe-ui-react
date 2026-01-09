import React, { useState, useMemo, useCallback } from "react";
import FeatherIcon from "../featherIcon";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import type { DataTableProps, DataTableColumn, SortDirection } from "./types";

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  selectable = false,
  selectedRows: controlledSelectedRows,
  onSelectionChange,
  rowKey = "id" as keyof T,
  sort: controlledSort,
  onSortChange,
  pagination,
  showPagination = false,
  emptyMessage = "No data available",
  className = "",
  getRowClassName,
  onRowClick,
  onRowEdit,
  onRowDelete,
  showActions = false,
  editLabel = "Edit",
  deleteLabel = "Delete",
}: DataTableProps<T>) {
  const [internalSort, setInternalSort] = useState<{
    columnId: string;
    direction: SortDirection;
  } | null>(null);
  const [internalSelectedRows, setInternalSelectedRows] = useState<string[]>([]);

  const sort = controlledSort !== undefined ? controlledSort : internalSort;
  const selectedRows = controlledSelectedRows !== undefined ? controlledSelectedRows : internalSelectedRows;

  const getRowId = useCallback(
    (row: T, index: number): string => {
      if (typeof rowKey === "function") {
        return rowKey(row);
      }
      return String(row[rowKey] ?? index);
    },
    [rowKey]
  );

  const sortedData = useMemo(() => {
    if (!sort || !sort.columnId || !sort.direction) return data;

    const column = columns.find((col) => col.id === sort.columnId);
    if (!column || !column.sortable) return data;

    return [...data].sort((a, b) => {
      const getValue = (row: T) => {
        if (typeof column.accessor === "function") {
          const result = column.accessor(row);
          return typeof result === "string" || typeof result === "number" ? result : "";
        }
        return row[column.accessor as keyof T];
      };

      const aVal = getValue(a);
      const bVal = getValue(b);

      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const comparison = aVal < bVal ? -1 : 1;
      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [data, columns, sort]);

  const paginatedData = useMemo(() => {
    if (!pagination || !showPagination) return sortedData;
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, pagination, showPagination]);

  const displayData = showPagination ? paginatedData : sortedData;

  const handleSort = useCallback(
    (columnId: string) => {
      const column = columns.find((col) => col.id === columnId);
      if (!column?.sortable) return;

      let newDirection: SortDirection = "asc";
      if (sort?.columnId === columnId) {
        if (sort.direction === "asc") {
          newDirection = "desc";
        } else if (sort.direction === "desc") {
          newDirection = null;
        }
      }

      const newSort = newDirection ? { columnId, direction: newDirection } : null;

      if (onSortChange) {
        onSortChange(columnId, newDirection);
      } else {
        setInternalSort(newSort);
      }
    },
    [columns, sort, onSortChange]
  );

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      const allIds = displayData.map((row, index) => getRowId(row, index));
      const newSelection = checked ? allIds : [];
      if (onSelectionChange) {
        onSelectionChange(newSelection);
      } else {
        setInternalSelectedRows(newSelection);
      }
    },
    [displayData, getRowId, onSelectionChange]
  );

  const handleSelectRow = useCallback(
    (rowId: string, checked: boolean) => {
      const newSelection = checked
        ? [...selectedRows, rowId]
        : selectedRows.filter((id) => id !== rowId);
      if (onSelectionChange) {
        onSelectionChange(newSelection);
      } else {
        setInternalSelectedRows(newSelection);
      }
    },
    [selectedRows, onSelectionChange]
  );

  const isAllSelected = displayData.length > 0 && selectedRows.length === displayData.length;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < displayData.length;

  const getCellValue = (column: DataTableColumn<T>, row: T, index: number): React.ReactNode => {
    if (column.render) {
      const value = typeof column.accessor === "function" ? column.accessor(row) : row[column.accessor as keyof T];
      return column.render(value, row, index);
    }
    if (typeof column.accessor === "function") {
      return column.accessor(row);
    }
    const value = row[column.accessor as keyof T];
    return value != null ? String(value) : "";
  };

  const getAlignmentClass = (align?: string) => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="overflow-x-auto border border-outline-gray-2 rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-surface-gray-1">
            <tr>
              {selectable && (
                <th className="px-4 py-3 text-left border-b border-outline-gray-2">
                  <Checkbox
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={`px-4 py-3 text-sm font-medium text-ink-gray-7 border-b border-outline-gray-2 ${getAlignmentClass(
                    column.align
                  )} ${column.sortable ? "cursor-pointer hover:bg-surface-gray-2" : ""}`}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    width: column.width,
                  }}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div className="flex items-center gap-2">
                    {column.renderHeader ? (
                      column.renderHeader()
                    ) : (
                      <span>{column.label}</span>
                    )}
                    {column.sortable && (
                      <div className="flex flex-col">
                        <FeatherIcon
                          name="chevron-up"
                          height={12}
                          width={12}
                          className={
                            sort?.columnId === column.id && sort.direction === "asc"
                              ? "text-blue-500"
                              : "text-gray-400"
                          }
                        />
                        <FeatherIcon
                          name="chevron-down"
                          height={12}
                          width={12}
                          className={
                            sort?.columnId === column.id && sort.direction === "desc"
                              ? "text-blue-500"
                              : "text-gray-400"
                          }
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + (showActions ? 1 : 0)}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              displayData.map((row, index) => {
                const rowId = getRowId(row, index);
                const isSelected = selectedRows.includes(rowId);
                const rowClassName = getRowClassName?.(row, index) || "";

                return (
                  <tr
                    key={rowId}
                    className={`border-b border-outline-gray-1 hover:bg-surface-gray-1 ${
                      isSelected ? "bg-surface-blue-1" : ""
                    } ${onRowClick ? "cursor-pointer" : ""} ${rowClassName}`}
                    onClick={() => onRowClick?.(row, index)}
                  >
                    {selectable && (
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={isSelected}
                          onChange={(checked) => handleSelectRow(rowId, checked)}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.id}
                        className={`px-4 py-3 text-sm text-ink-gray-8 ${getAlignmentClass(column.align)}`}
                      >
                        {getCellValue(column, row, index)}
                      </td>
                    ))}
                    {showActions && (onRowEdit || onRowDelete) && (
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                          {onRowEdit && (
                            <Button
                              label={editLabel}
                              theme="blue"
                              variant="ghost"
                              size="sm"
                              onClick={() => onRowEdit(row, index)}
                            />
                          )}
                          {onRowDelete && (
                            <Button
                              label={deleteLabel}
                              theme="red"
                              variant="ghost"
                              size="sm"
                              onClick={() => onRowDelete(row, index)}
                            />
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {showPagination && pagination && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total} entries
          </div>
          <div className="flex items-center gap-2">
            <Button
              label="Previous"
              theme="gray"
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            />
            <span className="text-sm text-gray-600">
              Page {pagination.page} of {Math.ceil(pagination.total / pagination.pageSize)}
            </span>
            <Button
              label="Next"
              theme="gray"
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

