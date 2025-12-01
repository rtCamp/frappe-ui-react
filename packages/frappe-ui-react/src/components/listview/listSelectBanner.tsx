import React, { useContext, useMemo } from "react";
import { ListContext } from "./listContext";
import { Checkbox } from "../checkbox";
import { Button } from "../button";

interface ListSelectBannerProps {
  children?: (props: {
    selections: Set<any>;
    allRowsSelected: boolean;
    selectAll: () => void;
    unselectAll: () => void;
  }) => React.ReactNode;

  actions?: (props: {
    selections: Set<any>;
    allRowsSelected: boolean;
    selectAll: () => void;
    unselectAll: () => void;
  }) => React.ReactNode;
}

const ListSelectBanner: React.FC<ListSelectBannerProps> = ({
  children,
  actions,
  ...rest
}) => {
  const { options: list } = useContext(ListContext);

  if (!list) {
    throw new Error(
      "ListSelectBanner must be used within a ListContext.Provider"
    );
  }

  const selectedText = useMemo(() => {
    return list.options.selectionText(list.selections.size);
  }, [list.selections.size, list.options]);

  // Props to pass to the slots
  const slotProps = useMemo(
    () => ({
      selections: list.selections,
      allRowsSelected: list.allRowsSelected,
      selectAll: () => list.toggleAllRows(true),
      unselectAll: () => list.toggleAllRows(false),
    }),
    [list]
  );

  const transitionClasses =
    list.selections.size > 0
      ? "opacity-100 duration-300 ease-out"
      : "opacity-0 duration-300 ease-in transform";

  return (
    <div className={`transition-all ${transitionClasses}`} aria-live="polite">
      {list.selections.size > 0 && (
        <div
          className={`absolute inset-x-0 bottom-6 mx-auto w-max text-base`}
          {...rest}
        >
          <div className="flex min-w-[596px] items-center space-x-3 rounded-lg bg-surface-white px-4 py-2 shadow-2xl">
            {children ? (
              children(slotProps)
            ) : (
              <>
                <div className="flex flex-1 justify-between border-r border-outline-gray-2 text-ink-gray-9">
                  <div className="flex items-center space-x-3">
                    <Checkbox value={true} disabled={true} />
                    <div>{selectedText}</div>
                  </div>
                  <div className="mr-3">{actions && actions(slotProps)}</div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    className="text-ink-gray-7"
                    disabled={list.allRowsSelected}
                    variant="ghost"
                    onClick={() => list.toggleAllRows(true)}
                    label="Select all"
                  />
                  <Button
                    icon="x"
                    variant="ghost"
                    onClick={() => list.toggleAllRows(false)}
                    label="Unselect all"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListSelectBanner;
