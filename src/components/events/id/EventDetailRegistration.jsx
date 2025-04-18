import React from 'react';
import { motion } from 'framer-motion';

export default function EventDetailRegistration({ event, onRegister }) {
  const { max_attendees, total_count = 0 } = event;
  
  const seatsLeft = max_attendees - total_count;
  const registrationPercentage = Math.min((total_count / max_attendees) * 100, 100);
  
  const getStatusColor = () => {
    if (seatsLeft <= 0) return 'red';
    if (seatsLeft <= max_attendees * 0.2) return 'orange';
    return 'green';
  };
  
  const statusColor = getStatusColor();
  const colorClasses = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500'
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-xl shadow-md overflow-hidden mb-6 border border-gray-100"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-5 font-kanit flex items-center">
          <span className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </span>
          สถานะการลงทะเบียน
        </h2>
        
        <div className="space-y-6">
          {/* Progress bar with improved styling */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center text-sm mb-2 font-kanit">
              <span className="font-medium text-gray-700">ความคืบหน้าการลงทะเบียน</span>
              <span className="font-medium bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100">
                <span className="font-bold text-indigo-600">{total_count}</span>
                <span className="text-gray-500"> / {max_attendees}</span>
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full ${colorClasses[statusColor]} transition-all duration-500 ease-out`}
                style={{ width: `${registrationPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Registration stats with improved cards */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 shadow-sm border border-indigo-100 text-center"
            >
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-indigo-700 mb-1">{total_count}</div>
                <div className="text-xs text-indigo-600 font-kanit">ผู้ลงทะเบียนแล้ว</div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`bg-gradient-to-br rounded-xl p-4 shadow-sm border text-center ${
                seatsLeft > 0 
                  ? 'from-green-50 to-green-100 border-green-100' 
                  : 'from-red-50 to-red-100 border-red-100'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className={`text-2xl font-bold mb-1 ${
                  seatsLeft > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {seatsLeft > 0 ? seatsLeft : 0}
                </div>
                <div className={`text-xs font-kanit ${
                  seatsLeft > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {seatsLeft > 0 ? 'ที่นั่งเหลือ' : 'เต็มแล้ว'}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Call-to-action */}
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: seatsLeft > 0 ? 1.02 : 1 }}
              whileTap={{ scale: seatsLeft > 0 ? 0.98 : 1 }}
              onClick={onRegister}
              disabled={seatsLeft <= 0}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white font-kanit transition-all duration-300 ${
                seatsLeft > 0 
                  ? 'bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow-md' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {seatsLeft > 0 ? (
                <>
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    ลงทะเบียนเข้าร่วมกิจกรรม
                  </span>
                </>
              ) : (
                <>
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ที่นั่งเต็มแล้ว
                  </span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
