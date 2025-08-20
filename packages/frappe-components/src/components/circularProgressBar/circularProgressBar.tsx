import React, { useMemo } from 'react';
import FeatherIcon from '../featherIcon';
import type { CircularProgressBarProps, Size, SizeProps, ThemeProps } from './types';

const styleSheet = `
.progressbar {
  --size: 60px;
  --bar-width: 14px;
  --font-size: 16px;
  --check-icon-size: 24px;
  --color-progress: #333;
  --color-remaining-circle: #888;
  --color-complete: lightgreen;
  --progress: 0%;

  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  display: grid;
  place-items: center;
  position: relative;
  font-size: var(--font-size);
}
@property --progress {
  syntax: '<length-percentage>';
  inherits: true;
  initial-value: 0%;
}
.progressbar::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: conic-gradient(
    var(--color-progress) var(--progress),
    var(--color-remaining-circle) 0%
  );
  transition: --progress 500ms linear;
  aspect-ratio: 1 / 1;
  align-self: center;
}
.progressbar::after {
  content: '';
  position: absolute;
  background: white;
  border-radius: inherit;
  z-index: 1;
  width: calc(100% - var(--bar-width));
  aspect-ratio: 1 / 1;
}
.progressbar > div {
  z-index: 2;
  position: relative;
}
.progressbar.completed:not(.fillOuter)::after {
  background: var(--color-complete);
}
.progressbar.completed.fillOuter::before {
  background: var(--color-complete);
}
.check-icon {
  z-index: 3;
  width: var(--check-icon-size);
  height: var(--check-icon-size);
}
`;

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = styleSheet;
  document.head.appendChild(styleEl);
}


const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  step = 1,
  totalSteps = 4,
  showPercentage = false,
  theme = 'black',
  size = 'md',
  themeComplete = 'lightgreen',
  variant = 'solid',
}) => {

  const sizeMap: Record<Size, SizeProps> = useMemo(() => ({
    xs: {
      ringSize: '30px',
      ringBarWidth: '6px',
      innerTextFontSize: showPercentage ? '8px' : '12px',
      checkIconSize: '16px',
    },
    sm: {
      ringSize: '42px',
      ringBarWidth: '10px',
      innerTextFontSize: showPercentage ? '12px' : '16px',
      checkIconSize: '20px',
    },
    md: {
      ringSize: '60px',
      ringBarWidth: '14px',
      innerTextFontSize: showPercentage ? '16px' : '20px',
      checkIconSize: '24px',
    },
    lg: {
      ringSize: '84px',
      ringBarWidth: '18px',
      innerTextFontSize: showPercentage ? '20px' : '24px',
      checkIconSize: '40px',
    },
    xl: {
      ringSize: '108px',
      ringBarWidth: '22px',
      innerTextFontSize: showPercentage ? '24px' : '28px',
      checkIconSize: '48px',
    },
  }), [showPercentage]);

  const themeMap: Record<string, ThemeProps> = useMemo(() => ({
    black: {
      primary: '#333',
      secondary: '#888',
    },
    red: {
      primary: '#FF0000',
      secondary: '#FFD7D7',
    },
    green: {
      primary: '#22C55E',
      secondary: '#b1ffda',
    },
    blue: {
      primary: '#2376f5',
      secondary: '#D7D7FF',
    },
    orange: {
      primary: '#FFA500',
      secondary: '#FFE5CC',
    },
  }), []);

  const currentSize = useMemo(() => sizeMap[size] || sizeMap.md, [sizeMap, size]);
  const currentTheme = useMemo(() => (typeof theme === 'string' ? themeMap[theme] || themeMap.black : theme), [theme, themeMap]);
  const progress = useMemo(() => (step / totalSteps) * 100, [step, totalSteps]);
  const isCompleted = useMemo(() => step >= totalSteps, [step, totalSteps]);

  const cssVars = {
    '--size': currentSize.ringSize,
    '--bar-width': currentSize.ringBarWidth,
    '--font-size': currentSize.innerTextFontSize,
    '--check-icon-size': currentSize.checkIconSize,
    '--color-progress': currentTheme.primary,
    '--color-remaining-circle': currentTheme.secondary,
    '--color-complete': themeComplete,
    '--progress': `${progress}%`,
  };

  const completedClass = isCompleted ? 'completed' : '';
  const variantClass = variant === 'outline' ? 'fillOuter' : '';

  return (
    <div
      className={`progressbar ${completedClass} ${variantClass}`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      style={cssVars as React.CSSProperties}
    >
      {isCompleted ? (
        <FeatherIcon name="check" className="check-icon" />
      ) : (
        <div>
          {showPercentage ? (
            <p>{progress.toFixed(0)}%</p>
          ) : (
            <p>{step}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CircularProgressBar;