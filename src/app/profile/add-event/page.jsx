'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventFormHeader from '@/components/profile/add-event/EventFormHeader';
import EventBasicInfo from '@/components/profile/add-event/EventBasicInfo';
import EventDateTimeSection from '@/components/profile/add-event/EventDateTimeSection';
import EventLocationSection from '@/components/profile/add-event/EventLocationSection';
import EventCapacitySection from '@/components/profile/add-event/EventCapacitySection';
import EventContactSection from '@/components/profile/add-event/EventContactSection';
import EventImagesUpload from '@/components/profile/add-event/EventImagesUpload';
import EventFormFooter from '@/components/profile/add-event/EventFormFooter';

export default function AddEventPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    long_description: '',
    event_date: '',
    start_time: '',
    end_time: '',
    location: '',
    location_map_url: '',
    price: 0,
    max_attendees: 100,
    contact_email: '',
    contact_phone: '',
    website: '',
    category: '',
    status: 'open',
    organizer_id: null,
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (!u) {
      router.push('/login?mode=login&redirect=/profile/add-event');
      return;
    }
    
    const user = JSON.parse(u);
    setForm(f => ({ 
      ...f, 
      organizer_id: user.id,
      contact_email: user.email || f.contact_email 
    }));
  }, [router]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setImages(files);
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v != null) fd.append(k, v);
      });
      
      if (images.length > 5) {
        setError('สามารถอัพโหลดรูปภาพได้สูงสุด 5 รูปเท่านั้น');
        setIsSubmitting(false);
        return;
      }
      
      Array.from(images).forEach(file => {
        if (file.size) fd.append('images', file);
      });

      const res = await fetch('/api/profile/add-event', {
        method: 'POST',
        body: fd,
      });
      
      const data = await res.json();
      if (data.success || data.message) {
        router.push('/profile');
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการสร้างกิจกรรม');
      }
    } catch (err) {
      console.error('Error creating event:', err);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-kanit">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <EventFormHeader />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <EventBasicInfo form={form} handleChange={handleChange} />
            <EventDateTimeSection form={form} handleChange={handleChange} />
            <EventLocationSection form={form} handleChange={handleChange} />
            <EventCapacitySection form={form} handleChange={handleChange} />
            <EventContactSection form={form} handleChange={handleChange} />
            <EventImagesUpload images={images} handleChange={handleChange} />
            
            <EventFormFooter error={error} isSubmitting={isSubmitting} />
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
