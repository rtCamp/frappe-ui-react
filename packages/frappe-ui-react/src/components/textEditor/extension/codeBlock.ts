/**
 * External dependencies.
 */
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, all } from "lowlight";

/**
 * Internal dependencies.
 */
import { getCodeBlockCtx, INDENT, lineStartsBetween } from "./utils";

const lowlight = createLowlight(all);

export const ExtendedCodeBlock = CodeBlockLowlight.extend({
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        const { state, dispatch } = this.editor.view;
        const ctx = getCodeBlockCtx(state);
        if (!ctx) return false;

        const { start, text, fromOffset, toOffset } = ctx;
        const multiline = text.slice(fromOffset, toOffset).includes("\n");
        const tr = state.tr;
        if (multiline) {
          for (const off of lineStartsBetween(text, fromOffset, toOffset)) {
            const pos = tr.mapping.map(start + off);
            tr.insertText(INDENT, pos);
          }
        } else {
          tr.insertText(INDENT, state.selection.from);
        }
        dispatch(tr);
        return true;
      },
      "Shift-Tab": () => {
        const { state, dispatch } = this.editor.view;
        const ctx = getCodeBlockCtx(state);
        if (!ctx) return false;

        const { start, text, fromOffset, toOffset } = ctx;
        const tr = state.tr;
        for (const off of lineStartsBetween(text, fromOffset, toOffset)) {
          let len = 0;
          if (text.substr(off, 4) === INDENT) len = 4;
          else if (text[off] === "\t") len = 1;

          if (len > 0) {
            const s = tr.mapping.map(start + off);
            const e = tr.mapping.map(start + off + len);
            tr.delete(s, e);
          }
        }

        dispatch(tr);
        return true;
      },
    };
  },
}).configure({
  lowlight,
});
