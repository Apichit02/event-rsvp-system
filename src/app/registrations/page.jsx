'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegistrationHeader from '@/components/registrations/RegistrationHeader';
import EventSelector from '@/components/registrations/EventSelector';
import EventSummary from '@/components/registrations/EventSummary';
import RegistrationForm from '@/components/registrations/RegistrationForm';
import RegistrationStatus from '@/components/registrations/RegistrationStatus';

export default function RegistrationsPage() {
  const router = useRouter();
  const search = useSearchParams();
  const eventIdFromQuery = search.get('eventId') || '';

  const [events, setEvents] = useState([]);
  const [detail, setDetail] = useState(null);
  const [selectedId, setSelectedId] = useState(eventIdFromQuery);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
  });
  const [msg, setMsg] = useState({ error: '', success: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        if (data.events) {
          const sortedEvents = data.events.sort((a, b) => 
            new Date(a.event_date) - new Date(b.event_date)
          );
          setEvents(sortedEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setMsg(m => ({ ...m, error: 'ไม่สามารถโหลดข้อมูลกิจกรรมได้' }));
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setDetail(null);
      return;
    }

    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`/api/events/${selectedId}`);
        const data = await response.json();
        if (data.event) {
          setDetail(data.event);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
        setMsg(m => ({ ...m, error: 'ไม่สามารถโหลดข้อมูลรายละเอียดกิจกรรม' }));
      }
    };

    fetchEventDetails();
  }, [selectedId]);

  const handleSelect = e => {
    setSelectedId(e.target.value);
    setMsg({ error: '', success: '' });
    setForm({ full_name: '', email: '', phone: '' });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg({ error: '', success: '' });
    setSubmitting(true);

    try {
      if (!selectedId) {
        setMsg(m => ({ ...m, error: 'กรุณาเลือกกิจกรรม' }));
        return;
      }
      
      if (!form.full_name || !form.email) {
        setMsg(m => ({ ...m, error: 'กรุณากรอกชื่อและอีเมล' }));
        return;
      }

      const fd = new FormData();
      fd.append('event_id', selectedId);
      fd.append('full_name', form.full_name);
      fd.append('email', form.email);
      if (form.phone) fd.append('phone', form.phone);

      const res = await fetch('/api/registrations', {
        method: 'POST',
        body: fd,
      });
      
      const data = await res.json();

      if (data.message) {
        setMsg(m => ({ ...m, success: data.message }));
        setForm({ full_name: '', email: '', phone: '' });
        
        const refreshResponse = await fetch(`/api/events/${selectedId}`);
        const refreshData = await refreshResponse.json();
        if (refreshData.event) {
          setDetail(refreshData.event);
        }
      } else {
        setMsg(m => ({ ...m, error: data.error || 'เกิดข้อผิดพลาดในการลงทะเบียน' }));
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMsg(m => ({ ...m, error: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์' }));
    } finally {
      setSubmitting(false);
    }
  };

  const total = detail ? detail.total_count : 0;
  const max = detail ? detail.max_attendees : 0;
  const seatsLeft = max - total;

  const isFormDisabled = !selectedId || submitting || (detail && seatsLeft <= 0);

  return (
    <div className="flex flex-col min-h-screen font-kanit bg-gray-50">
      <Navbar />

      <main className="flex-grow py-8 md:py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <RegistrationHeader />
          
          <RegistrationStatus 
            error={msg.error} 
            success={msg.success} 
          />
          
          <EventSelector 
            events={events} 
            selectedId={selectedId} 
            onSelect={handleSelect} 
            loading={loading}
          />
          
          {detail && (
            <>
              <EventSummary eventDetail={detail} />
              
              <RegistrationForm 
                formData={form} 
                onChange={handleChange} 
                onSubmit={handleSubmit} 
                isDisabled={isFormDisabled}
                seatsLeft={seatsLeft}
              />
            </>
          )}
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8"
          >
            <button
              onClick={() => router.push('/events')}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-kanit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              กลับไปหน้ารายการกิจกรรม
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
