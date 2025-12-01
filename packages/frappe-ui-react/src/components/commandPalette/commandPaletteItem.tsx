import clsx from "clsx";

import type { CommandPaletteItem as ItemType } from "./types";

export interface CommandPaletteItemProps {
  item: ItemType;
  active: boolean;
}

const CommandPaletteItem = ({ item, active }: CommandPaletteItemProps) => {
  const IconComponent = item.icon;

  return (
    <div
      className={clsx(
        "flex w-full min-w-0 items-center rounded px-2 py-2 text-base font-medium text-ink-gray-8",
        { "bg-surface-gray-3": active }
      )}
    >
      {IconComponent && (
        <IconComponent className="mr-3 h-4 w-4 shrink-0 text-ink-gray-7" />
      )}
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {item.title}
      </span>
      {item.description && (
        <span className="ml-auto whitespace-nowrap pl-2 text-ink-gray-5">
          {item.description}
        </span>
      )}
    </div>
  );
};

export default CommandPaletteItem;
