import React from 'react';
import { motion } from 'framer-motion';

export default function EventDetailHeader({ event }) {
  const { 
    title, 
    event_date, 
    start_time, 
    end_time,
    price
  } = event;

  const dateStr = new Date(event_date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const daysRemaining = () => {
    const today = new Date();
    const eventDay = new Date(event_date);
    const diffTime = eventDay - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const days = daysRemaining();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden mb-6"
    >
      <div className="relative">
        {/* Event Status Badge */}
        {days > 0 ? (
          <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-kanit">
            อีก {days} วัน
          </div>
        ) : days === 0 ? (
          <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-kanit">
            วันนี้
          </div>
        ) : (
          <div className="absolute top-4 left-4 bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-kanit">
            ผ่านไปแล้ว
          </div>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-yellow-400 text-indigo-900 px-3 py-1 rounded-full text-sm font-bold font-kanit">
          {price > 0 ? `${price.toLocaleString()} ฿` : 'ฟรี'}
        </div>
      </div>
      
      <div className="p-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-kanit">{title}</h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mb-2 gap-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-kanit">{dateStr}</span>
          </div>
          
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-kanit">เวลา {start_time} – {end_time}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
