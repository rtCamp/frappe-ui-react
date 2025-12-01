import { createContext } from "react";

export interface TableOptions {
  rowCount: number;
  totalCount: number;
  pageLengthOptions: number[];
}

export interface TableContextType {
  options: TableOptions;
  pageLength: number;
  setPageLength: (length: number) => void;
}

export const TableContext = createContext<TableContextType | undefined>(
  undefined
);
