/**
 * Whether an element's text is clipped by `truncate`.
 *
 * CSS exposes no truncation state, so layout is the only source of truth:
 * `scrollWidth` counts the text hidden by `overflow: hidden`, `clientWidth`
 * counts what stays visible.
 */
export const isTextTruncated = (element: HTMLElement | null) => {
  if (!element) {
    return false;
  }

  return element.scrollWidth > element.clientWidth;
};
