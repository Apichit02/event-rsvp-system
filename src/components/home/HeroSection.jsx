'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('authToken'));
  }, []);

  const handleCreateEvent = () => {
    if (!isAuthenticated) {
      router.push('/login?mode=login&redirect=/profile/add-event');
    } else {
      router.push('/profile/add-event');
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-indigo-600 to-blue-500 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute right-0 bottom-0 -mb-20 -mr-20">
          <svg width="400" height="400" fill="none" viewBox="0 0 200 200">
            <defs>
              <pattern id="pattern" patternUnits="userSpaceOnUse" width="20" height="20">
                <path d="M0 10 L20 10 M10 0 L10 20" stroke="white" strokeWidth="2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)"/>
          </svg>
        </div>
        <div className="absolute left-0 top-0 transform -translate-x-1/4 -translate-y-1/4">
          <svg width="300" height="300" viewBox="0 0 56 56" fill="white" opacity="0.2">
            <path d="M28 0C12.5 0 0 12.5 0 28s12.5 28 28 28 28-12.5 28-28S43.5 0 28 0zm0 54C13.7 54 2 42.3 2 28S13.7 2 28 2s26 11.7 26 26-11.7 26-26 26z"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-kanit mb-4">
                ค้นหาและเข้าร่วม<br />
                <span className="text-yellow-300">กิจกรรมที่ใช่สำหรับคุณ</span>
              </h1>
              <p className="text-indigo-100 text-lg sm:text-xl mb-8 font-kanit">
                ค้นพบกิจกรรมใหม่ๆ ที่น่าสนใจ จัดการการลงทะเบียนได้ง่ายๆ และสร้างกิจกรรมของคุณเองได้ในที่เดียว
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => router.push('/events')}
                  className="bg-white text-indigo-600 font-medium px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors duration-300 font-kanit"
                >
                  ค้นหากิจกรรม
                </button>
                <button 
                  onClick={handleCreateEvent}
                  className="bg-transparent text-white border-2 border-white font-medium px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors duration-300 font-kanit flex items-center justify-center"
                >
                  <span>{isAuthenticated ? 'สร้างกิจกรรมใหม่' : 'เข้าสู่ระบบเพื่อสร้างกิจกรรม'}</span>
                  {!isAuthenticated && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
          <div className="md:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10"
            >
              <img 
                src="/images/hero-event.png" 
                alt="Event planning" 
                className="rounded-lg shadow-2xl object-cover w-full max-w-md mx-auto h-80 sm:h-96"
              />
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-indigo-800 px-4 py-2 rounded shadow-lg font-kanit">
                <div className="text-sm font-bold">อีเวนต์ยอดนิยม</div>
                <div className="text-xs">กว่า 100+ รายการ</div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white text-indigo-800 px-4 py-2 rounded shadow-lg font-kanit">
                <div className="text-sm font-bold">จัดการง่าย</div>
                <div className="text-xs">ระบบลงทะเบียนอัตโนมัติ</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
