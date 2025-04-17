import React from 'react';
import { motion } from 'framer-motion';

export default function RegistrationForm({ 
  formData, 
  onChange, 
  onSubmit, 
  isDisabled, 
  seatsLeft 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 border border-gray-200">
        <div className="border-b border-gray-200 bg-gray-50 px-5 py-3">
          <h3 className="text-lg font-medium text-gray-800 font-kanit">ข้อมูลการลงทะเบียน</h3>
        </div>
        
        <form onSubmit={onSubmit} className="p-5 space-y-4">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
              ชื่อ-นามสกุล <span className="text-red-500">*</span>
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              value={formData.full_name}
              onChange={onChange}
              placeholder="กรอกชื่อและนามสกุลของคุณ"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
              อีเมล <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              placeholder="email@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
              เบอร์โทรศัพท์ <span className="text-gray-500 text-xs">(ไม่บังคับ)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={onChange}
              placeholder="0xx-xxx-xxxx"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
            />
          </div>
          
          <div className="pt-3">
            <motion.button
              whileHover={{ scale: isDisabled ? 1 : 1.02 }}
              whileTap={{ scale: isDisabled ? 1 : 0.98 }}
              type="submit"
              disabled={isDisabled}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 font-kanit ${
                isDisabled
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow hover:shadow-md'
              }`}
            >
              {seatsLeft <= 0 
                ? 'ไม่สามารถลงทะเบียนได้ (ที่นั่งเต็ม)' 
                : 'ลงทะเบียนเข้าร่วมกิจกรรม'}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
