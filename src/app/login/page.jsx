'use client';

import React, { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginPageContent from './LoginPageContent';

export default function AuthPage() {
  return (
    <div className="flex flex-col min-h-screen font-kanit">
      <Navbar />
      <Suspense fallback="Loading...">
        <LoginPageContent />
      </Suspense>
      <Footer />
    </div>
  );
}
