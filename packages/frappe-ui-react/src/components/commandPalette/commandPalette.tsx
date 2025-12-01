import { useEffect } from "react";
import {
  Dialog,
  Combobox,
  DialogPanel,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { Search as SearchIcon } from "lucide-react";

import CommandPaletteItem from "./commandPaletteItem";
import type { CommandPaletteGroup } from "./types";

export interface CommandPaletteProps {
  show: boolean;
  onShowChange: (show: boolean) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  groups: CommandPaletteGroup[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect: (item: any) => void;
}

export const CommandPalette = ({
  show,
  onShowChange,
  searchQuery,
  onSearchQueryChange,
  groups = [],
  onSelect,
}: CommandPaletteProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (item: any) => {
    if (!item) return;
    onSelect(item);
    onShowChange(false);
  };

  useEffect(() => {
    const keydownWatcher = (e: KeyboardEvent) => {
      if (e.key === "Escape" && show) {
        e.preventDefault();
        onShowChange(false);
      }

      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        const target = e.target as HTMLElement;
        if (
          target.nodeName !== "INPUT" &&
          target.nodeName !== "TEXTAREA" &&
          !target.isContentEditable
        ) {
          e.preventDefault();
          onShowChange(true);
        }
      }
    };

    window.addEventListener("keydown", keydownWatcher);
    return () => {
      window.removeEventListener("keydown", keydownWatcher);
    };
  }, [show, onShowChange]);

  return (
    <Dialog open={show} onClose={() => onShowChange(false)}>
      <DialogPanel className="fixed inset-x-0 top-[15vh] mx-auto w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <Combobox value={null} onChange={handleSelect} as="div">
          <div className="relative">
            <SearchIcon
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              aria-hidden="true"
            />
            <Combobox.Input
              placeholder="Search"
              className="w-full border-none bg-transparent py-3 pl-11 pr-4 text-base text-ink-gray-8 placeholder-ink-gray-4 focus:ring-0"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              autoComplete="off"
            />
          </div>

          <ComboboxOptions
            static
            className="max-h-96 overflow-y-auto border-t border-gray-100 py-2"
          >
            {groups.map((group) => (
              <div key={group.title} className="mb-2 last:mb-0">
                {!group.hideTitle && (
                  <div className="mb-2 px-4 text-base text-ink-gray-5">
                    {group.title}
                  </div>
                )}
                <div className="px-2.5">
                  {group.items.map((item) => (
                    <ComboboxOption
                      key={item.name}
                      value={item}
                      disabled={item.disabled}
                    >
                      {({ focus }) => (
                        <CommandPaletteItem item={item} active={focus} />
                      )}
                    </ComboboxOption>
                  ))}
                </div>
              </div>
            ))}
          </ComboboxOptions>
        </Combobox>
      </DialogPanel>
    </Dialog>
  );
};
