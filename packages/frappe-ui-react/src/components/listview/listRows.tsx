import React, { useContext, type ReactNode } from "react";

import { ListContext } from "./listContext";
import ListRow from "./listRow";
import { cn } from "../../utils";

interface ListRowsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const ListRows: React.FC<ListRowsProps> = ({ children, className, ...attrs }) => {
  const { options: list } = useContext(ListContext);

  if (!list) {
    throw new Error("ListRows must be used within a ListContext.Provider");
  }

  return (
    <div {...attrs} className={cn("h-full overflow-y-auto", className)}>
      {children ||
        (list.rows &&
          list.rows.map((row) => <ListRow key={row[list.rowKey]} row={row} />))}
    </div>
  );
};

export default ListRows;
