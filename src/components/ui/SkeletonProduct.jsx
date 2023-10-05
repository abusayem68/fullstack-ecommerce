import React from 'react';

export default function SkeletonProduct() {
  return (
    <div
      role="status"
      className="max-w-sm p-4 rounded animate-pulse md:p-6">
      <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
      <div className="flex justify-between">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-14 mb-2.5"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-14 mb-2.5"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5"></div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
