'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EditEventHeader from '@/components/profile/edit-event/EditEventHeader';
import EventFormSkeleton from '@/components/profile/edit-event/EventFormSkeleton';
import DeleteEventButton from '@/components/profile/edit-event/DeleteEventButton';
import ImageUploadSection from '@/components/profile/edit-event/ImageUploadSection';

import EventBasicInfo from '@/components/profile/edit-event/EventBasicInfo';
import EventDateTimeSection from '@/components/profile/add-event/EventDateTimeSection';
import EventLocationSection from '@/components/profile/add-event/EventLocationSection';
import EventCapacitySection from '@/components/profile/add-event/EventCapacitySection';
import EventContactSection from '@/components/profile/add-event/EventContactSection';

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id;
  
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
    max_attendees: 0,
    contact_email: '',
    contact_phone: '',
    website: '',
    category: '',
    status: 'open',
    organizer_id: null,
  });
  
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!eventId) return;
    
    const fetchEvent = async () => {
      try {
        const u = localStorage.getItem('user');
        if (!u) {
          router.push('/login?mode=login&redirect=/profile');
          return;
        }
        
        const user = JSON.parse(u);
        
        const response = await fetch(`/api/events/${eventId}`);
        const data = await response.json();
        
        if (!data.event) {
          setError('ไม่พบข้อมูลกิจกรรม');
          setLoading(false);
          return;
        }

        if (data.event.organizer_id !== user.id) {
          setError('คุณไม่มีสิทธิ์แก้ไขกิจกรรมนี้');
          setLoading(false);
          return;
        }

        const event = data.event;
        const eventDate = new Date(event.event_date);
        const formattedDate = eventDate.toISOString().split('T')[0];
        
        setForm({
          ...event,
          event_date: formattedDate,
          price: Number(event.price)
        });

        if (event.images && Array.isArray(event.images)) {
          setExistingImages(event.images);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูลกิจกรรม');
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [eventId, router]);
  
  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setNewImages(files);
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };
  
  const handleRemoveImage = (imageUrl, index) => {
    setImagesToRemove(prev => [...prev, imageUrl]);
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    
    try {
      const totalImages = existingImages.length + newImages.length;
      if (totalImages > 5) {
        setError('จำนวนรูปภาพรวมต้องไม่เกิน 5 รูป');
        setIsSubmitting(false);
        return;
      }
      
      const fd = new FormData();
      
      Object.entries(form).forEach(([k, v]) => {
        if (v != null) fd.append(k, v);
      });
      
      fd.append('event_id', eventId);
      
      if (imagesToRemove.length > 0) {
        fd.append('images_to_remove', JSON.stringify(imagesToRemove));
      }
      
      Array.from(newImages).forEach(file => {
        if (file.size) fd.append('new_images', file);
      });
      
      const res = await fetch('/api/profile/edit-event', {
        method: 'PUT',
        body: fd,
      });
      
      const data = await res.json();
      
      if (data.success) {
        setSuccess('บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว');
        
        setTimeout(() => {
          router.push('/profile');
        }, 2000);
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการอัปเดตกิจกรรม');
      }
    } catch (err) {
      console.error('Error updating event:', err);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteEvent = async (id) => {
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/profile/delete-event/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        router.push('/profile');
      } else {
        setError(data.error || 'ไม่สามารถลบกิจกรรมได้');
        setIsDeleting(false);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
      setIsDeleting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-kanit">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <EditEventHeader eventTitle={form.title} />
          
          {loading ? (
            <EventFormSkeleton />
          ) : (
            <>
              {/* Notification messages */}
              {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700 font-kanit">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {success && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700 font-kanit">{success}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <EventBasicInfo form={form} handleChange={handleChange} />
                <EventDateTimeSection form={form} handleChange={handleChange} />
                <EventLocationSection form={form} handleChange={handleChange} />
                <EventCapacitySection form={form} handleChange={handleChange} />
                <EventContactSection form={form} handleChange={handleChange} />
                
                <ImageUploadSection 
                  existingImages={existingImages}
                  newImages={newImages}
                  handleChange={handleChange}
                  onRemoveImage={handleRemoveImage}
                />
                
                {/* Form Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row justify-between gap-4 mt-8"
                >
                  <DeleteEventButton 
                    eventId={eventId} 
                    onDelete={handleDeleteEvent}
                    isDeleting={isDeleting}
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => router.push('/profile')}
                      disabled={isSubmitting || isDeleting}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-kanit"
                    >
                      ยกเลิก
                    </button>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting || isDeleting}
                      className={`px-6 py-3 rounded-lg text-white font-kanit ${
                        isSubmitting || isDeleting
                          ? 'bg-indigo-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          กำลังบันทึก...
                        </>
                      ) : 'บันทึกการเปลี่ยนแปลง'}
                    </button>
                  </div>
                </motion.div>
              </form>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

