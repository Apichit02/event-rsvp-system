import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function EventsCard({ event, index }) {
  if (!event) return null;
  
  const {
    event_id,
    title,
    description,
    event_date,
    start_time,
    location,
    price = 0,
    max_attendees = 0,
    attendees_count = 0,
    guest_count = 0,
    images = []
  } = event;

  const eventDate = new Date(event_date);
  const formattedDate = eventDate.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const totalCount = event.total_count ?? ((attendees_count||0) + (guest_count||0));
  const seatsLeft = max_attendees - totalCount;
  const isSoldOut = seatsLeft <= 0;

  const today = new Date();
  const daysLeft = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
  
  const categories = event.category?.split(',') || [];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row h-full"
    >
      {/* Image section */}
      <div className="sm:w-2/5 lg:w-1/3 relative">
        <div className="pt-[56.25%] sm:pt-0 sm:h-full w-full">
          {images?.[0] ? (
            <img
              src={images[0]}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center">
              <span className="text-white text-lg font-medium font-kanit">ไม่มีรูปภาพ</span>
            </div>
          )}
          
          {/* Date badge */}
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md px-2 py-1 flex flex-col items-center">
            <span className="text-indigo-600 font-bold text-base leading-tight font-kanit">{eventDate.getDate()}</span>
            <span className="text-gray-600 text-xs leading-tight font-kanit">{eventDate.toLocaleDateString('th-TH', {month: 'short'})}</span>
          </div>
          
          {/* Status tag */}
          {isSoldOut ? (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium font-kanit">
              เต็มแล้ว
            </div>
          ) : daysLeft <= 7 ? (
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium font-kanit">
              อีก {daysLeft} วัน
            </div>
          ) : (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium font-kanit">
              เปิดรับสมัคร
            </div>
          )}
        </div>
      </div>
      
      {/* Content section */}
      <div className="sm:w-3/5 lg:w-2/3 p-4 sm:p-5 flex flex-col h-full">
        <div className="flex-grow">
          <Link href={`/events/${event_id}`} className="group">
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors font-kanit">
              {title}
            </h3>
          </Link>
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {categories.map((cat, i) => (
              <span key={i} className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-kanit">
                {cat.trim()}
              </span>
            ))}
          </div>
          
          <p className="text-gray-600 mb-3 line-clamp-2 text-sm font-kanit">
            {description || 'ไม่มีคำอธิบายกิจกรรม'}
          </p>
          
          <div className="flex items-center text-gray-600 mb-2 text-sm">
            <svg className="h-4 w-4 mr-1 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate font-kanit">{location}</span>
          </div>
          
          <div className="flex items-center text-gray-600 mb-2 text-sm">
            <svg className="h-4 w-4 mr-1 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-kanit">{formattedDate} {start_time && `เวลา ${start_time}`}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center">
            <div className="text-gray-500 text-sm font-kanit mr-4">
              <span className="text-indigo-600 font-bold text-base">{totalCount}</span>/{max_attendees} คน
            </div>
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${isSoldOut ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min((totalCount / max_attendees) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-indigo-600 font-bold font-kanit">
              {price > 0 ? `${price.toLocaleString()} ฿` : 'ฟรี'}
            </div>
            <Link 
              href={`/events/${event_id}`} 
              className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-kanit"
            >
              <span>รายละเอียด</span>
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
