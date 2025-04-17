import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EventsEmpty({ message, isFiltered, onClearFilters }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 rounded-xl p-8 md:p-12 text-center my-12"
    >
      <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-indigo-100">
        <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2 font-kanit">
        {message || 'ไม่พบกิจกรรมที่ค้นหา'}
      </h3>
      
      <p className="text-gray-600 mb-6 font-kanit">
        {isFiltered 
          ? 'ลองปรับเปลี่ยนตัวกรองหรือยกเลิกตัวกรองเพื่อดูกิจกรรมทั้งหมด' 
          : 'ยังไม่มีกิจกรรมในขณะนี้ โปรดกลับมาตรวจสอบในภายหลัง'}
      </p>
      
      {isFiltered && (
        <button
          onClick={onClearFilters}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-kanit"
        >
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          ล้างตัวกรอง
        </button>
      )}
      
      <div className="mt-6">
        <Link 
          href="/"
          className="text-indigo-600 hover:text-indigo-800 inline-flex items-center font-kanit"
        >
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          กลับสู่หน้าแรก
        </Link>
      </div>
    </motion.div>
  );
}
