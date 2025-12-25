/**
 * External dependencies.
 */
import { useRef, forwardRef, useImperativeHandle } from "react";
import type { Editor, Range } from "@tiptap/core";

/**
 * Internal dependencies.
 */
import { SuggestionList } from "../suggestion/suggestionList";
import type { CommandItem } from "./slash-commands-extension";

interface SlashCommandsListProps {
  items: CommandItem[];
  editor: Editor;
  range: Range;
  command: (item: CommandItem) => void;
  query?: string;
}

export const SlashCommandsList = forwardRef<
  { onKeyDown: (props: { event: KeyboardEvent }) => boolean },
  SlashCommandsListProps
>((props, ref) => {
  const suggestionListRef = useRef<{
    onKeyDown: (props: { event: KeyboardEvent }) => boolean;
  }>(null);

  const onItemSelect = (item: CommandItem) => {
    if (item) {
      props.command(item);
    }
  };

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      return suggestionListRef.current?.onKeyDown({ event }) ?? false;
    },
  }));

  return (
    <SuggestionList
      ref={suggestionListRef}
      items={props.items}
      command={(item) => onItemSelect(item as CommandItem)}
      containerClass="min-w-48"
      itemClass="h-7"
      showNoResults={true}
    >
      {(item) => {
        const commandItem = item as CommandItem;
        const IconComponent = commandItem.icon;
        return (
          <>
            {IconComponent ? (
              <IconComponent className="mr-2 h-4 w-4" />
            ) : (
              <div className="mr-2 h-4 w-4"></div>
            )}
            <span>{commandItem.title}</span>
          </>
        );
      }}
    </SuggestionList>
  );
});

SlashCommandsList.displayName = "SlashCommandsList";
