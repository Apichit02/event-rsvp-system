"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function EventCard({ 
  event, 
  showEditButton = false, 
  hideRegistrationCount = false, 
  showCancelButton = false,
  onCancelRegistration = () => {},
  isProcessing = false,
  index = 0 
}) {
  if (!event) return null;

  const membersList    = Array.isArray(event.member_registrants) ? event.member_registrants : [];
  const guestsList     = Array.isArray(event.guest_registrants)  ? event.guest_registrants  : [];
  const membersNames   = Array.isArray(event.member_names)       ? event.member_names        : [];
  const guestsNames    = Array.isArray(event.guest_names)        ? event.guest_names         : [];
  const regTotal       = membersList.length + guestsList.length;
  const nameTotal      = membersNames.length + guestsNames.length;
  const arrayTotal     = regTotal > 0 ? regTotal : nameTotal;
  const fallbackTotal  = event.total_count ?? ((event.attendees_count ?? 0) + (event.guest_count ?? 0));
  const currentCount   = arrayTotal > 0 ? arrayTotal : fallbackTotal;
  const left           = event.max_attendees - currentCount;

  const eventDate = new Date(event.event_date);
  const isPastEvent = eventDate < new Date();
  const memberNames = event.member_names || [];
  const guestNames = event.guest_names || [];
  const [showList, setShowList] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  
  const handleCancelClick = () => {
    if (isPastEvent) return;
    setShowCancelModal(true);
  };
  
  const confirmCancel = () => {
    setShowCancelModal(false);
    onCancelRegistration(event.event_id)
      .then(success => {
        if (success) {
          setCancelSuccess(true);
        }
      });
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`bg-white p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-l-4 ${
        isPastEvent ? 'border-gray-300' : left <= 0 ? 'border-red-500' : 'border-green-500'
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <Link href={`/events/${event.event_id}`} className="flex-grow">
          <div className="flex items-start">
            <div className="mr-3 w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-indigo-100 text-indigo-800 flex flex-col items-center justify-center flex-shrink-0 font-kanit">
              <span className="text-sm sm:text-lg font-bold">
                {eventDate.getDate()}
              </span>
              <span className="text-xs font-medium">
                {eventDate.toLocaleDateString('th-TH', { month: 'short' })}
              </span>
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center">
                <h3 className="text-lg font-bold text-gray-800 mb-1 font-kanit line-clamp-1">{event.title}</h3>
                {isPastEvent && (
                  <span className="ml-2 text-xs px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full font-kanit">
                    ผ่านไปแล้ว
                  </span>
                )}
              </div>
              
              <div className="flex items-center text-gray-500 text-sm mb-1 font-kanit">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {eventDate.toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}{' '}
                {event.start_time && (
                  <span>เวลา {event.start_time}{event.end_time && ` - ${event.end_time}`}</span>
                )}
              </div>
              
              {event.location && (
                <div className="text-gray-500 text-sm font-kanit flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{event.location}</span>
                </div>
              )}
            </div>
          </div>
        </Link>
        
        {/* Button container */}
        <div className="flex items-center mt-2 sm:mt-0">
          {showEditButton && (
            <Link
              href={`/profile/edit-event/${event.event_id}`}
              className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-kanit text-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              แก้ไข
            </Link>
          )}
          
          {showCancelButton && (
            <>
              {cancelSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-3 py-1.5 rounded-lg font-kanit text-sm flex items-center bg-green-100 text-green-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  ยกเลิกเรียบร้อย
                </motion.div>
              ) : (
                <motion.button
                  whileHover={isPastEvent ? {} : { scale: 1.05 }}
                  whileTap={isPastEvent ? {} : { scale: 0.95 }}
                  onClick={handleCancelClick}
                  disabled={isProcessing || isPastEvent}
                  className={`px-3 py-1.5 rounded-lg font-kanit text-sm flex items-center ${
                    isPastEvent
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-red-100 text-red-600 hover:bg-red-200 transition'
                  }`}
                  title={isPastEvent ? 'ไม่สามารถยกเลิกกิจกรรมที่ผ่านไปแล้ว' : 'ยกเลิกการลงทะเบียน'}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      กำลังดำเนินการ
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      ยกเลิก
                    </>
                  )}
                </motion.button>
              )}
            </>
          )}
        </div>
      </div>
      
      {!hideRegistrationCount && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-xs text-gray-600 mb-1 font-kanit">
            <span>จำนวนผู้ลงทะเบียน</span>
            <span className="font-medium">
              <span className="font-bold">{currentCount}</span>/{event.max_attendees}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full ${
                left <= 0 ? 'bg-red-500' : left <= event.max_attendees * 0.2 ? 'bg-orange-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min((currentCount / event.max_attendees) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="text-xs text-right mt-1 font-kanit">
            {left > 0 ? (
              <span className="text-green-600">เหลือ {left} ที่นั่ง</span>
            ) : (
              <span className="text-red-600">เต็มแล้ว</span>
            )}
          </div>
        </div>
      )}

      {/* Registrants toggle (organized events only) */}
      {showEditButton && ( 
        <div className="mt-4">
          <button
            onClick={() => setShowList(!showList)}
            className="text-indigo-600 font-medium text-sm hover:underline font-kanit"
          >
            {showList ? 'ซ่อนรายชื่อผู้ลงทะเบียน' : 'ดูรายชื่อผู้ลงทะเบียน'}
          </button>

          <AnimatePresence>
            {showList && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 space-y-1 text-gray-700 text-sm list-disc list-inside font-kanit"
              >
                {membersList.map((u, i) => (
                  <li key={'m'+i}>
                    {u.name} — {u.email} — {u.phone} (สมาชิก)
                  </li>
                ))}
                {guestsList.map((u, i) => (
                  <li key={'g'+i}>
                    {u.name} — {u.email} — {u.phone} (บุคคลทั่วไป)
                  </li>
                ))}
                {membersList.length === 0 && guestsList.length === 0 && (
                  <li>ยังไม่มีผู้ลงทะเบียน</li>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Cancellation confirmation modal */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCancelModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-center mb-2 font-kanit">ยืนยันการยกเลิกการลงทะเบียน</h3>
              
              <p className="text-gray-600 text-center mb-6 font-kanit">
                คุณต้องการยกเลิกการลงทะเบียนสำหรับกิจกรรม "{event.title}" ใช่หรือไม่?
              </p>
              
              <div className="flex justify-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-kanit"
                >
                  ไม่, ฉันเปลี่ยนใจ
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmCancel}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-kanit"
                >
                  ใช่, ยกเลิกการลงทะเบียน
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
