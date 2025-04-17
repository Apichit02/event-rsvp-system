'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Footer() {
  const year = new Date().getFullYear();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <footer className="bg-gradient-to-r from-indigo-900 to-blue-900 text-gray-200 py-8 sm:py-10 md:py-12 font-kanit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer content for mobile - simplified version */}
        <div className="md:hidden">
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <img 
                src="/logo/logo.png" 
                alt="Logo" 
                className="h-8 w-auto mr-2 bg-white rounded-full p-1" 
              />
              <span className="text-yellow-300 font-semibold text-xl">MyEvent</span>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Links in accordion style for mobile */}
            <MobileFooterSection title="เกี่ยวกับเรา">
              <p className="text-sm leading-relaxed mb-2">
                MyEvent ช่วยให้คุณจัดการกิจกรรมง่าย ๆ
                ไม่ว่าจะเป็นสายไอที สตาร์ทอัพ หรือเวิร์คช็อป
              </p>
              
              <div className="flex space-x-3 mt-4">
                <FooterSocialLink href="#" icon="facebook" />
                <FooterSocialLink href="#" icon="twitter" />
                <FooterSocialLink href="#" icon="instagram" />
                <FooterSocialLink href="#" icon="line" />
              </div>
            </MobileFooterSection>
            
            <MobileFooterSection title="ลิงก์ด่วน">
              <ul className="space-y-2 text-sm">
                <FooterLink href="/">หน้าแรก</FooterLink>
                <FooterLink href="/events">กิจกรรม</FooterLink>
                <FooterLink href="/registrations">ลงทะเบียน</FooterLink>
                <FooterLink href="/contact">ติดต่อเรา</FooterLink>
              </ul>
            </MobileFooterSection>
            
            <MobileFooterSection title="ช่วยเหลือ">
              <ul className="space-y-2 text-sm">
                <FooterLink href="/faq">คำถามที่พบบ่อย</FooterLink>
                <FooterLink href="/privacy">นโยบายความเป็นส่วนตัว</FooterLink>
                <FooterLink href="/terms">ข้อตกลงการใช้งาน</FooterLink>
              </ul>
            </MobileFooterSection>
            
            <div className="border-t border-indigo-800 pt-4">
              <p className="text-center text-xs text-gray-400">
                <span className="block mb-1">ติดต่อเรา</span>
                <span className="block">062-XXX-XXXX</span>
                <span className="block">contact@myevent.com</span>
              </p>
              <p className="text-center text-xs text-gray-400 mt-4">
                © {year} <span className="text-yellow-300">MyEvent</span>. สงวนลิขสิทธิ์ทุกประการ.
              </p>
            </div>
          </div>
        </div>
        
        {/* Desktop footer layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* About */}
          <div data-aos="fade-up" data-aos-delay="100">
            <h4 className="text-white font-semibold text-lg mb-4 border-b border-indigo-700 pb-2">เกี่ยวกับเรา</h4>
            <div className="flex items-center mb-4">
              <img 
                src="/logo/logo.png" 
                alt="Logo" 
                className="h-8 w-auto mr-2 bg-white rounded-full p-1" 
              />
              <span className="text-yellow-300 font-semibold text-xl">MyEvent</span>
            </div>
            <p className="text-sm leading-relaxed">
              MyEvent ช่วยให้คุณจัดการกิจกรรมง่าย ๆ
              ไม่ว่าจะเป็นสายไอที สตาร์ทอัพ หรือเวิร์คช็อป
            </p>
          </div>

          {/* Links */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h4 className="text-white font-semibold text-lg mb-4 border-b border-indigo-700 pb-2">ลิงก์ด่วน</h4>
            <ul className="space-y-2 text-sm">
              <FooterLink href="/">หน้าแรก</FooterLink>
              <FooterLink href="/events">กิจกรรม</FooterLink>
              <FooterLink href="/registrations">ลงทะเบียน</FooterLink>
              <FooterLink href="/contact">ติดต่อเรา</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h4 className="text-white font-semibold text-lg mb-4 border-b border-indigo-700 pb-2">ช่วยเหลือ</h4>
            <ul className="space-y-2 text-sm">
              <FooterLink href="/faq">คำถามที่พบบ่อย</FooterLink>
              <FooterLink href="/privacy">นโยบายความเป็นส่วนตัว</FooterLink>
              <FooterLink href="/terms">ข้อตกลงการใช้งาน</FooterLink>
            </ul>
          </div>

          {/* Social */}
          <div data-aos="fade-up" data-aos-delay="400">
            <h4 className="text-white font-semibold text-lg mb-4 border-b border-indigo-700 pb-2">ติดตามเรา</h4>
            <p className="text-sm mb-4">ติดตามข่าวสารและกิจกรรมล่าสุดได้ที่</p>
            <div className="flex space-x-4">
              <FooterSocialLink href="#" icon="facebook" />
              <FooterSocialLink href="#" icon="twitter" />
              <FooterSocialLink href="#" icon="instagram" />
              <FooterSocialLink href="#" icon="line" />
            </div>
            
            <div className="mt-6">
              <h5 className="text-white text-sm mb-2">ติดต่อเรา</h5>
              <p className="text-xs flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                062-XXX-XXXX
              </p>
              <p className="text-xs flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@myevent.com
              </p>
            </div>
          </div>
        </div>

        {/* Copyright footer - for both mobile and desktop */}
        <div className="hidden md:block mt-12 pt-8 border-t border-indigo-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p data-aos="fade-right">© {year} <span className="text-yellow-300 font-medium">MyEvent</span>. สงวนลิขสิทธิ์ทุกประการ.</p>
          <div className="mt-4 md:mt-0 flex space-x-6" data-aos="fade-left">
            <Link href="/terms" className="text-gray-400 hover:text-yellow-300 transition-colors duration-200">เงื่อนไขการใช้งาน</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-yellow-300 transition-colors duration-200">ความเป็นส่วนตัว</Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-yellow-300 transition-colors duration-200">แผนผังเว็บไซต์</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper component for Footer links
function FooterLink({ href, children }) {
  return (
    <li>
      <Link href={href} className="hover:text-yellow-300 transition-colors duration-200 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
        {children}
      </Link>
    </li>
  );
}

function FooterSocialLink({ href, icon }) {
  const icons = {
    facebook: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12" />
      </svg>
    ),
    twitter: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 2.8a10 10 0 01-2.9.8 5 5 0 002.2-2.8 10 10 0 01-3.2 1.2 5 5 0 00-8.6 4.6A14 14 0 011.7 2.2a5 5 0 001.5 6.7 5 5 0 01-2.3-.6v.1a5 5 0 004 4.9 5 5 0 01-2.3.1 5 5 0 004.7 3.4A10 10 0 012 19.5a14 14 0 007.5 2.2c9 0 14-7.5 14-14v-.6A10 10 0 0023 2.8" />
      </svg>
    ),
    instagram: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 2C4.8 2 3 3.8 3 6v12c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H7zm10 2a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-3a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0116.5 4z" />
      </svg>
    ),
    line: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
      </svg>
    )
  };

  return (
    <a href={href} className="bg-indigo-800 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-300">
      {icons[icon]}
    </a>
  );
}

function MobileFooterSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-indigo-800 pb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center py-2 text-left"
      >
        <h4 className="text-white font-medium">{title}</h4>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100 pt-3' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
