import React from 'react';
import { motion } from 'framer-motion';

export default function EventDateTimeSection({ form, handleChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100"
    >
      <h2 className="text-xl font-semibold mb-4 font-kanit text-gray-800 border-b pb-2">วันและเวลา</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="event_date" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
            วันที่จัดกิจกรรม <span className="text-red-500">*</span>
          </label>
          <input
            id="event_date"
            name="event_date"
            type="date"
            value={form.event_date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start_time" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
              เวลาเริ่มต้น <span className="text-red-500">*</span>
            </label>
            <input
              id="start_time"
              name="start_time"
              type="time"
              value={form.start_time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
            />
          </div>
          
          <div>
            <label htmlFor="end_time" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
              เวลาสิ้นสุด <span className="text-red-500">*</span>
            </label>
            <input
              id="end_time"
              name="end_time"
              type="time"
              value={form.end_time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
            />
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700 font-kanit">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          โปรดระบุเวลาในรูปแบบ 24 ชั่วโมง (00:00 - 23:59)
        </div>
      </div>
    </motion.div>
  );
}
