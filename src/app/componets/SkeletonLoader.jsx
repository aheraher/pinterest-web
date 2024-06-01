import React from 'react';

function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-64 bg-gray-300 rounded-lg"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
    </div>
  );
}

export default SkeletonLoader;
