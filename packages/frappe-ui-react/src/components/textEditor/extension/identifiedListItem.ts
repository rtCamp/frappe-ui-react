/**
 * External dependencies.
 */
import { ListItem } from "@tiptap/extension-list";

export const IdentifiedListItem = ListItem.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      itemId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-item-id"),
        renderHTML: (attributes) =>
          attributes.itemId ? { "data-item-id": attributes.itemId } : {},
      },
    };
  },
});
