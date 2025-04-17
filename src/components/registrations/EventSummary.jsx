import React from 'react';
import { motion } from 'framer-motion';

export default function EventSummary({ eventDetail }) {
  if (!eventDetail) return null;
  
  const {
    title,
    description,
    event_date,
    start_time,
    end_time,
    location,
    price = 0,
    max_attendees = 0,
    total_count = 0,
    images = []
  } = eventDetail;
  
  const eventDate = new Date(event_date);
  const formattedDate = eventDate.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const seatsLeft = max_attendees - total_count;
  const registrationPercentage = Math.min((total_count / max_attendees) * 100, 100);
  
  const getStatusColor = () => {
    if (seatsLeft <= 0) return 'red';
    if (seatsLeft <= max_attendees * 0.2) return 'orange';
    return 'green';
  };
  
  const statusColor = getStatusColor();
  const colorClasses = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 border border-gray-200"
    >
      {/* Event Image */}
      <div className="relative h-40 sm:h-56 bg-gradient-to-r from-indigo-500 to-blue-500">
        {images?.[0] ? (
          <img 
            src={images[0]} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-lg font-medium font-kanit">ไม่มีรูปภาพ</span>
          </div>
        )}
        
        {/* Event Price Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-indigo-700 px-3 py-1 rounded-full text-sm font-bold font-kanit shadow-sm">
          {price > 0 ? `${price.toLocaleString()} ฿` : 'ฟรี'}
        </div>
      </div>
      
      {/* Event Details */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 font-kanit">{title}</h2>
        
        <div className="flex flex-wrap items-center text-gray-600 text-sm mb-3 gap-x-4 gap-y-2 font-kanit">
          <div className="flex items-center">
            <svg className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formattedDate}</span>
          </div>
          
          {start_time && (
            <div className="flex items-center">
              <svg className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{start_time} - {end_time || 'ไม่ระบุ'}</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-center">
              <svg className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate max-w-[200px]">{location}</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-kanit">
          {description || 'ไม่มีคำอธิบายกิจกรรม'}
        </p>
        
        {/* Seats/Registration Status */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between text-sm mb-1 font-kanit">
            <span className="text-gray-600">การลงทะเบียน</span>
            <span className="font-medium">
              <span className="font-bold">{total_count}</span>/{max_attendees}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className={`h-2 rounded-full ${colorClasses[statusColor]}`}
              style={{ width: `${registrationPercentage}%` }}
            ></div>
          </div>
          <div className={`text-xs font-medium text-right ${
            statusColor === 'red' ? 'text-red-600' : 
            statusColor === 'orange' ? 'text-orange-600' : 
            'text-green-600'
          } font-kanit`}>
            {seatsLeft > 0 ? `เหลือที่นั่งอีก ${seatsLeft} ที่` : 'ที่นั่งเต็มแล้ว'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
