import React from 'react';
import { motion } from 'framer-motion';

export default function EventCapacitySection({ form, handleChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100"
    >
      <h2 className="text-xl font-semibold mb-4 font-kanit text-gray-800 border-b pb-2">ราคาและความจุ</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
              ราคา (บาท)
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">฿</span>
              </div>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 font-kanit">
              ระบุ 0 หากเป็นกิจกรรมฟรี
            </p>
          </div>
          
          <div>
            <label htmlFor="max_attendees" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
              จำนวนผู้เข้าร่วมสูงสุด <span className="text-red-500">*</span>
            </label>
            <input
              id="max_attendees"
              name="max_attendees"
              type="number"
              min="1"
              value={form.max_attendees}
              onChange={handleChange}
              placeholder="จำนวนผู้เข้าร่วมสูงสุดที่รับได้"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
