import React from 'react';
import { motion } from 'framer-motion';

export default function EventSelector({ events, selectedId, onSelect, loading }) {
  if (loading) {
    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 font-kanit">เลือกกิจกรรม</label>
        <div className="w-full h-12 bg-gray-100 animate-pulse rounded-lg"></div>
      </div>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <label className="block text-sm font-medium text-gray-700 mb-2 font-kanit">เลือกกิจกรรม</label>
      <div className="relative">
        <select
          value={selectedId}
          onChange={onSelect}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none font-kanit text-gray-800"
        >
          <option value="">-- เลือกกิจกรรมที่ต้องการลงทะเบียน --</option>
          {events.map(event => (
            <option key={event.event_id} value={event.event_id} className="py-2">
              {event.title} ({new Date(event.event_date).toLocaleDateString('th-TH')})
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
