import React from 'react';

export default function AuthButton({ type = 'button', onClick, children, isLoading, fullWidth = true }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${
        fullWidth ? 'w-full' : 'px-6'
      } py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] font-kanit flex items-center justify-center`}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
}
