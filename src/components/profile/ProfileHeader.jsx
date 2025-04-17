import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProfileHeader({ user }) {
  if (!user) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6 sm:p-8 rounded-xl shadow-lg text-white mb-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center mb-3">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold mr-4">
              {user.full_name?.charAt(0) || user.username?.charAt(0) || '?'}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1 font-kanit">สวัสดี, {user.full_name}</h1>
              <p className="text-indigo-100 text-sm sm:text-base font-kanit">@{user.username}</p>
            </div>
          </div>
          <div className="space-y-1 text-sm text-indigo-100">
            <p className="font-kanit flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {user.email}
            </p>
            <p className="font-kanit flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              เข้าร่วมเมื่อ: {new Date(user.created_at).toLocaleDateString('th-TH', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          </div>
        </div>
        
        <Link href="/profile/add-event" className="px-4 py-2 bg-white text-indigo-700 rounded-lg hover:bg-indigo-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-kanit flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          สร้างกิจกรรมใหม่
        </Link>
      </div>
      
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
          <p className="text-xs text-indigo-100 font-kanit">กิจกรรมที่สร้าง</p>
          <p className="text-xl font-bold font-kanit">{user.organized_count || 0}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
          <p className="text-xs text-indigo-100 font-kanit">กิจกรรมที่เข้าร่วม</p>
          <p className="text-xl font-bold font-kanit">{user.registered_count || 0}</p>
        </div>
        <div className="hidden sm:block bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
          <p className="text-xs text-indigo-100 font-kanit">สถานะบัญชี</p>
          <p className="text-xl font-bold font-kanit">ปกติ</p>
        </div>
      </div>
    </motion.div>
  );
}
