import React from 'react';
import { motion } from 'framer-motion';

export default function EventContactSection({ form, handleChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100"
    >
      <h2 className="text-xl font-semibold mb-4 font-kanit text-gray-800 border-b pb-2">ข้อมูลการติดต่อ</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
            อีเมลสำหรับติดต่อ
          </label>
          <input
            id="contact_email"
            name="contact_email"
            type="email"
            value={form.contact_email}
            onChange={handleChange}
            placeholder="email@example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
          />
        </div>
        
        <div>
          <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
            เบอร์โทรศัพท์
          </label>
          <input
            id="contact_phone"
            name="contact_phone"
            value={form.contact_phone}
            onChange={handleChange}
            placeholder="08x-xxx-xxxx"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
          />
        </div>
        
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
            เว็บไซต์
          </label>
          <input
            id="website"
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
          />
        </div>
      </div>
    </motion.div>
  );
}
