import React, { useContext, type ReactNode } from "react";

import { ListContext } from "./listContext";
import ListRow from "./listRow";

interface ListRowsProps {
  children?: ReactNode;
}

const ListRows: React.FC<ListRowsProps> = ({ children }) => {
  const { options: list } = useContext(ListContext);

  if (!list) {
    throw new Error("ListRows must be used within a ListContext.Provider");
  }

  return (
    <div className="h-full overflow-y-auto">
      {children ||
        (list.rows &&
          list.rows.map((row) => <ListRow key={row[list.rowKey]} row={row} />))}
    </div>
  );
};

export default ListRows;
