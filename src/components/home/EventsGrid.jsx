import React from 'react';
import EventCard from './EventCard';
import { motion } from 'framer-motion';

export default function EventsGrid({ events, title, emptyMessage }) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12">
        <svg 
          className="mx-auto h-12 w-12 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900 font-kanit">{emptyMessage || 'ไม่พบกิจกรรม'}</h3>
        <p className="mt-1 text-sm text-gray-500 font-kanit">ลองค้นหาด้วยคำที่แตกต่างหรือเลือกหมวดหมู่อื่น</p>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="mb-12">
      {title && (
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 font-kanit flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
          <span className="ml-3 text-sm bg-indigo-100 text-indigo-700 py-1 px-2 rounded-full">{events.length}</span>
        </motion.h2>
      )}
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {events.map(event => (
          <EventCard key={event.event_id} event={event} />
        ))}
      </motion.div>
    </div>
  );
}
