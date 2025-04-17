'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('authToken'));
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push('/login?mode=login');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg sticky top-0 z-50 transition-all duration-300 font-kanit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
            data-aos="fade-right"
          >
            <img 
              src="/logo/logo.png" 
              alt="Logo" 
              className="h-8 w-auto sm:h-10 transition-transform duration-300 group-hover:scale-110 bg-white rounded-full p-1" 
            />
            <span className="font-kanit font-semibold text-lg sm:text-xl text-white group-hover:text-yellow-300 transition-colors duration-300">
              MyEvent
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-yellow-300 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div 
            className="hidden md:flex space-x-4 lg:space-x-8"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            <NavLink href="/">หน้าแรก</NavLink>
            <NavLink href="/events">กิจกรรม</NavLink>
            <NavLink href="/registrations">ลงทะเบียน</NavLink>
            <NavLink href="/terms">ข้อกำหนด</NavLink>
          </div>

          {/* Auth Button & Dropdown for Desktop */}
          <div 
            className="hidden md:block relative" 
            ref={dropdownRef}
            data-aos="fade-left"
          >
            <button
              onClick={() => setDropdownOpen(o => !o)}
              className={`flex items-center space-x-2 px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-300 font-kanit ${
                isAuthenticated
                  ? 'bg-white text-indigo-600 hover:shadow-lg hover:bg-yellow-100'
                  : 'bg-yellow-400 text-indigo-900 hover:shadow-md hover:bg-yellow-300'
              } focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50`}
            >
              {isAuthenticated ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">โปรไฟล์ของฉัน</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium">เข้าสู่ระบบ / สมัครสมาชิก</span>
                </>
              )}
              <svg
                className={`h-4 w-4 transform transition-transform duration-300 ${
                  dropdownOpen ? 'rotate-180' : 'rotate-0'
                }`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-60 bg-white border border-gray-100 rounded-lg shadow-xl z-10 overflow-hidden transform transition-all origin-top-right animate-dropdown font-kanit"
                data-aos="zoom-in"
                data-aos-duration="400"
              >
                {!isAuthenticated ? (
                  <>
                    <div className="px-5 py-3 bg-indigo-50 border-b border-indigo-100">
                      <p className="text-sm text-indigo-700 font-medium">เข้าสู่ระบบเพื่อจัดการกิจกรรมของคุณ</p>
                    </div>
                    <Link
                      href="/login?mode=register"
                      className="block px-5 py-3 hover:bg-indigo-50 transition-colors duration-200 flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span>สมัครสมาชิกใหม่</span>
                    </Link>
                    <Link
                      href="/login?mode=login"
                      className="block px-5 py-3 hover:bg-indigo-50 transition-colors duration-200 flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>เข้าสู่ระบบด้วยบัญชีเดิม</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="px-5 py-3 bg-indigo-50 border-b border-indigo-100">
                      <p className="text-sm text-indigo-700 font-medium">จัดการบัญชีของคุณ</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-5 py-3 hover:bg-indigo-50 transition-colors duration-200 flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>ข้อมูลและกิจกรรมของฉัน</span>
                    </Link>
                    <Link
                      href="/profile/add-event"
                      className="block px-5 py-3 hover:bg-green-50 transition-colors duration-200 flex items-center space-x-2 text-gray-700 hover:text-green-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>สร้างกิจกรรมใหม่</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-3 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2 text-gray-700 hover:text-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>ออกจากระบบ</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        ref={mobileMenuRef}
        className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'max-h-96 opacity-100 visible border-t border-indigo-500' 
            : 'max-h-0 opacity-0 invisible'
        } overflow-hidden`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-indigo-700 shadow-inner">
          <Link 
            href="/"
            className="block py-2 px-4 text-white hover:bg-indigo-600 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            หน้าแรก
          </Link>
          <Link 
            href="/events"
            className="block py-2 px-4 text-white hover:bg-indigo-600 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            กิจกรรม
          </Link>
          <Link 
            href="/registrations"
            className="block py-2 px-4 text-white hover:bg-indigo-600 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            ลงทะเบียน
          </Link>
          <Link 
            href="/terms"
            className="block py-2 px-4 text-white hover:bg-indigo-600 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            ข้อกำหนด
          </Link>
          
          <div className="pt-2 border-t border-indigo-500">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/profile"
                  className="block py-2 px-4 text-white hover:bg-indigo-600 rounded-md flex items-center space-x-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>ข้อมูลและกิจกรรมของฉัน</span>
                </Link>
                <Link 
                  href="/profile/add-event"
                  className="block py-2 px-4 text-white hover:bg-indigo-600 rounded-md flex items-center space-x-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>สร้างกิจกรรมใหม่</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-4 text-white hover:bg-red-600 rounded-md flex items-center space-x-2 mt-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>ออกจากระบบ</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link 
                  href="/login?mode=login"
                  className="block py-2 px-4 bg-yellow-400 text-indigo-900 rounded-md flex items-center justify-center space-x-2 hover:bg-yellow-300 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>เข้าสู่ระบบ</span>
                </Link>
                <Link 
                  href="/login?mode=register"
                  className="block py-2 px-4 bg-indigo-100 text-indigo-900 rounded-md flex items-center justify-center space-x-2 hover:bg-indigo-200 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>สมัครสมาชิก</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <Link 
      href={href} 
      className="relative text-white font-kanit font-medium hover:text-yellow-300 transition-colors duration-300 py-2 px-1 group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}
