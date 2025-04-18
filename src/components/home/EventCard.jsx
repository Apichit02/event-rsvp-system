'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function EventCard({ event }) {
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
    registered_count = 0,
    images = []
  } = event;

  const eventDate = new Date(event_date);
  const formattedDate = eventDate.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const totalCount  = event.total_count ?? ((event.attendees_count||0) + (event.guest_count||0));
  const seatsLeft   = max_attendees - totalCount;
  const isSoldOut   = seatsLeft <= 0;

  const today = new Date();
  const daysLeft = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Link href={`/events/${event_id}`} className="block h-full">
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col font-kanit">
          {/* Image container with fixed aspect ratio */}
          <div className="relative pt-[56.25%] w-full"> {/* 16:9 aspect ratio */}
            {images?.[0] ? (
              <img
                src={images[0]}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center">
                <span className="text-white text-lg font-medium">ไม่มีรูปภาพ</span>
              </div>
            )}
            
            {/* Date badge */}
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white rounded-lg shadow-md px-2 sm:px-3 py-1 flex flex-col items-center text-sm sm:text-base">
              <span className="text-indigo-600 font-bold leading-tight">{eventDate.getDate()}</span>
              <span className="text-gray-600 text-xs leading-tight">{eventDate.toLocaleDateString('th-TH', {month: 'short'})}</span>
            </div>
            
            {/* Price tag */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-yellow-400 text-indigo-900 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-bold">
              {price > 0 ? `${price.toLocaleString()} ฿` : 'ฟรี'}
            </div>
            
            {/* Status badge (sold out or days left) */}
            {isSoldOut ? (
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-red-500 text-white rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-medium">
                เต็มแล้ว
              </div>
            ) : daysLeft <= 7 ? (
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-orange-500 text-white rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-medium">
                อีก {daysLeft} วัน
              </div>
            ) : null}
          </div>
          
          {/* Content */}
          <div className="p-3 sm:p-5 flex-grow flex flex-col">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">{title}</h3>
            
            <div className="flex items-center text-gray-600 mb-2 text-xs sm:text-sm">
              <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{location}</span>
            </div>
            
            <div className="flex items-center text-gray-600 mb-2 text-xs sm:text-sm">
              <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formattedDate} {start_time && `เวลา ${start_time}`}</span>
            </div>
            
            <p className="text-gray-600 mb-3 line-clamp-2 text-xs sm:text-sm flex-grow">
              {description || 'ไม่มีคำอธิบายกิจกรรม'}
            </p>
            
            {/* Progress bar */}
            <div className="mt-auto">
              <div className="flex justify-between text-xs sm:text-sm mb-1">
                <span>ผู้เข้าร่วม</span>
                <span className="font-medium">{totalCount}/{max_attendees}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                <div 
                  className={`h-1.5 sm:h-2 rounded-full ${isSoldOut ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min((totalCount / max_attendees) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-right mt-1 text-gray-500">
                {isSoldOut ? 'เต็มแล้ว' : `เหลืออีก ${seatsLeft} ที่นั่ง`}
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600 font-kanit">
              ลงทะเบียนแล้ว: <span className="font-bold">{totalCount}</span> / {max_attendees}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
