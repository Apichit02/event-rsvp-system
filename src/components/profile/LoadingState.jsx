import React from 'react';

export default function LoadingState() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Profile header loading */}
      <div className="bg-gray-100 p-6 rounded-xl shadow-sm animate-pulse">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center mb-3">
            <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-gray-200 rounded-lg p-3 h-16"></div>
          <div className="bg-gray-200 rounded-lg p-3 h-16"></div>
          <div className="hidden sm:block bg-gray-200 rounded-lg p-3 h-16"></div>
        </div>
      </div>
      
      {/* Organized events loading */}
      <div>
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded-xl shadow-sm mb-4 animate-pulse">
            <div className="flex items-start">
              <div className="h-16 w-16 bg-gray-200 rounded-lg mr-3"></div>
              <div className="flex-grow">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Registered events loading */}
      <div>
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded-xl shadow-sm mb-4 animate-pulse">
            <div className="flex items-start">
              <div className="h-16 w-16 bg-gray-200 rounded-lg mr-3"></div>
              <div className="flex-grow">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
