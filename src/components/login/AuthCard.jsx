import React from 'react';

export default function AuthCard({ children }) {
  return (
    <div className="bg-white sm:mx-auto sm:w-full sm:max-w-md md:max-w-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="px-6 py-12 sm:px-12">
        {children}
      </div>
    </div>
  );
}
