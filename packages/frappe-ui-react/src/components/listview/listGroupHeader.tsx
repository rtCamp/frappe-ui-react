import React, { useContext, useCallback, useMemo } from "react";

import { DownSolid } from "../../icons";
import { ListContext } from "./listContext";

export interface ListGroupHeaderProps {
  group: {
    collapsed?: boolean;
    group: string;
  };
  setCollapsed: React.Dispatch<
    React.SetStateAction<{
      [index: number]: {
        collapsed: boolean;
      };
    }>
  >;
  index: number;
  collapsed: boolean;
}

const ListGroupHeader: React.FC<ListGroupHeaderProps> = ({
  group: initialGroup,
  setCollapsed,
  index,
  collapsed,
}) => {
  const listContext = useContext(ListContext);

  const toggleGroup = useCallback(() => {
    setCollapsed((prev) => {
      const newState = structuredClone(prev);

      if (newState[index]) {
        newState[index].collapsed = !newState[index].collapsed;
      } else {
        newState[index] = {
          collapsed: true,
        };
      }
      return newState;
    });
  }, [index, setCollapsed]);

  const groupHeaderSlot = useMemo(() => {
    const GroupHeaderComponent = listContext?.options?.slots?.["group-header"];

    if (GroupHeaderComponent) {
      return <GroupHeaderComponent group={{ ...initialGroup, collapsed }} />;
    }

    return (
      <span className="text-base font-medium leading-6">
        {initialGroup.group}
      </span>
    );
  }, [listContext?.options?.slots, initialGroup, collapsed]);

  return (
    <>
      <div className="flex items-center">
        <button
          onClick={toggleGroup}
          className="ml-[3px] mr-[11px] rounded p-1 hover:bg-surface-gray-2"
        >
          <DownSolid
            className={`h-4 w-4 text-ink-gray-6 transition-transform duration-200 ${
              collapsed ? "-rotate-90" : ""
            }`}
          />
        </button>
        {groupHeaderSlot}
      </div>
      <div className="mx-2 h-px border-t border-outline-gray-modals"></div>
    </>
  );
};

export default ListGroupHeader;
