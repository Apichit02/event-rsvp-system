'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsHeader from '@/components/events/EventsHeader';
import EventsFilter from '@/components/events/EventsFilter';
import EventsCard from '@/components/events/EventsCard';
import EventsEmpty from '@/components/events/EventsEmpty';
import EventsPagination from '@/components/events/EventsPagination';
import { motion } from 'framer-motion';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  
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
  
  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      handleFilterChange(currentFilters);
      return;
    }
    
    const normalizedTerm = term.toLowerCase().trim();
    
    const results = events.filter(event => 
      (event.title?.toLowerCase() || '').includes(normalizedTerm) ||
      (event.description?.toLowerCase() || '').includes(normalizedTerm) ||
      (event.location?.toLowerCase() || '').includes(normalizedTerm)
    );
    
    setFilteredEvents(results);
    setIsFiltered(true);
    setCurrentPage(1);
  };
  
  const [currentFilters, setCurrentFilters] = useState({
    freeOnly: false,
    availableOnly: false,
    thisWeek: false
  });
  
  const handleSortChange = (sortOption) => {
    let sortedEvents = [...filteredEvents];
    
    switch (sortOption) {
      case 'date-asc':
        sortedEvents.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
        break;
      case 'date-desc':
        sortedEvents.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));
        break;
      case 'price-asc':
        sortedEvents.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-desc':
        sortedEvents.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'popularity':
        sortedEvents.sort((a, b) => (b.registered_count || 0) - (a.registered_count || 0));
        break;
      default:
        break;
    }
    
    setFilteredEvents(sortedEvents);
    setCurrentPage(1);
  };
  
  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
    
    let filtered = [...events];
    let hasActiveFilter = false;
    
    if (searchTerm.trim()) {
      const normalizedTerm = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(event => 
        (event.title?.toLowerCase() || '').includes(normalizedTerm) ||
        (event.description?.toLowerCase() || '').includes(normalizedTerm) ||
        (event.location?.toLowerCase() || '').includes(normalizedTerm)
      );
      hasActiveFilter = true;
    }
    
    if (filters.freeOnly) {
      filtered = filtered.filter(event => !event.price || event.price <= 0);
      hasActiveFilter = true;
    }
    
    if (filters.availableOnly) {
      filtered = filtered.filter(event => {
        const seatsLeft = event.max_attendees - event.registered_count;
        return seatsLeft > 0;
      });
      hasActiveFilter = true;
    }
    
    if (filters.thisWeek) {
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.event_date);
        return eventDate >= today && eventDate <= nextWeek;
      });
      hasActiveFilter = true;
    }
    
    setFilteredEvents(filtered);
    setIsFiltered(hasActiveFilter);
    setCurrentPage(1);
  };
  
  const handleClearFilters = () => {
    setFilteredEvents(events);
    setIsFiltered(false);
    setSearchTerm('');
    setCurrentFilters({
      freeOnly: false,
      availableOnly: false,
      thisWeek: false
    });
  };
  
  const applyQuickFilter = (filterType) => {
    switch(filterType) {
      case 'free':
        const newFreeFilter = { ...currentFilters, freeOnly: true };
        setCurrentFilters(newFreeFilter);
        handleFilterChange(newFreeFilter);
        break;
      case 'this-week':
        const newWeekFilter = { ...currentFilters, thisWeek: true };
        setCurrentFilters(newWeekFilter);
        handleFilterChange(newWeekFilter);
        break;
      case 'available':
        const newAvailableFilter = { ...currentFilters, availableOnly: true };
        setCurrentFilters(newAvailableFilter);
        handleFilterChange(newAvailableFilter);
        break;
      case 'popular':
        handleSortChange('popularity');
        break;
      default:
        break;
    }
  };
  
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <EventsHeader totalEvents={0} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-gray-600 font-kanit">กำลังโหลดข้อมูลกิจกรรม...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen font-kanit mb-2">
      <Navbar />
      
      <main className="flex-grow">
        <EventsHeader totalEvents={events.length} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick filter buttons */}
          <div className="mb-6 overflow-x-auto hide-scrollbar">
            <div className="flex space-x-3 py-2">
              <button 
                onClick={() => applyQuickFilter('free')}
                className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center ${
                  currentFilters.freeOnly 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } transition-colors duration-200 font-kanit`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                กิจกรรมฟรี
              </button>
              <button 
                onClick={() => applyQuickFilter('this-week')}
                className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center ${
                  currentFilters.thisWeek 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } transition-colors duration-200 font-kanit`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                สัปดาห์นี้
              </button>
              <button 
                onClick={() => applyQuickFilter('available')}
                className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center ${
                  currentFilters.availableOnly 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } transition-colors duration-200 font-kanit`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                ยังมีที่ว่าง
              </button>
              <button 
                onClick={() => applyQuickFilter('popular')}
                className="px-4 py-2 rounded-full whitespace-nowrap bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200 flex items-center font-kanit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                ยอดนิยม
              </button>
            </div>
          </div>
          
          <EventsFilter 
            onSortChange={handleSortChange} 
            onFilterChange={handleFilterChange} 
            onSearch={handleSearch}
            searchTerm={searchTerm}
            currentFilters={currentFilters}
          />
          
          {filteredEvents.length === 0 ? (
            <EventsEmpty 
              isFiltered={isFiltered} 
              onClearFilters={handleClearFilters}
              message={searchTerm ? `ไม่พบกิจกรรมที่ตรงกับคำค้นหา "${searchTerm}"` : "ไม่พบกิจกรรมที่ตรงกับเงื่อนไข"}
            />
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-gray-600 font-kanit">
                    แสดง {indexOfFirstEvent + 1} - {Math.min(indexOfLastEvent, filteredEvents.length)} จาก {filteredEvents.length} กิจกรรม
                  </p>
                  {isFiltered && (
                    <button
                      onClick={handleClearFilters}
                      className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center font-kanit"
                    >
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      ล้างตัวกรอง
                    </button>
                  )}
                </div>
  
                <div className="space-y-6">
                  {currentEvents.map((event, index) => (
                    <EventsCard key={event.event_id} event={event} index={index} />
                  ))}
                </div>
                
                <EventsPagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </motion.div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
      
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
  );
}
