import React from 'react';
import { motion } from 'framer-motion';

export default function EventLocationSection({ form, handleChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100"
    >
      <h2 className="text-xl font-semibold mb-4 font-kanit text-gray-800 border-b pb-2">สถานที่</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
            สถานที่จัดกิจกรรม <span className="text-red-500">*</span>
          </label>
          <input
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="เช่น ห้องประชุมโรงแรมเซ็นทารา, ศูนย์การประชุมแห่งชาติสิริกิติ์"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
          />
        </div>
        
        <div>
          <label htmlFor="location_map_url" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
            ลิงก์แผนที่ Google Maps
          </label>
          <input
            id="location_map_url"
            name="location_map_url"
            value={form.location_map_url}
            onChange={handleChange}
            placeholder="https://maps.google.com/?q=..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
          />
          <p className="mt-1 text-xs text-gray-500 font-kanit">
            คุณสามารถคัดลอกลิงก์จาก Google Maps โดยคลิกที่สถานที่ แล้วกดปุ่ม "แชร์" และเลือก "คัดลอกลิงก์"
          </p>
        </div>
      </div>
    </motion.div>
  );
}
