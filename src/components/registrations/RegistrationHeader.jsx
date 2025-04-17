import React from 'react';
import { motion } from 'framer-motion';

export default function RegistrationHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 font-kanit">ลงทะเบียนเข้าร่วมกิจกรรม</h1>
      <p className="text-gray-600 max-w-md mx-auto font-kanit">กรอกข้อมูลของคุณเพื่อลงทะเบียนเข้าร่วมกิจกรรมในฐานะบุคคลทั่วไป ไม่ต้องสมัครสมาชิก</p>
    </motion.div>
  );
}
