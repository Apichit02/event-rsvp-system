import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventDetailActions({ event, isAuthenticated }) {
  const { title } = event;
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: shareUrl
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 font-kanit">แชร์กิจกรรมนี้</h2>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <button
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-kanit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              แชร์กิจกรรม
            </button>
            
            <AnimatePresence>
              {showShareOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-64 rounded-lg bg-white shadow-lg z-10 overflow-hidden border border-gray-200"
                >
                  <div className="p-2">
                    <button
                      onClick={copyToClipboard}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center font-kanit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      {copySuccess ? 'คัดลอกลิงก์แล้ว!' : 'คัดลอกลิงก์'}
                    </button>
                    
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center font-kanit"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 text-blue-600" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      แชร์ไปยัง Facebook
                    </a>
                    
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center font-kanit"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 text-blue-400" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      แชร์ไปยัง Twitter
                    </a>
                    
                    <a
                      href={`https://line.me/R/msg/text/?${encodeURIComponent(title + ' ' + shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center font-kanit"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 text-green-500" fill="currentColor">
                        <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.819 4.276 8.856 10.052 9.623.391.082.923.258 1.058.59.121.301.079.766.038 1.079l-.164 1.02c-.045.301-.24 1.186 1.049.647 1.291-.539 6.966-4.084 9.494-7 1.741-1.925 2.475-3.875 2.475-5.959zm-17.545 5.568c-.854 0-1.55-.695-1.55-1.553V9.68c0-.856.695-1.552 1.55-1.552.854 0 1.55.696 1.55 1.552v4.64c0 .858-.696 1.553-1.55 1.553zm4.484 0c-.854 0-1.55-.695-1.55-1.553v-2.325h-1.113c-.414 0-.75-.337-.75-.752s.336-.752.75-.752h3.863c.414 0 .75.337.75.752s-.336.752-.75.752h-1.113v2.325c0 .858-.695 1.553-1.55 1.553zm2.378-6.193c0-.414.335-.75.75-.75h3.928c.414 0 .75.337.75.75 0 .414-.336.751-.75.751h-3.928c-.414 0-.75-.337-.75-.75zm1.939 5.63c-.414 0-.75-.336-.75-.75V12.36c0-.414.336-.75.75-.75s.75.336.75.75v2.199c0 .414-.336.75-.75.75zm2.525.562c-.854 0-1.55-.695-1.55-1.553V9.68c0-.856.695-1.552 1.55-1.552.854 0 1.55.696 1.55 1.552v4.64c0 .858-.696 1.553-1.55 1.553z"/>
                      </svg>
                      แชร์ไปยัง LINE
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {isAuthenticated && (
            <button className="inline-flex items-center px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors font-kanit">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              บันทึกกิจกรรม
            </button>
          )}
          
          <a 
            href="#"
            className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors font-kanit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            สอบถามข้อมูล
          </a>
        </div>
      </div>
    </div>
  );
}
