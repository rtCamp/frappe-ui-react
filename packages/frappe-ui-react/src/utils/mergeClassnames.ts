import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx} from "clsx";

export function mergeClassNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}