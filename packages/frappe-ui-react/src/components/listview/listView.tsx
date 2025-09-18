import React, { useMemo, ReactNode, HTMLAttributes } from "react";
import ListEmptyState from "./emptyState";
import ListHeader from "./listHeader";
import ListRows from "./listRows";
import ListGroups from "./listGroups";
import ListSelectBanner from "./listSelectBanner";
import { type ListOptionsProps } from "./listContext";
import { ListProvider } from "./listprovider";

interface ListProps extends HTMLAttributes<HTMLDivElement> {
  columns: any[];
  rows: any[];
  rowKey: string;
  options?: ListOptionsProps;
  children?: ReactNode;
}

const ListView: React.FC<ListProps> = ({
  columns,
  rows,
  rowKey,
  options,
  children,
  ...attrs
}) => {
  const showGroupedRows = useMemo(
    () => rows.every((row) => row.group && row.rows && Array.isArray(row.rows)),
    [rows]
  );

  if (!options) {
    return null;
  }

  const selectable =
    options?.options?.selectable !== undefined ? options.options.selectable : true;

  const defaultContent = (
    <>
      <ListHeader />
      {rows.length ? (
        showGroupedRows ? (
          <ListGroups />
        ) : (
          <ListRows />
        )
      ) : (
        <ListEmptyState />
      )}
      {selectable && <ListSelectBanner />}
    </>
  );

  return (
    <ListProvider
      rows={rows}
      columns={columns}
      rowKey={rowKey}
      options={{
        ...options,
      }}
    >
      <div className="relative flex w-full flex-1 flex-col overflow-x-auto">
        <div
          className={`flex w-max min-w-full flex-col overflow-y-hidden ${
            attrs.className || ""
          }`}
          style={attrs.style}
        >
          {children
            ? children
            : defaultContent}
        </div>
      </div>
    </ListProvider>
  );
};

export default ListView;
