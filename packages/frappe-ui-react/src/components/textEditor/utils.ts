export const preProcessLink = (input: string) => {
  const linkRegex = /\b((https?:\/\/|www\.)[^\s]+)\b/gi;

  const processText = (text: string) => {
    return text.replace(linkRegex, (url) => {
      const href = url.startsWith("http") ? url : `https://${url}`;
      return `<a 
                href="${href}" 
                class="text-blue-500 hover:text-blue-700 underline" 
                target="_blank"
                rel="noopener noreferrer">${url}</a>`;
    });
  };

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
      const processed = processText(node.textContent || "");
      if (processed !== node.textContent) {
        const wrapper = document.createElement("span");
        wrapper.innerHTML = processed;
        parent.replaceChild(wrapper, node);
      }
    }
  });

  return doc.body.innerHTML;
};
