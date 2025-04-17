import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventDetailDescription({ description, long_description }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const hasLongDescription = long_description && long_description.trim().length > 0;
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 font-kanit flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          รายละเอียดกิจกรรม
        </h2>
        
        <div className="prose max-w-none text-gray-700 font-kanit">
          <p>{description}</p>
          
          {hasLongDescription && (
            <>
              <button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 text-indigo-600 hover:text-indigo-800 font-kanit flex items-center transition-colors"
              >
                {showFullDescription ? 'แสดงน้อยลง' : 'แสดงรายละเอียดเพิ่มเติม'} 
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-1 transition-transform duration-300 ${showFullDescription ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {showFullDescription && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h3 className="text-lg font-semibold mb-2 font-kanit">รายละเอียดเพิ่มเติม</h3>
                      <p className="whitespace-pre-line">{long_description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
