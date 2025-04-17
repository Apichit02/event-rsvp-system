import React from 'react';

export default function LoadingState() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-xl overflow-hidden shadow animate-pulse">
          {/* Image placeholder with responsive aspect ratio */}
          <div className="w-full pt-[56.25%] relative bg-gray-200"></div>
          
          {/* Content placeholder */}
          <div className="p-3 sm:p-5">
            <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mb-3 sm:mb-4"></div>
            
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-5/6 mb-3 sm:mb-4"></div>
            
            <div className="flex items-center mb-3">
              <div className="h-3 w-3 sm:h-4 sm:w-4 bg-gray-200 rounded-full mr-2"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="h-3 w-3 sm:h-4 sm:w-4 bg-gray-200 rounded-full mr-2"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            
            <div className="flex justify-between items-center mt-3 sm:mt-4">
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full mt-2"></div>
            <div className="h-2 bg-gray-200 rounded w-1/4 mt-1 ml-auto"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
