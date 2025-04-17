import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormField from './FormField';
import AuthButton from './AuthButton';
import AuthToggle from './AuthToggle';

export default function RegisterForm({ onSuccess, onError, setLoading }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    full_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      if (onError) onError('รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง');
      return;
    }

    setIsLoading(true);
    if (setLoading) setLoading(true);

    const payload = {
      username: form.username,
      full_name: form.full_name,
      email: form.email,
      password: form.password,
    };

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      
      if (data.message) {
        if (onSuccess) onSuccess('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
        router.replace('/login?mode=login');
      } else {
        if (onError) onError(data.error || 'สมัครสมาชิกไม่สำเร็จ');
      }
    } catch (error) {
      if (onError) onError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setIsLoading(false);
      if (setLoading) setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 font-kanit">สมัครสมาชิกใหม่</h1>
        <p className="text-gray-600 font-kanit">สร้างบัญชีของคุณและเริ่มใช้งานระบบได้ทันที</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="ชื่อผู้ใช้"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
          <FormField
            label="ชื่อ-นามสกุล"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>
        
        <FormField
          label="อีเมล"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="รหัสผ่าน"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            }
          />
          <FormField
            label="ยืนยันรหัสผ่าน"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
          />
        </div>

        <div className="flex items-center mt-4 mb-6">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 font-kanit">
            ฉันยอมรับ <a href="/terms" className="text-indigo-600 hover:text-indigo-500">ข้อกำหนดและเงื่อนไข</a> การใช้งาน
          </label>
        </div>

        <AuthButton type="submit" isLoading={isLoading}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          สมัครสมาชิก
        </AuthButton>
      </form>

      <AuthToggle mode="register" />
    </div>
  );
}
