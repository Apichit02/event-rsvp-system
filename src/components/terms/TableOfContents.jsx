import React from 'react';
import { motion } from 'framer-motion';

export default function TableOfContents({ sections }) {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden lg:block sticky top-24 bg-white rounded-xl shadow-sm border border-gray-100 p-5 max-w-xs"
    >
      <h3 className="text-lg font-semibold mb-4 font-kanit text-gray-800">สารบัญ</h3>
      <ul className="space-y-2 font-kanit">
        {sections.map((section) => (
          <li key={section.number}>
            <button
              onClick={() => scrollToSection(`section-${section.number}`)}
              className="w-full text-left py-2 px-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-sm flex items-center"
            >
              <span className="w-6 h-6 flex-shrink-0 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center mr-2 text-xs font-medium">
                {section.number}
              </span>
              <span className="line-clamp-1">{section.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
