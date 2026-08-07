/**
 * External dependencies.
 */
import { useCallback, useEffect, useMemo, useRef } from "react";
import type { Extensions } from "@tiptap/react";

/**
 * Internal dependencies.
 */
import {
  getTextEditorExtensions,
  type GetExtensionsArgs,
} from "./editorConfig";
import type { TextEditorProps } from "./types";

// Read `mentions` and `mentionsItemRenderer` through refs so inline callback
// props don't invalidate the extensions array and recreate the editor on
// every parent render.
export const useTextEditorExtensions = ({
  extensions,
  starterkitOptions,
  placeholder,
  extensionOptions,
  mentions,
  mentionsItemRenderer,
}: GetExtensionsArgs): Extensions => {
  const mentionsRef = useRef(mentions);
  useEffect(() => {
    mentionsRef.current = mentions;
  }, [mentions]);

  const mentionsItemRendererRef = useRef(mentionsItemRenderer);
  useEffect(() => {
    mentionsItemRendererRef.current = mentionsItemRenderer;
  }, [mentionsItemRenderer]);

  const hasMentions = Boolean(mentions);
  const hasMentionsItemRenderer = Boolean(mentionsItemRenderer);

  const StableMentionsItemRenderer = useMemo<
    TextEditorProps["mentionsItemRenderer"]
  >(
    () =>
      hasMentionsItemRenderer
        ? function StableMentionsItemRenderer(props) {
            const ItemRenderer = mentionsItemRendererRef.current;
            return ItemRenderer ? <ItemRenderer {...props} /> : null;
          }
        : undefined,
    [hasMentionsItemRenderer]
  );

  const stableMentions = useCallback<NonNullable<TextEditorProps["mentions"]>>(
    (query) => mentionsRef.current?.(query) ?? Promise.resolve([]),
    []
  );

  return useMemo(
    () =>
      // eslint-disable-next-line react-hooks/refs -- the callbacks only read the refs when the user types a mention query, never during render
      getTextEditorExtensions({
        extensions,
        starterkitOptions,
        placeholder,
        extensionOptions,
        mentions: hasMentions ? stableMentions : undefined,
        mentionsItemRenderer: StableMentionsItemRenderer,
      }),
    [
      extensions,
      starterkitOptions,
      placeholder,
      hasMentions,
      stableMentions,
      StableMentionsItemRenderer,
      extensionOptions,
    ]
  );
};
