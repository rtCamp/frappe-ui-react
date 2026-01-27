/**
 * External dependencies.
 */
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import { BubbleMenu, type BubbleMenuProps } from "@tiptap/react/menus";
import { Check, X } from "lucide-react";

/**
 * Internal dependencies.
 */
import { TextInput } from "../../textInput";
import { Button } from "../../button";
import { useRef } from "react";

const LinkBubbleMenu = () => {
  const { editor } = useCurrentEditor();
  const inputRef = useRef<HTMLInputElement>(null);

  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      currentLink: (editor?.getAttributes("link").href || "") as string,
      from: editor?.state.selection.from,
    }),
  });

  if (!editor) {
    return null;
  }

  const shouldShow: BubbleMenuProps["shouldShow"] = ({ editor, from, to }) => {
    return editor.isActive("link") && from < to;
  };

  const unsetLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const setLink = (href: string) => {
    editor.chain().setLink({ href }).run();
  };

  const close = () => {
    if (state && state.from) {
      editor.commands.setTextSelection(state.from);
    }
  };

  return (
    <BubbleMenu editor={editor} shouldShow={shouldShow}>
      <div className="p-2 w-72 flex items-center gap-2 bg-surface-white shadow-xl rounded">
        <div className="w-full">
          <TextInput
            ref={inputRef}
            type="text"
            placeholder="https://example.com"
            variant="subtle"
            value={state?.currentLink}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="shrink-0 flex items-center gap-1.5 ml-auto">
          <>
            <Button
              icon={() => <Check className="w-4 h-4" />}
              variant="subtle"
              onClick={close}
            />
            <Button
              icon={() => <X className="w-4 h-4" />}
              variant="subtle"
              onClick={() => {
                unsetLink();
                close();
              }}
            />
          </>
        </div>
      </div>
    </BubbleMenu>
  );
};

export default LinkBubbleMenu;
