import React, { useContext, useMemo, type ReactNode, useCallback } from "react";

import { Tooltip } from "../tooltip";
import { ListContext } from "./listContext";
import { alignmentMap } from "./utils";

interface ListRowItemProps {
  column: any;
  row: any;
  item: string | number | object;
  align?: "left" | "right" | "center";
  prefix?: ReactNode;
  suffix?: ReactNode;
  children?: ReactNode;
}

const ListRowItem: React.FC<ListRowItemProps> = ({
  column,
  row,
  item,
  align = "left",
  prefix,
  suffix,
  children,
}) => {
  const { options: list } = useContext(ListContext);

  if (!list) {
    throw new Error("ListRowItem must be used within a ListProvider");
  }

  const getValue = useCallback((value: any) => {
    if (value && typeof value === "object") {
      return value;
    }
    return { label: value };
  }, []);

  const label = useMemo(() => {
    if (column?.getLabel) {
      return column.getLabel({ row });
    }
    return getValue(item).label || "";
  }, [column, row, item, getValue]);

  const tooltip = useMemo(() => {
    if (!list.options.showTooltip) {
      return "";
    }

    return column.getTooltip ? column.getTooltip(row) : getValue(item).label;
  }, [list.options.showTooltip, column, row, item, getValue]);

  const renderPrefix = useMemo(() => {
    if (column.prefix) {
      return typeof column.prefix === "function"
        ? column.prefix({ row })
        : column.prefix;
    }
    return prefix;
  }, [column, prefix, row]);

  return (
    <div className={`flex items-center space-x-2 ${alignmentMap[align]}`}>
      {renderPrefix && renderPrefix}
      {children ? (
        children
      ) : (
        <Tooltip text={tooltip}>
          <div className="truncate text-base">{label}</div>
        </Tooltip>
      )}
      {suffix && <div className="flex-shrink-0">{suffix}</div>}
    </div>
  );
};

export default ListRowItem;
