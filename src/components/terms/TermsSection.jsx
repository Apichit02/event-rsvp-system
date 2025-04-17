import React from 'react';
import { motion } from 'framer-motion';

export default function TermsSection({ number, title, content, listItems, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * delay }}
      className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      id={`section-${number}`}
    >
      <h2 className="text-xl sm:text-2xl font-semibold mb-3 font-kanit text-gray-800 flex items-center">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center mr-3 text-sm font-bold">
          {number}
        </span>
        {title}
      </h2>
      
      {content && (
        <p className="text-gray-700 leading-relaxed font-kanit text-sm sm:text-base">
          {content}
        </p>
      )}
      
      {listItems && (
        <ul className="list-none text-gray-700 space-y-2 mt-3 font-kanit text-sm sm:text-base">
          {listItems.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-indigo-600 mr-2 mt-1 flex-shrink-0">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </motion.section>
  );
}
