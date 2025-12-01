/**
 * Converts an object of HTML attributes into a JSX-compatible attribute object.
 *
 * This function handles three main cases:
 * 1.  **Special Mappings**: Converts attributes with different names in JSX (e.g., `class` to `className`).
 * 2.  **Case Conversion**: Converts standard `kebab-case` attributes to `camelCase` (e.g., `accept-charset` to `acceptCharset`).
 * 3.  **Preservation**: Keeps `data-*` and `aria-*` attributes as-is, which is standard in modern React.
 *
 * @param htmlAttrs - An object representing HTML attributes, with string keys and any values.
 * @returns A new object with JSX-compatible attributes.
 */
export function htmlAttrsToJsx(
  htmlAttrs: Record<string, any>
): Record<string, any> {
  if (!htmlAttrs) {
    return {};
  }

  // A map for attributes that have a different name in JSX.
  const attributeMap: Record<string, string> = {
    class: "className",
    for: "htmlFor",
  };

  const jsxAttrs: Record<string, any> = {};

  for (const key in htmlAttrs) {
    // Ensure the key belongs to the object itself.
    if (Object.prototype.hasOwnProperty.call(htmlAttrs, key)) {
      const value = htmlAttrs[key];

      // 1. Preserve `data-*` and `aria-*` attributes as they are.
      if (key.startsWith("data-") || key.startsWith("aria-")) {
        jsxAttrs[key] = value;
        continue;
      }

      // 2. Check for special mappings like `class` or `for`.
      if (key in attributeMap) {
        jsxAttrs[attributeMap[key]] = value;
        continue;
      }

      // 3. Convert all other kebab-case attributes to camelCase.
      const camelCaseKey = key.replace(/-(\w)/g, (_, char) =>
        char.toUpperCase()
      );
      jsxAttrs[camelCaseKey] = value;
    }
  }

  return jsxAttrs;
}
