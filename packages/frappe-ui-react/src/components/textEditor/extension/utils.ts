import type { Editor } from "@tiptap/react";
import type { Node } from "@tiptap/pm/model";

export function lineStartsBetween(
  text: string,
  fromOffset: number,
  toOffset: number
) {
  const startOff = text.lastIndexOf("\n", Math.max(0, fromOffset - 1)) + 1;
  let endOff = toOffset;
  if (endOff > 0 && text[endOff - 1] === "\n") endOff--;

  const starts: number[] = [startOff];
  let i = startOff;
  while (true) {
    const nl = text.indexOf("\n", i);
    if (nl === -1 || nl >= endOff) break;
    starts.push(nl + 1);
    i = nl + 1;
  }
  return starts;
}

export function getCodeBlockCtx(state: Editor["state"]) {
  const { $from, from, to } = state.selection;
  let d = $from.depth;
  while (d > 0 && $from.node(d).type.name !== "codeBlock") d--;
  if (d === 0) return null;

  const node = $from.node(d);
  const start = $from.start(d);
  const text: string = node.textContent;
  const fromOffset = from - start;
  const toOffset = to - start;
  return { start, text, fromOffset, toOffset };
}

export const INDENT = " ".repeat(4);

type FoundListItem = { pos: number; node: Node };

export const findListItemById = (
  editor: Editor,
  id: string
): FoundListItem | null => {
  let found: FoundListItem | null = null;
  editor.state.doc.descendants((node: Node, pos: number) => {
    if (node.type.name === "listItem" && node.attrs.itemId === id) {
      found = { pos, node };
    }
  });
  return found;
};

export const findIdentifiedBulletListEnd = (editor: Editor) => {
  let endPos: number | null = null;
  editor.state.doc.descendants((node: Node, pos: number) => {
    if (node.type.name !== "bulletList") return;
    let hasIdentifiedItem = false;
    node.forEach((child: Node) => {
      if (child.attrs.itemId) hasIdentifiedItem = true;
    });
    if (hasIdentifiedItem) {
      endPos = pos + node.nodeSize - 1;
    }
  });
  return endPos;
};

export const isDocEmpty = (editor: Editor) => {
  const { doc } = editor.state;
  return (
    doc.childCount === 1 &&
    doc.firstChild?.type.name === "paragraph" &&
    doc.firstChild.content.size === 0
  );
};
