import React, { useContext } from 'react';
import { ListContext } from './listContext';
import { Button } from '../button';

interface EmptyStateProps {
  children?: React.ReactNode;
}
const EmptyState = ({ children }: EmptyStateProps) => {
  const list = useContext(ListContext);

  if (!list || !list.options || !list.options.emptyState) {
    throw new Error('EmptyState must be used within a ListContext.Provider');
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-base">
      {children ? (
        children
      ) : (
        <>
          <div className="text-xl font-medium">{list.options.emptyState.title}</div>
          <div className="mt-1 text-base text-ink-gray-5">
            {list.options.emptyState.description}
          </div>
          {list.options.emptyState.button && (
            <Button {...list.options.emptyState.button} className="mt-4" />
          )}
        </>
      )}
    </div>
  );
};

export default EmptyState;
