import React from 'react';
import { motion } from 'framer-motion';

export default function TermsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8 max-w-2xl mx-auto"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-kanit text-gray-900">
        ข้อกำหนดและเงื่อนไขการใช้บริการ
      </h1>
      <div className="h-1 w-24 bg-indigo-600 mx-auto rounded-full mb-4"></div>
      <p className="text-gray-600 font-kanit text-sm md:text-base">
        อัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
    </motion.div>
  );
}
