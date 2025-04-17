import React from 'react';
import EventCard from './EventCard';
import { motion } from 'framer-motion';

export default function EventsSection({ title, events, emptyMessage, showEditButton = false }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 font-kanit">{title}</h2>
        <span className="ml-3 px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium font-kanit">
          {events.length} รายการ
        </span>
      </div>
      
      {events.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <svg className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600 font-kanit">{emptyMessage}</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {events.map((event, index) => (
            <EventCard 
              key={event.event_id} 
              event={event} 
              showEditButton={showEditButton}
              index={index}
            />
          ))}
        </ul>
      )}
    </motion.section>
  );
}
