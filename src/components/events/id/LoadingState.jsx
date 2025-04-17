import React from 'react';

export default function LoadingState() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow max-w-3xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          {/* Title */}
          <div className="h-8 bg-gray-200 rounded-md w-3/4"></div>
          
          {/* Date and time */}
          <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
          
          {/* Image gallery */}
          <div className="aspect-[16/9] bg-gray-200 rounded-xl"></div>
          
          {/* Description section */}
          <div>
            <div className="h-6 bg-gray-200 rounded-md w-1/3 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-full"></div>
              <div className="h-4 bg-gray-200 rounded-md w-full"></div>
              <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
            </div>
          </div>
          
          {/* Registration section */}
          <div>
            <div className="h-6 bg-gray-200 rounded-md w-1/3 mb-4"></div>
            <div className="h-24 bg-gray-200 rounded-xl"></div>
          </div>
          
          {/* Buttons */}
          <div className="flex space-x-4">
            <div className="h-10 bg-gray-200 rounded-md w-1/2"></div>
            <div className="h-10 bg-gray-200 rounded-md w-1/2"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
