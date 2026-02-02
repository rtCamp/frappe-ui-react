import { createContext } from "react";
import type { ButtonVariant } from "../button";

export interface ListOptionsProps {
  emptyState?: {
    title: string;
    description: string;
    button?: {
      label: string;
      variant?: ButtonVariant;
      onClick: () => void;
    };
  };
  slots?: {
    "group-header"?: React.ComponentType<{ group: any }>;
    cell?: React.ComponentType<{
      row: any;
      column: any;
      item: any;
      align: string;
    }>;
  };
  options: {
    onRowClick?: (row: any, event: React.MouseEvent) => void;
    enableActive?: boolean;
    rowHeight?: string | number;
    selectable?: boolean;
    showTooltip?: boolean;
    resizeColumn?: boolean;
    rowKey?: string;
    selectionText?: (count: number) => string;
  };
}

export interface ListOptions {
  emptyState?: {
    title: string;
    description: string;
    button?: {
      label: string;
      onClick: () => void;
    };
  };
  slots?: {
    "group-header"?: React.ComponentType<{ group: any }>;
    cell?: React.ComponentType<{
      row: any;
      column: any;
      item: any;
      align: string;
    }>;
  };
  rows: any[];
  rowKey: string;
  selections: Set<any>;
  activeRow: { value: any };
  columns: any[];
  options: {
    onRowClick?: (row: any, event: React.MouseEvent) => void;
    enableActive?: boolean;
    rowHeight?: string | number;
    selectable?: boolean;
    showTooltip?: boolean;
    resizeColumn?: boolean;
    rowKey?: string;
    selectionText: (count: number) => string;
    updateColumnWidth: (index: number, width: number) => void;
  };
  toggleRow: (rowId: any) => void;
  allRowsSelected: boolean;
  toggleAllRows: (value: boolean) => void;
  setColumns: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface ListContextType {
  options?: ListOptions;
}

export const ListContext = createContext<ListContextType>({
  options: undefined,
});
