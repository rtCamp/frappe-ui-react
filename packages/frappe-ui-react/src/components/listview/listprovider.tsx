import React, { type ReactNode, useCallback, useMemo, useState } from "react";
import { ListContext, type ListOptionsProps } from "./listContext";

interface ListProviderProps {
  options: ListOptionsProps;
  children: ReactNode;
  rows: any[];
  rowKey: string;
  columns: any[];
}

export const ListProvider: React.FC<ListProviderProps> = ({
  options,
  rows,
  rowKey,
  columns,
  children,
}) => {
  const [selections, setSelections] = useState<Set<any>>(new Set());
  const [activeRow, setActiveRow] = useState<any>(null);
  const [_columns, setColumns] = useState<any[]>(columns);

  const updateColumnWidth = useCallback((index: number, width: number) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns[index] = {
        ...newColumns[index],
        width: `${width}px`,
      };
      return newColumns;
    });
  }, []);

  const mergedOptions = useMemo(() => {
    return {
      onRowClick: options.options.onRowClick,
      showTooltip:
        options.options.showTooltip !== undefined
          ? options.options.showTooltip
          : true,
      selectionText:
        options.options.selectionText ||
        ((val) => (val === 1 ? "1 row selected" : `${val} rows selected`)),
      enableActive:
        options.options.enableActive !== undefined
          ? options.options.enableActive
          : false,
      selectable:
        options.options.selectable !== undefined
          ? options.options.selectable
          : true,
      resizeColumn:
        options.options.resizeColumn !== undefined
          ? options.options.resizeColumn
          : false,
      rowHeight: options.options.rowHeight || 40,
      emptyState: options.emptyState || {
        title: "No Data",
        description: "No data available",
      },
      updateColumnWidth,
    };
  }, [options, updateColumnWidth]);

  const showGroupedRows = useMemo(
    () => rows.every((row) => row.group && row.rows && Array.isArray(row.rows)),
    [rows]
  );

  const allRowsSelected = useMemo(() => {
    if (!rows.length) {
      return false;
    }

    if (showGroupedRows) {
      return (
        selections.size === rows.reduce((acc, row) => acc + row.rows.length, 0)
      );
    }

    return selections.size === rows.length;
  }, [rows, showGroupedRows, selections.size]);

  const toggleRow = useCallback((id: any) => {
    setSelections((prev) => {
      const newSelections = new Set(prev);
      if (newSelections.has(id)) {
        newSelections.delete(id);
      } else {
        newSelections.add(id);
      }

      return newSelections;
    });
  }, []);

  const toggleAllRows = useCallback(
    (select?: boolean) => {
      if (select === false || allRowsSelected) {
        setSelections(new Set());
        return;
      }
      const newSelections = new Set();
      if (showGroupedRows) {
        rows.forEach((row) => {
          row.rows.forEach((r: any) => newSelections.add(r[rowKey]));
        });
      } else {
        rows.forEach((row) => newSelections.add(row[rowKey]));
      }
      setSelections(newSelections);
    },
    [allRowsSelected, rows, showGroupedRows, rowKey]
  );

  useMemo(() => {
    if (selections.size > 0) {
      setActiveRow({
        value: null,
      });
    }
  }, [selections.size]);

  const contextValue = useMemo(
    () => ({
      options: {
        columns: _columns,
        rows: rows,
        rowKey,
        options: mergedOptions,
        selections,
        activeRow,
        allRowsSelected,
        slots: options.slots,
        toggleRow,
        toggleAllRows,
        emptyState: options.emptyState,
        setColumns: () => {},
      },
    }),
    [
      _columns,
      rows,
      rowKey,
      options.slots,
      options.emptyState,
      mergedOptions,
      selections,
      activeRow,
      allRowsSelected,
      toggleRow,
      toggleAllRows,
    ]
  );
  return (
    <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>
  );
};
