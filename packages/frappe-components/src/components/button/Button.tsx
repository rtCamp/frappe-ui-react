import React, { useMemo, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import type{ ButtonProps, ButtonSize, ButtonVariant, ThemeVariant } from './types';
import { subtleClasses, solidClasses, outlineClasses, ghostClasses, focusClasses, disabledClassesMap } from './constants';
import LoadingIndicator from '../loadingIndicator';

const Button: React.FC<ButtonProps> = ({
  theme = 'gray',
  size = 'sm',
  variant = 'subtle',
  loading = false,
  disabled = false,
  loadingText,
  label,
  route,
  link,
  onClick,
  prefixIcon,
  suffixIcon,
  icon,
  children,
  ...rest
}) => {
  const navigate = useNavigate();

  const isDisabled = useMemo(() => disabled || loading, [disabled, loading]);

  const isIconButton = useMemo(() => {
    return !!icon || (React.Children.count(children) === 0 && !label);
  }, [icon, children, label]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;

      if (route) {
        navigate(route);
      } else if (link) {
        window.open(link, '_blank');
      }

      if (onClick) {
        onClick(event);
      }
    },
    [isDisabled, route, link, onClick, navigate]
  );

  const ariaLabel = useMemo(() => (isIconButton ? label : undefined), [isIconButton, label]);

  const buttonClasses = useMemo(() => {
    const variantClass = {
      subtle: subtleClasses[theme],
      solid: solidClasses[theme],
      outline: outlineClasses[theme],
      ghost: ghostClasses[theme],
    }[variant as ButtonVariant];

    const themeVariantKey: ThemeVariant = `${theme}-${variant}`;
    const disabledClass = disabledClassesMap[themeVariantKey];

    let sizeClass = {
      sm: 'h-7 text-base px-2 rounded',
      md: 'h-8 text-base font-medium px-2.5 rounded',
      lg: 'h-10 text-lg font-medium px-3 rounded-md',
      xl: 'h-11.5 text-xl font-medium px-3.5 rounded-lg',
      '2xl': 'h-13 text-2xl font-medium px-3.5 rounded-xl',
    }[size];

    if (isIconButton) {
      sizeClass = {
        sm: 'h-7 w-7 rounded',
        md: 'h-8 w-8 rounded',
        lg: 'h-10 w-10 rounded-md',
        xl: 'h-11.5 w-11.5 rounded-lg',
        '2xl': 'h-13 w-13 rounded-xl',
      }[size];
    }

    return [
      'inline-flex items-center justify-center gap-2 transition-colors focus:outline-none',
      isDisabled ? disabledClass : variantClass,
      focusClasses[theme],
      sizeClass,
    ].filter(Boolean).join(' ');
  }, [theme, variant, size, isIconButton, isDisabled]);

  const buttonContent: ReactNode = useMemo(() => {
    if (loading) {
      return loadingText || null;
    }

    if (isIconButton) {
      return icon;
    }

    return (
      <>
        {prefixIcon}
        <span className={isIconButton ? 'sr-only' : 'truncate'}>
          {children || label}
        </span>
        {suffixIcon}
      </>
    );
  }, [loading, loadingText, isIconButton, icon, prefixIcon, children, label, suffixIcon]);


  const loadingIndicatorSizeClass = useMemo(() => {
    return {
      sm: 'h-3 w-3',
      md: 'h-[13.5px] w-[13.5px]',
      lg: 'h-[15px] w-[15px]',
      xl: 'h-4.5 w-4.5',
      '2xl': 'h-4.5 w-4.5',
    }[size as ButtonSize];
  }, [size]);

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      {...rest}
    >
      {loading ? (
        <LoadingIndicator className={loadingIndicatorSizeClass} />
      ) : (
        buttonContent
      )}
    </button>
  );
};

export default Button;