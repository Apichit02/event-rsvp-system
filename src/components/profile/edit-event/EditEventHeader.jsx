import React from 'react';
import { motion } from 'framer-motion';

export default function EditEventHeader({ eventTitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 text-center"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 font-kanit">แก้ไขกิจกรรม</h1>
      <p className="text-gray-600 font-kanit">
        {eventTitle ? `"${eventTitle}"` : 'กำลังโหลดข้อมูล...'}
      </p>
      <div className="h-1 w-20 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
    </motion.div>
  );
}
