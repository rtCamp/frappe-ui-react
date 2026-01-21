import React, { useContext, type ReactNode } from "react";

import { ListContext } from "./listContext";
import ListRow from "./listRow";

interface ListGroupBodyProps {
  group: {
    collapsed?: boolean;
    rows: any[];
  };
  children?: ReactNode;
}

const ListGroupBody: React.FC<ListGroupBodyProps> = ({ group, children }) => {
  const list = useContext(ListContext);

  if (!list.options) {
    throw new Error("ListGroupBody must be used within a ListContext.Provider");
  }

  if (group.collapsed) {
    return null;
  }

  const { rowKey = "" } = list.options;

  return (
    <div className="mb-5 mt-2">
      {children ||
        (group.rows &&
          group.rows.map((row) => <ListRow key={row[rowKey]} row={row} />))}
    </div>
  );
};

export default ListGroupBody;
