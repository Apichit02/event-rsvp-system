import React from 'react';
import { motion } from 'framer-motion';

export default function EventFormHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 text-center"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 font-kanit">สร้างกิจกรรมใหม่</h1>
      <p className="text-gray-600 max-w-lg mx-auto font-kanit">
        กรอกข้อมูลด้านล่างเพื่อสร้างกิจกรรมใหม่ของคุณ ข้อมูลที่มีเครื่องหมาย * จำเป็นต้องกรอก
      </p>
    </motion.div>
  );
}
