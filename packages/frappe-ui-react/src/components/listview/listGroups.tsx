import React, {
  useContext,
  type ReactNode,
  useState,
  useEffect,
  useMemo,
} from "react";

import { ListContext } from "./listContext";
import ListGroupHeader, { type ListGroupHeaderProps } from "./listGroupHeader";
import ListGroupRows from "./listGroupRows";

interface ListGroupsProps {
  children?: (props: { group: any }) => ReactNode;
}

const ListGroups: React.FC<ListGroupsProps> = ({ children }) => {
  const { options: list } = useContext(ListContext);
  const [collapsed, setCollapsed] = useState<{
    [index: number]: { collapsed: boolean };
  }>({});

  useEffect(() => {
    if (!list || !list.rows) {
      return;
    }
    setCollapsed((prev) => {
      const next: typeof prev = { ...prev };
      list.rows.forEach((_, index) => {
        if (index >= Object.keys(next).length) {
          next[index] = { collapsed: false };
        }
      });

      Object.keys(next).forEach((key) => {
        if (Number(key) >= list.rows.length) {
          delete next[Number(key)];
        }
      });
      return next;
    });
  }, [list, list?.rows?.length]);

  const rowsToRender = useMemo(() => {
    if (!list || !list.rows) {
      return [];
    }

    if (!Array.isArray(list.rows)) {
      return [];
    }

    return list.rows.map((row, index) => {
      return {
        ...row,
        collapsed: collapsed[index]?.collapsed,
      };
    });
  }, [collapsed, list]);

  if (!list) {
    throw new Error("ListGroups must be used within a ListContext.Provider");
  }

  return (
    <div className="h-full overflow-y-auto">
      {rowsToRender.map((group, index) => (
        <div key={group.group}>
          {children ? (
            children({ group })
          ) : (
            <>
              <ListGroupHeader
                group={group as ListGroupHeaderProps["group"]}
                setCollapsed={setCollapsed}
                index={index}
                collapsed={collapsed[index]?.collapsed ?? false}
              />
              <ListGroupRows
                group={{
                  ...group,
                  collapsed: collapsed[index]?.collapsed ?? false,
                }}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListGroups;
