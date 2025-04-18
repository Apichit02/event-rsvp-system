'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import LoginForm from '@/components/login/LoginForm';
import RegisterForm from '@/components/login/RegisterForm';
import AuthCard from '@/components/login/AuthCard';
import LoadingOverlay from '@/components/common/LoadingOverlay';

export default function LoginPageContent() {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode');
  const [mode, setMode] = useState(modeParam === 'register' ? 'register' : 'login');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMode(modeParam === 'register' ? 'register' : 'login');
    setError('');
    setSuccess('');
  }, [modeParam]);

  const handleError = msg => {
    setError(msg);
    setSuccess('');
    window.scrollTo(0, 0);
  };

  const handleSuccess = msg => {
    setSuccess(msg);
    setError('');
    window.scrollTo(0, 0);
  };

  const setLoadingState = loading => {
    setIsLoading(loading);
  };

  return (
    <>
      <LoadingOverlay
        isLoading={isLoading}
        message={mode === 'login' ? 'กำลังเข้าสู่ระบบ...' : 'กำลังสร้างบัญชีใหม่...'}
      />
      <main className="flex-grow flex items-center justify-center px-4 py-12 bg-gradient-to-b from-indigo-50 to-white">
        <div className="w-full max-w-md md:max-w-xl">
          {/* ...existing notifications code... */}
          {error && <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm"><p className="text-sm text-red-700">{error}</p></div>}
          {success && <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-sm"><p className="text-sm text-green-700">{success}</p></div>}

          <AuthCard>
            {mode === 'login' ? (
              <LoginForm onSuccess={handleSuccess} onError={handleError} setLoading={setLoadingState} />
            ) : (
              <RegisterForm onSuccess={handleSuccess} onError={handleError} setLoading={setLoadingState} />
            )}
          </AuthCard>
        </div>
      </main>
    </>
  );
}
