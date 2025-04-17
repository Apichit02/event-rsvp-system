'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileHeader from '@/components/profile/ProfileHeader';
import EventsSection from '@/components/profile/EventsSection';
import LoadingState from '@/components/profile/LoadingState';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [organized, setOrganized] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (!u) {
      router.push('/login?mode=login&redirect=/profile');
      return;
    }
    
    const userObj = JSON.parse(u);
    
    const enhancedUser = {
      ...userObj,
      organized_count: 0,
      registered_count: 0,
    };
    
    setUser(enhancedUser);

    fetch(`/api/profile/${userObj.id}`)
      .then(res => res.json())
      .then(data => {
        const organizedEvents = data.organizedEvents || [];
        const registeredEvents = data.registeredEvents || [];
        
        enhancedUser.organized_count = organizedEvents.length;
        enhancedUser.registered_count = registeredEvents.length;
        setUser(enhancedUser);
        
        const sortEvents = events => {
          return [...events].sort((a, b) => 
            new Date(b.event_date) - new Date(a.event_date)
          );
        };
        
        setOrganized(sortEvents(organizedEvents));
        setRegistered(sortEvents(registeredEvents));
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 font-kanit">
        <Navbar />
        <LoadingState />
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 font-kanit">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <div className="bg-red-100 text-red-600 p-6 rounded-full inline-block mb-4">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2 font-kanit">กรุณาเข้าสู่ระบบ</h1>
            <p className="text-gray-600 mb-6 font-kanit">คุณต้องเข้าสู่ระบบก่อนเพื่อดูข้อมูลโปรไฟล์ของคุณ</p>
            <button 
              onClick={() => router.push('/login?mode=login&redirect=/profile')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-kanit"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-kanit">
      <Navbar />

      <main className="flex-grow px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ProfileHeader user={user} />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <EventsSection 
              title="กิจกรรมที่คุณจัด" 
              events={organized} 
              emptyMessage="คุณยังไม่ได้สร้างกิจกรรมใดๆ" 
              showEditButton={true}
            />
            
            <EventsSection 
              title="กิจกรรมที่คุณลงทะเบียน" 
              events={registered} 
              emptyMessage="คุณยังไม่ได้ลงทะเบียนเข้าร่วมกิจกรรมใดๆ"
            />
          </motion.div>
          
          {organized.length === 0 && registered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center my-8"
            >
              <h3 className="text-lg font-bold mb-2 text-indigo-800 font-kanit">เริ่มต้นใช้งาน</h3>
              <p className="text-indigo-700 mb-4 font-kanit">คุณสามารถเริ่มสร้างกิจกรรมของคุณเอง หรือค้นหากิจกรรมที่น่าสนใจเพื่อเข้าร่วม</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => router.push('/profile/add-event')}
                  className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-kanit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  สร้างกิจกรรมใหม่
                </button>
                <button
                  onClick={() => router.push('/events')}
                  className="inline-flex items-center justify-center px-4 py-2 bg-white text-indigo-700 border border-indigo-300 rounded-lg hover:bg-indigo-50 transition font-kanit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  ค้นหากิจกรรม
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}