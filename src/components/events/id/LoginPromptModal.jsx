import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPromptModal({ isOpen, onClose, onLogin, onGuestRegistration }) {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            {/* Overlay */}
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            
            {/* Modal */}
            <motion.div 
              className="relative inline-block w-full max-w-md p-6 bg-white rounded-xl shadow-xl text-left"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <div className="text-center sm:text-left">
                <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-indigo-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                
                <h3 className="text-xl leading-6 font-bold text-gray-900 mb-2 font-kanit">
                  ต้องการลงทะเบียนเข้าร่วม
                </h3>
                <div className="mt-2">
                  <p className="text-gray-600 mb-4 font-kanit">
                    คุณยังไม่ได้เข้าสู่ระบบ คุณสามารถเลือกวิธีลงทะเบียนได้ดังนี้
                  </p>
                </div>
                
                <div className="mt-6 grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={onLogin}
                    className="w-full inline-flex justify-center items-center px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-kanit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    เข้าสู่ระบบเพื่อลงทะเบียน
                    <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-white/20 rounded-full">แนะนำ</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={onGuestRegistration}
                    className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-kanit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    ลงทะเบียนแบบบุคคลทั่วไป
                  </button>
                  
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-2 w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none font-kanit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    ยกเลิก
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
