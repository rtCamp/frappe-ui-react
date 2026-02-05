import { createContext } from "react";
import { LayoutContextValue } from "./types";

export const LayoutContext = createContext<LayoutContextValue | null>(null);
