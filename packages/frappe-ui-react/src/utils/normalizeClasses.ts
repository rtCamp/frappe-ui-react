/**
 * Normalizes a given input of class names into a single string.
 *
 * This utility function accepts a variety of input types (string, array, or object)
 * and converts them into a space-separated string of class names.
 *
 * @param cls - The input class names, which can be:
 *   - A string: Returned as-is.
 *   - An array of strings: Joined into a single string with spaces.
 *   - An object: Keys with truthy values are included in the resulting string.
 * @returns A space-separated string of class names.
 */
export function normalizeClasses(cls: string | string[] | object): string {
  if (typeof cls === "string") return cls;
  if (Array.isArray(cls)) return cls.join(" ");
  if (typeof cls === "object") {
    return Object.entries(cls)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(" ");
  }
  return "";
}
