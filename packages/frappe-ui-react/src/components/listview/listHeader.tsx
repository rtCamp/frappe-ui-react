import React, { useContext, useMemo } from "react";
import { ListContext } from "./listContext";
import { Checkbox } from "../checkbox";
import ListHeaderItem from "./listHeaderItem";
import { getGridTemplateColumns } from "./utils";

interface ListHeaderProps {
  children?: React.ReactNode;
}

const ListHeader: React.FC<ListHeaderProps> = ({ children }) => {
  const { options: list } = useContext(ListContext);

  if (!list) {
    throw new Error("ListHeader must be used within a ListProvider");
  }

  const gridTemplateColumns = useMemo(
    () => getGridTemplateColumns(list.columns, list.options.selectable),
    [list.columns, list.options.selectable]
  );

  return (
    <div
      className="mb-2 grid items-center rounded bg-surface-gray-2 p-2 gap-2"
      style={{ gridTemplateColumns }}
    >
      {list.options.selectable && (
        <Checkbox value={list.allRowsSelected} onChange={list.toggleAllRows} />
      )}
      {children ||
        list.columns.map((column: any, index) => (
          <ListHeaderItem
            key={column.key}
            item={column}
            lastItem={index === list.columns.length - 1}
            onColumnWidthUpdated={(width: number) => {
              list.updateColumnWidth(index, width);
            }}
          />
        ))}
    </div>
  );
};

export default ListHeader;
