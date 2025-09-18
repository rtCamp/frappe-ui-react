
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Theme = 'black' | 'red' | 'green' | 'blue' | 'orange';
export type Variant = 'solid' | 'outline';

export interface SizeProps {
  ringSize: string;
  ringBarWidth: string;
  innerTextFontSize: string;
  checkIconSize: string;
}

export interface ThemeProps {
  primary: string;
  secondary: string;
}

export interface CircularProgressBarProps {
  step?: number;
  totalSteps?: number;
  showPercentage?: boolean;
  theme?: Theme | ThemeProps;
  size?: Size;
  themeComplete?: string;
  variant?: Variant;
}
