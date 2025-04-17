'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventDetailHeader from '@/components/events/id/EventDetailHeader';
import EventDetailGallery from '@/components/events/id/EventDetailGallery';
import EventDetailLocation from '@/components/events/id/EventDetailLocation';
import EventDetailDescription from '@/components/events/id/EventDetailDescription';
import EventDetailRegistration from '@/components/events/id/EventDetailRegistration';
import EventDetailActions from '@/components/events/id/EventDetailActions';
import LoginPromptModal from '@/components/events/id/LoginPromptModal';
import LoadingState from '@/components/events/id/LoadingState';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const u = localStorage.getItem('user');
    if (token && u) {
      setIsAuth(true);
      setUser(JSON.parse(u));
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${id}`);
        const data = await response.json();
        if (data.event) {
          setEvent(data.event);
        } else {
          setNotification({
            show: true,
            type: 'error',
            message: data.error || 'ไม่สามารถโหลดข้อมูลกิจกรรมได้'
          });
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setNotification({
          show: true,
          type: 'error',
          message: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [id]);

  const handleRegister = () => {
    if (!isAuth) {
      setShowLoginModal(true);
      return;
    }

    setNotification({
      show: true,
      type: 'loading',
      message: 'กำลังดำเนินการลงทะเบียน...'
    });
    
    fetch('/api/registrations/member', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_id: id, user_id: user.id })
    })
      .then(r => r.json())
      .then(data => {
        if (data.message) {
          setNotification({
            show: true,
            type: 'success',
            message: data.message || 'ลงทะเบียนสำเร็จ'
          });
          
          return fetch(`/api/events/${id}`)
            .then(r2 => r2.json())
            .then(d2 => d2.event && setEvent(d2.event));
        } else {
          setNotification({
            show: true,
            type: 'error',
            message: data.error || 'เกิดข้อผิดพลาดในการลงทะเบียน'
          });
        }
      })
      .catch(error => {
        console.error(error);
        setNotification({
          show: true,
          type: 'error',
          message: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์'
        });
      });
  };

  useEffect(() => {
    if (notification.show && notification.type !== 'loading') {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleGoToLogin = () => {
    router.push('/login?mode=login');
  };

  const handleGuestRegistration = () => {
    router.push(`/registrations?eventId=${id}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen font-kanit">
        <Navbar />
        <LoadingState />
        <Footer />
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="flex flex-col min-h-screen font-kanit">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <div className="bg-red-100 text-red-700 p-6 rounded-xl inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">ไม่พบกิจกรรมนี้</h1>
            <p className="text-gray-600 mb-6">กิจกรรมอาจถูกลบหรือไม่มีอยู่ในระบบ</p>
            <button 
              onClick={() => router.push('/events')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              กลับไปหน้ารายการกิจกรรม
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const {
    title,
    description,
    long_description,
    event_date,
    start_time,
    end_time,
    location,
    location_map_url,
    price,
    max_attendees,
    attendees_count,
    contact_email,
    contact_phone,
    website,
    category,
    status,
    organizer_id,
    created_at,
    images = [],
  } = event;

  const formattedDate = event_date ? new Date(event_date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';

  const totalRegistrations = event.total_count || attendees_count || 0;
  const seatsLeft = max_attendees - totalRegistrations;
  const isEventFull = seatsLeft <= 0;
  
  const eventDateTime = new Date(`${event_date}T${end_time || '23:59:59'}`);
  const isPastEvent = eventDateTime < new Date();
  
  const statusDisplay = status === 'cancelled' ? 'ยกเลิก' : 
                        status === 'closed' ? 'ปิดรับสมัคร' : 
                        isPastEvent ? 'สิ้นสุดแล้ว' : 'เปิดรับสมัคร';
  
  const statusColor = status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                      status === 'closed' ? 'bg-orange-100 text-orange-800' : 
                      isPastEvent ? 'bg-gray-100 text-gray-800' : 
                      'bg-green-100 text-green-800';

  return (
    <div className="flex flex-col min-h-screen font-kanit bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <Navbar />
      
      {/* Notification Toast */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-600 text-white' : 
              notification.type === 'error' ? 'bg-red-600 text-white' : 
              'bg-indigo-600 text-white'
            } flex items-center space-x-2 min-w-[300px] max-w-md`}
          >
            {notification.type === 'success' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {notification.type === 'error' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {notification.type === 'loading' && (
              <svg className="animate-spin h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span className="font-kanit">{notification.message}</span>
            
            <button 
              onClick={() => setNotification({ ...notification, show: false })}
              className="ml-auto text-white/80 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="flex-grow py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Back to events button */}
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/events')}
              className="mb-2 inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors rounded-lg px-3 py-1 bg-white/80 backdrop-blur-sm shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              กลับไปหน้ารายการกิจกรรม
            </motion.button>
            
            {/* Using the original EventDetailHeader component with enhanced data */}
            <EventDetailHeader 
              event={event} 
              statusDisplay={statusDisplay} 
              statusColor={statusColor} 
              formattedDate={formattedDate}
            />
            
            {/* Using the original EventDetailGallery component */}
            <EventDetailGallery images={images} title={title} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Using the original EventDetailDescription component */}
                  <EventDetailDescription 
                    description={description} 
                    long_description={long_description} 
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Pass the original location_map_url without modifying it */}
                  <EventDetailLocation 
                    location={location} 
                    location_map_url={location_map_url}
                  />
                </motion.div>
                
                {/* Contact information section */}
                {(contact_email || contact_phone || website) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                  >
                    <h2 className="text-xl font-bold text-gray-800 mb-4 font-kanit">ข้อมูลติดต่อ</h2>
                    <div className="space-y-3">
                      {contact_email && (
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <a href={`mailto:${contact_email}`} className="text-indigo-600 hover:text-indigo-800 font-kanit">{contact_email}</a>
                        </div>
                      )}
                      
                      {contact_phone && (
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href={`tel:${contact_phone}`} className="text-indigo-600 hover:text-indigo-800 font-kanit">{contact_phone}</a>
                        </div>
                      )}
                      
                      {website && (
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          <a href={website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-kanit">{website}</a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
                
                {/* Using the original EventDetailActions component for mobile */}
                <div className="lg:hidden">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <EventDetailActions event={event} isAuthenticated={isAuth} />
                  </motion.div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="sticky top-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {/* Using the original EventDetailRegistration component */}
                    <EventDetailRegistration 
                      event={{
                        ...event,
                        totalRegistrations,
                        seatsLeft,
                        isEventFull,
                        isPastEvent,
                        statusDisplay
                      }} 
                      onRegister={handleRegister} 
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="hidden lg:block"
                  >
                    <EventDetailActions 
                      event={event} 
                      isAuthenticated={isAuth} 
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
      
      {/* Login Prompt Modal */}
      <LoginPromptModal 
        isOpen={showLoginModal}
        onClose={handleLoginModalClose}
        onLogin={handleGoToLogin}
        onGuestRegistration={handleGuestRegistration}
      />
    </div>
  );
}
