/**
 * External dependencies.
 */
import { createContext } from "react";

/**
 * Internal dependencies.
 */
import { LayoutContextValue } from "./types";

export const LayoutContext = createContext<LayoutContextValue | null>(null);
