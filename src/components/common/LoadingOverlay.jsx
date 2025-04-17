import React from 'react';

export default function LoadingOverlay({ isLoading, message = 'กำลังประมวลผล...' }) {
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-indigo-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-4 border-l-4 border-yellow-400 animate-spin animation-delay-150"></div>
          <div className="absolute inset-4 rounded-full border-t-4 border-b-4 border-blue-600 animate-spin animation-delay-300 animate-reverse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 bg-indigo-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-6 text-gray-700 font-kanit text-lg">{message}</p>
      </div>
    </div>
  );
}
