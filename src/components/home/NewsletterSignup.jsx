import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  
  if (submitted) {
    return (
      <motion.div 
        className="bg-green-50 border border-green-200 rounded-lg p-6 sm:p-8 mb-8 sm:mb-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <svg className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-bold text-green-800 mb-2 font-kanit">ขอบคุณสำหรับการสมัคร!</h3>
        <p className="text-green-700 font-kanit">เราจะส่งข่าวสารกิจกรรมล่าสุดให้คุณเป็นประจำ</p>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="bg-indigo-50 border border-indigo-100 rounded-lg p-6 sm:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
          <h3 className="text-xl font-bold text-indigo-800 mb-2 font-kanit">รับข่าวสารกิจกรรมล่าสุด</h3>
          <p className="text-indigo-700 font-kanit text-sm sm:text-base">สมัครรับจดหมายข่าวของเราเพื่อรับข้อมูลกิจกรรมที่น่าสนใจและส่วนลดพิเศษ</p>
        </div>
        <div className="md:w-1/3 w-full">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="อีเมลของคุณ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow px-4 py-2 sm:rounded-l-lg rounded-t-lg sm:rounded-t-none border-y border-l border-r sm:border-r-0 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-kanit"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 sm:rounded-r-lg rounded-b-lg sm:rounded-b-none hover:bg-indigo-700 transition-colors duration-300 font-kanit"
            >
              สมัคร
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
