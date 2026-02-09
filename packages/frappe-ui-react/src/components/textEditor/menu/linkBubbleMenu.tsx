/**
 * External dependencies.
 */
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import { BubbleMenu, type BubbleMenuProps } from "@tiptap/react/menus";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Internal dependencies.
 */
import { TextInput } from "../../textInput";
import { Button } from "../../button";

const LinkBubbleMenu = () => {
  const { editor } = useCurrentEditor();

  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      currentLink: (editor?.getAttributes("link").href || "") as string,
      from: editor?.state.selection.from,
    }),
  });

  const [value, setValue] = useState(state?.currentLink);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(state?.currentLink ?? "");
  }, [state?.currentLink]);

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
    setValue("");
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
            type="text"
            placeholder="https://example.com"
            variant="subtle"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="shrink-0 flex items-center gap-1.5 ml-auto">
          <Button
            aria-label="Confirm Link"
            icon={() => <Check className="w-4 h-4" />}
            variant="subtle"
            onClick={() => {
              setLink(value ?? "");
              close();
            }}
          />
          <Button
            aria-label="Reset Link"
            icon={() => <X className="w-4 h-4" />}
            variant="subtle"
            onClick={() => {
              unsetLink();
              close();
            }}
          />
        </div>
      </div>
    </BubbleMenu>
  );
};

export default LinkBubbleMenu;
