import type { ButtonTheme, ThemeVariant } from "./types";

export const solidClasses: Record<ButtonTheme, string> = {
    gray: 'text-(--ink-white) bg-(--surface-gray-7) hover:bg-(--surface-gray-6) active:bg-(--surface-gray-5)',
    blue: 'text-(--ink-white) bg-blue-500 hover:bg-(--surface-blue-3) active:bg-blue-700',
    green: 'text-(--ink-white) bg-(--surface-green-3) hover:bg-green-700 active:bg-green-800',
    red: 'text-(--ink-white) bg-(--surface-red-5) hover:bg-(--surface-red-6) active:bg-(--surface-red-7)',
};

export const subtleClasses: Record<ButtonTheme, string> = {
    gray: 'text-(--ink-gray-8) bg-(--surface-gray-2) hover:bg-(--surface-gray-3) active:bg-(--surface-gray-4)',
    blue: 'text-(--ink-blue-3) bg-(--surface-blue-2) hover:bg-blue-200 active:bg-blue-300',
    green: 'text-green-800 bg-(--surface-green-2) hover:bg-green-200 active:bg-green-300',
    red: 'text-red-700 bg-(--surface-red-2) hover:bg-(--surface-red-3) active:bg-(--surface-red-4)',
};

export const outlineClasses: Record<ButtonTheme, string> = {
    gray: 'text-(--ink-gray-8) bg-(--surface-white) border border-(--outline-gray-2) hover:border-(--outline-gray-3) active:border-(--outline-gray-3) active:bg-(--surface-gray-4)',
    blue: 'text-(--ink-blue-3) bg-(--surface-white) border border-(--outline-blue-1) hover:border-blue-400 active:border-blue-400 active:bg-blue-300',
    green: 'text-green-800 bg-(--surface-white) border border-(--outline-green-2) hover:border-green-500 active:border-green-500) active:bg-green-300',
    red: 'text-red-700 bg-(--surface-white) border border-(--outline-red-1) hover:border-(--outline-red-2) active:border-(--outline-red-2) active:bg-(--surface-red-3)',
};

export const ghostClasses: Record<ButtonTheme, string> = {
    gray: 'text-(--ink-gray-8) bg-transparent hover:bg-(--surface-gray-3) active:bg-(--surface-gray-4)',
    blue: 'text-(--ink-blue-3) bg-transparent hover:bg-blue-200 active:bg-blue-300',
    green: 'text-green-800 bg-transparent hover:bg-green-200 active:bg-green-300',
    red: 'text-red-700 bg-transparent hover:bg-(--surface-red-3) active:bg-(--surface-red-4)',
};

export const focusClasses: Record<ButtonTheme, string> = {
    gray: 'focus-visible:ring focus-visible:ring-(--outline-gray-3)',
    blue: 'focus-visible:ring focus-visible:ring-blue-400',
    green: 'focus-visible:ring focus-visible:ring-(--outline-green-2)',
    red: 'focus-visible:ring focus-visible:ring-(--outline-red-2)',
};

export const disabledClassesMap: Record<ThemeVariant, string> = {
    'gray-solid': 'bg-(--surface-gray-2) text-(--ink-gray-4)',
    'gray-subtle': 'bg-(--surface-gray-2) text-(--ink-gray-4)',
    'gray-outline': 'bg-(--surface-gray-2) text-(--ink-gray-4) border border-(--outline-gray-2)',
    'gray-ghost': 'text-(--ink-gray-4)',

    'blue-solid': 'bg-blue-300 text-(--ink-white)',
    'blue-subtle': 'bg-(--surface-blue-2 text-(--ink-blue-link)',
    'blue-outline': 'bg-(--surface-blue-2 text-(--ink-blue-link) border border-(--outline-blue-1)',
    'blue-ghost': 'text-(--ink-blue-link)',

    'green-solid': 'bg-(--surface-green-2) text-(--ink-green-2)',
    'green-subtle': 'bg-(--surface-green-2) text-(--ink-green-2)',
    'green-outline': 'bg-(--surface-green-2) text-(--ink-green-2) border border-(--outline-green-2)',
    'green-ghost': 'text-(--ink-green-2)',

    'red-solid': 'bg-(--surface-red-2) text-(--ink-red-2)',
    'red-subtle': 'bg-(--surface-red-2) text-(--ink-red-2)',
    'red-outline': 'bg-(--(--surface-red-2) text-(--ink-red-2) border border-(--outline-red-1)',
    'red-ghost': 'text-(--ink-red-2)',
  };