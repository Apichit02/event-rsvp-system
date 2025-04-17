import React from 'react';

export default function EventFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Basic Info Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="h-7 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
      
      {/* Date/Time Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="h-7 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Images Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="h-7 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <div className="h-10 bg-gray-200 rounded w-24"></div>
        <div className="h-10 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );
}
