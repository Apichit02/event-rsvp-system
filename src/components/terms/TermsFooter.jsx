import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TermsFooter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="text-center mt-12 pb-6 border-t border-gray-200 pt-6"
    >
      <p className="text-gray-600 font-kanit text-sm mb-3">
        หากท่านมีคำถามเกี่ยวกับข้อกำหนดและเงื่อนไขการใช้บริการของเรา กรุณาติดต่อ
      </p>
      <Link 
        href="/contact" 
        className="text-indigo-600 hover:text-indigo-800 font-kanit text-sm inline-flex items-center"
      >
        <span>ติดต่อเรา</span>
        <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
      <p className="text-gray-500 text-xs mt-4 font-kanit">
        © {new Date().getFullYear()} Event Management. All rights reserved.
      </p>
    </motion.div>
  );
}
