import React from 'react';
import { motion } from 'framer-motion';

export default function EventDetailRegistration({ event, onRegister }) {
  const { 
    max_attendees, 
    member_count = 0, 
    guest_count = 0, 
    total_count = 0 
  } = event;
  
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
      className="bg-white rounded-xl shadow-md overflow-hidden mb-6"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 font-kanit flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          สถานะการลงทะเบียน
        </h2>
        
        <div className="space-y-4">
          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-sm mb-1 font-kanit">
              <span>ที่นั่งทั้งหมด: {max_attendees}</span>
              <span className="font-medium">ลงทะเบียนแล้ว: {total_count}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${colorClasses[statusColor]}`}
                style={{ width: `${registrationPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Registration details */}
          <div className="bg-indigo-50 rounded-lg p-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-indigo-700">{member_count}</div>
              <div className="text-xs sm:text-sm text-indigo-600 font-kanit">สมาชิกที่ลงทะเบียน</div>
            </div>
            
            <div>
              <div className="text-xl sm:text-2xl font-bold text-indigo-700">{guest_count}</div>
              <div className="text-xs sm:text-sm text-indigo-600 font-kanit">บุคคลทั่วไป</div>
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <div className={`text-xl sm:text-2xl font-bold ${seatsLeft > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {seatsLeft > 0 ? seatsLeft : 0}
              </div>
              <div className={`text-xs sm:text-sm ${seatsLeft > 0 ? 'text-green-600' : 'text-red-600'} font-kanit`}>
                {seatsLeft > 0 ? 'ที่นั่งเหลือ' : 'เต็มแล้ว'}
              </div>
            </div>
          </div>
          
          {/* Action button */}
          <button
            onClick={onRegister}
            disabled={seatsLeft <= 0}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white font-kanit transition-all ${
              seatsLeft > 0 
                ? 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {seatsLeft > 0 ? 'ลงทะเบียนเข้าร่วมกิจกรรม' : 'ที่นั่งเต็มแล้ว'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
