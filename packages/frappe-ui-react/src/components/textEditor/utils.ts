const linkRegex =
  /\b((https?:\/\/|www\.)[a-z0-9-]+(\.[a-z0-9-]+)+([/?#][^\s<>"')\]]*)?)/gi;

const processText = (text: string): DocumentFragment => {
  const fragment = document.createDocumentFragment();
  const matches = [...text.matchAll(linkRegex)];
  let lastIndex = 0;

  matches.forEach((match) => {
    const url = match[0];
    const matchIndex = match.index || 0;

    if (matchIndex > lastIndex) {
      fragment.appendChild(
        document.createTextNode(text.slice(lastIndex, matchIndex))
      );
    }

    const href = url.startsWith("http") ? url : `https://${url}`;
    if (href.startsWith("http://") || href.startsWith("https://")) {
      const a = document.createElement("a");
      a.setAttribute("href", href);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
      a.textContent = url;
      fragment.appendChild(a);
    } else {
      fragment.appendChild(document.createTextNode(url));
    }

    lastIndex = matchIndex + url.length;
  });

  if (lastIndex < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  return fragment;
};

export const preProcessLink = (input: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");

  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null);
  const textNodes = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach((node) => {
    const parent = node.parentNode as HTMLElement;
    if (parent && !parent.closest("a")) {
      const text = node.textContent || "";
      const fragment = processText(text);

      if (fragment.childNodes.length > 0) {
        parent.replaceChild(fragment, node);
      }
    }
  });

  return doc.body.innerHTML;
};
