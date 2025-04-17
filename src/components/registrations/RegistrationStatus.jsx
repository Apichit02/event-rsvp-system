import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegistrationStatus({ error, success }) {
  if (!error && !success) return null;
  
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 font-kanit">เกิดข้อผิดพลาด</h3>
              <p className="mt-1 text-sm text-red-700 font-kanit">{error}</p>
            </div>
          </div>
        </motion.div>
      )}
      
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800 font-kanit">ลงทะเบียนสำเร็จ</h3>
              <p className="mt-1 text-sm text-green-700 font-kanit">{success}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
