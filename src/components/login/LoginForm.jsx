import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormField from './FormField';
import AuthButton from './AuthButton';
import AuthToggle from './AuthToggle';

export default function LoginForm({ onSuccess, onError, setLoading }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (setLoading) setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (onSuccess) onSuccess('เข้าสู่ระบบสำเร็จ');
        router.push('/');
      } else {
        if (onError) onError(data.error || 'เข้าสู่ระบบไม่สำเร็จ');
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
        <h1 className="text-2xl font-bold text-gray-800 mb-2 font-kanit">เข้าสู่ระบบ</h1>
        <p className="text-gray-600 font-kanit">ยินดีต้อนรับกลับมา! กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
        <FormField
          label="รหัสผ่าน"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        />

        <div className="flex items-center justify-between mt-4 mb-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-kanit">
              จดจำฉันไว้
            </label>
          </div>

          <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 font-kanit">
            ลืมรหัสผ่าน?
          </a>
        </div>

        <AuthButton type="submit" isLoading={isLoading}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          เข้าสู่ระบบ
        </AuthButton>
      </form>

      <AuthToggle mode="login" />
    </div>
  );
}
