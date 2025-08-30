import React, { useState } from "react";
import "./ThemeShowcase.css";

type ColorToken = {
  name: string;
  value: string;
};

type ColorCategory = {
  name: string;
  variants: ColorToken[];
};

type SemanticColorCategory = {
  name: string;
  colors: ColorToken[];
};

type FontSizeToken = {
  name: string;
  size: string;
  lineHeight: string;
  letterSpacing: string;
  fontWeight: string;
};

type SpacingToken = {
  name: string;
  value: string;
};

type ShadowToken = {
  name: string;
  value: string;
};

type RadiusToken = {
  name: string;
  value: string;
};

// Types for default Tailwind tokens
type DefaultToken = {
  name: string;
  value: string;
  isDefault?: boolean;
};

type DefaultTokenCategory = {
  name: string;
  tokens: DefaultToken[];
};

const ThemeShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("colors");

  // Default Tailwind tokens that aren't customized in the config
  const defaultTailwindTokens: DefaultTokenCategory[] = [
    // Original categories
    {
      name: "Default Widths",
      tokens: [
        { name: "w-auto", value: "auto", isDefault: true },
        { name: "w-1/2", value: "50%", isDefault: true },
        { name: "w-1/3", value: "33.333333%", isDefault: true },
        { name: "w-2/3", value: "66.666667%", isDefault: true },
        { name: "w-1/4", value: "25%", isDefault: true },
        { name: "w-2/4", value: "50%", isDefault: true },
        { name: "w-3/4", value: "75%", isDefault: true },
        { name: "w-1/5", value: "20%", isDefault: true },
        { name: "w-2/5", value: "40%", isDefault: true },
        { name: "w-3/5", value: "60%", isDefault: true },
        { name: "w-4/5", value: "80%", isDefault: true },
        { name: "w-1/6", value: "16.666667%", isDefault: true },
        { name: "w-full", value: "100%", isDefault: true },
        { name: "w-screen", value: "100vw", isDefault: true },
        { name: "w-min", value: "min-content", isDefault: true },
        { name: "w-max", value: "max-content", isDefault: true },
        { name: "w-fit", value: "fit-content", isDefault: true },
      ],
    },
    {
      name: "Min/Max Width",
      tokens: [
        { name: "min-w-0", value: "0px", isDefault: true },
        { name: "min-w-full", value: "100%", isDefault: true },
        { name: "min-w-min", value: "min-content", isDefault: true },
        { name: "min-w-max", value: "max-content", isDefault: true },
        { name: "min-w-fit", value: "fit-content", isDefault: true },
        { name: "max-w-0", value: "0rem", isDefault: true },
        { name: "max-w-none", value: "none", isDefault: true },
        { name: "max-w-xs", value: "20rem", isDefault: true },
        { name: "max-w-sm", value: "24rem", isDefault: true },
        { name: "max-w-md", value: "28rem", isDefault: true },
        { name: "max-w-lg", value: "32rem", isDefault: true },
        { name: "max-w-xl", value: "36rem", isDefault: true },
        { name: "max-w-2xl", value: "42rem", isDefault: true },
        { name: "max-w-3xl", value: "48rem", isDefault: true },
        { name: "max-w-4xl", value: "56rem", isDefault: true },
        { name: "max-w-5xl", value: "64rem", isDefault: true },
        { name: "max-w-6xl", value: "72rem", isDefault: true },
        { name: "max-w-7xl", value: "80rem", isDefault: true },
        { name: "max-w-full", value: "100%", isDefault: true },
        { name: "max-w-min", value: "min-content", isDefault: true },
        { name: "max-w-max", value: "max-content", isDefault: true },
        { name: "max-w-fit", value: "fit-content", isDefault: true },
        { name: "max-w-prose", value: "65ch", isDefault: true },
        { name: "max-w-screen-sm", value: "640px", isDefault: true },
        { name: "max-w-screen-md", value: "768px", isDefault: true },
        { name: "max-w-screen-lg", value: "1024px", isDefault: true },
        { name: "max-w-screen-xl", value: "1280px", isDefault: true },
        { name: "max-w-screen-2xl", value: "1536px", isDefault: true },
      ],
    },
    {
      name: "Default Heights",
      tokens: [
        { name: "h-auto", value: "auto", isDefault: true },
        { name: "h-1/2", value: "50%", isDefault: true },
        { name: "h-1/3", value: "33.333333%", isDefault: true },
        { name: "h-2/3", value: "66.666667%", isDefault: true },
        { name: "h-1/4", value: "25%", isDefault: true },
        { name: "h-2/4", value: "50%", isDefault: true },
        { name: "h-3/4", value: "75%", isDefault: true },
        { name: "h-full", value: "100%", isDefault: true },
        { name: "h-screen", value: "100vh", isDefault: true },
        { name: "h-min", value: "min-content", isDefault: true },
        { name: "h-max", value: "max-content", isDefault: true },
        { name: "h-fit", value: "fit-content", isDefault: true },
      ],
    },
    {
      name: "Min/Max Height",
      tokens: [
        { name: "min-h-0", value: "0px", isDefault: true },
        { name: "min-h-full", value: "100%", isDefault: true },
        { name: "min-h-screen", value: "100vh", isDefault: true },
        { name: "min-h-min", value: "min-content", isDefault: true },
        { name: "min-h-max", value: "max-content", isDefault: true },
        { name: "min-h-fit", value: "fit-content", isDefault: true },
        { name: "max-h-0", value: "0px", isDefault: true },
        { name: "max-h-full", value: "100%", isDefault: true },
        { name: "max-h-screen", value: "100vh", isDefault: true },
        { name: "max-h-min", value: "min-content", isDefault: true },
        { name: "max-h-max", value: "max-content", isDefault: true },
        { name: "max-h-fit", value: "fit-content", isDefault: true },
      ],
    },
    {
      name: "Default Flex Properties",
      tokens: [
        { name: "flex-row", value: "row", isDefault: true },
        { name: "flex-row-reverse", value: "row-reverse", isDefault: true },
        { name: "flex-col", value: "column", isDefault: true },
        { name: "flex-col-reverse", value: "column-reverse", isDefault: true },
        { name: "flex-wrap", value: "wrap", isDefault: true },
        { name: "flex-wrap-reverse", value: "wrap-reverse", isDefault: true },
        { name: "flex-nowrap", value: "nowrap", isDefault: true },
        { name: "flex-1", value: "1 1 0%", isDefault: true },
        { name: "flex-auto", value: "1 1 auto", isDefault: true },
        { name: "flex-initial", value: "0 1 auto", isDefault: true },
        { name: "flex-none", value: "none", isDefault: true },
      ],
    },
    {
      name: "Flex Direction/Alignment",
      tokens: [
        { name: "items-start", value: "flex-start", isDefault: true },
        { name: "items-end", value: "flex-end", isDefault: true },
        { name: "items-center", value: "center", isDefault: true },
        { name: "items-baseline", value: "baseline", isDefault: true },
        { name: "items-stretch", value: "stretch", isDefault: true },
        { name: "justify-start", value: "flex-start", isDefault: true },
        { name: "justify-end", value: "flex-end", isDefault: true },
        { name: "justify-center", value: "center", isDefault: true },
        { name: "justify-between", value: "space-between", isDefault: true },
        { name: "justify-around", value: "space-around", isDefault: true },
        { name: "justify-evenly", value: "space-evenly", isDefault: true },
        { name: "content-center", value: "center", isDefault: true },
        { name: "content-start", value: "flex-start", isDefault: true },
        { name: "content-end", value: "flex-end", isDefault: true },
        { name: "content-between", value: "space-between", isDefault: true },
        { name: "content-around", value: "space-around", isDefault: true },
        { name: "content-evenly", value: "space-evenly", isDefault: true },
      ],
    },
    {
      name: "Default Grid Properties",
      tokens: [
        {
          name: "grid-cols-1",
          value: "repeat(1, minmax(0, 1fr))",
          isDefault: true,
        },
        {
          name: "grid-cols-2",
          value: "repeat(2, minmax(0, 1fr))",
          isDefault: true,
        },
        {
          name: "grid-cols-3",
          value: "repeat(3, minmax(0, 1fr))",
          isDefault: true,
        },
        {
          name: "grid-cols-4",
          value: "repeat(4, minmax(0, 1fr))",
          isDefault: true,
        },
        {
          name: "grid-cols-5",
          value: "repeat(5, minmax(0, 1fr))",
          isDefault: true,
        },
        {
          name: "grid-cols-6",
          value: "repeat(6, minmax(0, 1fr))",
          isDefault: true,
        },
        { name: "grid-cols-none", value: "none", isDefault: true },
        { name: "col-auto", value: "auto", isDefault: true },
        { name: "col-span-1", value: "span 1 / span 1", isDefault: true },
        { name: "col-span-2", value: "span 2 / span 2", isDefault: true },
        { name: "col-span-3", value: "span 3 / span 3", isDefault: true },
        { name: "col-span-full", value: "1 / -1", isDefault: true },
      ],
    },
    {
      name: "Grid Rows & Auto Flow",
      tokens: [
        {
          name: "grid-rows-1",
          value: "repeat(1, minmax(0, 1fr))",
          isDefault: true,
        },
        {
          name: "grid-rows-2",
          value: "repeat(2, minmax(0, 1fr))",
          isDefault: true,
        },
        {
          name: "grid-rows-3",
          value: "repeat(3, minmax(0, 1fr))",
          isDefault: true,
        },
        {
          name: "grid-rows-4",
          value: "repeat(4, minmax(0, 1fr))",
          isDefault: true,
        },
        {
          name: "grid-rows-5",
          value: "repeat(5, minmax(0, 1fr))",
          isDefault: true,
        },
        {
          name: "grid-rows-6",
          value: "repeat(6, minmax(0, 1fr))",
          isDefault: true,
        },
        { name: "grid-rows-none", value: "none", isDefault: true },
        { name: "row-auto", value: "auto", isDefault: true },
        { name: "row-span-1", value: "span 1 / span 1", isDefault: true },
        { name: "row-span-2", value: "span 2 / span 2", isDefault: true },
        { name: "row-span-3", value: "span 3 / span 3", isDefault: true },
        { name: "row-span-full", value: "1 / -1", isDefault: true },
        { name: "grid-flow-row", value: "row", isDefault: true },
        { name: "grid-flow-col", value: "column", isDefault: true },
        { name: "grid-flow-dense", value: "dense", isDefault: true },
        { name: "grid-flow-row-dense", value: "row dense", isDefault: true },
        { name: "grid-flow-col-dense", value: "column dense", isDefault: true },
      ],
    },
    {
      name: "Default Position Properties",
      tokens: [
        { name: "static", value: "static", isDefault: true },
        { name: "fixed", value: "fixed", isDefault: true },
        { name: "absolute", value: "absolute", isDefault: true },
        { name: "relative", value: "relative", isDefault: true },
        { name: "sticky", value: "sticky", isDefault: true },
      ],
    },
    {
      name: "Position Placement",
      tokens: [
        { name: "top-0", value: "0px", isDefault: true },
        { name: "top-auto", value: "auto", isDefault: true },
        { name: "top-1/2", value: "50%", isDefault: true },
        { name: "top-1/3", value: "33.333333%", isDefault: true },
        { name: "top-2/3", value: "66.666667%", isDefault: true },
        { name: "top-1/4", value: "25%", isDefault: true },
        { name: "top-full", value: "100%", isDefault: true },
        { name: "right-0", value: "0px", isDefault: true },
        { name: "right-auto", value: "auto", isDefault: true },
        { name: "right-1/2", value: "50%", isDefault: true },
        { name: "right-full", value: "100%", isDefault: true },
        { name: "bottom-0", value: "0px", isDefault: true },
        { name: "bottom-auto", value: "auto", isDefault: true },
        { name: "bottom-1/2", value: "50%", isDefault: true },
        { name: "bottom-full", value: "100%", isDefault: true },
        { name: "left-0", value: "0px", isDefault: true },
        { name: "left-auto", value: "auto", isDefault: true },
        { name: "left-1/2", value: "50%", isDefault: true },
        { name: "left-full", value: "100%", isDefault: true },
        { name: "inset-0", value: "0px", isDefault: true },
        { name: "inset-auto", value: "auto", isDefault: true },
        { name: "inset-x-0", value: "0px 0px", isDefault: true },
        { name: "inset-x-auto", value: "auto", isDefault: true },
        { name: "inset-y-0", value: "0px 0px", isDefault: true },
        { name: "inset-y-auto", value: "auto", isDefault: true },
      ],
    },
    {
      name: "Default Display Properties",
      tokens: [
        { name: "block", value: "block", isDefault: true },
        { name: "inline-block", value: "inline-block", isDefault: true },
        { name: "inline", value: "inline", isDefault: true },
        { name: "flex", value: "flex", isDefault: true },
        { name: "inline-flex", value: "inline-flex", isDefault: true },
        { name: "grid", value: "grid", isDefault: true },
        { name: "inline-grid", value: "inline-grid", isDefault: true },
        { name: "hidden", value: "none", isDefault: true },
        { name: "table", value: "table", isDefault: true },
        { name: "inline-table", value: "inline-table", isDefault: true },
        { name: "table-caption", value: "table-caption", isDefault: true },
        { name: "table-cell", value: "table-cell", isDefault: true },
        { name: "table-column", value: "table-column", isDefault: true },
        {
          name: "table-column-group",
          value: "table-column-group",
          isDefault: true,
        },
        {
          name: "table-footer-group",
          value: "table-footer-group",
          isDefault: true,
        },
        {
          name: "table-header-group",
          value: "table-header-group",
          isDefault: true,
        },
        { name: "table-row-group", value: "table-row-group", isDefault: true },
        { name: "table-row", value: "table-row", isDefault: true },
        { name: "flow-root", value: "flow-root", isDefault: true },
        { name: "contents", value: "contents", isDefault: true },
        { name: "list-item", value: "list-item", isDefault: true },
      ],
    },
    {
      name: "Default Font Weight",
      tokens: [
        { name: "font-thin", value: "100", isDefault: true },
        { name: "font-extralight", value: "200", isDefault: true },
        { name: "font-light", value: "300", isDefault: true },
        { name: "font-normal", value: "400", isDefault: true },
        { name: "font-medium", value: "500", isDefault: true },
        { name: "font-semibold", value: "600", isDefault: true },
        { name: "font-bold", value: "700", isDefault: true },
        { name: "font-extrabold", value: "800", isDefault: true },
        { name: "font-black", value: "900", isDefault: true },
      ],
    },
    {
      name: "Default Line Heights",
      tokens: [
        { name: "leading-none", value: "1", isDefault: true },
        { name: "leading-tight", value: "1.25", isDefault: true },
        { name: "leading-snug", value: "1.375", isDefault: true },
        { name: "leading-normal", value: "1.5", isDefault: true },
        { name: "leading-relaxed", value: "1.625", isDefault: true },
        { name: "leading-loose", value: "2", isDefault: true },
        { name: "leading-3", value: ".75rem", isDefault: true },
        { name: "leading-4", value: "1rem", isDefault: true },
        { name: "leading-5", value: "1.25rem", isDefault: true },
        { name: "leading-6", value: "1.5rem", isDefault: true },
        { name: "leading-7", value: "1.75rem", isDefault: true },
        { name: "leading-8", value: "2rem", isDefault: true },
        { name: "leading-9", value: "2.25rem", isDefault: true },
        { name: "leading-10", value: "2.5rem", isDefault: true },
      ],
    },
    {
      name: "Default Letter Spacing",
      tokens: [
        { name: "tracking-tighter", value: "-0.05em", isDefault: true },
        { name: "tracking-tight", value: "-0.025em", isDefault: true },
        { name: "tracking-normal", value: "0em", isDefault: true },
        { name: "tracking-wide", value: "0.025em", isDefault: true },
        { name: "tracking-wider", value: "0.05em", isDefault: true },
        { name: "tracking-widest", value: "0.1em", isDefault: true },
      ],
    },
    {
      name: "Default Text Properties",
      tokens: [
        { name: "text-left", value: "left", isDefault: true },
        { name: "text-center", value: "center", isDefault: true },
        { name: "text-right", value: "right", isDefault: true },
        { name: "text-justify", value: "justify", isDefault: true },
        { name: "text-uppercase", value: "uppercase", isDefault: true },
        { name: "text-lowercase", value: "lowercase", isDefault: true },
        { name: "text-capitalize", value: "capitalize", isDefault: true },
        { name: "whitespace-normal", value: "normal", isDefault: true },
        { name: "whitespace-nowrap", value: "nowrap", isDefault: true },
        { name: "whitespace-pre", value: "pre", isDefault: true },
        { name: "whitespace-pre-line", value: "pre-line", isDefault: true },
        { name: "whitespace-pre-wrap", value: "pre-wrap", isDefault: true },
      ],
    },
    {
      name: "Gap Spacing",
      tokens: [
        { name: "gap-0", value: "0px", isDefault: true },
        { name: "gap-px", value: "1px", isDefault: true },
        { name: "gap-0.5", value: "0.125rem", isDefault: true },
        { name: "gap-1", value: "0.25rem", isDefault: true },
        { name: "gap-1.5", value: "0.375rem", isDefault: true },
        { name: "gap-2", value: "0.5rem", isDefault: true },
        { name: "gap-2.5", value: "0.625rem", isDefault: true },
        { name: "gap-3", value: "0.75rem", isDefault: true },
        { name: "gap-3.5", value: "0.875rem", isDefault: true },
        { name: "gap-4", value: "1rem", isDefault: true },
        { name: "gap-5", value: "1.25rem", isDefault: true },
        { name: "gap-6", value: "1.5rem", isDefault: true },
        { name: "gap-7", value: "1.75rem", isDefault: true },
        { name: "gap-8", value: "2rem", isDefault: true },
        { name: "gap-9", value: "2.25rem", isDefault: true },
        { name: "gap-10", value: "2.5rem", isDefault: true },
        { name: "gap-11", value: "2.75rem", isDefault: true },
        { name: "gap-12", value: "3rem", isDefault: true },
      ],
    },
    {
      name: "Padding & Margin",
      tokens: [
        { name: "p-0", value: "0px", isDefault: true },
        { name: "p-px", value: "1px", isDefault: true },
        { name: "p-1", value: "0.25rem", isDefault: true },
        { name: "p-2", value: "0.5rem", isDefault: true },
        { name: "p-3", value: "0.75rem", isDefault: true },
        { name: "p-4", value: "1rem", isDefault: true },
        { name: "p-5", value: "1.25rem", isDefault: true },
        { name: "p-6", value: "1.5rem", isDefault: true },
        { name: "p-8", value: "2rem", isDefault: true },
        { name: "p-10", value: "2.5rem", isDefault: true },
        { name: "p-12", value: "3rem", isDefault: true },
        { name: "p-16", value: "4rem", isDefault: true },
        { name: "p-20", value: "5rem", isDefault: true },
        { name: "m-0", value: "0px", isDefault: true },
        { name: "m-px", value: "1px", isDefault: true },
        { name: "m-1", value: "0.25rem", isDefault: true },
        { name: "m-2", value: "0.5rem", isDefault: true },
        { name: "m-3", value: "0.75rem", isDefault: true },
        { name: "m-4", value: "1rem", isDefault: true },
        { name: "m-5", value: "1.25rem", isDefault: true },
        { name: "m-6", value: "1.5rem", isDefault: true },
        { name: "m-8", value: "2rem", isDefault: true },
        { name: "m-10", value: "2.5rem", isDefault: true },
        { name: "m-auto", value: "auto", isDefault: true },
      ],
    },
    {
      name: "Z-Index",
      tokens: [
        { name: "z-0", value: "0", isDefault: true },
        { name: "z-10", value: "10", isDefault: true },
        { name: "z-20", value: "20", isDefault: true },
        { name: "z-30", value: "30", isDefault: true },
        { name: "z-40", value: "40", isDefault: true },
        { name: "z-50", value: "50", isDefault: true },
        { name: "z-auto", value: "auto", isDefault: true },
      ],
    },
    {
      name: "Default Border Width",
      tokens: [
        { name: "border-0", value: "0px", isDefault: true },
        { name: "border", value: "1px", isDefault: true },
        { name: "border-2", value: "2px", isDefault: true },
        { name: "border-4", value: "4px", isDefault: true },
        { name: "border-8", value: "8px", isDefault: true },
        { name: "border-x-0", value: "0px", isDefault: true },
        { name: "border-x", value: "1px", isDefault: true },
        { name: "border-x-2", value: "2px", isDefault: true },
        { name: "border-x-4", value: "4px", isDefault: true },
        { name: "border-x-8", value: "8px", isDefault: true },
        { name: "border-y-0", value: "0px", isDefault: true },
        { name: "border-y", value: "1px", isDefault: true },
        { name: "border-y-2", value: "2px", isDefault: true },
        { name: "border-y-4", value: "4px", isDefault: true },
        { name: "border-y-8", value: "8px", isDefault: true },
      ],
    },
    {
      name: "Border Styles",
      tokens: [
        { name: "border-solid", value: "solid", isDefault: true },
        { name: "border-dashed", value: "dashed", isDefault: true },
        { name: "border-dotted", value: "dotted", isDefault: true },
        { name: "border-double", value: "double", isDefault: true },
        { name: "border-hidden", value: "hidden", isDefault: true },
        { name: "border-none", value: "none", isDefault: true },
      ],
    },
    {
      name: "Default Opacity",
      tokens: [
        { name: "opacity-0", value: "0", isDefault: true },
        { name: "opacity-5", value: "0.05", isDefault: true },
        { name: "opacity-10", value: "0.1", isDefault: true },
        { name: "opacity-20", value: "0.2", isDefault: true },
        { name: "opacity-25", value: "0.25", isDefault: true },
        { name: "opacity-30", value: "0.3", isDefault: true },
        { name: "opacity-40", value: "0.4", isDefault: true },
        { name: "opacity-50", value: "0.5", isDefault: true },
        { name: "opacity-60", value: "0.6", isDefault: true },
        { name: "opacity-70", value: "0.7", isDefault: true },
        { name: "opacity-75", value: "0.75", isDefault: true },
        { name: "opacity-80", value: "0.8", isDefault: true },
        { name: "opacity-90", value: "0.9", isDefault: true },
        { name: "opacity-95", value: "0.95", isDefault: true },
        { name: "opacity-100", value: "1", isDefault: true },
      ],
    },
    {
      name: "Default Scale Transform",
      tokens: [
        { name: "scale-0", value: "0", isDefault: true },
        { name: "scale-50", value: ".5", isDefault: true },
        { name: "scale-75", value: ".75", isDefault: true },
        { name: "scale-90", value: ".9", isDefault: true },
        { name: "scale-95", value: ".95", isDefault: true },
        { name: "scale-100", value: "1", isDefault: true },
        { name: "scale-105", value: "1.05", isDefault: true },
        { name: "scale-110", value: "1.1", isDefault: true },
        { name: "scale-125", value: "1.25", isDefault: true },
        { name: "scale-150", value: "1.5", isDefault: true },
      ],
    },
    {
      name: "Default Rotate Transform",
      tokens: [
        { name: "rotate-0", value: "0deg", isDefault: true },
        { name: "rotate-1", value: "1deg", isDefault: true },
        { name: "rotate-2", value: "2deg", isDefault: true },
        { name: "rotate-3", value: "3deg", isDefault: true },
        { name: "rotate-6", value: "6deg", isDefault: true },
        { name: "rotate-12", value: "12deg", isDefault: true },
        { name: "rotate-45", value: "45deg", isDefault: true },
        { name: "rotate-90", value: "90deg", isDefault: true },
        { name: "rotate-180", value: "180deg", isDefault: true },
        { name: "-rotate-1", value: "-1deg", isDefault: true },
        { name: "-rotate-2", value: "-2deg", isDefault: true },
        { name: "-rotate-3", value: "-3deg", isDefault: true },
        { name: "-rotate-6", value: "-6deg", isDefault: true },
        { name: "-rotate-12", value: "-12deg", isDefault: true },
        { name: "-rotate-45", value: "-45deg", isDefault: true },
        { name: "-rotate-90", value: "-90deg", isDefault: true },
        { name: "-rotate-180", value: "-180deg", isDefault: true },
      ],
    },
    {
      name: "Default Transition Properties",
      tokens: [
        { name: "transition-none", value: "none", isDefault: true },
        {
          name: "transition-all",
          value: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          isDefault: true,
        },
        {
          name: "transition",
          value:
            "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          isDefault: true,
        },
        {
          name: "transition-colors",
          value:
            "color, background-color, border-color, text-decoration-color, fill, stroke 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          isDefault: true,
        },
        {
          name: "transition-opacity",
          value: "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          isDefault: true,
        },
        {
          name: "transition-shadow",
          value: "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          isDefault: true,
        },
        {
          name: "transition-transform",
          value: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          isDefault: true,
        },
      ],
    },
    {
      name: "Default Duration/Timing",
      tokens: [
        { name: "duration-75", value: "75ms", isDefault: true },
        { name: "duration-100", value: "100ms", isDefault: true },
        { name: "duration-150", value: "150ms", isDefault: true },
        { name: "duration-200", value: "200ms", isDefault: true },
        { name: "duration-300", value: "300ms", isDefault: true },
        { name: "duration-500", value: "500ms", isDefault: true },
        { name: "duration-700", value: "700ms", isDefault: true },
        { name: "duration-1000", value: "1000ms", isDefault: true },
        { name: "ease-linear", value: "linear", isDefault: true },
        {
          name: "ease-in",
          value: "cubic-bezier(0.4, 0, 1, 1)",
          isDefault: true,
        },
        {
          name: "ease-out",
          value: "cubic-bezier(0, 0, 0.2, 1)",
          isDefault: true,
        },
        {
          name: "ease-in-out",
          value: "cubic-bezier(0.4, 0, 0.2, 1)",
          isDefault: true,
        },
      ],
    },
    {
      name: "Default Animation",
      tokens: [
        { name: "animate-none", value: "none", isDefault: true },
        {
          name: "animate-spin",
          value: "spin 1s linear infinite",
          isDefault: true,
        },
        {
          name: "animate-ping",
          value: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
          isDefault: true,
        },
        {
          name: "animate-pulse",
          value: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          isDefault: true,
        },
        {
          name: "animate-bounce",
          value: "bounce 1s infinite",
          isDefault: true,
        },
      ],
    },
  ];

  const colorCategories: ColorCategory[] = [
    {
      name: "Gray",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `gray-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Blue",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `blue-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Green",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `green-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Red",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `red-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Orange",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `orange-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Yellow",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `yellow-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Teal",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `teal-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Violet",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `violet-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Cyan",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `cyan-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Amber",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `amber-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Pink",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `pink-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Purple",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `purple-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "White Overlay",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `white-overlay-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Black Overlay",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `black-overlay-${i === 0 ? "50" : i * 100}`,
      })),
    },
  ];

  const darkColorCategories: ColorCategory[] = [
    {
      name: "Dark Gray",
      variants: [
        { name: "50", value: "dark-gray-50" },
        { name: "100", value: "dark-gray-100" },
        { name: "200", value: "dark-gray-200" },
        { name: "250", value: "dark-gray-250" },
        { name: "300", value: "dark-gray-300" },
        { name: "400", value: "dark-gray-400" },
        { name: "500", value: "dark-gray-500" },
        { name: "600", value: "dark-gray-600" },
        { name: "650", value: "dark-gray-650" },
        { name: "700", value: "dark-gray-700" },
        { name: "800", value: "dark-gray-800" },
        { name: "900", value: "dark-gray-900" },
      ],
    },
    {
      name: "Dark Blue",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `dark-blue-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Dark Green",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `dark-green-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Dark Red",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `dark-red-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Dark Amber",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `dark-amber-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Dark Orange",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `dark-orange-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Dark Yellow",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `dark-yellow-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Dark Teal",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `dark-teal-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Dark Cyan",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `dark-cyan-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Dark Purple",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `dark-purple-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Dark Pink",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `dark-pink-${i === 0 ? "50" : i * 100}`,
      })),
    },
    {
      name: "Dark Violet",
      variants: Array.from({ length: 10 }, (_, i) => ({
        name: i === 0 ? "50" : (i * 100).toString(),
        value: `dark-violet-${i === 0 ? "50" : i * 100}`,
      })),
    },
  ];

  const semanticColors: SemanticColorCategory[] = [
    {
      name: "Ink (Text)",
      colors: [
        { name: "ink-white", value: "ink-white" },
        { name: "ink-gray-1", value: "ink-gray-1" },
        { name: "ink-gray-2", value: "ink-gray-2" },
        { name: "ink-gray-3", value: "ink-gray-3" },
        { name: "ink-gray-4", value: "ink-gray-4" },
        { name: "ink-gray-5", value: "ink-gray-5" },
        { name: "ink-gray-6", value: "ink-gray-6" },
        { name: "ink-gray-7", value: "ink-gray-7" },
        { name: "ink-gray-8", value: "ink-gray-8" },
        { name: "ink-gray-9", value: "ink-gray-9" },
        { name: "ink-red-1", value: "ink-red-1" },
        { name: "ink-red-2", value: "ink-red-2" },
        { name: "ink-red-3", value: "ink-red-3" },
        { name: "ink-red-4", value: "ink-red-4" },
        { name: "ink-green-1", value: "ink-green-1" },
        { name: "ink-green-2", value: "ink-green-2" },
        { name: "ink-green-3", value: "ink-green-3" },
        { name: "ink-amber-1", value: "ink-amber-1" },
        { name: "ink-amber-2", value: "ink-amber-2" },
        { name: "ink-amber-3", value: "ink-amber-3" },
        { name: "ink-blue-1", value: "ink-blue-1" },
        { name: "ink-blue-2", value: "ink-blue-2" },
        { name: "ink-blue-3", value: "ink-blue-3" },
        { name: "ink-cyan-1", value: "ink-cyan-1" },
        { name: "ink-pink-1", value: "ink-pink-1" },
        { name: "ink-violet-1", value: "ink-violet-1" },
        { name: "ink-blue-link", value: "ink-blue-link" },
      ],
    },
    {
      name: "Surface (Background)",
      colors: [
        { name: "surface-white", value: "surface-white" },
        { name: "surface-gray-1", value: "surface-gray-1" },
        { name: "surface-gray-2", value: "surface-gray-2" },
        { name: "surface-gray-3", value: "surface-gray-3" },
        { name: "surface-gray-4", value: "surface-gray-4" },
        { name: "surface-gray-5", value: "surface-gray-5" },
        { name: "surface-gray-6", value: "surface-gray-6" },
        { name: "surface-gray-7", value: "surface-gray-7" },
        { name: "surface-red-1", value: "surface-red-1" },
        { name: "surface-red-2", value: "surface-red-2" },
        { name: "surface-red-3", value: "surface-red-3" },
        { name: "surface-red-4", value: "surface-red-4" },
        { name: "surface-red-5", value: "surface-red-5" },
        { name: "surface-red-6", value: "surface-red-6" },
        { name: "surface-red-7", value: "surface-red-7" },
        { name: "surface-green-1", value: "surface-green-1" },
        { name: "surface-green-2", value: "surface-green-2" },
        { name: "surface-green-3", value: "surface-green-3" },
        { name: "surface-amber-1", value: "surface-amber-1" },
        { name: "surface-amber-2", value: "surface-amber-2" },
        { name: "surface-amber-3", value: "surface-amber-3" },
        { name: "surface-blue-1", value: "surface-blue-1" },
        { name: "surface-blue-2", value: "surface-blue-2" },
        { name: "surface-blue-3", value: "surface-blue-3" },
        { name: "surface-orange-1", value: "surface-orange-1" },
        { name: "surface-violet-1", value: "surface-violet-1" },
        { name: "surface-cyan-1", value: "surface-cyan-1" },
        { name: "surface-pink-1", value: "surface-pink-1" },
        { name: "surface-menu-bar", value: "surface-menu-bar" },
        { name: "surface-cards", value: "surface-cards" },
        { name: "surface-modal", value: "surface-modal" },
        { name: "surface-selected", value: "surface-selected" },
      ],
    },
    {
      name: "Outline (Border)",
      colors: [
        { name: "outline-white", value: "outline-white" },
        { name: "outline-gray-1", value: "outline-gray-1" },
        { name: "outline-gray-2", value: "outline-gray-2" },
        { name: "outline-gray-3", value: "outline-gray-3" },
        { name: "outline-gray-4", value: "outline-gray-4" },
        { name: "outline-gray-5", value: "outline-gray-5" },
        { name: "outline-red-1", value: "outline-red-1" },
        { name: "outline-red-2", value: "outline-red-2" },
        { name: "outline-red-3", value: "outline-red-3" },
        { name: "outline-green-1", value: "outline-green-1" },
        { name: "outline-green-2", value: "outline-green-2" },
        { name: "outline-amber-1", value: "outline-amber-1" },
        { name: "outline-amber-2", value: "outline-amber-2" },
        { name: "outline-blue-1", value: "outline-blue-1" },
        { name: "outline-orange-1", value: "outline-orange-1" },
        { name: "outline-gray-modals", value: "outline-gray-modals" },
      ],
    },
  ];

  const fontSizes: FontSizeToken[] = [
    {
      name: "2xs",
      size: "var(--text-2xs-size)",
      lineHeight: "var(--text-2xs-line-height)",
      letterSpacing: "var(--text-2xs-letter-spacing)",
      fontWeight: "var(--text-2xs-font-weight)",
    },
    {
      name: "xs",
      size: "var(--text-xs-size)",
      lineHeight: "var(--text-xs-line-height)",
      letterSpacing: "var(--text-xs-letter-spacing)",
      fontWeight: "var(--text-xs-font-weight)",
    },
    {
      name: "sm",
      size: "var(--text-sm-size)",
      lineHeight: "var(--text-sm-line-height)",
      letterSpacing: "var(--text-sm-letter-spacing)",
      fontWeight: "var(--text-sm-font-weight)",
    },
    {
      name: "base",
      size: "var(--text-base-size)",
      lineHeight: "var(--text-base-line-height)",
      letterSpacing: "var(--text-base-letter-spacing)",
      fontWeight: "var(--text-base-font-weight)",
    },
    {
      name: "lg",
      size: "var(--text-lg-size)",
      lineHeight: "var(--text-lg-line-height)",
      letterSpacing: "var(--text-lg-letter-spacing)",
      fontWeight: "var(--text-lg-font-weight)",
    },
    {
      name: "xl",
      size: "var(--text-xl-size)",
      lineHeight: "var(--text-xl-line-height)",
      letterSpacing: "var(--text-xl-letter-spacing)",
      fontWeight: "var(--text-xl-font-weight)",
    },
    {
      name: "2xl",
      size: "var(--text-2xl-size)",
      lineHeight: "var(--text-2xl-line-height)",
      letterSpacing: "var(--text-2xl-letter-spacing)",
      fontWeight: "var(--text-2xl-font-weight)",
    },
    {
      name: "3xl",
      size: "var(--text-3xl-size)",
      lineHeight: "var(--text-3xl-line-height)",
      letterSpacing: "var(--text-3xl-letter-spacing)",
      fontWeight: "var(--text-3xl-font-weight)",
    },
  ];

  const paragraphFontSizes: FontSizeToken[] = [
    {
      name: "p-2xs",
      size: "var(--text-p-2xs-size)",
      lineHeight: "var(--text-p-2xs-line-height)",
      letterSpacing: "var(--text-p-2xs-letter-spacing)",
      fontWeight: "var(--text-p-2xs-font-weight)",
    },
    {
      name: "p-xs",
      size: "var(--text-p-xs-size)",
      lineHeight: "var(--text-p-xs-line-height)",
      letterSpacing: "var(--text-p-xs-letter-spacing)",
      fontWeight: "var(--text-p-xs-font-weight)",
    },
    {
      name: "p-sm",
      size: "var(--text-p-sm-size)",
      lineHeight: "var(--text-p-sm-line-height)",
      letterSpacing: "var(--text-p-sm-letter-spacing)",
      fontWeight: "var(--text-p-sm-font-weight)",
    },
    {
      name: "p-base",
      size: "var(--text-p-base-size)",
      lineHeight: "var(--text-p-base-line-height)",
      letterSpacing: "var(--text-p-base-letter-spacing)",
      fontWeight: "var(--text-p-base-font-weight)",
    },
    {
      name: "p-lg",
      size: "var(--text-p-lg-size)",
      lineHeight: "var(--text-p-lg-line-height)",
      letterSpacing: "var(--text-p-lg-letter-spacing)",
      fontWeight: "var(--text-p-lg-font-weight)",
    },
    {
      name: "p-xl",
      size: "var(--text-p-xl-size)",
      lineHeight: "var(--text-p-xl-line-height)",
      letterSpacing: "var(--text-p-xl-letter-spacing)",
      fontWeight: "var(--text-p-xl-font-weight)",
    },
    {
      name: "p-2xl",
      size: "var(--text-p-2xl-size)",
      lineHeight: "var(--text-p-2xl-line-height)",
      letterSpacing: "var(--text-p-2xl-letter-spacing)",
      fontWeight: "var(--text-p-2xl-font-weight)",
    },
    {
      name: "p-3xl",
      size: "var(--text-p-3xl-size)",
      lineHeight: "var(--text-p-3xl-line-height)",
      letterSpacing: "var(--text-p-3xl-letter-spacing)",
      fontWeight: "var(--text-p-3xl-font-weight)",
    },
  ];

  const spacingTokens: SpacingToken[] = [
    { name: "0", value: "0px" },
    { name: "px", value: "1px" },
    { name: "0.5", value: "0.125rem" },
    { name: "1", value: "0.25rem" },
    { name: "1.5", value: "0.375rem" },
    { name: "2", value: "0.5rem" },
    { name: "2.5", value: "0.625rem" },
    { name: "3", value: "0.75rem" },
    { name: "3.5", value: "0.875rem" },
    { name: "4", value: "1rem" },
    { name: "5", value: "1.25rem" },
    { name: "6", value: "1.5rem" },
    { name: "7", value: "1.75rem" },
    { name: "8", value: "2rem" },
    { name: "9", value: "2.25rem" },
    { name: "10", value: "2.5rem" },
    { name: "11", value: "2.75rem" },
    { name: "12", value: "3rem" },
    { name: "14", value: "3.5rem" },
    { name: "16", value: "4rem" },
    { name: "20", value: "5rem" },
    { name: "24", value: "6rem" },
    { name: "28", value: "7rem" },
    { name: "32", value: "8rem" },
    { name: "36", value: "9rem" },
    { name: "40", value: "10rem" },
    { name: "44", value: "11rem" },
    { name: "48", value: "12rem" },
    { name: "52", value: "13rem" },
    { name: "56", value: "14rem" },
    { name: "60", value: "15rem" },
    { name: "64", value: "16rem" },
    { name: "72", value: "18rem" },
    { name: "80", value: "20rem" },
    { name: "96", value: "24rem" },
    { name: "112", value: "28rem" },
  ];

  const shadowTokens: ShadowToken[] = [
    { name: "shadow-sm", value: "var(--shadow-sm)" },
    { name: "shadow", value: "var(--shadow-default)" },
    { name: "shadow-md", value: "var(--shadow-md)" },
    { name: "shadow-lg", value: "var(--shadow-lg)" },
    { name: "shadow-xl", value: "var(--shadow-xl)" },
    { name: "shadow-2xl", value: "var(--shadow-2xl)" },
    { name: "shadow-none", value: "var(--shadow-none)" },
  ];

  const radiusTokens: RadiusToken[] = [
    { name: "radius-none", value: "var(--radius-none)" },
    { name: "radius-sm", value: "var(--radius-sm)" },
    { name: "radius", value: "var(--radius-default)" },
    { name: "radius-md", value: "var(--radius-md)" },
    { name: "radius-lg", value: "var(--radius-lg)" },
    { name: "radius-xl", value: "var(--radius-xl)" },
    { name: "radius-2xl", value: "var(--radius-2xl)" },
    { name: "radius-full", value: "var(--radius-full)" },
  ];

  return (
    <div className={`theme-showcase`}>
      <header className="showcase-header">
        <h1>Design System - Theme Showcase</h1>
      </header>

      <div className="showcase-tabs">
        <button
          className={activeTab === "colors" ? "active" : ""}
          onClick={() => setActiveTab("colors")}
        >
          Colors
        </button>
        <button
          className={activeTab === "semantic-colors" ? "active" : ""}
          onClick={() => setActiveTab("semantic-colors")}
        >
          Semantic Colors
        </button>
        <button
          className={activeTab === "typography" ? "active" : ""}
          onClick={() => setActiveTab("typography")}
        >
          Typography
        </button>
        <button
          className={activeTab === "spacing" ? "active" : ""}
          onClick={() => setActiveTab("spacing")}
        >
          Spacing
        </button>
        <button
          className={activeTab === "shadows" ? "active" : ""}
          onClick={() => setActiveTab("shadows")}
        >
          Shadows
        </button>
        <button
          className={activeTab === "radius" ? "active" : ""}
          onClick={() => setActiveTab("radius")}
        >
          Border Radius
        </button>
        <button
          className={activeTab === "default-tokens" ? "active" : ""}
          onClick={() => setActiveTab("default-tokens")}
        >
          Default Tailwind
        </button>
      </div>

      <div className="showcase-content">
        {activeTab === "colors" && (
          <div className="color-grid">
            <h2>Base Colors</h2>
            <div className="color-swatches">
              <div className="color-swatch">
                <div
                  className="swatch"
                  style={{ backgroundColor: "var(--color-black)" }}
                ></div>
                <div className="swatch-info">
                  <span className="swatch-name">Black</span>
                  <span className="swatch-value">--color-black</span>
                </div>
              </div>
              <div className="color-swatch">
                <div
                  className="swatch"
                  style={{
                    backgroundColor: "var(--color-white)",
                    border: "1px solid var(--outline-gray-1)",
                  }}
                ></div>
                <div className="swatch-info">
                  <span className="swatch-name">White</span>
                  <span className="swatch-value">--color-white</span>
                </div>
              </div>
            </div>

            <h2>Color Scales</h2>
            {colorCategories.map((category) => (
              <div key={category.name} className="color-category">
                <h3>{category.name}</h3>
                <div className="color-scale">
                  {category.variants.map((variant) => (
                    <div key={variant.name} className="color-swatch">
                      <div
                        className="swatch"
                        style={{
                          backgroundColor: `var(--color-${variant.value})`,
                          border: "1px solid var(--outline-gray-1)",
                        }}
                      ></div>
                      <div className="swatch-info">
                        <span className="swatch-name">{variant.name}</span>
                        <span className="swatch-value">
                          --color-{variant.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <h2>Dark Mode Colors</h2>
            {darkColorCategories.map((category) => (
              <div key={category.name} className="color-category">
                <h3>{category.name}</h3>
                <div className="color-scale">
                  {category.variants.map((variant) => (
                    <div key={variant.name} className="color-swatch">
                      <div
                        className="swatch"
                        style={{
                          backgroundColor: `var(--color-${variant.value})`,
                          border: "1px solid var(--outline-gray-1)",
                        }}
                      ></div>
                      <div className="swatch-info">
                        <span className="swatch-name">{variant.name}</span>
                        <span className="swatch-value">
                          --color-{variant.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "semantic-colors" && (
          <div className="semantic-colors">
            <h2>Semantic Colors</h2>
            {semanticColors.map((category) => (
              <div key={category.name} className="semantic-color-category">
                <h3>{category.name}</h3>
                <div className="semantic-color-grid">
                  {category.colors.map((color) => (
                    <div key={color.name} className="semantic-color-swatch">
                      <div
                        className="swatch"
                        style={{
                          backgroundColor: `var(--${color.value})`,
                          border: "1px solid var(--outline-gray-1)",
                        }}
                      ></div>
                      <div className="swatch-info">
                        <span className="swatch-name">{color.name}</span>
                        <span className="swatch-value">--{color.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "typography" && (
          <div className="typography">
            <h2>Font Sizes</h2>
            <div className="typography-section">
              <h3>Headings</h3>
              {fontSizes.map((fontSize) => (
                <div key={fontSize.name} className="font-size-item">
                  <div
                    className="font-size-example"
                    style={{
                      fontSize: fontSize.size,
                      lineHeight: fontSize.lineHeight,
                      letterSpacing: fontSize.letterSpacing,
                      fontWeight: fontSize.fontWeight,
                    }}
                  >
                    Aa The quick brown fox jumps over the lazy dog
                  </div>
                  <div className="font-size-details">
                    <span className="font-size-name">text-{fontSize.name}</span>
                    <span className="font-size-values">
                      {fontSize.size} / {fontSize.lineHeight} /{" "}
                      {fontSize.letterSpacing} / {fontSize.fontWeight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="typography-section">
              <h3>Paragraph</h3>
              {paragraphFontSizes.map((fontSize) => (
                <div key={fontSize.name} className="font-size-item">
                  <div
                    className="font-size-example"
                    style={{
                      fontSize: fontSize.size,
                      lineHeight: fontSize.lineHeight,
                      letterSpacing: fontSize.letterSpacing,
                      fontWeight: fontSize.fontWeight,
                    }}
                  >
                    <p>
                      The quick brown fox jumps over the lazy dog. Lorem ipsum
                      dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                  <div className="font-size-details">
                    <span className="font-size-name">text-{fontSize.name}</span>
                    <span className="font-size-values">
                      {fontSize.size} / {fontSize.lineHeight} /{" "}
                      {fontSize.letterSpacing} / {fontSize.fontWeight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "spacing" && (
          <div className="spacing">
            <h2>Spacing</h2>
            <div className="spacing-grid">
              {spacingTokens.map((token) => (
                <div key={token.name} className="spacing-item">
                  <div className="spacing-visual">
                    <div
                      className="spacing-box"
                      style={{ width: token.value, height: token.value }}
                    ></div>
                  </div>
                  <div className="spacing-info">
                    <span className="spacing-name">spacing-{token.name}</span>
                    <span className="spacing-value">{token.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "shadows" && (
          <div className="shadows">
            <h2>Box Shadows</h2>
            <div className="shadows-grid">
              {shadowTokens.map((token) => (
                <div key={token.name} className="shadow-item">
                  <div
                    className="shadow-example"
                    style={{ boxShadow: token.value }}
                  ></div>
                  <div className="shadow-info">
                    <span className="shadow-name">{token.name}</span>
                    <span className="shadow-value">{token.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "radius" && (
          <div className="radius">
            <h2>Border Radius</h2>
            <div className="radius-grid">
              {radiusTokens.map((token) => (
                <div key={token.name} className="radius-item">
                  <div
                    className="radius-example"
                    style={{ borderRadius: token.value }}
                  ></div>
                  <div className="radius-info">
                    <span className="radius-name">{token.name}</span>
                    <span className="radius-value">{token.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "default-tokens" && (
          <div className="default-tokens">
            <h2>Default Tailwind Tokens</h2>
            <p className="default-tokens-intro">
              These are Tailwind's default tokens that haven't been customized
              in your theme configuration. They're still available to use in
              your project alongside your custom tokens.
            </p>

            <div className="default-token-categories-wrapper">
              {defaultTailwindTokens.map((category) => (
                <div key={category.name} className="default-token-category">
                  <h3>{category.name}</h3>
                  <div className="default-token-grid">
                    {category.tokens.map((token) => (
                      <div key={token.name} className="default-token-item">
                        <div className="default-token-info">
                          <span className="default-token-name">
                            {token.name}
                          </span>
                          <span className="default-token-value">
                            {token.value}
                          </span>
                          {token.isDefault && (
                            <span className="default-badge">
                              Tailwind Default
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="default-token-note">
              <p>
                This is a comprehensive list of Tailwind's default tokens that
                are still available for use in your project. You can use them
                alongside your custom tokens to create consistent designs.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeShowcase;
