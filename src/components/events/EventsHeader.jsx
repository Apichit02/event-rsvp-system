import React from 'react';
import { motion } from 'framer-motion';

export default function EventsHeader({ totalEvents }) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 py-8 md:py-12 px-4 sm:px-6 lg:px-8 mb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-kanit">รายการกิจกรรมทั้งหมด</h1>
          <p className="text-indigo-100 text-lg max-w-3xl mx-auto font-kanit">
            ค้นพบกิจกรรมที่น่าสนใจ ทั้งสัมมนา เวิร์คช็อป คอนเสิร์ต และอีเวนต์ต่างๆ
          </p>
          
          <div className="mt-4 inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-yellow-300 font-medium mr-2 font-kanit">ขณะนี้มี</span>
            <span className="bg-white text-indigo-700 font-bold px-3 py-1 rounded-full font-kanit">{totalEvents}</span>
            <span className="text-yellow-300 font-medium ml-2 font-kanit">กิจกรรมให้เลือก</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
