'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import EventsGrid from '@/components/home/EventsGrid';
import EventCard from '@/components/home/EventCard';
import SearchBar from '@/components/home/SearchBar';
import LoadingState from '@/components/home/LoadingState';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import { motion } from 'framer-motion';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        if (data.events) {
          setEvents(data.events);
          setFilteredEvents(data.events);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...events];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(event => 
        event.title?.toLowerCase().includes(query) || 
        event.description?.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query)
      );
    }
    
    setFilteredEvents(result);
  }, [searchQuery, events]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    const next7Days = new Date(now);
    next7Days.setDate(now.getDate() + 7);
    
    return events.filter(event => {
      const eventDate = new Date(event.event_date);
      return eventDate >= now && eventDate <= next7Days;
    }).slice(0, 3);
  };

  const getPopularEvents = () => {
    return [...events]
      .sort((a, b) => {
        const aCount = (a.attendees_count || 0) + (a.guest_count || 0);
        const bCount = (b.attendees_count || 0) + (b.guest_count || 0);
        return bCount - aCount;
      })
      .slice(0, 3);
  };

  const upcomingEvents = getUpcomingEvents();
  const popularEvents = getPopularEvents();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <HeroSection />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SearchBar onSearch={handleSearch} />
          
          {/* Popular events section */}
          {!loading && popularEvents.length > 0 && (
            <EventsGrid 
              events={popularEvents} 
              title="กิจกรรมยอดนิยม" 
              emptyMessage="ยังไม่มีกิจกรรมยอดนิยม" 
            />
          )}
          
          {/* Upcoming events section */}
          {!loading && upcomingEvents.length > 0 && (
            <div className="mb-12 md:mb-16">
              <motion.h2 
                className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 font-kanit px-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                กิจกรรมที่กำลังจะมาถึง
                <span className="ml-2 text-sm bg-yellow-100 text-yellow-700 py-0.5 px-2 rounded-full">เร็วๆ นี้</span>
              </motion.h2>
              
              <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
                <div className="grid grid-flow-col auto-cols-max sm:auto-cols-fr sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {upcomingEvents.map(event => (
                    <div key={event.event_id} className="w-72 sm:w-full">
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </div>
              
              <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
            </div>
          )}
          
          {/* Newsletter section - responsive redesign */}
          <div className="mb-12 md:mb-16">
            <NewsletterSignup />
          </div>
          
          {/* Main events list - responsive improvements */}
          {loading ? (
            <div className="mb-12">
              <motion.div 
                className="flex flex-col sm:flex-row sm:items-center justify-between mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 font-kanit mb-2 sm:mb-0">
                  กำลังโหลดกิจกรรม...
                </h2>
                
                <div className="inline-flex items-center space-x-1.5 bg-gray-100 rounded-full py-1 px-3 text-sm text-gray-600">
                  <svg className="animate-spin h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="font-kanit">กรุณารอสักครู่</span>
                </div>
              </motion.div>
              
              <div className="sm:px-0.5">
                <LoadingState />
              </div>
            </div>
          ) : (
            <div className="mb-12">
              <motion.div 
                className="flex flex-col sm:flex-row sm:items-center justify-between mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 font-kanit mb-2 sm:mb-0">
                  {searchQuery ? "ผลการค้นหา" : "กิจกรรมทั้งหมด"}
                </h2>
                
                <div className="inline-flex items-center space-x-1.5 bg-indigo-50 rounded-full py-1 px-3 text-sm text-indigo-700">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  <span className="font-kanit">แสดง {filteredEvents.length} รายการ</span>
                </div>
              </motion.div>
              
              {filteredEvents.length === 0 ? (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900 font-kanit">
                    {searchQuery ? "ไม่พบกิจกรรมที่ตรงกับการค้นหา" : "ไม่มีกิจกรรมในขณะนี้"}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 font-kanit">
                    {searchQuery ? "ลองค้นหาด้วยคำอื่น หรือดูกิจกรรมทั้งหมด" : "โปรดกลับมาเช็คอีกครั้งในภายหลัง"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredEvents.map(event => (
                    <EventCard key={event.event_id} event={event} />
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
