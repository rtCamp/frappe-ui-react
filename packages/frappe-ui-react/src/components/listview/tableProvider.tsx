import { type ReactNode, useState } from "react";

import { TableContext, type TableOptions } from "./tableContext";

interface TableProviderProps {
  options: TableOptions;
  children: ReactNode;
  initialPageLength?: number;
}

export const TableProvider: React.FC<TableProviderProps> = ({
  options,
  children,
  initialPageLength = 20,
}) => {
  const [pageLength, setPageLength] = useState<number>(initialPageLength);

  const contextValue = {
    options,
    pageLength,
    setPageLength,
  };

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
};