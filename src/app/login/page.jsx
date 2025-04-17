'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginForm from '@/components/login/LoginForm';
import RegisterForm from '@/components/login/RegisterForm';
import AuthCard from '@/components/login/AuthCard';
import LoadingOverlay from '@/components/common/LoadingOverlay';

export default function AuthPage() {
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

  const handleError = (message) => {
    setError(message);
    setSuccess('');
    window.scrollTo(0, 0);
  };

  const handleSuccess = (message) => {
    setSuccess(message);
    setError('');
    window.scrollTo(0, 0);
  };

  const setLoadingState = (loading) => {
    setIsLoading(loading);
  };

  return (
    <div className="flex flex-col min-h-screen font-kanit">
      <Navbar />
      
      <LoadingOverlay 
        isLoading={isLoading} 
        message={mode === 'login' ? 'กำลังเข้าสู่ระบบ...' : 'กำลังสร้างบัญชีใหม่...'}
      />
      
      <main className="flex-grow flex items-center justify-center px-4 py-12 bg-gradient-to-b from-indigo-50 to-white">
        <div className="w-full max-w-md md:max-w-xl">
          {/* Notifications */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm" role="alert">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-sm" role="alert">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}

          <AuthCard>
            {mode === 'login' ? (
              <LoginForm 
                onSuccess={handleSuccess} 
                onError={handleError} 
                setLoading={setLoadingState}
              />
            ) : (
              <RegisterForm 
                onSuccess={handleSuccess} 
                onError={handleError}
                setLoading={setLoadingState}
              />
            )}
          </AuthCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
