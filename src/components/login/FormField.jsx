import React from 'react';

export default function FormField({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  required = false,
  icon
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-500">
            {icon}
          </div>
        )}
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 font-kanit ${
            icon ? 'pl-10' : 'pl-3'
          } bg-white/50 backdrop-blur-sm`}
          placeholder={label}
        />
      </div>
    </div>
  );
}
