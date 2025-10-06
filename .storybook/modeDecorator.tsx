import { withThemeByClassName } from '@storybook/addon-themes';

export const decorators = [
  withThemeByClassName({
    themes: {
      light: '', // Class name for light mode
      dark: 'dark',  // Class name for dark mode
    },
    defaultTheme: 'light', // Default theme
  }),
];
