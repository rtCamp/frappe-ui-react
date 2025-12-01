import React, { type ReactNode } from "react";

import LoadingText from "./loadingText";

interface CardProps {
  title?: string;
  subtitle?: string;
  loading?: boolean;
  actionsLeft?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  loading = false,
  actionsLeft,
  actions,
  children,
}) => {
  return (
    <div className="flex flex-col rounded-lg border bg-white px-6 py-5 shadow">
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline space-x-2">
          {actionsLeft && (
            <div className="flex items-center space-x-2">{actionsLeft}</div>
          )}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        {actions && (
          <div className="flex items-center space-x-2">{actions}</div>
        )}
      </div>
      {subtitle && <p className="mt-1.5 text-base text-gray-600">{subtitle}</p>}
      {loading ? (
        <div className="mt-4 flex flex-auto flex-col items-center justify-center rounded-md">
          <LoadingText />
        </div>
      ) : (
        children && (
          <div className="mt-4 flex-auto overflow-auto">{children}</div>
        )
      )}
    </div>
  );
};

export default Card;
