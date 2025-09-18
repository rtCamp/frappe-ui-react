import React from 'react';

import LoadingIndicator from './loadingIndicator';

interface LoadingTextProps {
  text?: string;
}

const LoadingText: React.FC<LoadingTextProps> = ({ text = 'Loading...' }) => {
  return (
    <div className="flex items-center text-base text-ink-gray-4">
      <LoadingIndicator className="-ml-1 mr-2 h-3 w-3" />
      {text}
    </div>
  );
};

export default LoadingText;
